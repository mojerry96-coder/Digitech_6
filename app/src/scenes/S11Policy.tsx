import { useState } from "react";
import { ChevronRight12Regular, ArrowRotateClockwise20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { THRESHOLDS, SAFEGUARDS, COMMS, jointA, jointB, REMEDIES } from "../content/scenario";
import { policyResult } from "../state/run";
import { Strip, Dialog, InfoBar } from "../ui/kit";

export function S11() {
  const { run, edit, commit } = useRun();
  const s = run.s11;
  const [spin, setSpin] = useState([0, 0]);
  const [confirming, setConfirming] = useState(false);
  const res = policyResult(run);
  const reset = (d: typeof run) => { d.s11.aligned = [false, false]; d.s11.tested = false; };
  const a = s.threshold && s.safeguard ? jointA(s.threshold, s.safeguard) : null;
  const b = s.safeguard && s.comms ? jointB(s.safeguard, s.comms) : null;
  const turn = (i: 0 | 1) => {
    setSpin((x) => x.map((v, j) => (j === i ? v + 90 : v)));
    const ok = i === 0 ? a?.ok : b?.ok;
    edit((d) => { d.s11.aligned[i] = !!ok; d.s11.tested = false; });
  };
  const tried = (i: 0 | 1) => spin[i] > 0;
  const joint = (i: 0 | 1, j: typeof a) => (
    <div className={`joint ${s.aligned[i] ? "locked" : tried(i) && j && !j.ok ? "fail" : ""}`} aria-live="polite">
      <i />{!j ? "Choose both pieces to align this joint." : s.aligned[i] ? `Locked · ${j.why}` : tried(i) && !j.ok ? `Won't lock · ${j.why}` : "Turn the handle to align."}
    </div>
  );
  const pick = <K extends "threshold" | "safeguard" | "comms">(k: K, v: string) => edit((d) => { (d.s11 as Record<string, unknown>)[k] = v || undefined; reset(d); });

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(380px, 62fr) minmax(260px, 38fr)" }}>
        <section className="pane" aria-label="Policy assembly">
          <div className="crumb">County review<ChevronRight12Regular />Policy rule</div>
          <h1 className="title">Build the decision rule</h1>
          <p className="lede" style={{ marginBottom: 20 }}>Select and align the components.</p>
          <div className="modules">
            <div className="module"><div className="h3">Legal threshold</div><span />
              <select className="select" value={s.threshold ?? ""} onChange={(e) => pick("threshold", e.target.value)} aria-label="Legal threshold"><option value="">Choose threshold</option>{THRESHOLDS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
            <div style={{ display: "flex", alignItems: "center" }}>{joint(0, a)}<button className="rot" style={{ marginLeft: "auto", transform: `rotate(${spin[0]}deg)` }} aria-label="Turn to align threshold and safeguard" disabled={!a} onClick={() => turn(0)}><ArrowRotateClockwise20Regular /></button></div>
            <div className="module"><div className="h3">Safeguard</div><span />
              <select className="select" value={s.safeguard ?? ""} onChange={(e) => pick("safeguard", e.target.value)} aria-label="Safeguard"><option value="">Choose safeguard</option>{SAFEGUARDS.map((t) => <option key={t.id} value={t.id}>{t.label}{t.fixture ? " (fixture option)" : ""}</option>)}</select></div>
            <div style={{ display: "flex", alignItems: "center" }}>{joint(1, b)}<button className="rot" style={{ marginLeft: "auto", transform: `rotate(${spin[1]}deg)` }} aria-label="Turn to align safeguard and communication" disabled={!b} onClick={() => turn(1)}><ArrowRotateClockwise20Regular /></button></div>
            <div className="module"><div className="h3">Communication</div><span />
              <select className="select" value={s.comms ?? ""} onChange={(e) => pick("comms", e.target.value)} aria-label="Communication"><option value="">Choose communication</option>{COMMS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
          </div>
          <p className="sub" style={{ marginTop: 10 }}>Compatibility rules are development fixtures <span className="fixture">FIXTURE</span></p>
        </section>
        <section className="pane tint" aria-label="Policy preview">
          <h2 className="h2" style={{ marginTop: 26 }}>Policy preview</h2>
          {!s.tested ? <p className="sub" style={{ marginTop: 10 }}>Your rule will appear here.</p> : (
            <div className="preview-list">
              <InfoBar tone="ok"><b>Policy locked.</b> {THRESHOLDS.find((t) => t.id === s.threshold)!.label}. {SAFEGUARDS.find((t) => t.id === s.safeguard)!.label}. {COMMS.find((t) => t.id === s.comms)!.label}.</InfoBar>
              <h3 className="h3">Exhibit 7 consistency</h3>
              <p className="sub" style={{ margin: 0 }}>Your Act I remedy: {REMEDIES.find((r) => r.id === res.act1)?.full ?? "none recorded"}</p>
              <InfoBar tone={res.exhibitConsistent ? "ok" : "warn"}>{res.exhibitMsg}</InfoBar>
            </div>
          )}
        </section>
      </div>
      <Strip>
        {!s.tested
          ? <button className="btn accent" disabled={!(s.aligned[0] && s.aligned[1])} onClick={() => edit((d) => { d.s11.tested = true; })}>Test the policy</button>
          : <><button className="btn" onClick={() => edit((d) => { d.s11.tested = false; })}>Revise</button><button className="btn accent" onClick={() => setConfirming(true)}>Submit to the board</button></>}
      </Strip>
      {confirming && <Dialog title="Submit the policy?" confirm="Submit" onCancel={() => setConfirming(false)} onConfirm={() => commit("s11")}><p>This rule goes to the Health Equity & Legal Oversight Board as your recommendation. You can't change it afterwards.</p></Dialog>}
    </div>
  );
}
