import { useEffect, useRef, useState } from "react";
import { Home20Regular, Mic20Regular, PersonVoice20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { OPENINGS, INTERVIEW, COMPRESSED_NOTE } from "../content/scenario";
import { Dialog } from "../ui/kit";
import { SaveState } from "../ui/kit";
import { A } from "../asset";

type SR = { start: () => void; stop: () => void; onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void; onend: () => void; lang: string; interimResults: boolean };

export function S4() {
  const { run, edit, commit } = useRun();
  const s = run.s4;
  const [shown, setShown] = useState(s.began ? 99 : 0);
  const [listening, setListening] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const rec = useRef<SR | null>(null);
  const SpeechCtor = (window as unknown as { SpeechRecognition?: new () => SR; webkitSpeechRecognition?: new () => SR }).SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition?: new () => SR }).webkitSpeechRecognition;
  const lines = s.opening ? INTERVIEW[s.opening].lines : [];

  useEffect(() => { // reveal the interview line by line
    if (!s.began || shown >= lines.length) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), shown === 0 ? 700 : 1500);
    return () => window.clearTimeout(t);
  }, [s.began, shown, lines.length]);

  const mic = () => {
    if (!SpeechCtor) return;
    if (listening) { rec.current?.stop(); return; }
    const r = new SpeechCtor(); r.lang = "en-GB"; r.interimResults = false;
    r.onresult = (e) => { const t = e.results[0]?.[0]?.transcript ?? ""; edit((d) => { d.s4.question = (d.s4.question ? d.s4.question + " " : "") + t; }); };
    r.onend = () => setListening(false);
    rec.current = r; setListening(true); r.start();
  };
  const done = s.began && shown >= lines.length;

  return (
    <div className="workspace visual">
      <div className="visual-stage" style={{ ["--focus" as string]: "30% 45%" }}>
        <img src={A("assets/img/homevisit.jpg")} alt="Tunde Balogun sits in his living room in a dark green shirt. An interpreter sits beside him with a notebook." />
        <span className="ov ov-label"><Home20Regular />Home visit</span>
        <div className="ov ov-id"><b>Tunde Balogun</b><span>Interpreter present · Yoruba / English</span></div>

        <div className="ov ov-panel" aria-label="Interview controls">
          {!s.began ? (
            <>
              <div className="h3">Your opening question</div>
              <div className="choices" role="radiogroup" aria-label="Opening approach">
                {OPENINGS.map((o) => (
                  <button key={o.id} className="choice" role="radio" aria-checked={s.opening === o.id} onClick={() => edit((d) => { d.s4.opening = o.id; })}><span className="dot" />{o.label}</button>
                ))}
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <textarea className="textbox" style={{ minHeight: 56, fontSize: 13 }} placeholder="Type your first question" aria-label="Your first question" value={s.question} maxLength={240} onChange={(e) => edit((d) => { d.s4.question = e.target.value; })} />
                {SpeechCtor && <button className={`ibtn mic ${listening ? "on" : ""}`} aria-pressed={listening} aria-label={listening ? "Stop dictation" : "Speak your question"} title="Speak your question" onClick={mic}><Mic20Regular /></button>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <SaveState /><span style={{ flex: 1 }} />
                <button className="btn accent" disabled={!s.opening || s.question.trim().length < 6} onClick={() => edit((d) => { d.s4.began = true; })}>Begin interview</button>
              </div>
            </>
          ) : (
            <>
              <div className="h3"><PersonVoice20Regular style={{ width: 16, height: 16, verticalAlign: -3 }} /> Transcript</div>
              <div className="transcript" aria-live="polite">
                <p><b>You:</b> {s.question}</p>
                {lines.slice(0, shown).map((l, i) => <p key={i}><b>{l.who}:</b> {l.text}</p>)}
                {!done && <p className="sub">…</p>}
                {s.opening && INTERVIEW[s.opening].fixture && done && <p><span className="fixture">FIXTURE DIALOGUE</span></p>}
              </div>
              {done && (
                <>
                  <div className="h3">Save the visit record as</div>
                  <div className="choices" role="radiogroup" aria-label="Visit record">
                    <button className="choice" role="radio" aria-checked={s.record === "detailed"} onClick={() => edit((d) => { d.s4.record = "detailed"; })}><span className="dot" />“{INTERVIEW[s.opening!].detailed}”</button>
                    <button className="choice" role="radio" aria-checked={s.record === "compressed"} onClick={() => edit((d) => { d.s4.record = "compressed"; })}><span className="dot" />“{COMPRESSED_NOTE}”</button>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <SaveState /><span style={{ flex: 1 }} />
                    <button className="btn accent" disabled={!s.record} onClick={() => setConfirming(true)}>Save record</button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {confirming && (
        <Dialog title="Save the visit record?" confirm="Save" onCancel={() => setConfirming(false)} onConfirm={() => commit("s4")}>
          <p>This wording becomes the interview record in the case file. You can't change it afterwards.</p>
        </Dialog>
      )}
    </div>
  );
}
