import { useEffect, useState } from "react";
import { Database24Regular, DocumentText20Regular, QuestionCircle20Regular, LockClosed16Regular, Dismiss20Regular, Document16Regular, Eye20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { ACT1, TOOL, type Stage } from "../state/run";
import { caseRecord, recordFromSnapshot } from "./record";
import { S1 } from "../scenes/S1Triage";
import { S2 } from "../scenes/S2Score";
import { S3 } from "../scenes/S3Timeline";
import { S4 } from "../scenes/S4Visit";
import { S5 } from "../scenes/S5Weighting";
import { S6 } from "../scenes/S6Recommendation";
import { Bridge } from "../scenes/Bridge";
import { S7 } from "../scenes/S7Cohort";
import { S8 } from "../scenes/S8Map";
import { S9 } from "../scenes/S9Call";
import { S10 } from "../scenes/S10Planning";
import { S11 } from "../scenes/S11Policy";
import { S12 } from "../scenes/S12Board";
import { Outcome } from "../scenes/Outcome";

const SCENES: Record<Stage, () => JSX.Element | null> = { s1: S1, s2: S2, s3: S3, s4: S4, s5: S5, s6: S6, bridge: Bridge, s7: S7, s8: S8, s9: S9, s10: S10, s11: S11, s12: S12, outcome: Outcome };

const HELP: Record<Stage, string> = {
  s1: "Select a case to see its details. Drag a case onto a tier, or select it and then choose a tier. You can reassign cases until you confirm. Confirm triage becomes available once all ten cases have a tier.",
  s2: "Sort each item into a category by dragging it, or select it and choose a category. For items you place in Strong or Weak, you can add a one-line reason. It travels with the case file.",
  s3: "Draw a link between two records by dragging from one port to another, or select one port and then another. Then choose how to keep the social-worker note.",
  s4: "Choose how you'll open the conversation and type (or speak) your first question. After the interview, choose how to save the record.",
  s5: "Use the sliders or the number fields to share exactly 10 points across the four values. You can add a rationale. Save weighting becomes available at 10 of 10.",
  s6: "Choose the evidence category, then drag a pathway into the THEN slot or select one. Confirming the recommendation commits it.",
  bridge: "This is a read-only view. Nothing here can be changed. County review opens once the file has been filed.",
  s7: "Sort the six figures by whether they answer the complaint. Drag them or select and choose.",
  s8: "Before the data loads, mark the districts where you expect detention petitions to cluster. Then reveal the pattern and use the layers to compare.",
  s9: "Choose what you say. Replies are sent when you press Send response.",
  s10: "Share exactly 72 hours across the four work-streams. Hours move in blocks of four. This is a budget, not a countdown.",
  s11: "Choose a legal threshold, a safeguard and a communication plan. Turn each joint to check whether the pieces fit, then test the policy.",
  s12: "Place each outcome card in the week you expect it to happen, by dragging or selecting. Then review the outcome.",
  outcome: "Your review report summarises both acts. Review my decisions shows every choice with the feedback for it.",
};

export function ComplianceApp() {
  const { run, commit } = useRun();
  const act2 = !ACT1.includes(run.stage) && run.stage !== "bridge";
  const [view, setView] = useState<"case" | "county">(act2 ? "county" : "case");
  const [drawer, setDrawer] = useState<null | "file" | "help">(null);
  const [lockNote, setLockNote] = useState(false);
  useEffect(() => { setView(act2 ? "county" : "case"); }, [act2]);
  useEffect(() => { if (!lockNote) return; const t = window.setTimeout(() => setLockNote(false), 2600); return () => window.clearTimeout(t); }, [lockNote]);

  const countyOpen = act2 || run.bridge.revealed;
  const openCounty = () => {
    if (!countyOpen) { setLockNote(true); return; }
    if (run.stage === "bridge") commit("bridge");
    setView("county");
  };
  const Scene = SCENES[run.stage];
  const showArchive = act2 && view === "case";

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-brand"><Database24Regular /><span>Compliance Review Unit</span></span>
        <nav className="tabs" role="tablist" aria-label="Review mode" style={{ position: "relative" }}>
          <button role="tab" className="tab" aria-selected={view === "case"} onClick={() => setView("case")}>Case review</button>
          <button role="tab" className="tab county" aria-selected={view === "county"} aria-disabled={!countyOpen} onClick={openCounty}>
            {!countyOpen && <LockClosed16Regular />}County review
          </button>
          {lockNote && <div className="lock-note" role="status">Available after case review.</div>}
        </nav>
        <div className="hdr-right">
          <button className="btn" aria-expanded={drawer === "file"} onClick={() => setDrawer(drawer === "file" ? null : "file")}><DocumentText20Regular />Case file</button>
          <button className="ibtn" aria-label="Help" title="Help" aria-expanded={drawer === "help"} onClick={() => setDrawer(drawer === "help" ? null : "help")}><QuestionCircle20Regular /></button>
        </div>
      </header>

      <div style={{ position: "relative", minHeight: 0 }}>
        {showArchive ? <Archive /> : <Scene key={run.stage} />}
        {drawer === "file" && <CaseFileDrawer onClose={() => setDrawer(null)} />}
        {drawer === "help" && (
          <aside className="drawer" aria-label="Help">
            <div className="drawer-h"><div><h2 className="h2">Help</h2><div className="sub">{showArchive ? "Archived case file" : TOOL[run.stage]}</div></div><button className="ibtn" aria-label="Close help" onClick={() => setDrawer(null)}><Dismiss20Regular /></button></div>
            <div className="drawer-b"><p>{showArchive ? "This is the archived Act I record. It is read-only." : HELP[run.stage]}</p><p className="sub">Help explains how the tools work. It never tells you what to decide.</p></div>
          </aside>
        )}
      </div>
    </div>
  );
}

function CaseFileDrawer({ onClose }: { onClose: () => void }) {
  const { run } = useRun();
  const docs = caseRecord(run);
  const archived = !!run.bridge.snapshot && !!run.committed.s6;
  return (
    <aside className="drawer" aria-label="Case file">
      <div className="drawer-h">
        <div><h2 className="h2">Case file</h2><div className="sub">Tunde Balogun{archived ? " · Exhibit 7 of 11 · read-only" : ""}</div></div>
        <button className="ibtn" aria-label="Close case file" onClick={onClose} data-autofocus><Dismiss20Regular /></button>
      </div>
      <div className="drawer-b">
        {docs.length === 0 && <p className="sub" style={{ marginTop: 14 }}>Nothing is on file yet. Records appear here once you commit them.</p>}
        {docs.map((d) => (
          <div key={d.id} className="rec-row">
            <h4><Document16Regular />{d.title}<span className={`tag ${d.tone === "ok" ? "ok" : d.tone === "warn" ? "warn" : "lock"}`}>{d.status}</span></h4>
            <p className={d.quote ? "quote" : ""}>{d.body}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

function Archive() {
  const { run } = useRun();
  const docs = run.bridge.snapshot ? recordFromSnapshot(run.bridge.snapshot) : [];
  return (
    <div className="workspace visual">
      <div className="pane" style={{ maxWidth: 900 }}>
        <div className="crumb">Case review › Archived case file</div>
        <h1 className="title">Tunde Balogun · Case record</h1>
        <div style={{ margin: "10px 0 14px" }}><span className="tag lock"><Eye20Regular style={{ width: 14, height: 14 }} />View only · archived as Exhibit 7 of 11</span></div>
        {docs.map((d) => (
          <div key={d.id} className="rec-row"><h4><Document16Regular />{d.title}<span className={`tag ${d.tone === "ok" ? "ok" : d.tone === "warn" ? "warn" : "lock"}`}>{d.status}</span></h4><p className={d.quote ? "quote" : ""}>{d.body}</p></div>
        ))}
      </div>
    </div>
  );
}
