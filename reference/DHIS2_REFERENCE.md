# DHIS2 reference: what Compliance Sandbox replicates

Inspected 12 Oct 2026 from the official DHIS2 documentation (Capture and Maps user guides, `dhis-core-version-master`). All screenshots below are DHIS2's own, from the Sierra Leone demo database. They are viewed by URL and not yet saved locally.

Base URLs:
- Capture: `https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/tracking-individual-level-data/resources/images/`
- Maps: `https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/analysing-data/resources/images/`

## 1. Screens inspected

| Screen | Image | What it shows |
|---|---|---|
| Working list | `tei_list_filters.png` | Context strip, tabs "Active / Completed / Cancelled enrollments", filter chips with dropdowns, table with checkbox column and sortable headers, right rail "Bulk data entry" |
| Working list entry | `tei_list.png` | "Search for person in program", collapsible search sections, "Saved lists in this program" chips |
| Enrollment dashboard | `enrollment-dash-read-only-full.png`, `enrollment-widget-note.png` | Breadcrumb, "Stages and Events" main widget, right rail of widgets |
| Stages and events | `enrollment-dash-stages-events-03.png` | Per-stage tables, status pills, "1 overdue" / "1 scheduled" counts, "+ New … event", row `⋯` menu |
| Top-bar context | `enrollment-dash-03.png` | Program · Organisation unit · Person · Enrollment selectors, each with a clear (×) and dropdown |
| Event view | `enrollment-event-view-edit-view.png` | Breadcrumb "Program overview › Enrollment dashboard › View event", label/value form sections, "Edit event" button, notes rail |
| Maps | `maps_main.png`, `maps_event_layer.png` | Full-canvas map, layer cards on the left with legend, zoom/tool stack on the right, data popup, "Interpretations" panel |

## 2. The structural pattern

1. **App bar.** A slim (~48px) DHIS2-blue bar with the app logo, instance name and app ("DHIS 2 Demo – Sierra Leone – Capture"), an "Online" status pill, messages and interpretations badges, an apps grid and an avatar.
2. **Context strip.** A white bar under the app bar holding labelled selectors split by fine vertical rules: `Program [icon] Child Programme ⊗ ⌄ | Organisation unit Ngelehun CHC ⊗ ⌄ | Person … | Enrollment …`. Actions come after it: "Create new person ⌄", "Search ⌄" and "Clear selections".
3. **Breadcrumb.** Small grey text: "Program overview › Enrollment dashboard › View event".
4. **Main column.** One large collapsible widget at a time. Its header has a bold title and a ⌃ collapse control, and it contains tables with sortable headers (↕) and row `⋯` menus.
5. **Right rail.** About 290px of stacked collapsible widgets: Quick actions, Notes about this enrollment (empty state plus a "Write a note…" input), Indicators (label/value rows), Person relationships, Person profile (label/value, Edit and `⋯`) and Enrollment (status pill plus icon rows).
6. **Status pills.** Small, rounded and pale-filled: Completed and Active in green, Overdue in red, Scheduled in grey-blue. They always carry text.
7. **Surfaces.** A light grey page, white widgets, 1px grey borders, about 4px radius, almost no shadow, and dense 13–14px Roboto.
8. **Read-only banner.** An inline info line at the top right: "View only – You only have view access to this enrollment". This is a direct precedent for the Bridge's read-only Act I record.

## 3. Mapping onto Compliance Sandbox

| DHIS2 element | Compliance Sandbox (lite, minimal) |
|---|---|
| Blue app bar with instance name | Light native title bar "Compliance Sandbox" (desktop window). Under it, the white app header "Compliance Review Unit", the Case review / County review tabs, and Case file / Help |
| Context strip (Program · Org unit · Person) | One compact context line: `Program  TB isolation orders · Unit  Compliance Review Unit · Person  Tunde Balogun`. It keeps the labelled-selector pattern, without clear buttons, because the learner can't change context |
| Working list table | Scene 1 "Flagged cases" list, with Case / Model score columns, sortable header affordance, selected-row tint and drag handle |
| Enrollment-status tabs | Not needed. Use one "10 awaiting review" count instead |
| Breadcrumb | "Case review › Triage", "Case review › Score review" and so on (the build prompt already specifies this) |
| Stages and Events widget | Scene 3 "Record timeline": Day 1, Day 6, Day 11 and Social-worker note as stage rows with status pills ("Missed", "Not actioned", "On file") |
| Person profile widget | Selected-case metadata grid: Model score, Missed DOT visits, Order history, Primary language, Interpreter requests |
| Notes about this enrollment | Triage note, score annotations and the interview record. Keep the "Write a note…" input pattern and the empty state "No note recorded" |
| Enrollment widget (status pill + icon rows) | Record state: "Draft", "Saved", "Committed", "Archived · Read-only" |
| Read-only banner | The Bridge's "Read-only" banner over the Act I record |
| Maps: full canvas, left layer card, right tool stack | Scene 8: full-bleed county map, a compact layer card (Flagged cases, Clinics, Evening transit) and a zoom/pen/eraser stack on the right edge |
| Maps: data popup | Case 7 inset popup ("Case 7 · Tunde Balogun · 88% risk score") |

## 4. Where we deliberately depart from DHIS2

- **Typography and colour:** Afacad and Manrope, navy ink and `#176BFF`, as the build prompt specifies (not Roboto, and not DHIS2's blue app bar).
- **Master-detail triage:** the list and the record are side by side (30/70). DHIS2 navigates from the list to a separate enrollment dashboard. This keeps the queue visible while tiers are assigned.
- **No enrollment, permissions or admin flows,** per build prompt md:62.
- **Custom mechanics** (tiers, evidence bins, weighting, policy assembly) use DHIS2's widget visual language, but they are not DHIS2 features.

## 5. Local copies

The nine PNGs listed in §1 were saved to `reference/dhis2/` on 12 Oct 2026 (1.7 MB). Capture images have a `capture-` prefix. They are DHIS2 documentation images (© HISP Centre, University of Oslo) and are kept for internal fidelity checks only. Don't ship them in the simulation.
