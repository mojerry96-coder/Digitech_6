import { useState } from "react";
import { ChevronRight12Regular, Dismiss20Regular, Document16Regular, LockClosed16Filled } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { COHORT_ITEMS, COHORT_BINS, type CohortBin } from "../content/scenario";
import { recordFromSnapshot } from "../app/record";
import { Strip, SortBoard, Dialog, Tip } from "../ui/kit";

const NAMES = ["A. Okafor · 81%", "Tunde Balogun · 88%", "M. Diallo · 79%", "S. Haruna · 84%", "F. Mensah · 77%", "…and 35 more"];

export function S7() {
  const { run, edit, commit } = useRun();
  const [confirming, setConfirming] = useState(false);
  const [list, setList] = useState(false);
  const [exhibit, setExhibit] = useState(false);
  const s = run.s7;
  const sorted = COHORT_ITEMS.filter((i) => s.bins[i.id]).length;

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(320px, 58fr) minmax(280px, 42fr)" }}>
        <SortBoard<CohortBin>
          items={COHORT_ITEMS} bins={COHORT_BINS} value={s.bins} poolLabel="Summary figures"
          onChange={(id, bin) => edit((d) => { if (bin) d.s7.bins[id] = bin; else delete d.s7.bins[id]; })}
          poolHeader={<><div className="crumb">County review<ChevronRight12Regular />Cohort evidence</div><h1 className="title">Which figures answer the complaint?</h1><p className="lede" style={{ marginBottom: 18 }}>Eleven patients. One complaint. Seventy-two hours.</p></>}
          binsHeader={<><h2 className="h2" style={{ marginTop: 26 }}>Relevance to the complaint</h2><p className="lede" style={{ marginBottom: 14 }}>Sort the figures.</p><Tip hide={sorted > 0} id="s7" title="Sort the figures" style={{ right: 24, bottom: 16 }}>Drag each figure to a category, or select it and choose.</Tip></>}
          renderExtra={(item) => item.id === "names" ? <button className="expand" onClick={() => setList(!list)} aria-expanded={list}>{list ? "Hide the list" : "View the list"}</button> : item.id === "vendor" ? <span className="sub" style={{ fontSize: 12 }}>Vendor marketing claim · not a validated result</span> : null}
        />
      </div>
      <Strip left={<><span className="count">{sorted} of 6 sorted</span><button className="link" onClick={() => setExhibit(true)}>Exhibit 7</button></>}>
        <button className="btn accent" disabled={sorted < 6} onClick={() => setConfirming(true)}>Confirm evidence</button>
      </Strip>
      {list && (
        <aside className="drawer" aria-label="Patient names and scores">
          <div className="drawer-h"><div><h2 className="h2">Patient names and scores</h2><div className="sub">Raw export · 40 flagged patients</div></div><button className="ibtn" aria-label="Close" onClick={() => setList(false)}><Dismiss20Regular /></button></div>
          <div className="drawer-b">{NAMES.map((n) => n.startsWith("Tunde")
            ? <button key={n} className="util-item" onClick={() => { edit((d) => { d.s7.nameOpened += 1; }); setExhibit(true); }}><Document16Regular />{n}</button>
            : <div key={n} className="util-item" style={{ color: n.startsWith("…") ? "var(--ink-2)" : undefined }}>{n}</div>)}</div>
        </aside>
      )}
      {exhibit && run.bridge.snapshot && (
        <div className="smoke" onClick={(e) => e.target === e.currentTarget && setExhibit(false)}>
          <div className="doc-viewer" role="dialog" aria-modal="true" aria-label="Exhibit 7" style={{ width: "min(640px, calc(100% - 32px))", maxHeight: "86%", overflow: "auto" }}>
            <div className="doc-h"><Document16Regular /><b>Exhibit 7 · Tunde Balogun</b><span className="tag lock"><LockClosed16Filled />Read-only</span><button className="ibtn" aria-label="Close" autoFocus onClick={() => setExhibit(false)}><Dismiss20Regular /></button></div>
            <div className="doc-b">{recordFromSnapshot(run.bridge.snapshot).map((d) => <div key={d.id} className="rec-row" style={{ animation: "none" }}><h4><Document16Regular />{d.title}<span className={`tag ${d.tone === "ok" ? "ok" : d.tone === "warn" ? "warn" : "lock"}`}>{d.status}</span></h4><p>{d.body}</p></div>)}</div>
          </div>
        </div>
      )}
      {confirming && (
        <Dialog title="Confirm evidence?" confirm="Confirm" onCancel={() => setConfirming(false)} onConfirm={() => commit("s7")}>
          <p>Your sorting frames the county analysis. You can't change it afterwards.</p>
        </Dialog>
      )}
    </div>
  );
}
