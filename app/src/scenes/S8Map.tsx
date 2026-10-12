import { useState } from "react";
import { Eraser20Regular, Map20Regular, Location16Filled } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { DISTRICTS, CLINICS, TRANSIT, PATIENTS, READINGS, CONTINUITY_Q } from "../content/scenario";
import { predictionMatch } from "../state/run";
import { Dialog, SaveState } from "../ui/kit";

export function S8() {
  const { run, edit, commit } = useRun();
  const s = run.s8;
  const [layers, setLayers] = useState({ petitions: true, all: true, clinics: true, transit: true, language: false });
  const [confirming, setConfirming] = useState(false);
  const toggle = (id: string) => !s.revealed && edit((d) => { d.s8.prediction = d.s8.prediction.includes(id) ? d.s8.prediction.filter((x) => x !== id) : [...d.s8.prediction, id]; });
  const m = predictionMatch(s.prediction);
  const remedy = run.bridge.snapshot?.remedy;
  const fill = (id: string) => {
    if (!s.revealed) return s.prediction.includes(id) ? "rgba(0,95,184,0.28)" : "#E4EADF";
    const d = DISTRICTS.find((x) => x.id === id)!;
    return layers.transit && !d.access ? "#F1E3D3" : "#E4EADF";
  };
  const ready = !!s.reading && (s.reading !== "access" || !!s.continuity);

  return (
    <div className="workspace visual">
      <div className="map-stage">
        <svg className="map-svg" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" role="group" aria-label="Fictional county map">
          <rect x="0" y="0" width="1000" height="600" fill="#EEF2EA" />
          <path d="M-20,215 C150,240 260,175 380,205 S560,260 640,215 S860,190 1020,235" fill="none" stroke="#B9D3E6" strokeWidth="16" opacity="0.8" />
          {DISTRICTS.map((d) => (
            <path key={d.id} d={d.d} className="district" fill={fill(d.id)} tabIndex={s.revealed ? -1 : 0} role={s.revealed ? undefined : "checkbox"}
              aria-checked={s.revealed ? undefined : s.prediction.includes(d.id)} aria-label={`${d.name}${s.prediction.includes(d.id) ? ", marked" : ""}`}
              onClick={() => toggle(d.id)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(d.id); } }}
              style={s.prediction.includes(d.id) && !s.revealed ? { stroke: "#005FB8", strokeWidth: 3 } : undefined} />
          ))}
          {[[90, 120, 330, 110], [200, 260, 600, 300], [430, 60, 470, 400], [700, 80, 720, 380], [260, 470, 900, 500]].map(([a, b, c, e], i) => <line key={i} x1={a} y1={b} x2={c} y2={e} stroke="#fff" strokeWidth="4" opacity="0.9" />)}
          {DISTRICTS.map((d) => <text key={d.id} x={d.cx} y={d.cy} textAnchor="middle" fontSize="15" fontWeight="700" fill="#5a6a5a" style={{ pointerEvents: "none", fontFamily: "var(--font-body)" }}>{d.name}</text>)}
          {s.revealed && layers.transit && <path d={TRANSIT} fill="none" stroke="#7A5AF8" strokeWidth="5" strokeDasharray="12 8" />}
          {s.revealed && layers.clinics && CLINICS.map((c, i) => (
            <g key={i} transform={`translate(${c.x - 11},${c.y - 11})`}><rect width="22" height="22" rx="5" fill={c.evening ? "#0F7B0F" : "#fff"} stroke="#0F7B0F" strokeWidth="2" /><path d="M11 5v12M5 11h12" stroke={c.evening ? "#fff" : "#0F7B0F"} strokeWidth="2.5" /></g>
          ))}
          {s.revealed && PATIENTS.filter((p) => (p.petition ? layers.petitions : layers.all)).map((p) => (
            <g key={p.id}>
              <circle cx={p.x} cy={p.y} r={p.petition ? 9 : 6} fill={layers.language ? (p.group === "B" ? "#8E44AD" : "#1B9AAA") : p.petition ? "#C42B1C" : "#fff"} stroke={p.petition ? "#7a1a10" : "#5c6670"} strokeWidth={p.petition ? 2 : 1.5} />
              {p.balogun && <circle cx={p.x} cy={p.y} r="16" fill="none" stroke="#E2B24F" strokeWidth="3" />}
            </g>
          ))}
        </svg>

        <div className="map-card">
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Map20Regular style={{ color: "var(--accent)" }} /><b>{s.revealed ? "Flagged patients · 40" : "Sketch your prediction"}</b></div>
          {!s.revealed ? (
            <>
              <p className="sub" style={{ margin: 0, fontSize: 13 }}>Mark where you expect petitions to cluster. Tap districts, or Tab to a district and press Space.</p>
              <p className="count" style={{ margin: 0 }}>{s.prediction.length} district{s.prediction.length === 1 ? "" : "s"} marked</p>
            </>
          ) : (
            <div className="legend">
              {([["petitions", "Detention petitions (12)", "#C42B1C"], ["all", "Other flagged patients (28)", "#fff"], ["clinics", "Clinics (filled = evening hours)", "#0F7B0F"], ["transit", "Evening transit · shaded = no service", "#7A5AF8"], ["language", "Colour by language group", "#8E44AD"]] as const).map(([k, l, c]) => (
                <label key={k}><input type="checkbox" checked={layers[k]} onChange={() => setLayers({ ...layers, [k]: !layers[k] })} /><i style={{ background: c, border: "1px solid #5c6670" }} />{l}</label>
              ))}
              {layers.language && <span className="sub">Teal: English primary language · Purple: other primary language</span>}
              <span className="fixture">FIXTURE DATASET</span>
            </div>
          )}
        </div>
        <div className="map-tools" aria-label="Map tools">
          <button className="ibtn" aria-label="Clear prediction" title="Clear prediction" disabled={s.revealed} onClick={() => edit((d) => { d.s8.prediction = []; })}><Eraser20Regular /></button>
        </div>

        <div className="map-inset" aria-label="Case 7 record">
          <b><Location16Filled style={{ width: 14, height: 14, color: "#C08A1E", verticalAlign: -2 }} /> Case 7 · Tunde Balogun</b>
          <div className="sub">88% risk score</div>
          {s.revealed && <p style={{ margin: "6px 0 0", fontSize: 13 }}>
            His score is well above his group's average, and his pin sits in Kiln Hill, a transit desert with no evening clinic hours.{" "}
            {remedy === "petition" ? "Your Act I remedy (a detention petition) makes his case an outlier within the pattern on this map: worth flagging, not hiding." : remedy ? "Your Act I remedy fits the reading that legal review is correcting a structural blind spot in the model." : ""}
          </p>}
        </div>

        <div className="map-act" aria-label="Map actions">
          {!s.revealed ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><SaveState /><span style={{ flex: 1 }} /><button className="btn accent" disabled={s.prediction.length === 0} onClick={() => edit((d) => { d.s8.revealed = true; })}>Reveal the pattern</button></div>
          ) : (
            <>
              <p style={{ margin: 0, fontSize: 13 }}><b>Your prediction:</b> {m.hit} of {s.prediction.length} marked district{s.prediction.length === 1 ? "" : "s"} {m.hit === 1 ? "is" : "are"} where the petitions cluster.</p>
              <div className="h3" style={{ fontSize: 15 }}>What drives the pattern?</div>
              <div className="choices" role="radiogroup" aria-label="Interpretation">
                {READINGS.map((r) => <button key={r.id} className="choice" role="radio" aria-checked={s.reading === r.id} onClick={() => edit((d) => { d.s8.reading = r.id; if (r.id !== "access") d.s8.continuity = undefined; })}><span className="dot" />{r.label}</button>)}
              </div>
              {s.reading === "access" && (
                <>
                  <div className="h3" style={{ fontSize: 14 }}>{CONTINUITY_Q}</div>
                  <div className="choices" role="radiogroup" aria-label="Continuity risk">
                    <button className="choice" role="radio" aria-checked={s.continuity === "named"} onClick={() => edit((d) => { d.s8.continuity = "named"; })}><span className="dot" />Name it as a continuity risk in the board report.</button>
                    <button className="choice" role="radio" aria-checked={s.continuity === "dismissed"} onClick={() => edit((d) => { d.s8.continuity = "dismissed"; })}><span className="dot" />Leave it out: it isn't part of this complaint.</button>
                  </div>
                </>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}><SaveState /><span style={{ flex: 1 }} /><button className="btn accent" disabled={!ready} onClick={() => setConfirming(true)}>Confirm interpretation</button></div>
            </>
          )}
        </div>
      </div>
      {confirming && <Dialog title="Confirm interpretation?" confirm="Confirm" onCancel={() => setConfirming(false)} onConfirm={() => commit("s8")}><p>Your reading of the map goes into the analysis log. You can't change it afterwards.</p></Dialog>}
    </div>
  );
}
