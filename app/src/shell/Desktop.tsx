import { useEffect, useReducer, useRef, useState } from "react";
import {
  Database24Regular, Database20Filled, Folder24Filled, Folder20Regular, Delete24Regular, Search24Regular, Search20Regular,
  Grid24Regular, Wifi120Regular, Speaker220Regular, SpeakerMute20Regular, DocumentText20Regular, Document16Regular,
} from "@fluentui/react-icons";
import { initialShell, shellReducer, type WinId } from "./windows";
import { Window } from "./Window";
import { ComplianceApp } from "../app/ComplianceApp";
import { useRun } from "../state/store";
import { caseRecord } from "../app/record";

type Fly = null | "start" | "search" | "net" | "sound";

export function Desktop({ volume, setVolume }: { volume: number; setVolume: (v: number) => void }) {
  const [shell, dispatch] = useReducer(shellReducer, undefined, initialShell);
  const [fly, setFly] = useState<Fly>(null);
  const [sel, setSel] = useState<string | null>(null);
  const [hint, setHint] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const appBtn = useRef<HTMLButtonElement>(null);
  const filesBtn = useRef<HTMLButtonElement>(null);
  const everOpened = useRef(false);

  useEffect(() => { const t = window.setInterval(() => setNow(new Date()), 15000); return () => window.clearInterval(t); }, []);
  useEffect(() => { // one quiet contextual hint if the learner hasn't opened the app after 6 seconds
    const t = window.setTimeout(() => { if (!everOpened.current) setHint(true); }, 6000);
    return () => window.clearTimeout(t);
  }, []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setFly(null); };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);

  const open = (id: WinId) => { if (id === "app") { everOpened.current = true; setHint(false); } dispatch({ type: "OPEN", id }); setFly(null); };
  const taskbarClick = (id: WinId) => {
    const w = shell.wins[id];
    if (w.visibility === "visible" && shell.focused === id) dispatch({ type: "MINIMISE", id });
    else open(id);
  };
  const ind = (id: WinId) => { const v = shell.wins[id].visibility; return v === "closed" ? "" : shell.focused === id && v !== "minimised" ? "active" : "open"; };
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-GB");

  const pins = [
    { id: "app" as WinId, label: "Compliance Sandbox", tile: <span className="app-tile tile" style={{ width: 36, height: 36, borderRadius: 8 }}><Database24Regular /></span> },
    { id: "casefiles" as WinId, label: "Case files", tile: <span className="tile" style={{ color: "#E9A93A" }}><Folder24Filled style={{ width: 34, height: 34 }} /></span> },
  ];
  const [q, setQ] = useState("");
  const results = pins.filter((p) => p.label.toLowerCase().includes(q.trim().toLowerCase()));

  return (
    <div className="desktop" onPointerDown={(e) => { if (e.target === e.currentTarget) { setSel(null); setFly(null); dispatch({ type: "FOCUS", id: null }); } }}>
      <div className="desk-icons" role="group" aria-label="Desktop">
        <button className="desk-icon" aria-pressed={sel === "recycle"} onClick={() => { setSel("recycle"); open("recycle"); }}>
          <span className="tile"><Delete24Regular style={{ width: 34, height: 34, color: "#4D6178" }} /></span><span>Recycle Bin</span>
        </button>
        <button className="desk-icon" aria-pressed={sel === "app"} aria-label="Open Compliance Sandbox" data-autofocus onClick={() => { setSel("app"); open("app"); }}>
          <span className="tile app-tile"><Database24Regular style={{ width: 26, height: 26 }} /></span><span>Compliance Sandbox</span>
        </button>
        <button className="desk-icon" aria-pressed={sel === "files"} onClick={() => { setSel("files"); open("casefiles"); }}>
          <span className="tile"><Folder24Filled style={{ width: 38, height: 38, color: "#E9A93A" }} /></span><span>Case files</span>
        </button>
      </div>
      {hint && shell.wins.app.visibility === "closed" && <div className="desk-hint" role="status">Open Compliance Sandbox</div>}

      <Window id="app" label="Compliance Sandbox" title="Compliance Sandbox" icon={<Database20Filled />} state={shell.wins.app} focused={shell.focused === "app"} dispatch={dispatch} minW={720} minH={480} taskbarButton={() => appBtn.current}>
        {shell.wins.app.visibility !== "closed" && <ComplianceApp />}
      </Window>
      <Window id="casefiles" label="Case files" title="Case files" plainIcon icon={<Folder20Regular />} state={shell.wins.casefiles} focused={shell.focused === "casefiles"} dispatch={dispatch} taskbarButton={() => filesBtn.current}>
        {shell.wins.casefiles.visibility !== "closed" && <CaseFiles />}
      </Window>
      <Window id="recycle" label="Recycle Bin" title="Recycle Bin" plainIcon icon={<Delete24Regular style={{ width: 16, height: 16 }} />} state={shell.wins.recycle} focused={shell.focused === "recycle"} dispatch={dispatch}>
        {shell.wins.recycle.visibility !== "closed" && <div className="util"><div className="util-bar">Recycle Bin · 0 items</div><div className="util-empty"><Delete24Regular style={{ width: 40, height: 40, color: "var(--ink-3)" }} />This folder is empty.</div></div>}
      </Window>

      {fly === "start" && (
        <div className="flyout-os start" role="dialog" aria-label="Start">
          <label className="start-search"><Search20Regular /><input autoFocus placeholder="Search for apps and files" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          <h2>Pinned</h2>
          <div className="pins">{results.map((p) => <button key={p.id} className="pin" onClick={() => open(p.id)}>{p.tile}{p.label}</button>)}</div>
        </div>
      )}
      {fly === "search" && (
        <div className="flyout-os start" role="dialog" aria-label="Search">
          <label className="start-search"><Search20Regular /><input autoFocus placeholder="Search this computer" value={q} onChange={(e) => setQ(e.target.value)} /></label>
          <h2>{q.trim() ? "Best matches" : "Apps and files on this computer"}</h2>
          <div className="pins">{results.length ? results.map((p) => <button key={p.id} className="pin" onClick={() => open(p.id)}>{p.tile}{p.label}</button>) : <p className="muted-note">No results on this computer.</p>}</div>
        </div>
      )}
      {fly === "net" && (
        <div className="flyout-os tray-fly" role="dialog" aria-label="Network"><h2>Network</h2><div className="row"><Wifi120Regular /> Connected · county intranet</div><p className="muted-note">This workstation is part of the simulation. Nothing here connects to the internet.</p></div>
      )}
      {fly === "sound" && (
        <div className="flyout-os tray-fly" role="dialog" aria-label="Sound">
          <h2>Sound</h2>
          <div className="row">
            <button className="ibtn" aria-label={volume ? "Mute" : "Unmute"} onClick={() => setVolume(volume ? 0 : 80)}>{volume ? <Speaker220Regular /> : <SpeakerMute20Regular />}</button>
            <input type="range" min={0} max={100} value={volume} aria-label="Volume" onChange={(e) => setVolume(Number(e.target.value))} />
            <span style={{ width: 32, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{volume}</span>
          </div>
          <p className="muted-note">Sets the walkthrough narration volume.</p>
        </div>
      )}

      <div className="taskbar" role="toolbar" aria-label="Taskbar">
        <div className="tb-mid">
          <button className="tb-btn" aria-label="Start" aria-expanded={fly === "start"} onClick={() => { setQ(""); setFly(fly === "start" ? null : "start"); }} style={{ color: "var(--accent)" }}><Grid24Regular /></button>
          <button className="tb-btn" aria-label="Search" aria-expanded={fly === "search"} onClick={() => { setQ(""); setFly(fly === "search" ? null : "search"); }}><Search24Regular /></button>
          <button ref={filesBtn} className="tb-btn" aria-label="Case files" onClick={() => taskbarClick("casefiles")} style={{ color: "#E9A93A" }}><Folder24Filled /><i className={`tb-ind ${ind("casefiles")}`} /></button>
          <button ref={appBtn} className="tb-btn" aria-label={`Compliance Sandbox${shell.wins.app.visibility === "minimised" ? " (minimised)" : ""}`} onClick={() => taskbarClick("app")}><span className="tb-app"><Database24Regular /></span><i className={`tb-ind ${ind("app")}`} /></button>
        </div>
        <div className="tray">
          <button className="tray-btn" aria-label="Network" aria-expanded={fly === "net"} onClick={() => setFly(fly === "net" ? null : "net")}><Wifi120Regular /></button>
          <button className="tray-btn" aria-label={`Sound, volume ${volume}`} aria-expanded={fly === "sound"} onClick={() => setFly(fly === "sound" ? null : "sound")}>{volume ? <Speaker220Regular /> : <SpeakerMute20Regular />}</button>
          <span className="tray-btn clock" aria-label={`${time}, ${date}`}><span>{time}</span><span>{date}</span></span>
        </div>
      </div>
    </div>
  );
}

function CaseFiles() {
  const { run } = useRun();
  const docs = caseRecord(run);
  const [open, setOpen] = useState<string | null>(null);
  const doc = docs.find((d) => d.id === open);
  return (
    <div className="util">
      <div className="util-bar"><Folder20Regular /> Case files › {run.bridge.snapshot && run.committed.s6 ? "County Compliance Review › Exhibit 7" : "Tunde Balogun"} <span style={{ marginLeft: "auto" }}>Read-only</span></div>
      {docs.length === 0 ? (
        <div className="util-empty"><DocumentText20Regular style={{ width: 36, height: 36, color: "var(--ink-3)" }} />No case records yet.<br />Records appear here once you commit them in Compliance Sandbox.</div>
      ) : (
        <>
          <div className="util-list">{docs.map((d) => <button key={d.id} className="util-item" aria-pressed={open === d.id} onClick={() => setOpen(open === d.id ? null : d.id)}><Document16Regular />{d.title}<small>{d.status}</small></button>)}</div>
          {doc && <div className="util-doc" aria-live="polite"><b>{doc.title}</b>{"\n"}{doc.body}</div>}
        </>
      )}
    </div>
  );
}
