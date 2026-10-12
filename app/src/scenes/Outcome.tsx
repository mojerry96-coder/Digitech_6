import { useState } from "react";
import { DocumentText20Regular, PersonVoice20Regular, Scales20Regular, ArrowLeft20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { band, ending, totals, triageNoteText, TOOL, type Run, type Stage } from "../state/run";
import { FEEDBACK, TIERS, SCORE_ITEMS, EV_BINS, RECORDS, OPENINGS, VALUES, REMEDIES, COHORT_ITEMS, COHORT_BINS, READINGS, CALL_OPENINGS, FOLLOWUPS, STREAMS, THRESHOLDS, SAFEGUARDS, COMMS } from "../content/scenario";
import { Dialog } from "../ui/kit";

export function Outcome() {
  const { run, edit, restart } = useRun();
  const [again, setAgain] = useState(false);
  const e = ending(run);
  const t = totals(run);
  const snap = run.bridge.snapshot;
  const rec = [
    { icon: <DocumentText20Regular />, label: "Evidence preserved", ok: !!snap && (snap.swNote?.kind === "attached" || snap.annotations.length > 0) },
    { icon: <PersonVoice20Regular />, label: "Interview documented", ok: !!snap?.interview && !snap.interview.text.startsWith("Patient explained absence") },
    { icon: <Scales20Regular />, label: "Decision explained", ok: !!snap && !!snap.triageNote && !snap.triageNote.startsWith("Sorted per protocol") && !!snap.weighting.rationale },
  ];
  const dec = [["Rigour", band(t.rigor, 24, 14)], ["Trust", band(t.trust, 18, 10)], ["Consistency", band(t.consistency, 14, 7)]] as const;

  if (run.outcome.reviewing) return <Review onBack={() => edit((d) => { d.outcome.reviewing = false; })} />;

  return (
    <div className="workspace dark">
      <div className="dark-stage">
        <div className="crumb" style={{ color: "rgba(255,255,255,.7)" }}>County review › Review report</div>
        <h1 className="title" style={{ fontSize: "clamp(32px, 3vw, 42px)" }}>{e.title}</h1>
        <p className="lede">{e.line} {e.fixture && <span className="fixture">FIXTURE ENDING</span>}</p>
        <div className="outcome-grid">
          <section aria-label="Your record"><h3>Your record</h3>{rec.map((r) => <div key={r.label} className="o-row">{r.icon}{r.label}<span className={`tag ${r.ok ? "ok" : "warn"}`}>{r.ok ? "Yes" : "Not fully"}</span></div>)}</section>
          <section aria-label="Your decisions"><h3>Your decisions</h3>{dec.map(([k, v]) => <div key={k} className="o-row">{k}<span className={`tag ${v === "Strong" ? "ok" : "warn"}`}>{v}</span></div>)}</section>
        </div>
        <label className="field" style={{ marginTop: 26, maxWidth: 640 }}>
          <span style={{ color: "#fff", fontSize: 15 }}>Which earlier decision would you spend more time on?</span>
          <textarea className="textbox" value={run.outcome.reflection} maxLength={600} onChange={(ev) => edit((d) => { d.outcome.reflection = ev.target.value; })} />
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 20 }}>
          <button className="btn accent lg" data-autofocus onClick={() => edit((d) => { d.outcome.reviewing = true; })}>Review my decisions</button>
          <button className="link" onClick={() => setAgain(true)}>Run again</button>
        </div>
      </div>
      {again && <Dialog title="Start a new run?" confirm="Start again" onCancel={() => setAgain(false)} onConfirm={() => restart()}><p>This clears your current run, including both acts and your case file.</p></Dialog>}
    </div>
  );
}

function choiceSummary(stage: Stage, r: Run): string {
  const lab = <T extends { id: string; label: string }>(xs: readonly T[], id?: string) => xs.find((x) => x.id === id)?.label ?? "—";
  switch (stage) {
    case "s1": return `Tunde Balogun: ${lab(TIERS, r.s1.tiers.tunde)}. Note: ${triageNoteText(r) ?? "none"}`;
    case "s2": return SCORE_ITEMS.map((i) => `${i.label} → ${lab(EV_BINS, r.s2.bins[i.id])}`).join("; ");
    case "s3": return `${r.s3.links.map(([a, b]) => `${lab(RECORDS, a)} ↔ ${lab(RECORDS, b)}`).join(", ") || "No links"}. Note kept as: ${r.s3.preserve === "attach" ? "full attachment" : "summary"}`;
    case "s4": return `${lab(OPENINGS, r.s4.opening)}. Record: ${r.s4.record === "detailed" ? "detailed paraphrase" : "compressed note"}`;
    case "s5": return VALUES.map((v) => `${v.label} ${r.s5.w[v.id]}`).join(" · ");
    case "s6": return lab(REMEDIES, r.s6.remedy);
    case "s7": return COHORT_ITEMS.map((i) => `${i.label} → ${lab(COHORT_BINS, r.s7.bins[i.id])}`).join("; ");
    case "s8": return `${lab(READINGS, r.s8.reading)}${r.s8.continuity ? ` Continuity risk: ${r.s8.continuity}.` : ""}`;
    case "s9": return `${lab(CALL_OPENINGS, r.s9.opening)}${r.s9.followup ? ` Then: ${lab(FOLLOWUPS, r.s9.followup)}` : ""}`;
    case "s10": return STREAMS.map((s) => `${s.label} ${r.s10.hours[s.id]}h`).join(" · ");
    case "s11": return [lab(THRESHOLDS, r.s11.threshold), lab(SAFEGUARDS, r.s11.safeguard), lab(COMMS, r.s11.comms)].join(" · ");
    case "s12": return "Outcome timeline reviewed.";
    default: return "";
  }
}

function Review({ onBack }: { onBack: () => void }) {
  const { run } = useRun();
  const stages: Stage[] = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12"];
  return (
    <div className="workspace visual">
      <div className="pane" style={{ maxWidth: 980 }}>
        <button className="btn subtle" onClick={onBack} data-autofocus><ArrowLeft20Regular />Back to report</button>
        <h1 className="title" style={{ marginTop: 10 }}>Your decisions</h1>
        <p className="lede">Each choice you committed, with the feedback for that decision.</p>
        {stages.map((s, i) => (
          <div key={s} className="rec-row">
            <h4>{i < 6 ? "Case review" : "County review"} · {TOOL[s]}</h4>
            <p><b>You:</b> {choiceSummary(s, run)}</p>
            <p><b>Feedback:</b> {FEEDBACK[s].feedback}</p>
            <p><b>Strongest response:</b> {FEEDBACK[s].preferred}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
