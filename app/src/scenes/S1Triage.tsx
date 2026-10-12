import { useState } from "react";
import { Search20Regular, ReOrderDotsVertical20Regular, ArrowSort16Regular, ChevronRight12Regular, TrayItemAdd20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { CASES, TIERS, BARRIERS, type Tier } from "../content/scenario";
import { Strip, Dialog, Tip, InfoBar } from "../ui/kit";

export function S1() {
  const { run, edit, commit } = useRun();
  const [selected, setSelected] = useState("tunde");
  const [q, setQ] = useState("");
  const [over, setOver] = useState<Tier | null>(null);
  const [confirming, setConfirming] = useState(false);
  const s = run.s1;
  const assigned = CASES.filter((c) => s.tiers[c.id]).length;
  const sorting = s.phase === "sort";
  const c = CASES.find((x) => x.id === selected)!;
  const list = CASES.filter((x) => x.name.toLowerCase().includes(q.trim().toLowerCase()));
  const assign = (id: string, tier: Tier) => sorting && edit((d) => { d.s1.tiers[id] = tier; });
  const tierShort = (t?: Tier) => (t === "petition" ? "Petition" : t === "enhanced" ? "Enhanced" : t === "routine" ? "Routine" : "");

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(300px, 30fr) minmax(0, 70fr)" }}>
        <section className="pane" aria-label="Flagged cases" style={{ padding: "24px 18px" }}>
          <h2 className="h2">Flagged cases</h2>
          <div className="sub">10 awaiting review</div>
          <label className="searchbox"><Search20Regular /><input placeholder="Search cases" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search cases" /></label>
          <div className="list-head"><span /><span>Case</span><span style={{ display: "flex", gap: 4, justifyContent: "flex-end", alignItems: "center" }}>Score<ArrowSort16Regular /></span><span style={{ textAlign: "right" }}>Tier</span></div>
          <div role="listbox" aria-label="Flagged cases, ranked by model score">
            {list.map((x) => (
              <button key={x.id} role="option" className="list-row" aria-selected={selected === x.id} draggable={sorting}
                onDragStart={(e) => { e.dataTransfer.setData("text/plain", x.id); setSelected(x.id); }}
                onClick={() => setSelected(x.id)}>
                <ReOrderDotsVertical20Regular /><span>{x.name}</span><b>{x.score}%</b><span className="t">{tierShort(s.tiers[x.id])}</span>
              </button>
            ))}
            {list.length === 0 && <p className="sub" style={{ padding: 8 }}>No cases match “{q}”.</p>}
          </div>
        </section>

        <section className="pane" aria-label="Selected case" style={{ position: "relative" }}>
          <div className="crumb">Case review<ChevronRight12Regular />Triage</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 className="title">{c.name}</h1>
            <span className="tag">{s.tiers[c.id] ? TIERS.find((t) => t.id === s.tiers[c.id])!.label : "Review pending"}</span>
            {c.fixture && <span className="fixture" title="Development fixture: not storyboard data">FIXTURE DATA</span>}
          </div>
          <div className="meta-grid">
            <div><span className="l">Model score</span><span className="v">{c.score}%</span></div>
            <div><span className="l">Missed DOT visits</span><span className="v">{c.missed}</span></div>
            <div><span className="l">Order history</span><span className="v">{c.history}</span></div>
            <div><span className="l">Primary language</span><span className="v">{c.language}</span></div>
            {c.visitContext && <div><span className="l">Visit context</span><span className="v">{c.visitContext}</span></div>}
            {c.interpreter && <div><span className="l">Interpreter requests</span><span className="v">{c.interpreter}</span></div>}
          </div>
          <hr className="rule" />

          {sorting ? (
            <>
              <h3 className="h3">Review tier</h3>
              <p className="lede" style={{ marginBottom: 10 }}>Assign each case to a tier.</p>
              <div className="targets">
                {TIERS.map((t) => {
                  const here = CASES.filter((x) => s.tiers[x.id] === t.id);
                  return (
                    <div key={t.id} className={`target ${over === t.id ? "over" : ""} armed`}
                      onDragOver={(e) => { e.preventDefault(); setOver(t.id); }} onDragLeave={() => setOver(null)}
                      onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) assign(id, t.id); setOver(null); }}>
                      <button className="target-h" style={{ border: 0, background: "none", padding: 0, width: "100%", textAlign: "left" }} onClick={() => assign(selected, t.id)} aria-label={`Assign ${c.name} to ${t.label}`}>
                        <TrayItemAdd20Regular />{t.label}<span className="n">{here.length || ""}</span>
                      </button>
                      {here.length > 0 && <div className="target-items">{here.map((x) => <button key={x.id} className="token small" draggable onDragStart={(e) => e.dataTransfer.setData("text/plain", x.id)} onClick={() => setSelected(x.id)} aria-label={`${x.name}, in ${t.label}. Select to review or move.`}><ReOrderDotsVertical20Regular />{x.name}</button>)}</div>}
                    </div>
                  );
                })}
              </div>
              <Tip hide={assigned > 0} id="s1" title="Assign each case" style={{ right: 24, bottom: 16 }}>Drag a case into a tier, or select it and choose a tier.</Tip>
            </>
          ) : (
            <div style={{ display: "grid", gap: 14, maxWidth: 680 }}>
              <InfoBar tone="ok"><b>Triage confirmed.</b> Tiers are now on record.</InfoBar>
              <h3 className="h3">Triage note</h3>
              <p className="lede" style={{ marginTop: -8 }}>Choose how to log the triage decision for Tunde Balogun.</p>
              <div className="choices" role="radiogroup" aria-label="Triage note">
                <button className="choice" role="radio" aria-checked={s.docMode === "protocol"} onClick={() => edit((d) => { d.s1.docMode = "protocol"; })}><span className="dot" />“Sorted per protocol, no further note.”</button>
                <button className="choice" role="radio" aria-checked={s.docMode === "barrier"} onClick={() => edit((d) => { d.s1.docMode = "barrier"; })}><span className="dot" />
                  <span>“Sorted to <b>{TIERS.find((t) => t.id === s.tiers.tunde)?.label ?? "[tier]"}</b> because of <b>[access barrier]</b>; flagging for evidence-based review.”</span>
                </button>
              </div>
              {s.docMode === "barrier" && (
                <label className="field"><span>Access barrier</span>
                  <select className="select" value={s.barrier ?? ""} onChange={(e) => edit((d) => { d.s1.barrier = e.target.value || undefined; })}>
                    <option value="">Choose a barrier</option>
                    {BARRIERS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </label>
              )}
            </div>
          )}
        </section>
      </div>

      <Strip>
        <span className="count">{assigned} of 10 assigned</span>
        {sorting
          ? <button className="btn accent" disabled={assigned < 10} onClick={() => setConfirming(true)}>Confirm triage</button>
          : <button className="btn accent" disabled={!s.docMode || (s.docMode === "barrier" && !s.barrier)} onClick={() => commit("s1")}>Save triage note</button>}
      </Strip>
      {confirming && (
        <Dialog title="Confirm triage?" confirm="Confirm" onCancel={() => setConfirming(false)} onConfirm={() => { edit((d) => { d.s1.phase = "document"; }); setConfirming(false); }}>
          <p>You can't change tiers after you confirm.</p>
        </Dialog>
      )}
    </div>
  );
}
