import { useLayoutEffect, useRef, useState } from "react";
import { ChevronRight12Regular, Dismiss16Regular, Attach20Regular, Document20Regular, Link20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { RECORDS, SW_NOTE_SHORT } from "../content/scenario";
import { Strip, Dialog, Tip } from "../ui/kit";

type Pt = { x: number; y: number };

export function S3() {
  const { run, edit, commit } = useRun();
  const s = run.s3;
  const wrap = useRef<HTMLDivElement>(null);
  const [pts, setPts] = useState<Record<string, Pt>>({});
  const [armed, setArmed] = useState<string | null>(null);
  const [ghost, setGhost] = useState<{ from: string; to: Pt } | null>(null);
  const [confirming, setConfirming] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      const w = wrap.current; if (!w) return; const base = w.getBoundingClientRect();
      const next: Record<string, Pt> = {};
      w.querySelectorAll<HTMLElement>("[data-port]").forEach((el) => { const r = el.getBoundingClientRect(); next[el.dataset.port!] = { x: r.left - base.left + r.width / 2, y: r.top - base.top + r.height / 2 }; });
      setPts(next);
    };
    measure();
    const ro = new ResizeObserver(measure); if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, []);

  const has = (a: string, b: string) => s.links.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  const link = (a: string, b: string) => { if (a === b || has(a, b)) return; edit((d) => { d.s3.links.push([a, b]); }); };
  const unlink = (i: number) => edit((d) => { d.s3.links.splice(i, 1); });
  const clickPort = (id: string) => { if (!armed) setArmed(id); else { link(armed, id); setArmed(null); } };
  const curve = (a: Pt, b: Pt) => { const bend = 40 + Math.abs(b.y - a.y) * 0.35; return `M${a.x},${a.y} C${a.x + bend},${a.y} ${b.x + bend},${b.y} ${b.x},${b.y}`; };
  const local = (e: React.PointerEvent) => { const r = wrap.current!.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const label = (id: string) => RECORDS.find((r) => r.id === id)!;
  const ready = s.links.length > 0 && !!s.preserve && (s.preserve === "attach" || s.summary.trim().length > 0);

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(360px, 60fr) minmax(280px, 40fr)" }}>
        <section className="pane" aria-label="Record timeline">
          <div className="crumb">Case review<ChevronRight12Regular />Record timeline</div>
          <h1 className="title">Connect the paper trail</h1>
          <p className="lede" style={{ marginBottom: 20 }}>Link records that explain the missed visit.</p>
          <div className="tl-wrap" ref={wrap} style={{ maxWidth: 560 }}
            onPointerMove={(e) => ghost && setGhost({ ...ghost, to: local(e) })}
            onPointerUp={(e) => {
              if (!ghost) return;
              const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>("[data-port]");
              if (el && el.dataset.port !== ghost.from) { link(ghost.from, el.dataset.port!); setArmed(null); }
              setGhost(null);
            }}>
            {RECORDS.map((r) => (
              <div key={r.id} className="tl-item">
                <div><b>{r.when}</b><span>{r.label}</span><div className="sub" style={{ marginTop: 2 }}>{r.detail}</div></div>
                <button className="port" data-port={r.id} aria-pressed={armed === r.id} aria-label={`${armed && armed !== r.id ? "Link to" : "Start a link from"} ${r.when}, ${r.label}`}
                  onPointerDown={(e) => { (e.target as HTMLElement).releasePointerCapture?.(e.pointerId); setGhost({ from: r.id, to: local(e) }); }}
                  onClick={() => clickPort(r.id)} />
              </div>
            ))}
            <svg className="tl-svg" aria-hidden="true">
              {s.links.map(([a, b], i) => pts[a] && pts[b] && <path key={i} d={curve(pts[a], pts[b])} fill="none" stroke="#005FB8" strokeWidth={2.5} />)}
              {ghost && pts[ghost.from] && <path d={`M${pts[ghost.from].x},${pts[ghost.from].y} L${ghost.to.x},${ghost.to.y}`} stroke="#005FB8" strokeWidth={2} strokeDasharray="5 4" fill="none" />}
            </svg>
          </div>
          <h3 className="h3" style={{ marginTop: 6 }}>Links</h3>
          {s.links.length === 0 ? <p className="sub">No links yet.</p> : (
            <div className="links-list">
              {s.links.map(([a, b], i) => (
                <div key={i} className="link-chip"><Link20Regular style={{ width: 16, height: 16 }} />{label(a).when} · {label(a).label} ↔ {label(b).when} · {label(b).label}
                  <button className="ibtn" aria-label="Remove link" onClick={() => unlink(i)}><Dismiss16Regular /></button></div>
              ))}
            </div>
          )}
          <Tip hide={s.links.length > 0} id="s3" title="Link records" style={{ right: 24, top: 20 }}>Drag from one port to another, or select a port and then another.</Tip>
        </section>

        <section className="pane tint" aria-label="Social-worker note">
          <h2 className="h2" style={{ marginTop: 26 }}>Social-worker note</h2>
          <p className="sub">Two days before the flag</p>
          <blockquote style={{ margin: "14px 0", padding: "12px 14px", borderLeft: "3px solid var(--accent)", background: "#fff", borderRadius: 4, fontSize: 15 }}>“{SW_NOTE_SHORT}”</blockquote>
          <hr className="rule" />
          <h3 className="h3">Keep it in the case file as</h3>
          <div className="choices" role="radiogroup" aria-label="How to keep the note" style={{ marginTop: 10 }}>
            <button className="choice" role="radio" aria-checked={s.preserve === "attach"} onClick={() => edit((d) => { d.s3.preserve = "attach"; })}><span className="dot" /><span><Attach20Regular style={{ width: 16, height: 16, verticalAlign: -3 }} /> Attach full note<br /><span className="sub">Needs a records-processing step now.</span></span></button>
            <button className="choice" role="radio" aria-checked={s.preserve === "summary"} onClick={() => edit((d) => { d.s3.preserve = "summary"; })}><span className="dot" /><span><Document20Regular style={{ width: 16, height: 16, verticalAlign: -3 }} /> Write a summary</span></button>
          </div>
          {s.preserve === "summary" && (
            <label className="field" style={{ marginTop: 12 }}><span>Your summary</span>
              <textarea className="textbox" value={s.summary} maxLength={200} onChange={(e) => edit((d) => { d.s3.summary = e.target.value; })} />
            </label>
          )}
        </section>
      </div>
      <Strip left={<span className="count">{s.links.length} link{s.links.length === 1 ? "" : "s"}</span>}>
        <button className="btn accent" disabled={!ready} onClick={() => setConfirming(true)}>Save the record</button>
      </Strip>
      {confirming && (
        <Dialog title="Save the record?" confirm="Save" onCancel={() => setConfirming(false)} onConfirm={() => commit("s3")}>
          <p>{s.preserve === "attach" ? "The full social-worker note will be attached to the case file." : "Your summary will be saved to the case file. The original note will not be attached."} You can't change this afterwards.</p>
        </Dialog>
      )}
    </div>
  );
}
