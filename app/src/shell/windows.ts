// Shell window model. Independent of the scenario state: closing or minimising never touches the run.
export type WinId = "app" | "casefiles" | "recycle";
export type Visibility = "closed" | "launching" | "visible" | "minimised";
export interface Bounds { x: number; y: number; w: number; h: number }
export interface WinState { visibility: Visibility; size: "restored" | "maximised"; bounds: Bounds; z: number }
export interface Shell { wins: Record<WinId, WinState>; focused: WinId | null; zTop: number }

export type ShellAction =
  | { type: "OPEN"; id: WinId }
  | { type: "LAUNCH_READY"; id: WinId }
  | { type: "MINIMISE"; id: WinId }
  | { type: "TOGGLE_SIZE"; id: WinId }
  | { type: "CLOSE"; id: WinId }
  | { type: "FOCUS"; id: WinId | null }
  | { type: "BOUNDS"; id: WinId; bounds: Bounds };

const TASKBAR = 48;
export function defaultBounds(id: WinId): Bounds {
  const vw = window.innerWidth, vh = window.innerHeight - TASKBAR;
  if (id === "app") return { x: 24, y: 12, w: Math.max(640, vw - 48), h: Math.max(420, vh - 24) };
  const w = Math.min(560, vw - 40), h = Math.min(440, vh - 40);
  return id === "casefiles" ? { x: Math.max(20, vw - w - 60), y: 60, w, h } : { x: 140, y: 90, w: Math.min(420, vw - 40), h: Math.min(320, vh - 40) };
}
const narrow = () => window.innerWidth < 1100;

export function initialShell(): Shell {
  const mk = (id: WinId): WinState => ({ visibility: "closed", size: id === "app" && narrow() ? "maximised" : "restored", bounds: defaultBounds(id), z: 1 });
  return { wins: { app: mk("app"), casefiles: mk("casefiles"), recycle: mk("recycle") }, focused: null, zTop: 1 };
}

function topmostVisible(s: Shell, except?: WinId): WinId | null {
  let best: WinId | null = null, z = -1;
  (Object.keys(s.wins) as WinId[]).forEach((k) => { const w = s.wins[k]; if (k !== except && w.visibility === "visible" && w.z > z) { z = w.z; best = k; } });
  return best;
}

export function shellReducer(s: Shell, a: ShellAction): Shell {
  const set = (id: WinId, patch: Partial<WinState>, focus: WinId | null = s.focused, bump = false): Shell => {
    const zTop = bump ? s.zTop + 1 : s.zTop;
    return { ...s, zTop, focused: focus, wins: { ...s.wins, [id]: { ...s.wins[id], ...patch, ...(bump ? { z: zTop } : {}) } } };
  };
  switch (a.type) {
    case "OPEN": {
      const w = s.wins[a.id];
      if (w.visibility === "visible" || w.visibility === "launching") return set(a.id, {}, a.id, true); // idempotent: never a second window
      return set(a.id, { visibility: w.visibility === "minimised" ? "visible" : "launching" }, a.id, true);
    }
    case "LAUNCH_READY":
      return s.wins[a.id].visibility === "launching" ? set(a.id, { visibility: "visible" }) : s;
    case "MINIMISE":
      return s.wins[a.id].visibility === "visible" ? { ...set(a.id, { visibility: "minimised" }), focused: topmostVisible(s, a.id) } : s;
    case "TOGGLE_SIZE":
      return s.wins[a.id].visibility === "visible" ? set(a.id, { size: s.wins[a.id].size === "restored" ? "maximised" : "restored" }, a.id, true) : s;
    case "CLOSE":
      return { ...set(a.id, { visibility: "closed" }), focused: topmostVisible(s, a.id) };
    case "FOCUS":
      return a.id ? set(a.id, {}, a.id, s.focused !== a.id) : { ...s, focused: null };
    case "BOUNDS":
      return set(a.id, { bounds: a.bounds });
  }
}
