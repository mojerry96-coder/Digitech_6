import { useEffect } from "react";
import { Folder24Regular, Document16Regular, LockClosed16Filled } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { recordFromSnapshot } from "../app/record";
import { InfoBar } from "../ui/kit";

/** Passive reveal. No decisions, no edit controls, no primary action. County review unlocks once the file is filed. */
export function Bridge() {
  const { run, edit } = useRun();
  const snap = run.bridge.snapshot;
  useEffect(() => {
    if (run.bridge.revealed) return;
    const t = window.setTimeout(() => edit((d) => { d.bridge.revealed = true; }), 4200);
    return () => window.clearTimeout(t);
  }, [run.bridge.revealed, edit]);
  if (!snap) return null;
  const rows = recordFromSnapshot(snap);
  return (
    <div className="workspace visual dark">
      <div className="dark-stage">
        <div className="crumb" style={{ color: "rgba(255,255,255,.7)" }}>Case review › Archived case file</div>
        <h1 className="title">Three months later</h1>
        <p className="lede">Your case file is now Exhibit 7 of 11.</p>
        <div className="bridge-grid">
          <div className="doc-viewer" aria-label="Tunde Balogun case record, read-only">
            <div className="doc-h"><Document16Regular /><b>Tunde Balogun · Case record</b><span className="tag lock"><LockClosed16Filled />Read-only</span></div>
            <div className="doc-b">
              {rows.map((d, i) => (
                <div key={d.id} className="rec-row" style={{ animationDelay: `${400 + i * 380}ms` }}>
                  <h4><Document16Regular />{d.title}<span className={`tag ${d.tone === "ok" ? "ok" : d.tone === "warn" ? "warn" : "lock"}`}>{d.status}</span></h4>
                  <p className={d.quote ? "quote" : ""}>{d.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="exhibit" aria-label="County Compliance Review">
            <Folder24Regular />
            <b style={{ fontSize: 17 }}>County Compliance Review</b>
            <span className="gold-badge">Exhibit 7 of 11</span>
            <span style={{ color: "rgba(255,255,255,.75)", fontSize: 13 }}>This file has been added to Exhibit Set: County Compliance Review, Case #7 of 11.</span>
          </div>
        </div>
        <p className="bridge-foot">What you recorded is what this review will see.</p>
        {run.bridge.revealed && <div style={{ maxWidth: 560, marginTop: 14 }}><InfoBar>County review is now available in the header.</InfoBar></div>}
      </div>
    </div>
  );
}
