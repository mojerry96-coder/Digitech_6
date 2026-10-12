import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { clearRun, freshRun, loadRun, saveRun, scoreStage, takeSnapshot, STAGES, type Run, type Stage } from "./run";

type SaveState = "idle" | "saved" | "error";
interface Ctx {
  run: Run;
  hasRun: boolean;
  save: SaveState;
  edit: (fn: (draft: Run) => void) => void;
  commit: (stage: Stage, next?: Stage) => void;
  retrySave: () => void;
  restart: () => void;
}
const RunCtx = createContext<Ctx | null>(null);

const clone = <T,>(x: T): T => JSON.parse(JSON.stringify(x));

export function RunProvider({ children }: { children: ReactNode }) {
  const loaded = useRef(loadRun());
  const [run, setRun] = useState<Run>(() => loaded.current ?? freshRun());
  const [hasRun, setHasRun] = useState<boolean>(!!loaded.current);
  const [save, setSave] = useState<SaveState>("idle");
  const baseline = useRef<Run | null>(run);

  // Autosave after every change. "Draft saved" is shown only when a real change was actually written.
  useEffect(() => {
    if (run === baseline.current) return;
    setSave(saveRun(run) ? "saved" : "error");
    setHasRun(true);
  }, [run]);

  const edit = useCallback((fn: (d: Run) => void) => {
    setRun((prev) => {
      const d = clone(prev);
      fn(d);
      // Committed Act I stages and the archived snapshot are immutable.
      for (const s of STAGES) if (prev.committed[s] && s !== d.stage) (d as unknown as Record<string, unknown>)[s] = (prev as unknown as Record<string, unknown>)[s];
      if (prev.bridge.snapshot) d.bridge.snapshot = prev.bridge.snapshot;
      return d;
    });
  }, []);

  const commit = useCallback((stage: Stage, next?: Stage) => {
    setRun((prev) => {
      if (prev.committed[stage]) return prev; // duplicate submissions are ignored
      const d = clone(prev);
      d.scores[stage] = scoreStage(stage, d);
      d.committed[stage] = true;
      const idx = STAGES.indexOf(stage);
      d.stage = next ?? STAGES[Math.min(idx + 1, STAGES.length - 1)];
      if (d.stage === "bridge" && !d.bridge.snapshot) d.bridge.snapshot = takeSnapshot(d);
      return d;
    });
  }, []);

  const retrySave = useCallback(() => setSave(saveRun(run) ? "saved" : "error"), [run]);
  const restart = useCallback(() => { clearRun(); const f = freshRun(); baseline.current = f; setRun(f); setSave("idle"); setHasRun(false); }, []);

  const value = useMemo(() => ({ run, hasRun, save, edit, commit, retrySave, restart }), [run, hasRun, save, edit, commit, retrySave, restart]);
  return <RunCtx.Provider value={value}>{children}</RunCtx.Provider>;
}

export function useRun() {
  const c = useContext(RunCtx);
  if (!c) throw new Error("useRun outside RunProvider");
  return c;
}
