import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  CheckmarkCircle16Filled, Warning20Filled, Info20Filled, CheckmarkCircle20Filled, ReOrderDotsVertical20Regular,
  TrayItemAdd20Regular, Dismiss16Regular, LockClosed16Filled,
} from "@fluentui/react-icons";
import { useRun } from "../state/store";

export function InfoBar({ tone = "info", children }: { tone?: "info" | "ok" | "warn"; children: ReactNode }) {
  return (
    <div className={`infobar ${tone === "info" ? "" : tone}`} role="status">
      {tone === "ok" ? <CheckmarkCircle20Filled /> : tone === "warn" ? <Warning20Filled /> : <Info20Filled />}
      <div>{children}</div>
    </div>
  );
}

export function Dialog({ title, children, confirm, cancel = "Cancel", onConfirm, onCancel }: { title: string; children: ReactNode; confirm: string; cancel?: string; onConfirm: () => void; onCancel: () => void }) {
  const ok = useRef<HTMLButtonElement>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { ok.current?.focus(); const k = (e: KeyboardEvent) => e.key === "Escape" && onCancel(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onCancel]);
  return (
    <div className="smoke">
      <div className="dialog" role="alertdialog" aria-modal="true" aria-labelledby="dlg-t">
        <div className="dialog-b"><h2 className="h2" id="dlg-t">{title}</h2>{children}</div>
        <div className="dialog-f">
          <button ref={ok} className="btn accent" disabled={busy} onClick={() => { setBusy(true); onConfirm(); }}>{confirm}</button>
          <button className="btn" onClick={onCancel}>{cancel}</button>
        </div>
      </div>
    </div>
  );
}

/** One-time first-use hint (Windows TeachingTip). Never contains an answer. */
export function Tip({ id, title, children, style, hide }: { id: string; title: string; children: ReactNode; style: React.CSSProperties; hide?: boolean }) {
  const k = `bto.tip.${id}`;
  const [show, setShow] = useState(() => { try { return !sessionStorage.getItem(k); } catch { return true; } });
  if (!show || hide) return null;
  return (
    <div className="tip" role="note" style={style}>
      <b>{title}</b>{children}
      <div><button className="btn" onClick={() => { setShow(false); try { sessionStorage.setItem(k, "1"); } catch { /* ignore */ } }}>Got it</button></div>
    </div>
  );
}

export function SaveState() {
  const { save, retrySave } = useRun();
  if (save === "error") return <span className="save-state err"><Warning20Filled />Couldn't save the draft <button className="link" onClick={retrySave}>Retry</button></span>;
  if (save === "saved") return <span className="save-state ok"><CheckmarkCircle16Filled />Draft saved</span>;
  return <span className="save-state">Draft</span>;
}

export function Strip({ children, left }: { children: ReactNode; left?: ReactNode }) {
  return (
    <div className="strip">
      <SaveState />
      {left}
      <span className="grow" />
      {children}
    </div>
  );
}

export function Committed({ label = "On record" }: { label?: string }) {
  return <span className="tag lock"><LockClosed16Filled />{label}</span>;
}

// ---------------- Assignment board: drag, click-to-place, keyboard ----------------
export interface SortItem { id: string; label: string }
export interface SortBin { id: string; label: string }
interface SortProps<B extends string> {
  items: SortItem[]; bins: SortBin[]; value: Record<string, B | undefined>; onChange: (id: string, bin: B | undefined) => void;
  disabled?: boolean; poolLabel: string; renderExtra?: (item: SortItem, bin: B | undefined) => ReactNode; binIcon?: ReactNode; layout?: "stack" | "row";
  onItemOpen?: (id: string) => void; poolHeader?: ReactNode; binsHeader?: ReactNode;
}
export function SortBoard<B extends string>({ items, bins, value, onChange, disabled, poolLabel, renderExtra, binIcon, onItemOpen, poolHeader, binsHeader }: SortProps<B>) {
  const [picked, setPicked] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [drag, setDrag] = useState<string | null>(null);
  const pool = items.filter((i) => !value[i.id]);
  const place = (bin: B | undefined) => { if (picked && !disabled) { onChange(picked, bin); setPicked(null); } };
  const token = (i: SortItem) => (
    <div key={i.id} className="item-card">
      <button
        className={`token ${drag === i.id ? "dragging" : ""}`}
        aria-pressed={picked === i.id}
        aria-label={`${i.label}${value[i.id] ? `, in ${bins.find((b) => b.id === value[i.id])?.label}` : ", not yet sorted"}. ${picked === i.id ? "Selected: choose a category." : "Select to move."}`}
        draggable={!disabled}
        disabled={disabled}
        onDragStart={(e) => { e.dataTransfer.setData("text/plain", i.id); e.dataTransfer.effectAllowed = "move"; setDrag(i.id); setPicked(null); }}
        onDragEnd={() => { setDrag(null); setOver(null); }}
        onClick={() => { setPicked(picked === i.id ? null : i.id); onItemOpen?.(i.id); }}
      >
        <ReOrderDotsVertical20Regular />{i.label}
      </button>
      {renderExtra?.(i, value[i.id])}
    </div>
  );
  const dropProps = (bin: B | undefined, key: string) => ({
    onDragOver: (e: React.DragEvent) => { if (!disabled) { e.preventDefault(); setOver(key); } },
    onDragLeave: () => setOver((o) => (o === key ? null : o)),
    onDrop: (e: React.DragEvent) => { e.preventDefault(); const id = e.dataTransfer.getData("text/plain"); if (id && !disabled) onChange(id, bin); setOver(null); setDrag(null); },
  });
  return (
    <div className="sortboard" style={{ display: "contents" }}>
      <section className="pane" aria-label={poolLabel} {...dropProps(undefined, "pool")}>
        {poolHeader}
        <div className="h3" style={{ marginBottom: 8 }}>{poolLabel}</div>
        <div className="pool">
          {pool.length ? pool.map(token) : <div className="pool-empty">All items are sorted. Select an item in a category to move it.</div>}
          {picked && value[picked] && <button className="btn subtle" onClick={() => place(undefined)}><Dismiss16Regular />Return to list</button>}
        </div>
      </section>
      <section className="pane tint" aria-label="Categories">
        {binsHeader}
        <div className="targets">
          {bins.map((b) => {
            const inBin = items.filter((i) => value[i.id] === b.id);
            return (
              <div key={b.id} className={`target ${over === b.id ? "over" : ""} ${picked ? "armed" : ""}`} {...dropProps(b.id as B, b.id)}>
                <button className="target-h" style={{ border: 0, background: "none", padding: 0, textAlign: "left", width: "100%" }} disabled={!picked || disabled} aria-label={`Place in ${b.label}`} onClick={() => place(b.id as B)}>
                  {binIcon ?? <TrayItemAdd20Regular />}{b.label}<span className="n">{inBin.length || ""}</span>
                </button>
                {inBin.length > 0 && <div className="target-items" style={{ flexDirection: "column", alignItems: "stretch" }}>{inBin.map(token)}</div>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
