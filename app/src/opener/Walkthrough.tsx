import { useEffect, useRef, useState } from "react";
import { ArrowRight20Regular, ClosedCaption20Regular, Speaker220Regular } from "@fluentui/react-icons";
import { CUES } from "./cues";
import { A } from "../asset";

/** Narrated walkthrough. Begin (in the opener) is the click that lets the narration play with sound. */
export function Walkthrough({ volume, onDone }: { volume: number; onDone: () => void }) {
  const v = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);
  const [cc, setCc] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    const el = v.current; if (!el) return;
    el.volume = volume / 100;
    el.play().catch(() => { el.muted = true; setBlocked(true); setCc(true); el.play().catch(() => undefined); });
    const k = (e: KeyboardEvent) => e.key === "Escape" && onDone();
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => { if (v.current) v.current.volume = volume / 100; }, [volume]);
  const cue = CUES.find((c) => t >= c.s && t <= c.e);
  return (
    <div className="player" role="dialog" aria-modal="true" aria-label="Walkthrough">
      <div className="player-box">
        <video ref={v} playsInline preload="auto" controls aria-label="Walkthrough video with narration" onTimeUpdate={(e) => setT(e.currentTarget.currentTime)} onEnded={() => setEnded(true)}>
          <source src={A("assets/walkthrough/behind-the-order-walkthrough-1080p.webm")} type="video/webm" />
          <source src={A("assets/walkthrough/behind-the-order-walkthrough-1080p.mp4")} type="video/mp4" />
        </video>
        {cc && cue && <div className="player-cap">{cue.t}</div>}
        {ended && <button className="op-begin endcard-begin" style={{ opacity: 1, transform: "translate(-50%, -50%)", pointerEvents: "auto" }} autoFocus onClick={onDone}>Let's begin <ArrowRight20Regular /></button>}
        <div className="player-bar">
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn subtle" aria-pressed={cc} onClick={() => setCc(!cc)}><ClosedCaption20Regular />Captions {cc ? "on" : "off"}</button>
            {blocked && <button className="btn subtle" onClick={() => { if (v.current) { v.current.muted = false; setBlocked(false); } }}><Speaker220Regular />Turn on sound</button>}
          </div>
          <button className="btn subtle" onClick={onDone}>Skip to the simulation <ArrowRight20Regular /></button>
        </div>
      </div>
    </div>
  );
}
