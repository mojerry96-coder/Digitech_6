// Branch checks against the real scenario logic: node tests/run-tests.mjs
import { freshRun, scoreStage, takeSnapshot, policyResult, ending, boardCards, type Run, type Stage } from "../src/state/run";
import { recordFromSnapshot } from "../src/app/record";

let fails = 0;
const ok = (c: unknown, msg: string) => { console.log(`${c ? "PASS" : "FAIL"}  ${msg}`); if (!c) fails++; };
const commitAll = (r: Run, stages: Stage[]) => stages.forEach((s) => { r.scores[s] = scoreStage(s, r); r.committed[s] = true; });

// --- Careless run: score-only triage, no notes, summary, compressed interview, petition ---
const weak = freshRun();
weak.s1.tiers = { c01: "petition", c02: "petition", tunde: "petition", c04: "petition", c05: "enhanced", c06: "enhanced", c07: "routine", c08: "routine", c09: "routine", c10: "routine" };
weak.s1.docMode = "protocol";
weak.s2.bins = { score: "strong", dot: "strong", interp: "weak", pattern: "strong", intake: "none", disclaimer: "none" };
weak.s3.links = [["order", "sw"]]; weak.s3.preserve = "summary"; weak.s3.summary = "work conflict";
weak.s4.opening = "order"; weak.s4.question = "Explain the missed visit"; weak.s4.record = "compressed";
weak.s5.w = { safety: 7, lrm: 1, consistency: 1, speed: 1 };
weak.s6.evidence = "deliberate"; weak.s6.remedy = "petition";
commitAll(weak, ["s1", "s2", "s3", "s4", "s5", "s6"]);
weak.bridge.snapshot = takeSnapshot(weak);
const rows = recordFromSnapshot(weak.bridge.snapshot);
ok(weak.bridge.snapshot.docs === 0, `careless Act I documentation strength is 0 (got ${weak.bridge.snapshot.docs})`);
ok(rows.find((r) => r.id === "sw")!.status === "Summary only", "Bridge shows the social-worker note as 'Summary only'");
ok(rows.find((r) => r.id === "int")!.status === "Compressed", "Bridge shows the interview record as 'Compressed'");
ok(rows.find((r) => r.id === "ann")!.status === "None", "Bridge shows no score annotations");
ok(rows.find((r) => r.id === "w")!.status === "No rationale", "Bridge shows no weighting rationale");

// Act II done well on top of a thin Act I → "Lucky, Not Ready"
weak.s7.bins = { petrate: "sounds", gap: "answers", vendor: "misleading", names: "misleading", delay: "answers", spread: "sounds" };
weak.s8.reading = "access"; weak.s8.continuity = "named";
weak.s9.opening = "honest"; weak.s9.followup = "redirect";
weak.s10.hours = { analysis: 20, spot: 20, report: 16, interp: 16 };
weak.s11 = { threshold: "raise", safeguard: "precheck", comms: "transparency", aligned: [true, true], tested: true };
const pr = policyResult(weak);
ok(pr.locked && !pr.exhibitConsistent, "Exhibit 7 check reports an INCONSISTENCY when Act I petitioned but Act II raises the bar");
ok(/more urgently/.test(pr.exhibitMsg), "…with the storyboard's 'treated more urgently' message");
commitAll(weak, ["s7", "s8", "s9", "s10", "s11", "s12"]);
ok(weak.scores.s10!.consistency === 0, "Spot-check adds no evidentiary weight from a thin Act I file");
ok(ending(weak).id === "lucky", `thin Act I + strong Act II ending is 'Lucky, Not Ready' (got '${ending(weak).title}')`);
ok(boardCards(weak).some((c) => /follow-up questions/.test(c.label)), "Board minutes card asks follow-up questions about a thin Exhibit 7");

// --- Careful run ---
const strong = freshRun();
strong.s1.tiers = { c01: "petition", c02: "petition", tunde: "enhanced", c04: "enhanced", c05: "enhanced", c06: "routine", c07: "routine", c08: "routine", c09: "routine", c10: "routine" };
strong.s1.docMode = "barrier"; strong.s1.barrier = "an unfulfilled interpreter request";
strong.s2.bins = { score: "weak", dot: "weak", interp: "none", pattern: "none", intake: "none", disclaimer: "none" }; strong.s2.disclaimerOpened = true;
strong.s2.notes = { dot: "Missed visit fell on a confirmed work shift." };
strong.s3.links = [["request", "missed"]]; strong.s3.preserve = "attach";
strong.s4.opening = "week"; strong.s4.record = "detailed";
strong.s5.w = { safety: 3, lrm: 3, consistency: 3, speed: 1 }; strong.s5.rationale = "Structural barrier; least restrictive means.";
strong.s6.evidence = "structural"; strong.s6.remedy = "enhanced";
commitAll(strong, ["s1", "s2", "s3", "s4", "s5", "s6"]);
strong.bridge.snapshot = takeSnapshot(strong);
ok(strong.bridge.snapshot.docs === 5, `careful Act I documentation strength is 5 (got ${strong.bridge.snapshot.docs})`);
Object.assign(strong, { s7: weak.s7, s8: weak.s8, s9: weak.s9, s10: weak.s10, s11: weak.s11 });
ok(policyResult(strong).exhibitConsistent, "Exhibit 7 check reports CONSISTENT for Enhanced DOT + raised bar");
commitAll(strong, ["s7", "s8", "s9", "s10", "s11", "s12"]);
ok(ending(strong).id === "rf2", `careful run ending is 'Rigorous & Fair, Twice' (got '${ending(strong).title}')`);

// --- Snapshot immutability ---
const snap = JSON.stringify(strong.bridge.snapshot);
strong.s1.docMode = "protocol"; strong.s3.preserve = "summary";
ok(JSON.stringify(strong.bridge.snapshot) === snap, "Editing Act I state after the Bridge does not change the archived snapshot");

console.log(fails ? `\n${fails} check(s) failed` : "\nAll branch checks passed");
process.exit(fails ? 1 : 0);
