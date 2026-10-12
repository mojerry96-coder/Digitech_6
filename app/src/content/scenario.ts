// Behind the Order — scenario content.
// Source: storyboard, DT01_RD_03_03 pp.18–42 ("SB p.N"). Anything the storyboard does not supply is
// marked `fixture: true` (or listed in FIXTURE_NOTES) and catalogued in docs/CONTENT_FIXTURES.md.
// Replace fixtures with authoritative content before treating this build as a finished assessment.

export type Tier = "petition" | "enhanced" | "routine";
export const TIERS: { id: Tier; label: string }[] = [
  { id: "petition", label: "Prepare detention petition" },
  { id: "enhanced", label: "Enhanced monitoring this week" },
  { id: "routine", label: "Routine follow-up" },
];

export interface TriageCase {
  id: string; name: string; score: number | null; missed: number | null; history: string; language: string;
  visitContext?: string; interpreter?: string;
  accept: Tier[]; // tiers the answer key accepts
  fixture: boolean;
}

// SB p.24 supplies Mr Balogun and the contrast case only. Case 01 must outrank 91% (Balogun is 3rd highest).
export const CASES: TriageCase[] = [
  { id: "c01", name: "Case 01", score: 94, missed: 4, history: "Prior non-compliance finding", language: "English", accept: ["petition", "enhanced"], fixture: true },
  { id: "c02", name: "Case 02", score: 91, missed: 3, history: "Prior non-compliance finding · modified order", language: "English", accept: ["petition", "enhanced"], fixture: false },
  { id: "tunde", name: "Tunde Balogun", score: 88, missed: 1, history: "First order", language: "Yoruba", visitContext: "Work-shift conflict", interpreter: "2 · Unfulfilled", accept: ["enhanced", "routine"], fixture: false },
  { id: "c04", name: "Case 04", score: 84, missed: 2, history: "First order", language: "Hausa", accept: ["enhanced", "routine"], fixture: true },
  { id: "c05", name: "Case 05", score: 81, missed: 2, history: "Prior order, completed", language: "English", accept: ["enhanced"], fixture: true },
  { id: "c06", name: "Case 06", score: 77, missed: 1, history: "First order", language: "Igbo", accept: ["enhanced", "routine"], fixture: true },
  { id: "c07", name: "Case 07", score: 72, missed: 0, history: "First order", language: "English", accept: ["routine"], fixture: true },
  { id: "c08", name: "Case 08", score: 69, missed: 1, history: "First order", language: "French", accept: ["routine", "enhanced"], fixture: true },
  { id: "c09", name: "Case 09", score: 64, missed: 0, history: "Prior order, completed", language: "English", accept: ["routine"], fixture: true },
  { id: "c10", name: "Case 10", score: 61, missed: 1, history: "First order", language: "Yoruba", accept: ["routine", "enhanced"], fixture: true },
];

export const BARRIERS = [
  "an unfulfilled interpreter request",
  "a missed visit that fell on a work shift",
  "a first order with no prior non-compliance",
];

// ---------- Scene 2 (SB pp.25–26) ----------
export type EvBin = "strong" | "weak" | "none";
export const EV_BINS: { id: EvBin; label: string }[] = [
  { id: "strong", label: "Strong evidence" },
  { id: "weak", label: "Weak or ambiguous" },
  { id: "none", label: "Not evidence" },
];
export const SCORE_ITEMS: { id: string; label: string; detail: string; key: EvBin; fixtureKey: boolean }[] = [
  { id: "score", label: "88% model score", detail: "Overall compliance-risk score from ComplianceWatch.", key: "weak", fixtureKey: true },
  { id: "dot", label: "One missed visit · work shift", detail: "Missed-DOT feature flagged “high concern”: one missed visit, reason on file: work shift.", key: "weak", fixtureKey: false },
  { id: "interp", label: "Two unresolved interpreter requests", detail: "Interpreter-request feature: two open requests, unresolved for 11 days.", key: "none", fixtureKey: true },
  { id: "pattern", label: "Historical pattern matches", detail: "Two features flagged as “pattern matches” for historical non-compliance cohorts.", key: "none", fixtureKey: false },
  { id: "intake", label: "Intake conducted in English", detail: "The score was generated before the interpreter request was fulfilled, so the intake interview behind it was conducted in English.", key: "none", fixtureKey: true },
  { id: "disclaimer", label: "Model language disclaimer", detail: "Model card: accuracy is degraded for patients whose intake interview was not conducted in their primary language.", key: "none", fixtureKey: false },
];

// ---------- Scene 3 (SB pp.26–27) ----------
export const RECORDS = [
  { id: "order", when: "Day 1", label: "Order issued", detail: "Standard isolation order; standard DOT schedule set without confirming shift pattern." },
  { id: "request", when: "Day 6", label: "DOT-time change requested", detail: "Clinic note: patient asked about switching DOT time; request not actioned." },
  { id: "missed", when: "Day 11", label: "Missed visit / work shift", detail: "Missed visit on the same day as a confirmed work shift on his employer's schedule." },
  { id: "sw", when: "Two days before flag", label: "Social-worker note", detail: "Social-worker narrative note." },
];
export const SW_NOTE_FULL = "Patient anxious about losing job if he keeps missing shifts, asked twice for evening DOT slot.";
export const SW_NOTE_SHORT = "Anxious about losing job. Asked twice for evening DOT.";
// The connection that shows a structural scheduling barrier (SB p.26).
export const KEY_LINK: [string, string] = ["request", "missed"];

// ---------- Scene 4 (SB pp.27–28) ----------
export type Opening = "order" | "week" | "reassure";
export const OPENINGS: { id: Opening; label: string; script: string }[] = [
  { id: "order", label: "Lead with the order", script: "The system flagged you as high-risk for missing your isolation requirements. Can you explain the missed visit?" },
  { id: "week", label: "Ask about his week", script: "Walk me through your week — your shifts, your appointments, what's been hard to manage." },
  { id: "reassure", label: "Offer reassurance", script: "This is probably just a mix-up, but is something making this difficult for you?" },
];
export const INTERVIEW: Record<Opening, { lines: { who: string; text: string }[]; detailed: string; fixture: boolean }> = {
  week: {
    fixture: false,
    lines: [
      { who: "Interpreter", text: "He says he works shifts at the warehouse and he can't leave during a shift." },
      { who: "Interpreter", text: "He asked twice for an evening DOT slot. Nobody told him whether it was approved." },
      { who: "Interpreter", text: "The day he missed was a shift day. He says he has not missed his medicine at home." },
    ],
    detailed: "Patient reports two unresolved evening-slot requests; missed visit coincided with confirmed shift; primary language Yoruba, interpreter present throughout.",
  },
  order: {
    fixture: true,
    lines: [
      { who: "Interpreter", text: "He says he knows he missed one visit. He says he is not refusing treatment." },
      { who: "Interpreter", text: "He asks whether he is going to be taken away." },
    ],
    detailed: "Patient acknowledges one missed visit and states he is not refusing treatment; reason not explored; primary language Yoruba, interpreter present throughout.",
  },
  reassure: {
    fixture: true,
    lines: [
      { who: "Interpreter", text: "He says yes, it was a mix-up. It has been difficult." },
      { who: "Interpreter", text: "He agrees it won't happen again." },
    ],
    detailed: "Patient agreed the missed visit was a mix-up after the reviewer suggested it; no further detail given; primary language Yoruba, interpreter present throughout.",
  },
};
export const COMPRESSED_NOTE = "Patient explained absence, no issue.";

// ---------- Scene 5 (SB p.28) ----------
export const VALUES = [
  { id: "safety", label: "Public health safety" },
  { id: "lrm", label: "Least restrictive means" },
  { id: "consistency", label: "Consistency" },
  { id: "speed", label: "Administrative speed" },
] as const;
export type ValueId = (typeof VALUES)[number]["id"];
export const NINE_CASES = "Nine other patients with similar structural-barrier profiles are currently flagged. Your weighting here will be visible to whoever reviews all nine together.";

// ---------- Scene 6 (SB pp.28–29) ----------
export type Remedy = "petition" | "enhanced" | "close";
export const EVIDENCE_CATS = [
  { id: "structural", label: "Structural barrier: scheduling and interpreter access", fixture: true },
  { id: "deliberate", label: "Deliberate non-compliance: repeated refusal", fixture: true },
  { id: "insufficient", label: "Insufficient evidence either way", fixture: true },
] as const;
export type EvidenceCat = (typeof EVIDENCE_CATS)[number]["id"];
export const REMEDIES: { id: Remedy; label: string; full: string }[] = [
  { id: "petition", label: "Petition for detention", full: "Petition the court for involuntary detention" },
  { id: "enhanced", label: "Enhanced DOT", full: "Enhanced DOT with an evening slot and confirmed interpreter access" },
  { id: "close", label: "Close the flag", full: "Close the flag with documented rationale" },
];
// fixture: which evidence category supports which remedies (the storyboard leaves the key implicit)
export const MATCH: Record<EvidenceCat, Remedy[]> = { structural: ["enhanced", "close"], deliberate: ["petition"], insufficient: ["enhanced"] };
export const EPILOGUE: Record<Remedy, string[]> = {
  petition: ["Week 1 · Petition filed with the court.", "Week 3 · Hearing adjourned: no interpreter booked.", "Week 6 · Mr Balogun loses his warehouse contract while the petition is pending."],
  enhanced: ["Week 1 · Evening DOT slot arranged; a Yoruba interpreter confirmed.", "Week 3 · No missed visits.", "Week 6 · Treatment on track. The flag stays open for routine review."],
  close: ["Week 1 · Flag closed; your rationale is on file.", "Week 3 · The evening slot is still pending at the clinic.", "Week 6 · The clinic opens evening DOT. Treatment continues."],
};
export const FILING_NOTICE = "Three months from now, your case file for Mr Tunde Balogun will be pulled into a county-wide legal review. What you documented — not just what you decided — is what that review will see.";

// ---------- Scene 7 (SB pp.31–32) ----------
export type CohortBin = "answers" | "sounds" | "misleading";
export const COHORT_BINS: { id: CohortBin; label: string }[] = [
  { id: "answers", label: "Answers the complaint" },
  { id: "sounds", label: "Relevant-sounding" },
  { id: "misleading", label: "Actively misleading" },
];
export const COHORT_ITEMS: { id: string; label: string; key: CohortBin; why: string }[] = [
  { id: "petrate", label: "Petition rates · about 30% in both groups", key: "sounds", why: "Equal petition rates say nothing about whether the underlying scores were biased before legal review corrected them." },
  { id: "gap", label: "Average scores · 25-point gap", key: "answers", why: "A large score gap with no petition-rate gap is close to a textbook biased model caught by human and legal review." },
  { id: "vendor", label: "Vendor claim · 94% predictive accuracy", key: "misleading", why: "No disclosed test population or method: it is not evidence about this cohort." },
  { id: "names", label: "Patient names and scores", key: "misleading", why: "A privacy and due-process problem, not an analytical one, for a population-level question." },
  { id: "delay", label: "Interpreter-delay correlation", key: "answers", why: "If interpreter delay, not language group itself, predicts the outcome, the model may be encoding an access failure the county can fix." },
  { id: "spread", label: "Within-group score spread", key: "sounds", why: "Spread within a group doesn't tell you whether the groups differ from each other." },
];

// ---------- Scene 8 (SB p.33) — fictional county; all geometry and records are fixtures ----------
export interface District { id: string; name: string; d: string; cx: number; cy: number; access: boolean }
export const DISTRICTS: District[] = [
  { id: "northgate", name: "Northgate", d: "M60,40 L330,30 L360,190 L180,230 L50,200 Z", cx: 200, cy: 125, access: true },
  { id: "riverside", name: "Riverside", d: "M330,30 L620,40 L600,210 L360,190 Z", cx: 480, cy: 115, access: true },
  { id: "kilnhill", name: "Kiln Hill", d: "M620,40 L940,50 L950,240 L600,210 Z", cx: 780, cy: 135, access: false },
  { id: "westbrook", name: "Westbrook", d: "M50,200 L180,230 L210,420 L40,440 Z", cx: 120, cy: 320, access: true },
  { id: "market", name: "Market Ward", d: "M180,230 L360,190 L420,400 L210,420 Z", cx: 295, cy: 310, access: true },
  { id: "oldtown", name: "Old Town", d: "M360,190 L600,210 L620,390 L420,400 Z", cx: 505, cy: 300, access: true },
  { id: "eastfield", name: "Eastfield", d: "M600,210 L950,240 L960,420 L620,390 Z", cx: 785, cy: 315, access: false },
  { id: "southmoor", name: "Southmoor", d: "M40,440 L210,420 L420,400 L620,390 L960,420 L950,560 L60,570 Z", cx: 500, cy: 490, access: false },
];
export const CLINICS = [
  { x: 230, y: 110, evening: true }, { x: 470, y: 150, evening: true }, { x: 300, y: 330, evening: true },
  { x: 520, y: 280, evening: true }, { x: 840, y: 120, evening: false }, { x: 700, y: 470, evening: false },
];
export const TRANSIT = "M20,260 C180,250 300,220 420,250 S600,300 640,240 L660,90";
// 40 flagged patients. Group B = recent immigrant / non-English primary language.
// Built so that: petitions 6/20 in each group (30%), mean score gap ~25 points, petitions cluster in transit deserts.
export interface Patient { id: number; district: string; group: "A" | "B"; score: number; petition: boolean; x: number; y: number; balogun?: boolean }
const P = (id: number, district: string, group: "A" | "B", score: number, petition: boolean, x: number, y: number, balogun = false): Patient => ({ id, district, group, score, petition, x, y, balogun });
export const PATIENTS: Patient[] = [
  // transit deserts: Kiln Hill, Eastfield, Southmoor — 16 patients, 10 petitions (5 A, 5 B)
  P(1, "kilnhill", "B", 88, false, 700, 150, true), P(2, "kilnhill", "B", 84, true, 760, 100), P(3, "kilnhill", "A", 62, true, 820, 170), P(4, "kilnhill", "B", 80, false, 880, 90), P(5, "kilnhill", "A", 55, true, 900, 200),
  P(6, "eastfield", "B", 86, true, 680, 300), P(7, "eastfield", "A", 60, true, 750, 340), P(8, "eastfield", "B", 79, true, 830, 290), P(9, "eastfield", "A", 52, false, 900, 360), P(10, "eastfield", "B", 82, false, 720, 370),
  P(11, "southmoor", "A", 58, true, 150, 500), P(12, "southmoor", "B", 85, true, 330, 470), P(13, "southmoor", "A", 57, true, 520, 520), P(14, "southmoor", "B", 77, true, 640, 450), P(15, "southmoor", "B", 81, false, 800, 500), P(16, "southmoor", "A", 50, false, 890, 520),
  // with evening transit/clinic access — 24 patients, 2 petitions (1 A, 1 B)
  P(17, "northgate", "A", 49, false, 120, 90), P(18, "northgate", "A", 54, false, 260, 70), P(19, "northgate", "B", 76, false, 300, 170), P(20, "northgate", "A", 51, true, 150, 170),
  P(21, "riverside", "B", 78, false, 400, 80), P(22, "riverside", "A", 47, false, 520, 70), P(23, "riverside", "B", 80, false, 560, 160), P(24, "riverside", "A", 53, false, 450, 170),
  P(25, "westbrook", "A", 50, false, 90, 260), P(26, "westbrook", "B", 74, false, 140, 380), P(27, "westbrook", "A", 46, false, 100, 330),
  P(28, "market", "B", 77, true, 260, 280), P(29, "market", "A", 52, false, 330, 350), P(30, "market", "B", 75, false, 380, 300), P(31, "market", "A", 48, false, 250, 380),
  P(32, "oldtown", "B", 79, false, 450, 240), P(33, "oldtown", "A", 55, false, 560, 250), P(34, "oldtown", "B", 73, false, 480, 350), P(35, "oldtown", "A", 49, false, 590, 340),
  P(36, "oldtown", "B", 76, false, 530, 370), P(37, "market", "A", 51, false, 300, 240), P(38, "riverside", "A", 50, false, 600, 110), P(39, "northgate", "A", 47, false, 210, 200), P(40, "westbrook", "B", 75, false, 170, 300),
];
export const READINGS = [
  { id: "language", label: "Petitions follow language group directly." },
  { id: "access", label: "Petitions follow evening transit and clinic access. The score gap tracks language, and legal review is correcting it." },
  { id: "none", label: "There's no pattern: petition rates are equal across groups." },
];
export const CONTINUITY_Q = "If legal review is correcting the model now, what happens the day interpreter staffing is cut?";

// ---------- Scene 9 (SB pp.33–34) ----------
export type CallOpen = "honest" | "stonewall" | "reassure";
export const CALL_OPENINGS: { id: CallOpen; label: string; reply: string; fixture: boolean }[] = [
  { id: "honest", label: "I can tell you what I'm reviewing and what I can't share yet. I'm looking at all eleven files and the county data behind them.", reply: "One of the eleven is a patient named Tunde — his co-worker mentioned the analyst who came out to see him took the time to actually get an interpreter, whatever else comes of this. Was that you?", fixture: true },
  { id: "stonewall", label: "I'm not able to comment while the review is ongoing.", reply: "Then the coalition will read the board papers like everyone else. That's a shame — we wanted to help.", fixture: true },
  { id: "reassure", label: "I'm sure this will be resolved. The system is working as it should.", reply: "With respect, eleven people were pushed toward detention. “Working as it should” is exactly what worries us.", fixture: true },
];
export type FollowUp = "redirect" | "lean" | "deflect";
export const FOLLOWUPS: { id: FollowUp; label: string }[] = [
  { id: "redirect", label: "That was one case. Here’s what the eleven together show." },
  { id: "lean", label: "His case is a good example of the pattern." },
  { id: "deflect", label: "I can’t discuss individual patients." },
];

// ---------- Scene 10 (SB p.34) ----------
export const STREAMS = [
  { id: "analysis", label: "Deeper cohort analysis" },
  { id: "spot", label: "Individual file spot-checks" },
  { id: "report", label: "Board report" },
  { id: "interp", label: "Interpreter services" },
] as const;
export type StreamId = (typeof STREAMS)[number]["id"];
export const HOUR_STEP = 4; // fixture granularity

// ---------- Scene 11 (SB pp.34–35) ----------
export const THRESHOLDS = [
  { id: "keep", label: "Keep current petition criteria" },
  { id: "raise", label: "Raise the evidentiary bar where interpreter access was unresolved at flag time" },
] as const;
export const SAFEGUARDS = [
  { id: "precheck", label: "Mandatory interpreter-access and evening-DOT check before any petition is filed", fixture: false },
  { id: "postreview", label: "Interpreter review after a petition is filed", fixture: true },
] as const;
export const COMMS = [
  { id: "internal", label: "Internal-only memo" },
  { id: "transparency", label: "Public transparency report to the coalition and the board" },
] as const;
export type ThresholdId = (typeof THRESHOLDS)[number]["id"];
export type SafeguardId = (typeof SAFEGUARDS)[number]["id"];
export type CommsId = (typeof COMMS)[number]["id"];
// fixture compatibility table (storyboard gives the principle, not the table)
export function jointA(t: ThresholdId, s: SafeguardId): { ok: boolean; why: string } {
  if (t === "raise" && s === "precheck") return { ok: true, why: "The check before filing is what makes the raised bar enforceable." };
  if (t === "keep" && s === "postreview") return { ok: true, why: "A review after filing fits criteria that stay as they are." };
  if (t === "raise") return { ok: false, why: "A raised bar for unresolved interpreter access needs the check before filing, not after." };
  return { ok: false, why: "A mandatory pre-petition check changes the criteria you said you would keep." };
}
export function jointB(s: SafeguardId, c: CommsId): { ok: boolean; why: string } {
  if (s === "postreview" && c === "transparency") return { ok: false, why: "A public report would promise a protection the policy only applies after a petition is filed." };
  return { ok: true, why: c === "transparency" ? "The report describes a safeguard the policy actually delivers." : "An internal memo makes no public promise." };
}

// ---------- Board minutes card (SB p.35) ----------
export function minutesCard(docs: number): string {
  const ref = docs >= 4 ? "a well-documented example" : docs >= 2 ? "Exhibit 7" : "a case the board asks follow-up questions about";
  return `Mr Balogun's case is referenced in the minutes as ${ref}`;
}

// ---------- Per-scene feedback (SB, "Feedback" blocks and the coaching table p.37) ----------
export const FEEDBACK: Record<string, { feedback: string; preferred: string }> = {
  s1: { feedback: "A risk score is one input to a legal threshold, not the threshold itself. Documentation habits formed under this kind of pressure are invisible in the moment and decisive at a hearing — or a board review — later.", preferred: "Context-weighted sort, with a documented rationale." },
  s2: { feedback: "The annotation habit costs almost nothing here and is worth a great deal later: what you write down about the headline number is what survives.", preferred: "Separate reliable from unreliable features, and annotate them." },
  s3: { feedback: "A summary is a memory of evidence. An attachment is evidence.", preferred: "Connect the DOT-time request to the missed visit, and attach the note." },
  s4: { feedback: "A label written under time pressure often outlives the interview that produced it by months. Whoever reads it later has no way to recover the nuance you had in the room.", preferred: "Process-first opening, with a nuanced write-up." },
  s5: { feedback: "There is no clean answer. Reasoning transparency is what matters: what you weigh here is what nine similar cases will be compared against.", preferred: "Balanced, documented reasoning." },
  s6: { feedback: "Match the remedy to the evidence category. Mismatched urgency creates both a legal and a cohort problem.", preferred: "A remedy matched to the evidence category." },
  s7: { feedback: "One visible name is not a shortcut past the aggregate question.", preferred: "Sort by what answers the complaint, and resist the name." },
  s8: { feedback: "Most sketches cluster petitions on language group alone. The real map clusters them on evening transit and clinic access, which correlates with language but is not the same thing.", preferred: "“Legal review is catching a structural bias the model introduces.”" },
  s9: { feedback: "Keep the register matched to the question actually being asked: confidentiality where required, honest acknowledgement where possible.", preferred: "Honest-partial, register-matched." },
  s10: { feedback: "The value of a spot-check is capped by what the Act I file actually contains.", preferred: "A balanced spread across all four work-streams." },
  s11: { feedback: "This is where your two judgements, made under different pressures and time horizons, have to agree with each other.", preferred: "A raised evidentiary bar with transparency, checked for consistency against Act I." },
  s12: { feedback: "Legal and ethical decisions have a half-life measured in scale, not just time.", preferred: "Review the consequences and where your own case appears." },
};

export const FIXTURE_NOTES = [
  "Eight of the ten triage cases (all but Case 02 and Tunde Balogun) and the full triage answer key.",
  "Scene 2 bins for the 88% score, interpreter requests and English-intake items.",
  "Scene 4 replies for the 'order' and 'reassurance' openings.",
  "Scene 5 consequence previews.",
  "Scene 6 evidence categories, the evidence-to-remedy key and the six-week epilogues.",
  "Scene 8 county geometry, clinics, transit and all 40 patient records.",
  "Scene 9 opening lines and the advocate's replies to stonewall and reassurance.",
  "Scene 10 hour step and 'balanced' definition.",
  "Scene 11 second safeguard option and the compatibility table.",
  "Scene 12 outcome-card wording for non-constructive policies and their timing.",
  "Score weights, bands and the two endings not named by the storyboard.",
];
