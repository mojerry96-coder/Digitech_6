---
workflow: general-video
flow: automation
storyboard: no
message: "Read each case beyond its score, and know that confirming puts a decision on record."
destination: in-app walkthrough
aspect: 1920x1080
language: en-GB
audience: "MIVA learners, Public Health Policy, Law & Ethics (Behind the Order simulation)"
length: 45s
angle: product-ui-explainer
---

## Intent

A voiced motion-graphics UI explainer for the Behind the Order simulation. It plays once after the MIVA logo opener and ends on a "Let's begin" end card. It teaches the tools only: the Windows 11 desktop, opening Compliance Sandbox, the case queue, reading the record, assigning a tier (drag or select), draft versus commit, the case file, and minimise/restore. **Act II and the Bridge stay hidden** (user decision); County review appears only as a locked tab.

The user's instruction for this run was: "build this do not stop till you are done for images you need generate them". The plan-and-sketch pause was therefore skipped (`storyboard: no` for this run), although the 9-beat plan was reviewed in chat first.

## Assets

- Motion language: `/Users/mosesjeremiah/Downloads/motion-graphics-breakdown.md`.
- Template and house style: `/Users/mosesjeremiah/digitech 4/swq-explainer-video` (structure, easing, cursor, blooms).
- App look: `../reference/WINDOWS11_REFERENCE.md` (chrome) and `../reference/DHIS2_REFERENCE.md` (information structure).
- Icons: Fluent System Icons, `@fluentui/svg-icons@1.1.344` (MIT), in `assets/icons/`.
- Wallpaper: an original image generated with Higgsfield `gpt_image_2_5`, in `assets/img/wallpaper.jpg`.
- MIVA mark: copied from the SWQ project.

## Customizations

- App content uses Afacad headings and Manrope body text. Windows chrome uses the Segoe UI Variable stack; the render machine (macOS) has no Segoe, so chrome text in the film falls back to Manrope. Fluent icons. Accent `#005FB8`.
- No real figures beyond the source: Tunde 88% and Case 02 91%. Other queue rows are kept out of focus, and the tier demo uses a neutral "Demo case".
- The film never models writing the triage note (it is the storyboard's highest-leverage assessed choice).

## Notes

- Voiceover: ElevenLabs "Ifeoma Odumodu - Nigerian Narrator" (`reGkImJki7uJOve2F4A0`), eleven_multilingual_v2, stability 0.6, similarity 0.8, the same as the earlier MIVA films. Nine lines in `assets/vo/`. No music or SFX.
- British English throughout.
