import { useState } from "react";
import { ChevronRight12Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { VALUES, NINE_CASES, type ValueId } from "../content/scenario";
import { Strip, Dialog, InfoBar } from "../ui/kit";

export function S5() {
  const { run, edit, commit } = useRun();
  const [confirming, setConfirming] = useState(false);
  const w = run.s5.w;
  const total = Object.values(w).reduce((a, b) => a + b, 0);
  const left = 10 - total;
  const set = (id: ValueId, v: number) => edit((d) => {
    const others = Object.entries(d.s5.w).filter(([k]) => k !== id).reduce((a, [, x]) => a + x, 0);
    d.s5.w[id] = Math.max(0, Math.min(v, 10 - others)); // can never exceed the 10-point budget
  });

  // Consequence previews for extreme allocations (fixture copy; the storyboard asks for previews without wording them).
  const previews: string[] = [];
  if (w.safety >= 6) previews.push("A safety-heavy weighting would also justify detention petitions for the nine similar cases.");
  if (w.lrm >= 6) previews.push("A liberty-heavy weighting leaves little room to act if a patient really does stop treatment.");
  if (w.speed >= 5) previews.push("A speed-first weighting is what produces score-only triage in the first place.");
  if (total === 10 && w.consistency <= 1) previews.push("With so little weight on consistency, the nine similar cases could be treated differently from this one.");
  if (total === 10 && previews.length === 0) previews.push("No single value dominates. Whoever reviews the nine similar cases will see a reasoned balance.");

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(380px, 62fr) minmax(260px, 38fr)" }}>
        <section className="pane" aria-label="Case weighting">
          <div className="crumb">Case review<ChevronRight12Regular />Case weighting</div>
          <h1 className="title">Weigh the trade-offs</h1>
          <p className="lede" style={{ marginBottom: 22 }}>Allocate 10 points across the four values.</p>
          <div className="alloc">
            {VALUES.map((v) => (
              <div key={v.id} className="alloc-row">
                <label htmlFor={`w-${v.id}`}>{v.label}</label>
                <input id={`w-${v.id}`} type="range" min={0} max={10} step={1} value={w[v.id]} onChange={(e) => set(v.id, Number(e.target.value))} aria-valuetext={`${w[v.id]} points`} />
                <div className="stepper">
                  <button aria-label={`Decrease ${v.label}`} onClick={() => set(v.id, w[v.id] - 1)}>−</button>
                  <input aria-label={`${v.label} points`} inputMode="numeric" value={w[v.id]} onChange={(e) => set(v.id, Number(e.target.value.replace(/\D/g, "")) || 0)} />
                  <button aria-label={`Increase ${v.label}`} onClick={() => set(v.id, w[v.id] + 1)}>+</button>
                </div>
              </div>
            ))}
          </div>
          <p className="count" style={{ margin: "16px 0" }}>{total} of 10 allocated</p>
          <label className="field"><span>Your rationale <span className="sub">(optional, travels with the file)</span></span>
            <textarea className="textbox" value={run.s5.rationale} maxLength={400} onChange={(e) => edit((d) => { d.s5.rationale = e.target.value; })} />
          </label>
        </section>
        <section className="pane tint" aria-label="Weighting preview">
          <h2 className="h2" style={{ marginTop: 26 }}>Weighting preview</h2>
          <div style={{ margin: "18px 0 4px" }}><span className="big-num">{left}</span></div>
          <div className="sub" style={{ fontSize: 14 }}>{left === 1 ? "point remaining" : "points remaining"}</div>
          <div className="preview-list" aria-live="polite">
            <InfoBar>{NINE_CASES}</InfoBar>
            {previews.map((p) => <InfoBar key={p} tone={p.startsWith("No single value") ? "info" : "warn"}>{p} <span className="fixture">FIXTURE</span></InfoBar>)}
            {total < 10 && <p className="sub">Preview updates as you adjust.</p>}
          </div>
        </section>
      </div>
      <Strip>
        <button className="btn accent" disabled={total !== 10} onClick={() => setConfirming(true)}>Save weighting</button>
      </Strip>
      {confirming && (
        <Dialog title="Save weighting?" confirm="Save" onCancel={() => setConfirming(false)} onConfirm={() => commit("s5")}>
          <p>Your weighting{run.s5.rationale.trim() ? " and rationale" : ""} will be saved to the case file. You can't change it afterwards.</p>
        </Dialog>
      )}
    </div>
  );
}
