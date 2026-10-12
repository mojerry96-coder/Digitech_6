import { useState } from "react";
import { Call20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { CALL_OPENINGS, FOLLOWUPS, type CallOpen, type FollowUp } from "../content/scenario";
import { SaveState } from "../ui/kit";
import { A } from "../asset";

export function S9() {
  const { run, edit, commit } = useRun();
  const s = run.s9;
  const [draft, setDraft] = useState<CallOpen | FollowUp | null>(null);
  const opening = CALL_OPENINGS.find((o) => o.id === s.opening);
  const stage: "open" | "follow" | "end" = !s.opening ? "open" : s.opening === "honest" && !s.followup ? "follow" : "end";
  const quote = stage === "open" ? null : opening!.reply;
  const send = () => {
    if (!draft) return;
    if (stage === "open") edit((d) => { d.s9.opening = draft as CallOpen; });
    else edit((d) => { d.s9.followup = draft as FollowUp; });
    setDraft(null);
  };
  const options = stage === "open" ? CALL_OPENINGS.map((o) => ({ id: o.id, label: o.label })) : FOLLOWUPS;

  return (
    <div className="workspace visual">
      <div className="visual-stage" style={{ ["--focus" as string]: "35% 40%" }}>
        <img src={A("assets/img/advocate.jpg")} alt="A community advocate at her desk, speaking on a mobile phone." />
        <span className="ov ov-label"><Call20Regular />Call connected</span>
        <div className="ov ov-id"><b>Community advocate</b><span>Health-equity coalition</span></div>
        {quote && <div className="ov ov-quote" aria-live="polite">“{quote}”{opening?.fixture && stage === "end" && s.opening !== "honest" && <small><span className="fixture">FIXTURE DIALOGUE</span></small>}</div>}
        {stage === "open" && <div className="ov ov-quote">“I'm calling for the coalition about the complaint. What can you tell me?”<small><span className="fixture">FIXTURE DIALOGUE</span></small></div>}

        <div className="ov ov-panel" aria-label="Your response">
          {stage !== "end" ? (
            <>
              <div className="h3">{stage === "open" ? "Your opening" : "Your reply"}</div>
              <div className="choices" role="radiogroup" aria-label={stage === "open" ? "Your opening" : "Your reply"}>
                {options.map((o) => <button key={o.id} className="choice" role="radio" aria-checked={draft === o.id} onClick={() => setDraft(o.id as CallOpen | FollowUp)}><span className="dot" />{o.label}</button>)}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><SaveState /><span style={{ flex: 1 }} /><button className="btn accent" disabled={!draft} onClick={send}>Send response</button></div>
            </>
          ) : (
            <>
              <div className="h3">Call summary</div>
              <div className="transcript">
                <p><b>You:</b> {opening!.label}</p>
                <p><b>Advocate:</b> {opening!.reply}</p>
                {s.followup && <p><b>You:</b> {FOLLOWUPS.find((f) => f.id === s.followup)!.label}</p>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><SaveState /><span style={{ flex: 1 }} /><button className="btn accent" data-autofocus onClick={() => commit("s9")}>End call</button></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
