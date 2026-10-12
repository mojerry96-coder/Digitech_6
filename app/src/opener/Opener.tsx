import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight20Regular } from "@fluentui/react-icons";
import { A } from "../asset";

/** MIVA house opener (OPENER.md), retitled for Behind the Order. The row slides; the logos do not fly. */
export function Opener({ onBegin }: { onBegin: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const begin = useRef<HTMLButtonElement>(null);
  const [cls, setCls] = useState<string[]>([]);
  const [shown, setShown] = useState(0);
  const [inSet, setInSet] = useState<boolean[]>([false, false, false]);
  const [setSet, setSetSet] = useState<boolean[]>([false, false, false]);
  const [out, setOut] = useState(false);
  const timers = useRef<number[]>([]);

  const centreOn = useCallback((count: number) => {
    const r = row.current; if (!r) return;
    const logos = [...r.querySelectorAll<HTMLElement>(".op-logo")].slice(0, Math.max(count, 1));
    const first = logos[0], last = logos[logos.length - 1];
    const mid = (first.offsetLeft + last.offsetLeft + last.offsetWidth) / 2; // layout positions, not rects (rects include the entry scale)
    const rowMid = r.offsetLeft + r.offsetWidth / 2;
    r.style.setProperty("--shift", `${rowMid - mid}px`);
  }, []);

  const showBegin = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setInSet([true, true, true]); setSetSet([true, true, true]); setShown(3); centreOn(3);
    setCls(["st-line", "st-title", "st-begin"]);
    window.setTimeout(() => begin.current?.focus({ preventScroll: true }), 50);
  }, [centreOn]);

  const finish = () => { setOut(true); window.setTimeout(onBegin, 650); };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.preventDefault(); showBegin(); } };
    window.addEventListener("keydown", onKey);
    const onResize = () => centreOn(shown || 1);
    window.addEventListener("resize", onResize);
    const imgs = [...(root.current?.querySelectorAll("img") ?? [])];
    Promise.all(imgs.map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))).then(() => requestAnimationFrame(() => {
      if (reduced) { showBegin(); return; }
      centreOn(1);
      const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
      const ENTER = 350, GAP = 1000, HOLD = 700;
      [0, 1, 2].forEach((i) => {
        at(ENTER + i * GAP, () => { setShown(i + 1); centreOn(i + 1); setInSet((x) => x.map((v, j) => v || j === i)); });
        at(ENTER + i * GAP + HOLD, () => setSetSet((x) => x.map((v, j) => v || j === i)));
      });
      const settled = ENTER + 2 * GAP + HOLD;
      at(settled + 500, () => setCls((c) => [...c, "st-line"]));
      at(settled + 750, () => setCls((c) => [...c, "st-title"]));
      at(settled + 1400, () => { setCls((c) => [...c, "st-begin"]); begin.current?.focus({ preventScroll: true }); });
    }));
    return () => { timers.current.forEach(clearTimeout); window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logo = (i: number, src: string, alt: string, w: string) => (
    <span className={`op-logo ${inSet[i] ? "in" : ""} ${setSet[i] ? "set" : ""}`}><img src={src} alt={alt} style={{ width: w }} /></span>
  );
  return (
    <div ref={root} className={`opener ${cls.join(" ")} ${out ? "out" : ""}`} role="dialog" aria-modal="true" aria-label="Behind the Order">
      <div className="op-motif" aria-hidden="true" />
      <div className="op-inner">
        <div className="op-logos" ref={row}>
          {logo(0, A("assets/logos/ekiti.svg"), "Government of Ekiti State, Nigeria", "clamp(46px, 7vw, 74px)")}
          <span className="op-rule" aria-hidden="true" />
          {logo(1, A("assets/logos/miva.svg"), "MIVA Open University", "clamp(96px, 15vw, 164px)")}
          <span className="op-rule" aria-hidden="true" />
          {logo(2, A("assets/logos/tof.svg"), "Tunji Olowolafe Foundation", "clamp(70px, 11vw, 118px)")}
        </div>
        <p className="op-tag">Study. Anywhere. Anyone. Anytime.</p>
        <h1 className="op-title">Behind the <em>Order</em></h1>
        <p className="op-sub">Public Health Policy, Law &amp; Ethics</p>
        <button ref={begin} className="op-begin" type="button" onClick={finish}>Begin <ArrowRight20Regular /></button>
      </div>
      <button className="op-skip" type="button" onClick={showBegin}>Skip <kbd>Esc</kbd></button>
    </div>
  );
}
