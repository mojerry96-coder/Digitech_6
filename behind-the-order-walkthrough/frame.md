# frame.md — Behind the Order walkthrough

Brand truth: the MIVA house film style (from `swq-explainer-video/frame.md`) carries the ground, the headlines and the motion. The app inside is a Windows 11 application (`../reference/WINDOWS11_REFERENCE.md`).

## Palette

| Role | Hex |
|---|---|
| Ground | `#FFFDF8` → `#FDF7EC`, with four drifting blooms: blue `#005FB8` @ 14%, cream `#FCEBCC`, amber `#EE9B01` @ 12%, mint `#27C88A` @ 10% |
| Headline ink / neutral words | `#0A2437` / `#4C5C6B` |
| Accent (key words, buttons, selection, focus, cursor ripple) | `#005FB8` (Windows 11 light accent) |
| Title block | Amber `#EE9B01` with brown `#472E00` text, behind "Order" |
| Window base (Mica) / layer | `#F3F3F3` / `#FFFFFF` with 1px `rgba(0,0,0,.0578)` |
| Text primary / secondary | `rgba(0,0,0,.896)` / `rgba(0,0,0,.606)` |
| Close-button hover | `#C42B1C` |
| Success / caution | `#0F7B0F` on `#DFF6DD` / `#9D5D00` on `#FFF4CE` |

## Type

| Role | Family | Use |
|---|---|---|
| Film headlines and title | Afacad 650 | 92px headlines, 150px title |
| App headings | Afacad 600 | Work-area titles |
| App body and controls | Manrope 500–700 | Rows, fields, buttons |
| Windows chrome | Segoe UI Variable stack (renders as Manrope here) | Title bar caption, taskbar clock |

## Shape

- Window: 8px radius at 1:1 (scaled with the window), 1px stroke, shadow `0 32px 96px rgba(0,0,0,.18)`. The 32px title bar has 46×32 caption buttons.
- Controls: 4px radius. Flyouts, dialogs and the teaching tip: 8px.
- 3D pose at rest is rotateY −8°, rotateX 3°; it flattens on push-ins.

## Easing (only these)

emphasized-decel `0.05,0.7,0.1,1` · emphasized-accel `0.3,0,0.8,0.15` · standard `0.2,0,0,1` · gentle-in-out `0.65,0,0.35,1` · pop `back.out(1.6)`.

## Do / don't

- One focal point per moment; depth of field does the staging.
- No correctness cues: no green on tiers, and no highlighted field.
- No invented statistics, no gradient text and no glow on type.
