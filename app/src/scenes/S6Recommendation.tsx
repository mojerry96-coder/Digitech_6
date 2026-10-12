import { useState } from "react";
import { ChevronRight12Regular, ReOrderDotsVertical20Regular, Document16Regular, Clock20Regular, Info20Filled } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { EVIDENCE_CATS, REMEDIES, EPILOGUE, FILING_NOTICE, type Remedy } from "../content/scenario";
import { liveRecord } from "../app/record";
import { Strip, Dialog } from "../ui/kit";

export function S6() {
  const { run, edit, commit } = useRun();
  const s = run.s6;
  const [over, setOver] = useState(false);
  const [picked, setPicked] = useState<Remedy | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [openDoc, setOpenDoc] = useState<string | null>(null);
  const build = s.phase === "build";
  const docs = liveRecord(run);
  const setRemedy = (r: Remedy) => build && edit((d) => { d.s6.remedy = r; });

  if (s.phase === "notice") {
    return (
      <div className="workspace">
        <div className="pane" style={{ display: "grid", placeContent: "center", textAlign: "left" }}>
          <div style={{ maxWidth: 560, padding: 24, borderRadius: 8, border: "1px solid var(--stroke-2)", background: "#fff" }}>
            <div className="crumb"><Info20Filled style={{ width: 16, height: 16, color: "var(--accent)" }} />Filing notice</div>
            <p style={{ fontSize: 16, lineHeight: "24px", margin: "10px 0 0" }}>{FILING_NOTICE}</p>
          </div>
        </div>
        <Strip><button className="btn accent" data-autofocus onClick={() => commit("s6")}>File the record</button></Strip>
      </div>
    );
  }

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(380px, 62fr) minmax(260px, 38fr)" }}>
        <section className="pane" aria-label="Recommendation">
          <div className="crumb">Case review<ChevronRight12Regular />Recommendation</div>
          <h1 className="title">Build the recommendation</h1>
          <p className="lede" style={{ marginBottom: 22 }}>Tunde Balogun</p>
          <div className="rule-ed">
            <span className="kw">IF</span>
            <div className={`slot ${s.evidence ? "filled" : ""}`}>
              <select className="select" aria-label="Evidence category" disabled={!build} value={s.evidence ?? ""} onChange={(e) => edit((d) => { d.s6.evidence = (e.target.value || undefined) as typeof s.evidence; })}>
                <option value="">Choose evidence</option>
                {EVIDENCE_CATS.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <span className="kw">THEN</span>
            <div className={`slot ${s.remedy ? "filled" : ""} ${over ? "over" : ""}`}
              onDragOver={(e) => { if (build) { e.preventDefault(); setOver(true); } }} onDragLeave={() => setOver(false)}
              onDrop={(e) => { e.preventDefault(); setOver(false); const r = e.dataTransfer.getData("text/plain") as Remedy; if (r) setRemedy(r); }}>
              {s.remedy ? <span style={{ fontWeight: 600 }}>{REMEDIES.find((r) => r.id === s.remedy)!.full}</span>
                : <button className="btn subtle" disabled={!picked} onClick={() => { if (picked) { setRemedy(picked); setPicked(null); } }} style={{ color: "var(--ink-2)" }}>{picked ? "Place the selected pathway here" : "Choose a pathway"}</button>}
            </div>
          </div>
          {s.remedy === "enhanced" && <div className="arrangements" style={{ marginLeft: 56 }}><span>Arrangements: evening DOT slot · confirmed interpreter access (Yoruba)</span></div>}
          {build && (
            <>
              <h3 className="h3" style={{ marginTop: 24 }}>Pathways</h3>
              <div className="tray-row" role="group" aria-label="Pathways">
                {REMEDIES.map((r) => (
                  <button key={r.id} className="token" draggable aria-pressed={picked === r.id}
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", r.id)}
                    onClick={() => (s.remedy ? setRemedy(r.id) : setPicked(picked === r.id ? null : r.id))}>
                    <ReOrderDotsVertical20Regular />{r.label}
                  </button>
                ))}
              </div>
              <p className="sub" style={{ marginTop: 8 }}>Drag a pathway into THEN, or select one and place it.</p>
            </>
          )}
          {s.phase === "epilogue" && (
            <div style={{ marginTop: 24, maxWidth: 560 }}>
              <h3 className="h3"><Clock20Regular style={{ width: 18, height: 18, verticalAlign: -3 }} /> Six weeks later <span className="fixture">FIXTURE</span></h3>
              <ol style={{ margin: "10px 0 0", paddingLeft: 20, display: "grid", gap: 8 }}>{EPILOGUE[s.remedy!].map((l) => <li key={l}>{l}</li>)}</ol>
            </div>
          )}
        </section>
        <section className="pane tint" aria-label="Case record">
          <h2 className="h2" style={{ marginTop: 26 }}>Case record</h2>
          <div style={{ marginTop: 10 }}>
            {docs.map((d) => (
              <div key={d.id} className="rec-row">
                <button className="link" style={{ textDecoration: "none", display: "flex", gap: 8, alignItems: "center", color: "var(--ink)" }} aria-expanded={openDoc === d.id} onClick={() => setOpenDoc(openDoc === d.id ? null : d.id)}><Document16Regular />{d.title}</button>
                {openDoc === d.id && <p>{d.body}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>
      <Strip>
        {build
          ? <button className="btn accent" disabled={!s.evidence || !s.remedy} onClick={() => setConfirming(true)}>Confirm recommendation</button>
          : <button className="btn accent" data-autofocus onClick={() => edit((d) => { d.s6.phase = "notice"; })}>Continue</button>}
      </Strip>
      {confirming && (
        <Dialog title="Confirm recommendation?" confirm="Confirm" onCancel={() => setConfirming(false)} onConfirm={() => { edit((d) => { d.s6.phase = "epilogue"; }); setConfirming(false); }}>
          <p>{REMEDIES.find((r) => r.id === s.remedy)?.full}. This becomes the final recommendation in the case file.</p>
        </Dialog>
      )}
    </div>
  );
}
