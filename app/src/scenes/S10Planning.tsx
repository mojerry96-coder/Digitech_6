import { useState } from "react";
import { ChevronRight12Regular, Document16Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { STREAMS, HOUR_STEP, type StreamId } from "../content/scenario";
import { recordFromSnapshot } from "../app/record";
import { Strip, Dialog, InfoBar } from "../ui/kit";

export function S10() {
  const { run, edit, commit } = useRun();
  const [confirming, setConfirming] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const h = run.s10.hours;
  const total = Object.values(h).reduce((a, b) => a + b, 0);
  const left = 72 - total;
  const docs = run.bridge.snapshot?.docs ?? 0;
  const set = (id: StreamId, v: number) => edit((d) => {
    const others = Object.entries(d.s10.hours).filter(([k]) => k !== id).reduce((a, [, x]) => a + x, 0);
    const snapped = Math.round(v / HOUR_STEP) * HOUR_STEP;
    d.s10.hours[id] = Math.max(0, Math.min(snapped, 72 - others));
  });

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(380px, 64fr) minmax(260px, 36fr)" }}>
        <section className="pane" aria-label="Review planning">
          <div className="crumb">County review<ChevronRight12Regular />Review planning</div>
          <h1 className="title">Allocate the review time</h1>
          <p className="lede" style={{ marginBottom: 22 }}>Distribute 72 hours across the work.</p>
          <div className="alloc">
            {STREAMS.map((st) => (
              <div key={st.id} className="alloc-row">
                <label htmlFor={`h-${st.id}`}>{st.label}</label>
                <input id={`h-${st.id}`} type="range" min={0} max={72} step={HOUR_STEP} value={h[st.id]} onChange={(e) => set(st.id, Number(e.target.value))} aria-valuetext={`${h[st.id]} hours`} />
                <div className="stepper">
                  <button aria-label={`Fewer hours for ${st.label}`} onClick={() => set(st.id, h[st.id] - HOUR_STEP)}>−</button>
                  <input aria-label={`${st.label} hours`} inputMode="numeric" value={`${h[st.id]}`} onChange={(e) => set(st.id, Number(e.target.value.replace(/\D/g, "")) || 0)} />
                  <button aria-label={`More hours for ${st.label}`} onClick={() => set(st.id, h[st.id] + HOUR_STEP)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <p className="count" style={{ margin: "16px 0" }}>{total} of 72 h allocated · hours move in blocks of {HOUR_STEP} <span className="fixture">FIXTURE STEP</span></p>
        </section>
        <section className="pane tint" aria-label="Available time">
          <div style={{ marginTop: 26 }}><span className="big-num">{left} h</span></div>
          <div className="sub" style={{ fontSize: 14 }}>Available</div>
          <div className="preview-list">
            {h.spot >= 8 && (
              <InfoBar tone={docs >= 3 ? "ok" : "warn"}>
                <b>Spot-check of Case 7.</b>{" "}
                {docs >= 3 ? "The file confirms the aggregate pattern with a citable record: its annotations, attachments and interview notes carry evidentiary weight." : "The file is consistent with the pattern but adds little evidentiary weight: it holds a bare score and summaries rather than primary records."}
              </InfoBar>
            )}
            {run.s8.continuity === "named" && <InfoBar>You named interpreter staffing as a continuity risk. Interpreter-services hours speak to it directly.</InfoBar>}
            <button className="btn" onClick={() => setDrawer(!drawer)} aria-expanded={drawer}><Document16Regular />Exhibit 7</button>
            {drawer && run.bridge.snapshot && <div style={{ background: "#fff", border: "1px solid var(--stroke)", borderRadius: 4, padding: "0 12px" }}>{recordFromSnapshot(run.bridge.snapshot).map((d) => <div key={d.id} className="rec-row"><h4>{d.title}<span className={`tag ${d.tone === "ok" ? "ok" : d.tone === "warn" ? "warn" : "lock"}`}>{d.status}</span></h4></div>)}</div>}
          </div>
        </section>
      </div>
      <Strip>
        <button className="btn accent" disabled={total !== 72} onClick={() => setConfirming(true)}>Confirm allocation</button>
      </Strip>
      {confirming && <Dialog title="Confirm allocation?" confirm="Confirm" onCancel={() => setConfirming(false)} onConfirm={() => commit("s10")}><p>The 72 hours are committed to these work-streams. You can't change this afterwards.</p></Dialog>}
    </div>
  );
}
