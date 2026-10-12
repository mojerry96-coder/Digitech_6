import {
  CASES, SCORE_ITEMS, KEY_LINK, INTERVIEW, SW_NOTE_FULL, MATCH, COHORT_ITEMS, PATIENTS, DISTRICTS, jointA, jointB,
  type Tier, type EvBin, type Opening, type ValueId, type Remedy, type EvidenceCat, type CohortBin,
  type CallOpen, type FollowUp, type StreamId, type ThresholdId, type SafeguardId, type CommsId,
} from "../content/scenario";

export const STAGES = ["s1", "s2", "s3", "s4", "s5", "s6", "bridge", "s7", "s8", "s9", "s10", "s11", "s12", "outcome"] as const;
export type Stage = (typeof STAGES)[number];
export const ACT1: Stage[] = ["s1", "s2", "s3", "s4", "s5", "s6"];
export const TOOL: Record<Stage, string> = {
  s1: "Triage", s2: "Score review", s3: "Record timeline", s4: "Field visit record", s5: "Case weighting", s6: "Recommendation",
  bridge: "Archived case file", s7: "Cohort evidence", s8: "Cohort map", s9: "Advocate call", s10: "Review planning",
  s11: "Policy rule", s12: "Board timeline", outcome: "Review report",
};

export interface Run {
  v: 1;
  stage: Stage;
  committed: Partial<Record<Stage, boolean>>;
  s1: { tiers: Record<string, Tier>; phase: "sort" | "document"; docMode?: "protocol" | "barrier"; barrier?: string };
  s2: { bins: Record<string, EvBin>; notes: Record<string, string>; disclaimerOpened: boolean };
  s3: { links: [string, string][]; preserve?: "attach" | "summary"; summary: string };
  s4: { opening?: Opening; question: string; began: boolean; record?: "detailed" | "compressed" };
  s5: { w: Record<ValueId, number>; rationale: string };
  s6: { evidence?: EvidenceCat; remedy?: Remedy; phase: "build" | "epilogue" | "notice" };
  bridge: { snapshot?: Snapshot; revealed: boolean };
  s7: { bins: Record<string, CohortBin>; nameOpened: number };
  s8: { prediction: string[]; revealed: boolean; reading?: string; continuity?: "named" | "dismissed" };
  s9: { opening?: CallOpen; followup?: FollowUp };
  s10: { hours: Record<StreamId, number> };
  s11: { threshold?: ThresholdId; safeguard?: SafeguardId; comms?: CommsId; aligned: [boolean, boolean]; tested: boolean };
  s12: { placed: Record<string, number> };
  outcome: { reflection: string; reviewing: boolean };
  scores: Partial<Record<Stage, Delta>>;
}
export interface Delta { rigor: number; trust: number; consistency: number }

/** The immutable Act I record, taken at the Bridge. Act II reads only this. */
export interface Snapshot {
  takenAt: string;
  triageNote: string | null;
  tier: Tier | null;
  annotations: { item: string; bin: EvBin; note: string }[];
  swNote: { kind: "attached"; text: string } | { kind: "summary"; text: string } | null;
  interview: { opening: Opening | null; text: string } | null;
  weighting: { w: Record<ValueId, number>; rationale: string };
  remedy: Remedy | null;
  evidence: EvidenceCat | null;
  docs: number; // 0–5 documentation strength
}

export const freshRun = (): Run => ({
  v: 1, stage: "s1", committed: {},
  s1: { tiers: {}, phase: "sort" },
  s2: { bins: {}, notes: {}, disclaimerOpened: false },
  s3: { links: [], summary: "" },
  s4: { question: "", began: false },
  s5: { w: { safety: 0, lrm: 0, consistency: 0, speed: 0 }, rationale: "" },
  s6: { phase: "build" },
  bridge: { revealed: false },
  s7: { bins: {}, nameOpened: 0 },
  s8: { prediction: [], revealed: false },
  s9: {},
  s10: { hours: { analysis: 0, spot: 0, report: 0, interp: 0 } },
  s11: { aligned: [false, false], tested: false },
  s12: { placed: {} },
  outcome: { reflection: "", reviewing: false },
  scores: {},
});

// ---------------- persistence ----------------
const KEY = "behind-the-order.run.v1";
export function loadRun(): Run | null {
  try { const raw = localStorage.getItem(KEY); if (!raw) return null; const r = JSON.parse(raw); return r && r.v === 1 ? r : null; } catch { return null; }
}
export function saveRun(r: Run): boolean {
  try { localStorage.setItem(KEY, JSON.stringify(r)); return true; } catch { return false; }
}
export function clearRun() { try { localStorage.removeItem(KEY); } catch { /* ignore */ } }

// ---------------- derived record helpers ----------------
export function triageNoteText(r: Run): string | null {
  if (r.s1.docMode === "protocol") return "Sorted per protocol, no further note.";
  if (r.s1.docMode === "barrier") {
    const t = r.s1.tiers.tunde; const tier = t === "petition" ? "Prepare detention petition" : t === "enhanced" ? "Enhanced monitoring this week" : "Routine follow-up";
    return `Sorted to ${tier} because of ${r.s1.barrier ?? "an access barrier"}; flagging for evidence-based review.`;
  }
  return null;
}
export function interviewText(r: Run): string | null {
  if (!r.s4.record || !r.s4.opening) return null;
  return r.s4.record === "compressed" ? "Patient explained absence, no issue." : INTERVIEW_DETAILED[r.s4.opening];
}
const INTERVIEW_DETAILED: Record<Opening, string> = { order: INTERVIEW.order.detailed, week: INTERVIEW.week.detailed, reassure: INTERVIEW.reassure.detailed };

export function docsScore(r: Run): number {
  let d = 0;
  if (r.s1.docMode === "barrier") d++;
  if (Object.values(r.s2.notes).some((n) => n.trim().length >= 8)) d++;
  if (r.s3.preserve === "attach") d++;
  if (r.s4.record === "detailed") d++;
  if (r.s5.rationale.trim().length >= 12) d++;
  return d;
}

export function takeSnapshot(r: Run): Snapshot {
  return {
    takenAt: new Date().toISOString(),
    triageNote: triageNoteText(r),
    tier: r.s1.tiers.tunde ?? null,
    annotations: SCORE_ITEMS.filter((i) => (r.s2.notes[i.id] ?? "").trim() && (r.s2.bins[i.id] === "strong" || r.s2.bins[i.id] === "weak"))
      .map((i) => ({ item: i.label, bin: r.s2.bins[i.id]!, note: r.s2.notes[i.id]!.trim() })),
    swNote: r.s3.preserve === "attach" ? { kind: "attached", text: SW_NOTE_FULL } : r.s3.preserve === "summary" ? { kind: "summary", text: r.s3.summary.trim() || "(empty summary)" } : null,
    interview: r.s4.record ? { opening: r.s4.opening ?? null, text: interviewText(r) ?? "" } : null,
    weighting: { w: { ...r.s5.w }, rationale: r.s5.rationale.trim() },
    remedy: r.s6.remedy ?? null,
    evidence: r.s6.evidence ?? null,
    docs: docsScore(r),
  };
}

// ---------------- scoring (SB p.41 matrix; weights the storyboard leaves open are fixtures) ----------------
const D = (rigor = 0, trust = 0, consistency = 0): Delta => ({ rigor, trust, consistency });
export function scoreStage(stage: Stage, r: Run): Delta {
  switch (stage) {
    case "s1": {
      const correct = CASES.filter((c) => r.s1.tiers[c.id] && c.accept.includes(r.s1.tiers[c.id])).length;
      const contextSort = r.s1.tiers.tunde !== "petition" && correct >= 7;
      return D((contextSort ? 2 : 0) + (r.s1.docMode === "barrier" ? 1 : 0));
    }
    case "s2": {
      const right = SCORE_ITEMS.filter((i) => r.s2.bins[i.id] === i.key).length;
      const ann = SCORE_ITEMS.filter((i) => (r.s2.notes[i.id] ?? "").trim().length >= 8 && (r.s2.bins[i.id] === "strong" || r.s2.bins[i.id] === "weak")).length;
      const disclaimer = r.s2.disclaimerOpened && r.s2.bins.disclaimer !== "strong";
      return D((right === 6 ? 3 : right >= 4 ? 1 : 0) + ann, disclaimer ? 2 : 0);
    }
    case "s3": {
      const linked = r.s3.links.some(([a, b]) => (a === KEY_LINK[0] && b === KEY_LINK[1]) || (a === KEY_LINK[1] && b === KEY_LINK[0]));
      return D((linked ? 3 : 0) + (r.s3.preserve === "attach" ? 2 : 0));
    }
    case "s4": {
      const pf = r.s4.opening === "week";
      return D(pf ? 1 : 0, (pf ? 3 : 0) + (r.s4.record === "detailed" ? 2 : 0));
    }
    case "s5": {
      const vals = Object.values(r.s5.w); const balanced = Math.max(...vals) <= 5;
      return D(0, balanced ? 3 : 0, r.s5.w.consistency > 2 ? 3 : 0);
    }
    case "s6": {
      const matched = !!r.s6.evidence && !!r.s6.remedy && MATCH[r.s6.evidence].includes(r.s6.remedy);
      const truthful = r.s6.evidence !== "deliberate"; // the record shows no repeated refusal
      return D(matched && truthful ? 3 : 0, matched && truthful ? 2 : 0, truthful && r.s6.remedy !== "petition" ? 3 : 0);
    }
    case "s7": {
      const right = COHORT_ITEMS.filter((i) => r.s7.bins[i.id] === i.key).length;
      return D(right === 6 ? 2 : right >= 4 ? 1 : 0);
    }
    case "s8": return D(r.s8.reading === "access" ? 3 : 0, 0, r.s8.continuity === "named" ? 1 : 0);
    case "s9": {
      const honest = r.s9.opening === "honest";
      return D(honest && r.s9.followup === "redirect" ? 1 : 0, (honest ? 3 : 0) + (r.s9.followup === "redirect" ? 2 : 0));
    }
    case "s10": {
      const h = r.s10.hours; const vals = Object.values(h);
      const balanced = Math.min(...vals) >= 8 && Math.max(...vals) <= 32;
      const docs = r.bridge.snapshot?.docs ?? 0;
      const spot = h.spot >= 8 ? Math.min(3, Math.round((docs / 5) * 3)) : 0;
      return D(balanced ? 2 : 0, h.interp >= 8 ? 1 : 0, spot);
    }
    case "s11": {
      const res = policyResult(r);
      return D(res.locked ? 3 : 0, r.s11.comms === "transparency" ? 2 : 0, res.exhibitConsistent ? 3 : 0);
    }
    case "s12": return D(0, 0, 2);
    default: return D();
  }
}

export function totals(r: Run, stages: readonly Stage[] = STAGES) {
  const t = { rigor: 0, trust: 0, consistency: 0 };
  for (const s of stages) { const d = r.scores[s]; if (d) { t.rigor += d.rigor; t.trust += d.trust; t.consistency += d.consistency; } }
  return t;
}

// ---------------- Scene 11 policy check ----------------
export function policyResult(r: Run) {
  const { threshold: t, safeguard: s, comms: c } = r.s11;
  const a = t && s ? jointA(t, s) : null; const b = s && c ? jointB(s, c) : null;
  const locked = !!(a?.ok && b?.ok);
  const act1 = r.bridge.snapshot?.remedy ?? null;
  const strong = t === "raise";
  let exhibitConsistent = false; let exhibitMsg = "";
  if (act1) {
    if (strong && act1 !== "petition") { exhibitConsistent = true; exhibitMsg = "Consistent: your Act I remedy and your cohort recommendation tell the same story."; }
    else if (strong && act1 === "petition") { exhibitMsg = "Case 7 was treated more urgently than your own county recommendation suggests the pattern warrants. This may be worth revisiting. The sandbox will not force you to, but a board that reads both might ask why."; }
    else if (!strong && act1 !== "petition") { exhibitMsg = "Your Act I remedy treated Case 7 as a structural-barrier case, but this rule keeps the petition criteria that flagged him. A board that reads both might ask which judgement you stand by."; }
    else { exhibitConsistent = true; exhibitMsg = "Consistent on its face: both judgements keep the current approach. Check it against the map before the board does."; }
  }
  return { a, b, locked, exhibitConsistent, exhibitMsg, act1 };
}

// ---------------- Scene 12 outcome cards ----------------
export function boardCards(r: Run): { id: string; label: string; week: number }[] {
  const s = r.bridge.snapshot; const docs = s?.docs ?? 0;
  const raise = r.s11.threshold === "raise"; const pre = r.s11.safeguard === "precheck"; const pub = r.s11.comms === "transparency";
  const cards = [
    { id: "c1", label: pre ? "Interpreter access checked before every petition" : "Interpreter reviews scheduled after filing", week: 1 },
    { id: "c2", label: raise ? "Petition criteria updated" : "Petition criteria unchanged", week: 2 },
    { id: "c3", label: pre ? "Evening DOT slots reviewed across the county" : "Coalition asks for a second review", week: 3 },
    { id: "c4", label: pub ? "Transparency report published" : "Internal memo circulated", week: pub ? 4 : 2 },
    { id: "c5", label: minutesCardShort(docs), week: 4 },
  ];
  return cards;
}
function minutesCardShort(docs: number) {
  return docs >= 4 ? "Exhibit 7 cited in the minutes as a well-documented example" : docs >= 2 ? "Exhibit 7 cited in the board minutes" : "Board asks follow-up questions about Exhibit 7";
}

// ---------------- endings (two named by SB p.38; bands and the other two are fixtures) ----------------
export function ending(r: Run) {
  const a1 = totals(r, ["s1", "s2", "s3", "s4", "s5", "s6"]); const a2 = totals(r, ["s7", "s8", "s9", "s10", "s11", "s12"]);
  const docs = r.bridge.snapshot?.docs ?? 0;
  const act1Strong = docs >= 3 && a1.rigor + a1.trust >= 16;
  const act2Strong = a2.rigor + a2.trust >= 14;
  if (act1Strong && act2Strong) return { id: "rf2", title: "Rigorous & Fair, Twice", line: "Your case file supported the county review.", fixture: false };
  if (!act1Strong && act2Strong) return { id: "lucky", title: "Lucky, Not Ready", line: "Your county analysis held up despite a thin Exhibit 7. That was luck, not method.", fixture: false };
  if (act1Strong && !act2Strong) return { id: "file", title: "A Good File, a Missed Pattern", line: "Your case record was strong. The county analysis didn't use it as well as it could have.", fixture: true };
  return { id: "back", title: "Back to the Record", line: "Neither the case file nor the county analysis would hold up to the board's questions yet.", fixture: true };
}
export function band(n: number, hi: number, mid: number) { return n >= hi ? "Strong" : n >= mid ? "Developing" : "Thin"; }

// Map helper (Scene 8)
export function predictionMatch(pred: string[]) {
  const deserts = DISTRICTS.filter((d) => !d.access).map((d) => d.id);
  const hit = pred.filter((p) => deserts.includes(p)).length; const miss = pred.length - hit;
  return { hit, miss, deserts };
}
export const PETITIONS = PATIENTS.filter((p) => p.petition);
