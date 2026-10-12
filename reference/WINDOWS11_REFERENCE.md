# Windows 11 reference: the shell and app chrome for Compliance Sandbox

**Direction (user, 12 Oct 2026):** the build must be clean and minimal, look like a Windows 11 application, and every window function must work (minimise, maximise/restore, close and the rest), with clear, intuitive interaction.

**Sources:** Microsoft Learn, *Title bar design* (updated 31 Jul 2024), *Geometry in Windows 11* (updated 19 Feb 2026) and *Typography in Windows*, all read 12 Oct 2026. Colour tokens are the WinUI 3 light-theme resources.

**How the references divide:** Windows 11 governs the **look and window behaviour**. DHIS2 (see `DHIS2_REFERENCE.md`) governs the **information structure**: the context line, list → record, stage/event history, notes widgets and the map canvas.

## 1. Title bar (Microsoft spec)

| Item | Spec |
|---|---|
| Height | **32px** standard. Use 48px only if a search box or account picture is placed in the title bar (we don't). |
| Background | Mica: blends with the window, no separate band. Elements turn semi-transparent when the window is **inactive**. |
| Icon | 16×16, 16px from the left edge, vertically centred (8px top and bottom). Single click opens the window menu; **double-click closes**. |
| Title | 16px after the icon, Segoe UI Variable, **Caption style (12px)**, truncates with an ellipsis. Caption buttons are never hidden. |
| Drag | All empty title-bar space moves the window. |
| Double-click empty space | Toggles maximise and restore. |
| Right-click | Opens the system window menu: Restore, Move, Size, Minimise, Maximise, Close. |
| Caption buttons | Minimise, Maximise or Restore, and Close, each **46×32** with a full-bleed backplate. Maximise and Restore glyphs have rounded corners. They have rest, hover, pressed and inactive states. Hover on Minimise or Maximise uses `rgba(0,0,0,.0373)`. **Hover on Close is red `#C42B1C` with a white glyph.** |

## 2. Geometry (Microsoft spec)

| Radius | Applies to |
|---|---|
| **8px** | App windows, flyouts, dialogs, TeachingTip, menus |
| **4px** | Buttons, text boxes, combo boxes, list backplates, sliders, progress bars, tooltips |
| **0px** | Maximised or snapped windows; edges where controls touch, such as the two halves of a split button |

## 3. Typography (Microsoft spec)

- Use **one font** throughout: **Segoe UI Variable**, at Regular and **Semibold only** (no bold, no italic). Sentence case everywhere. Minimum sizes are 12px Regular and 14px Semibold.
- Type ramp in px (size/line height):

| Style | Size/line height | Weight |
|---|---|---|
| Caption | 12/16 | Regular |
| Body | 14/20 | Regular |
| Body strong | 14/20 | Semibold |
| Body large | 18/24 | Regular |
| Subtitle | 20/28 | Semibold |
| Title | 28/36 | Semibold |
| Title large | 40/52 | Semibold |
| Display | 68/92 | Semibold |

- Line length should be 50–60 characters.
- **Web caveat:** Segoe UI Variable is only present on Windows machines and can't be bundled. Use the stack `"Segoe UI Variable Text", "Segoe UI Variable", "Segoe UI", Selawik, system-ui`. Selawik is Microsoft's open-licence, metric-compatible fallback; bundle it so Mac and Android learners still see a Windows-like face.

## 4. Colour (WinUI 3 light theme)

| Role | Value |
|---|---|
| Window base (Mica approximation) | `#F3F3F3` |
| Layer / card | `#FFFFFF` at ~70% (`rgba(255,255,255,.70)`) over the base, 1px stroke `rgba(0,0,0,.0578)` |
| Text primary / secondary / disabled | `rgba(0,0,0,.896)` / `rgba(0,0,0,.606)` / `rgba(0,0,0,.361)` |
| Accent (primary button, selection, focus) | `#005FB8`. Hover `#196EBF`, pressed `#3183CA` |
| Control fill / stroke | `rgba(255,255,255,.70)`, stroke `rgba(0,0,0,.0578)` with a slightly darker bottom edge |
| Subtle hover | `rgba(0,0,0,.0373)` |
| Focus ring | 2px outer black at 90% plus a 1px inner white ring (Windows "focus visual") |
| Status | Success `#0F7B0F`, Caution `#9D5D00`, Critical `#C42B1C`, each with a pale fill and a text label |

**Decided (user, 12 Oct 2026):** the accent is Windows blue `#005FB8`. It replaces the build prompt's `#176BFF`.

## 5. Desktop, taskbar and Start (Windows 11 conventions)

- **Taskbar:** 48px high, Mica/acrylic, with icons **centred**: Start, Search, File Explorer (Case files) and Compliance Sandbox. The system tray at the right shows network, volume, then time over date.
- **Running indicator:** a small grey dash under the icon when the app is open. When the app is focused, the dash is longer and in the accent colour. Clicking the icon of a focused window minimises it; clicking a minimised one restores it.
- **Start and Search:** flyouts that rise from the taskbar, with 8px radius and acrylic. Start lists *Pinned*: Compliance Sandbox and Case files.
- **Desktop icons:** a 32–48px glyph with a label under it. Single click selects (pale blue backplate); double-click opens. Our spec also opens on a single click, Enter or Space, for clarity.
- **Window open, minimise and restore animations:**
  - Open scales 0.95 → 1 with a fade over roughly 150–250ms.
  - Minimise shrinks toward the taskbar icon.
  - Under reduced motion, the window appears instantly.

## 6. Window behaviours to implement ("all the functionalities present")

| Behaviour | Implement | Note |
|---|---|---|
| Minimise, maximise/restore, close buttons | Yes | Close autosaves, and reopening resumes the run (build prompt md:290). |
| Drag the title bar to move | Yes | Keep at least 48px of the title bar on screen. |
| Double-click the title bar to maximise/restore | Yes | |
| Resize from edges and corners | Yes | Minimum about 1024×640; content reflows. |
| Right-click the title bar for the system menu | Yes | Restore, Move, Size, Minimise, Maximise, Close. |
| Taskbar icon click to minimise/restore | Yes | |
| Active/inactive window state | Yes | Clicking the desktop deactivates the window, and the title bar dims. |
| Snap layouts (hover on maximise) | Optional | Only "Maximise" and "Restore" carry meaning here. |
| Keyboard | Partial | Alt+Space opens the system menu; browsers swallow Win and Alt+F4 shortcuts. Every caption button is reachable by Tab and has a label. |

## 7. Making the interaction obvious (Windows 11 patterns)

- **TeachingTip** (an 8px callout pointing at a control) gives a one-line first-use hint per tool, such as "Drag a case into a tier, or select it and choose." It is dismissible, shown once, and never gives an answer.
- **InfoBar** (a full-width strip under the page header) shows status: "Draft saved", "Confirmed: this decision is now on record", and save-failure messages with Retry.
- **Command bar / footer:** one **accent** button for the commit action and standard buttons for everything else. Only one accent button per view.
- **ContentDialog** asks for confirmation before any irreversible commit: "Confirm triage? You can't change tiers after this." It offers a primary and a close button.
- **Empty states** state what goes here and how to add it.
- **Selection:** list rows use a subtle hover backplate and a **left accent pill** with a pale tint for the selected row, as in File Explorer and Settings.

## 8. Decisions and changes to the build prompt (user, 12 Oct 2026)

1. **Fonts: keep Afacad and Manrope inside the app content** (the user's choice, overriding §3's single-font advice). Afacad is for work-area headings, and Manrope for body text, tables, inputs and buttons. **Windows chrome stays in the Segoe stack**: title bar, caption buttons, taskbar, Start/Search flyouts, the system window menu and tooltips. Bundle Selawik so non-Windows machines get it too.
2. **Icons: Fluent System Icons** (`@fluentui/react-icons`, MIT licence), Regular weight at 20px and Filled for selected states. They **replace Phosphor** (build prompt md:94, md:361–402). The desktop app tile becomes the Fluent `Database` glyph in white on accent.
3. **Accent: `#005FB8`**, plus the §2 radii and §4 tokens, in place of md:406–426.
4. **Title bar:** the build prompt's 40–44px becomes the Windows standard 32px, with 46×32 caption buttons.
5. **DHIS2 role:** DHIS2 supplies the information structure only. Its visual skin (blue app bar, Roboto) is not used.
6. **Scene 8 map: keep it as a simple drawn map.** It is a made-up county drawn in-app with 6–8 districts, clinic pins, an evening-transit overlay and 40 case dots, with no map library. Learners predict by tapping districts (not freehand), which can be scored and works by keyboard. The layout follows DHIS2 Maps: a layer card on the left and a tool stack on the right.
