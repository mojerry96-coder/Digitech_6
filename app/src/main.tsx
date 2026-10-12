import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { RunProvider, useRun } from "./state/store";
import { Desktop } from "./shell/Desktop";
import { Opener } from "./opener/Opener";
import { Walkthrough } from "./opener/Walkthrough";

function App() {
  const { hasRun } = useRun();
  const params = new URLSearchParams(location.search);
  // Returning learners (a saved run) and ?skipintro go straight to the desktop. ?nowalk skips the walkthrough.
  const [phase, setPhase] = useState<"opener" | "walk" | "desktop">(() => (hasRun || params.has("skipintro") ? "desktop" : "opener"));
  const [volume, setVol] = useState(() => { try { return Number(localStorage.getItem("bto.volume") ?? 80); } catch { return 80; } });
  const setVolume = (v: number) => { setVol(v); try { localStorage.setItem("bto.volume", String(v)); } catch { /* ignore */ } };
  return (
    <>
      <Desktop volume={volume} setVolume={setVolume} />
      {phase === "opener" && <Opener onBegin={() => setPhase(params.has("nowalk") ? "desktop" : "walk")} />}
      {phase === "walk" && <Walkthrough volume={volume} onDone={() => setPhase("desktop")} />}
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RunProvider><App /></RunProvider>
  </StrictMode>,
);
