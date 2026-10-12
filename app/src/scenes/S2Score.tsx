import { useState } from "react";
import { ChevronRight12Regular, ChevronDown16Regular, ChevronUp16Regular, DocumentText20Regular } from "@fluentui/react-icons";
import { useRun } from "../state/store";
import { SCORE_ITEMS, EV_BINS, type EvBin } from "../content/scenario";
import { Strip, SortBoard, Dialog, Tip } from "../ui/kit";

export function S2() {
  const { run, edit, commit } = useRun();
  const [confirming, setConfirming] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const s = run.s2;
  const sorted = SCORE_ITEMS.filter((i) => s.bins[i.id]).length;

  return (
    <div className="workspace">
      <div className="regions" style={{ ["--cols" as string]: "minmax(320px, 55fr) minmax(280px, 45fr)", position: "relative" }}>
        <SortBoard<EvBin>
          items={SCORE_ITEMS} bins={EV_BINS} value={s.bins} poolLabel="Evidence items"
          onChange={(id, bin) => edit((d) => { if (bin) d.s2.bins[id] = bin; else delete d.s2.bins[id]; })}
          onItemOpen={(id) => id === "disclaimer" && edit((d) => { d.s2.disclaimerOpened = true; })}
          poolHeader={<><div className="crumb">Case review<ChevronRight12Regular />Score review</div><h1 className="title">Read beyond the score</h1><p className="lede" style={{ marginBottom: 18 }}>Tunde Balogun</p></>}
          binsHeader={<><h2 className="h2" style={{ marginTop: 26 }}>Evidence assessment</h2><p className="lede" style={{ marginBottom: 14 }}>Sort the evidence.</p><Tip hide={sorted > 0} id="s2" title="Sort the evidence" style={{ right: 24, bottom: 16 }}>Drag each item to a category, or select it and choose. You can add a reason to items you place in Strong or Weak.</Tip></>}
          renderExtra={(item, bin) => (
            <>
              <button className="expand" aria-expanded={open === item.id} onClick={() => { setOpen(open === item.id ? null : item.id); if (item.id === "disclaimer") edit((d) => { d.s2.disclaimerOpened = true; }); }}>
                {open === item.id ? <ChevronUp16Regular /> : <ChevronDown16Regular />}{item.id === "disclaimer" ? "Read the model card" : "Details"}
              </button>
              {open === item.id && <p className="sub" style={{ margin: 0, fontSize: 13 }}>{SCORE_ITEMS.find((x) => x.id === item.id)!.detail}</p>}
              {(bin === "strong" || bin === "weak") && (
                <label className="note-inline"><DocumentText20Regular style={{ width: 16, height: 16, color: "var(--ink-2)", flex: "none" }} />
                  <input className="textbox" placeholder="Your reason (optional, travels with the file)" value={s.notes[item.id] ?? ""} maxLength={160}
                    onChange={(e) => edit((d) => { d.s2.notes[item.id] = e.target.value; })} aria-label={`Reason for ${item.label}`} />
                </label>
              )}
            </>
          )}
        />
      </div>
      <Strip left={<span className="count">{sorted} of 6 sorted</span>}>
        <button className="btn accent" disabled={sorted < 6} onClick={() => setConfirming(true)}>Save assessment</button>
      </Strip>
      {confirming && (
        <Dialog title="Save assessment?" confirm="Save" onCancel={() => setConfirming(false)} onConfirm={() => commit("s2")}>
          <p>Your categories and any reasons you wrote become part of the case file. You can't change them afterwards.</p>
        </Dialog>
      )}
    </div>
  );
}
