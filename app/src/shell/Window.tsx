import { useEffect, useRef, useState, type ReactNode, type PointerEvent as RPE } from "react";
import { Subtract16Regular, Square16Regular, SquareMultiple16Regular, Dismiss16Regular } from "@fluentui/react-icons";
import type { Bounds, ShellAction, WinId, WinState } from "./windows";

interface Props {
  id: WinId; title: string; icon: ReactNode; plainIcon?: boolean; state: WinState; focused: boolean;
  dispatch: (a: ShellAction) => void; minW?: number; minH?: number; children: ReactNode;
  taskbarButton?: () => HTMLElement | null; label: string;
}

const TASKBAR = 48;

export function Window({ id, title, icon, plainIcon, state, focused, dispatch, minW = 360, minH = 240, children, taskbarButton, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const max = state.size === "maximised";
  const b = state.bounds;
  const hidden = state.visibility === "minimised";

  // Launch transition, then hand focus into the window.
  useEffect(() => {
    if (state.visibility !== "launching") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => dispatch({ type: "LAUNCH_READY", id }), reduced ? 0 : 230);
    return () => window.clearTimeout(t); // cancelled if the window closes mid-launch
  }, [state.visibility, dispatch, id]);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    (el as HTMLElement & { inert: boolean }).inert = hidden; // hidden windows leave the tab order
    if (state.visibility === "visible" && focused) {
      const target = lastFocus.current && el.contains(lastFocus.current) ? lastFocus.current : (el.querySelector<HTMLElement>("[data-autofocus]") ?? el.querySelector<HTMLElement>(".win-body button, .win-body [tabindex='0'], .win-body input"));
      if (target && !el.contains(document.activeElement)) target.focus({ preventScroll: true });
    }
  }, [hidden, state.visibility, focused]);

  const toTaskbar = () => window.setTimeout(() => taskbarButton?.()?.focus(), 0);
  const minimise = () => { lastFocus.current = document.activeElement as HTMLElement; dispatch({ type: "MINIMISE", id }); toTaskbar(); };
  const close = () => { dispatch({ type: "CLOSE", id }); toTaskbar(); };
  const toggle = () => dispatch({ type: "TOGGLE_SIZE", id });

  // drag to move (title bar), resize (edges)
  const drag = useRef<{ mode: string; sx: number; sy: number; b: Bounds } | null>(null);
  const start = (mode: string) => (e: RPE) => {
    if (e.button !== 0) return;
    if (mode === "move" && (e.target as HTMLElement).closest("button")) return;
    if (max && mode !== "move") return;
    dispatch({ type: "FOCUS", id });
    drag.current = { mode, sx: e.clientX, sy: e.clientY, b: { ...b } };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: RPE) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (d.mode === "move") {
      if (max) { if (Math.abs(dx) + Math.abs(dy) < 8) return; toggle(); d.b = { ...b, x: e.clientX - b.w / 2, y: 0 }; d.sx = e.clientX; d.sy = e.clientY; return; }
      const vh = window.innerHeight - TASKBAR;
      const x = Math.min(window.innerWidth - 120, Math.max(120 - d.b.w, d.b.x + dx));
      const y = Math.min(vh - 32, Math.max(0, d.b.y + dy)); // keep the title bar reachable
      dispatch({ type: "BOUNDS", id, bounds: { ...d.b, x, y } });
    } else {
      let { x, w, h } = d.b;
      if (d.mode.includes("e")) w = Math.max(minW, d.b.w + dx);
      if (d.mode.includes("s")) h = Math.max(minH, d.b.h + dy);
      if (d.mode === "w") { w = Math.max(minW, d.b.w - dx); x = d.b.x + (d.b.w - w); }
      dispatch({ type: "BOUNDS", id, bounds: { x, y: d.b.y, w, h } });
    }
  };
  const end = () => { drag.current = null; };

  // Alt+Space opens the system menu for the focused window
  useEffect(() => {
    if (!focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "Space") { e.preventDefault(); setMenu({ x: 8, y: 32 }); }
      if (e.key === "Escape" && menu) setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused, menu]);

  if (state.visibility === "closed") return null;

  const style = max
    ? { left: 0, top: 0, width: "100vw", height: `calc(100vh - ${TASKBAR}px)`, zIndex: 100 + state.z }
    : { left: b.x, top: b.y, width: b.w, height: b.h, zIndex: 100 + state.z };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label={label}
      aria-hidden={hidden || undefined}
      className={`win ${max ? "max" : ""} ${state.visibility === "launching" ? "opening" : ""} ${hidden ? "minimised" : ""} ${focused ? "" : "inactive"}`}
      style={style}
      onPointerDownCapture={() => !focused && dispatch({ type: "FOCUS", id })}
      onFocusCapture={(e) => { lastFocus.current = e.target as HTMLElement; }}
    >
      <div
        className="titlebar"
        onPointerDown={start("move")} onPointerMove={move} onPointerUp={end} onPointerCancel={end}
        onDoubleClick={(e) => { if (!(e.target as HTMLElement).closest("button")) toggle(); }}
        onContextMenu={(e) => { e.preventDefault(); const r = ref.current!.getBoundingClientRect(); setMenu({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
      >
        <button className={`ticon ${plainIcon ? "plain" : ""}`} aria-label="Window menu" onClick={() => setMenu(menu ? null : { x: 8, y: 32 })} onDoubleClick={close}><span>{icon}</span></button>
        <span className="ttl">{title}</span>
        <div className="caps">
          <button className="cap" aria-label={`Minimise ${title}`} title="Minimise" onClick={minimise}><Subtract16Regular /></button>
          <button className="cap" aria-label={max ? "Restore window" : "Maximise window"} title={max ? "Restore down" : "Maximise"} onClick={toggle}>{max ? <SquareMultiple16Regular /> : <Square16Regular />}</button>
          <button className="cap close" aria-label={`Close ${title}`} title="Close" onClick={close}><Dismiss16Regular /></button>
        </div>
      </div>
      <div className="win-body">{children}</div>
      {!max && (<>
        <div className="rz e" onPointerDown={start("e")} onPointerMove={move} onPointerUp={end} />
        <div className="rz s" onPointerDown={start("s")} onPointerMove={move} onPointerUp={end} />
        <div className="rz se" onPointerDown={start("se")} onPointerMove={move} onPointerUp={end} />
        <div className="rz w" onPointerDown={start("w")} onPointerMove={move} onPointerUp={end} />
      </>)}
      {menu && (
        <div className="sysmenu" role="menu" style={{ left: menu.x, top: menu.y }} onPointerLeave={() => setMenu(null)}>
          <button role="menuitem" disabled={!max} onClick={() => { setMenu(null); toggle(); }}><SquareMultiple16Regular />Restore</button>
          <button role="menuitem" disabled={max} onClick={() => setMenu(null)}>Move</button>
          <button role="menuitem" disabled={max} onClick={() => setMenu(null)}>Size</button>
          <button role="menuitem" onClick={() => { setMenu(null); minimise(); }}><Subtract16Regular />Minimise</button>
          <button role="menuitem" disabled={max} onClick={() => { setMenu(null); toggle(); }}><Square16Regular />Maximise</button>
          <hr />
          <button role="menuitem" autoFocus onClick={() => { setMenu(null); close(); }}><Dismiss16Regular />Close<span style={{ marginLeft: "auto", color: "var(--ink-3)", fontSize: 12 }}>Alt+F4</span></button>
        </div>
      )}
    </div>
  );
}
