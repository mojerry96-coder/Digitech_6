# Behind the Order walkthrough (HyperFrames)

This is the voiced motion-graphics walkthrough for the Behind the Order simulation. It is 47 seconds long, 1920×1080 at 30 fps, and follows the same house style as the Spot the Weak Question explainer. It plays after the MIVA logo opener and ends on "Let's begin".

The finished files are in `../walkthrough/`. That folder holds the MP4, the WebM, a version with burned-in captions, `captions.srt`, `.vtt`, `.js` and `transcript.md`.

## What it shows

1. Title
2. Opening Compliance Sandbox from a Windows 11 desktop
3. The case queue
4. Reading the record beyond the score
5. Assigning a tier (drag, or More › Move to)
6. Draft versus commit, with a confirmation dialog
7. The case file
8. Minimise and restore
9. "Let's begin"

It teaches the tools only. Act II and the Bridge stay hidden, and the triage note is never modelled. See `BRIEF.md` and `STORYBOARD.md`.

## Files

| Path | What it is |
|---|---|
| `index.html` | The composition: one GSAP timeline, seek-safe, every tween a `fromTo` |
| `BRIEF.md`, `frame.md`, `STORYBOARD.md` | Brief, design truth, and beat plan |
| `assets/vo/` | The nine voiceover lines (ElevenLabs, Ifeoma Odumodu, eleven_multilingual_v2, stability 0.6, similarity 0.8) |
| `assets/icons/` | Fluent System Icons SVGs, `@fluentui/svg-icons@1.1.344` (MIT). They are inlined into `index.html` by `tools/inline-icons.mjs` |
| `assets/img/wallpaper.jpg` | An original wallpaper generated with Higgsfield `gpt_image_2_5` for this film (`wallpaper-src.png` is the 1344×752 original) |
| `assets/img/miva-mark.png`, `assets/fonts/` | The MIVA mark, Afacad and Manrope, copied from the SWQ explainer |

## Rebuild

```bash
node tools/inline-icons.mjs        # only after adding or changing an icon in assets/icons/
npx hyperframes@0.8.149 check      # lint, runtime, layout, motion and contrast
npx hyperframes@0.8.149 render --fps 30 --quality looks -o renders/behind-the-order-walkthrough.mp4
```

To change a line, regenerate its `assets/vo/vo<n>-*.mp3` with the same voice settings. Then move that line's `<audio data-start>` and the beat times in the script, and update `../walkthrough/captions.*`.

## Known limits

- **Fonts:** the Windows chrome (title bar, taskbar clock) is specified in Segoe UI Variable. That font can't be bundled, so the film draws that chrome text in Manrope.
- **Placeholder data:** Case 01 and Cases 04–10 show "—" until the authorised triage dataset exists, as the build prompt requires.
- **Ahead of the app:** the app itself isn't built yet. If its final screens differ, re-sync this film with them.
