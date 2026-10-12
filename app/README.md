# Behind the Order · Compliance Sandbox

This is the playable Behind the Order simulation.

1. The MIVA logo opener plays, followed by the narrated walkthrough.
2. A Windows 11 desktop appears, with the **Compliance Sandbox** app.
3. The learner plays six case-review scenes, then a read-only Bridge ("Three months later", Exhibit 7 of 11), then six county-review scenes.
4. A compound outcome report closes the run.

Everything runs in the browser. There is no backend.

## Run it

```bash
cd app
npm install
npm run dev        # http://localhost:5174
npm run build      # static build in dist/ (relative paths, so it can be hosted anywhere or packaged for the LMS)
npm test           # branch-logic checks (careless and careful runs)
```

URL options: `?skipintro` goes straight to the desktop, and `?nowalk` skips the walkthrough.

**Progress:**
- Progress autosaves to `localStorage` (`behind-the-order.run.v1`).
- Closing the window or reloading the page resumes the run.
- **Run again** on the outcome report is the only ordinary way to start over.
- To reset manually, clear site data.

## What works

**Desktop (Windows 11 spec in `../reference/WINDOWS11_REFERENCE.md`)**
- Desktop icons: Recycle Bin, Compliance Sandbox, Case files.
- A 6-second "Open Compliance Sandbox" hint.
- Centred taskbar with running and active indicators.
- Start and Search flyouts.
- Network and Sound flyouts (the sound slider sets the walkthrough volume).
- A live clock.

**Windows**
- 32px title bar with minimise, maximise/restore and close buttons (Close hovers red).
- Drag to move, and double-click the title bar to maximise.
- Resize from the edges.
- Right-click the title bar, click the window icon, or press Alt+Space for the system menu.
- Clicking the taskbar icon minimises or restores. Clicking the desktop deactivates the window.
- Closing autosaves, and reopening resumes the run.
- Hidden windows leave the tab order. Focus returns to the taskbar button on minimise and close.

**The app**
- DHIS2-style structure: case list → record, breadcrumb, record widgets and notes. See `../reference/DHIS2_REFERENCE.md`.
- Afacad headings, Manrope body text, Fluent icons and `#005FB8`.

**Scenes**
- All 12 storyboard scenes, the passive Bridge and the outcome. Each scene's interaction is described in `src/scenes/*`.
- Every drag has a click-to-select-then-place alternative and keyboard access.
- Committed decisions go through a confirmation dialog, then lock.
- "Draft saved" appears only after a real write succeeds. If a write fails, a Retry appears.

**Carry-over**
- The Act I record is snapshotted at the Bridge and can't be rewritten.
- Act II reads only that snapshot: the Bridge, the Scene 7 name click, the Scene 8 inset, the Scene 10 spot-check, the Scene 11 Exhibit 7 check, the Scene 12 minutes card and the outcome.

**Feedback**
- The per-scene storyboard feedback appears in **Review my decisions**, not before commitment.
- Help explains how the tools work, never what to decide.

## Not storyboard content

Every gap the storyboard leaves is filled with a labelled fixture. See **docs/CONTENT_FIXTURES.md** before using this as a real assessment.

## Structure

| Path | What it is |
|---|---|
| `src/shell/` | Desktop, taskbar, flyouts, the window manager (`windows.ts`) and the window component |
| `src/app/` | Compliance Sandbox frame (header, tabs, Case file drawer, Help) and the record helpers |
| `src/scenes/` | S1–S12, Bridge, Outcome |
| `src/state/` | One persistent run model (`run.ts`: snapshot, scoring, policy check, endings) and the store (`store.tsx`: autosave, commit, immutability) |
| `src/content/scenario.ts` | All scenario text and data, with fixtures marked |
| `src/opener/` | MIVA opener (house spec, retitled) and the walkthrough player |
| `public/assets/` | Fonts, wallpaper, scene images, partner logos, walkthrough video |
| `tests/` | Branch checks |
