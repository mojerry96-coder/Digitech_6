import { REMEDIES, EVIDENCE_CATS, VALUES } from "../content/scenario";
import { interviewText, triageNoteText, type Run, type Snapshot } from "../state/run";

export interface RecordDoc { id: string; title: string; status: string; tone: "ok" | "warn" | "lock" | "none"; body: string; quote?: boolean }

const remedyLabel = (r: string | null) => REMEDIES.find((x) => x.id === r)?.full ?? "No recommendation recorded";
const tierLabel = (t: string | null) => t === "petition" ? "Prepare detention petition" : t === "enhanced" ? "Enhanced monitoring this week" : t === "routine" ? "Routine follow-up" : "Not assigned";

/** The six Act I record rows, from the archived snapshot (Act II) or the live committed record (Act I). */
export function recordFromSnapshot(s: Snapshot): RecordDoc[] {
  return [
    { id: "triage", title: "Triage note", status: s.triageNote ? (s.triageNote.startsWith("Sorted per protocol") ? "Saved" : "Retained") : "Not recorded", tone: s.triageNote && !s.triageNote.startsWith("Sorted per protocol") ? "ok" : "warn", body: `Tier: ${tierLabel(s.tier)}\n${s.triageNote ?? "No triage note was recorded."}` },
    { id: "ann", title: "Score annotations", status: s.annotations.length ? `${s.annotations.length} retained` : "None", tone: s.annotations.length ? "ok" : "warn", body: s.annotations.length ? s.annotations.map((a) => `${a.item} — ${a.bin === "strong" ? "Strong" : "Weak or ambiguous"}: “${a.note}”`).join("\n") : "Model score: 88%. No annotations were attached." },
    { id: "sw", title: "Social-worker note", status: s.swNote ? (s.swNote.kind === "attached" ? "Attached" : "Summary only") : "Not recorded", tone: s.swNote?.kind === "attached" ? "ok" : "warn", body: s.swNote ? (s.swNote.kind === "attached" ? `Full note attached:\n“${s.swNote.text}”` : `Summary (the original note was not attached):\n“${s.swNote.text}”`) : "No social-worker note in the file.", quote: s.swNote?.kind === "attached" },
    { id: "int", title: "Interview record", status: s.interview ? (s.interview.text.startsWith("Patient explained absence") ? "Compressed" : "Saved") : "Not recorded", tone: s.interview && !s.interview.text.startsWith("Patient explained absence") ? "ok" : "warn", body: s.interview?.text ?? "No interview record." },
    { id: "w", title: "Weighting rationale", status: s.weighting.rationale ? "Saved" : "No rationale", tone: s.weighting.rationale ? "ok" : "warn", body: `${VALUES.map((v) => `${v.label} ${s.weighting.w[v.id]}`).join(" · ")}\n${s.weighting.rationale ? `“${s.weighting.rationale}”` : "No rationale was recorded."}` },
    { id: "rec", title: "Final recommendation", status: s.remedy ? "Committed" : "None", tone: "lock", body: `${remedyLabel(s.remedy)}${s.evidence ? `\nEvidence category: ${EVIDENCE_CATS.find((e) => e.id === s.evidence)?.label}` : ""}` },
  ];
}

/** Records visible in Case file / Case files before the Bridge: only what has been committed so far. */
export function liveRecord(r: Run): RecordDoc[] {
  const out: RecordDoc[] = [];
  if (r.committed.s1) out.push({ id: "triage", title: "Triage note", status: "Committed", tone: "lock", body: `Tier: ${tierLabel(r.s1.tiers.tunde ?? null)}\n${triageNoteText(r) ?? "No triage note was recorded."}` });
  if (r.committed.s2) {
    const notes = Object.entries(r.s2.notes).filter(([, n]) => n.trim());
    out.push({ id: "ann", title: "Score annotations", status: notes.length ? `${notes.length} saved` : "None", tone: "lock", body: notes.length ? notes.map(([k, n]) => `${k}: “${n.trim()}”`).join("\n") : "No annotations were attached." });
  }
  if (r.committed.s3) out.push({ id: "sw", title: "Social-worker note", status: r.s3.preserve === "attach" ? "Attached" : "Summary only", tone: "lock", body: r.s3.preserve === "attach" ? "Full note attached." : `Summary: “${r.s3.summary.trim()}”` });
  if (r.committed.s4) out.push({ id: "int", title: "Interview record", status: "Committed", tone: "lock", body: interviewText(r) ?? "" });
  if (r.committed.s5) out.push({ id: "w", title: "Weighting rationale", status: "Committed", tone: "lock", body: `${VALUES.map((v) => `${v.label} ${r.s5.w[v.id]}`).join(" · ")}\n${r.s5.rationale.trim() ? `“${r.s5.rationale.trim()}”` : "No rationale was recorded."}` });
  if (r.committed.s6) out.push({ id: "rec", title: "Final recommendation", status: "Committed", tone: "lock", body: remedyLabel(r.s6.remedy ?? null) });
  return out;
}

export function caseRecord(r: Run): RecordDoc[] {
  return r.bridge.snapshot && r.committed.s6 ? recordFromSnapshot(r.bridge.snapshot) : liveRecord(r);
}
