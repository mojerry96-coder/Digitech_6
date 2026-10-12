import { useState } from "react";
import { ChevronRight12Regular, ReOrderDotsVertical20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { boardCards } from "../state/run";
import { minutesCard } from "../content/scenario";
import { Strip, InfoBar, Tip } from "../ui/kit";

export function S12() {
  const { run, edit, commit } = useRun();
  const cards = boardCards(run);
  const placed = run.s12.placed;
  const [picked, setPicked] = useState<string | null>(null);
  const [over, setOver] = useState<number | null>(null);
  const [review, setReview] = useState(false);
  const place = (id: string, w: number | undefined) => edit((d) => { if (w) d.s12.placed[id] = w; else delete d.s12.placed[id]; });
  const count = cards.filter((c) => placed[c.id]).length;
  const tok = (c: (typeof cards)[number]) => (
    <button key={c.id} className="token small" draggable aria-pressed={picked === c.id} onDragStart={(e) => e.dataTransfer.setData("text/plain", c.id)}
      onClick={() => setPicked(picked === c.id ? null : c.id)} style={{ width: "100%" }}>
      <ReOrderDotsVertical20Regular /><span style={{ fontWeight: 600 }}>{c.label}</span>
    </button>
  );

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(260px, 30fr) minmax(0, 70fr)" }}>
        <section className="pane" aria-label="Outcome cards"
          onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id) place(id, undefined); }}>
          <div className="crumb">County review<ChevronRight12Regular />Board timeline</div>
          <h1 className="title">Trace the consequences</h1>
          <p className="lede" style={{ marginBottom: 16 }}>Place each outcome in the week you expect it.</p>
          <div className="pool">{cards.filter((c) => !placed[c.id]).map(tok)}{count === 5 && <div className="pool-empty">All five outcomes are placed.</div>}</div>
          {picked && placed[picked] && <button className="btn subtle" style={{ marginTop: 8 }} onClick={() => { place(picked, undefined); setPicked(null); }}>Return to tray</button>}
          <p className="sub" style={{ marginTop: 14 }}>Generated from your policy and your case file.</p>
        </section>
        <section className="pane tint" aria-label="Four-week timeline" style={{ position: "relative" }}>
          <div className="weeks">
            {[1, 2, 3, 4].map((w) => (
              <div key={w} className={`week ${over === w ? "over" : ""} ${picked ? "armed" : ""}`}
                onDragOver={(e) => { e.preventDefault(); setOver(w); }} onDragLeave={() => setOver(null)}
                onDrop={(e) => { e.preventDefault(); setOver(null); const id = e.dataTransfer.getData("text/plain"); if (id) place(id, w); }}>
                <button style={{ border: 0, background: "none", padding: 0, textAlign: "left" }} disabled={!picked} onClick={() => { if (picked) { place(picked, w); setPicked(null); } }} aria-label={`Place in week ${w}`}><h4>Week {w}</h4></button>
                <div className="target-items">{cards.filter((c) => placed[c.id] === w).map(tok)}</div>
              </div>
            ))}
          </div>
          <Tip hide={count > 0} id="s12" title="Place the outcomes" style={{ right: 24, bottom: 24 }}>Drag each card to a week, or select it and choose a week.</Tip>
        </section>
      </div>
      <Strip left={<span className="count">{count} of 5 placed</span>}>
        <button className="btn accent" disabled={count < 5} onClick={() => setReview(true)}>Review the outcome</button>
      </Strip>
      {review && (
        <div className="smoke">
          <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="rv-t" style={{ width: "min(560px, calc(100% - 32px))" }}>
            <div className="dialog-b">
              <h2 className="h2" id="rv-t">How the four weeks played out</h2>
              <ol style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 6 }}>
                {[...cards].sort((x, y) => x.week - y.week).map((c) => <li key={c.id}><b>Week {c.week}:</b> {c.label}{placed[c.id] !== c.week ? <span className="sub"> (you placed it in week {placed[c.id]})</span> : null}</li>)}
              </ol>
              <InfoBar>{minutesCard(run.bridge.snapshot?.docs ?? 0)}.</InfoBar>
              <p className="sub" style={{ margin: 0 }}>Timing is illustrative <span className="fixture">FIXTURE</span></p>
            </div>
            <div className="dialog-f"><button className="btn accent" autoFocus onClick={() => commit("s12")}>Continue to the report</button><button className="btn" onClick={() => setReview(false)}>Back</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
