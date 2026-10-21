# Behind the Order walkthrough (HyperFrames)

This is the voiced motion-graphics walkthrough for the Behind the Order simulation. It is about 2 min 10 s long, 1920×1080 at 30 fps, and follows the same house style as the Spot the Weak Question explainer. It plays after the MIVA logo opener and ends on "Let's begin".

The finished files are in `../walkthrough/`. That folder holds the MP4, the WebM, a version with burned-in captions, `captions.srt`, `.vtt`, `.js` and `transcript.md`.

## What it shows

1. Title and your role: public health law and ethics analyst
2. **The flag:** ComplianceWatch has flagged Tunde Balogun at 88%
3. **The stakes:** a hearing in five days, and the possible outcomes, including a petition to detain him
4. **Why it matters:** a risk score is not proof, so look behind the number
5. Opening Compliance Sandbox from a Windows 11 desktop
6. The case queue, then reading the whole record
7. Making a judgement: the four kinds of task, then a tier assigned by drag or More › Move to
8. Draft versus commit, with a confirmation dialog
9. The case file: record why, not just what
10. Minimise and restore
11. "Let's begin"

It first sets up the situation and why the task matters, then teaches the tools. Act II and the Bridge stay hidden, and the triage note is never modelled. See `BRIEF.md` and `STORYBOARD.md`.

## Files

| Path | What it is |
|---|---|
| `index.html` | The composition: one GSAP timeline, seek-safe, every tween a `fromTo` |
| `BRIEF.md`, `frame.md`, `STORYBOARD.md` | Brief, design truth, and beat plan |
| `assets/vo2/` | The twelve voiceover lines (ElevenLabs, Ifeoma Odumodu, eleven_multilingual_v2, stability 0.6, similarity 0.8, speed 0.92) |
| `assets/icons/` | Fluent System Icons SVGs, `@fluentui/svg-icons@1.1.344` (MIT). They are inlined into `index.html` by `tools/inline-icons.mjs` |
| `assets/img/wallpaper.jpg` | An original wallpaper generated with Higgsfield `gpt_image_2_5` for this film (`wallpaper-src.png` is the 1344×752 original) |
| `assets/img/miva-mark.png`, `assets/fonts/` | The MIVA mark, Afacad and Manrope, copied from the SWQ explainer |

## Rebuild

```bash
node tools/inline-icons.mjs        # only after adding or changing an icon in assets/icons/
npx hyperframes@0.8.149 check      # lint, runtime, layout, motion and contrast
npx hyperframes@0.8.149 render --fps 30 --quality looks -o renders/behind-the-order-walkthrough.mp4
```

To change a line, regenerate its `assets/vo2/v<nn>-*.mp3` with the same voice settings. Then update that line's `<audio data-start>`, the story timings (`goA`) or the `SEG` time map for the app beats, and `../walkthrough/captions.*`.

## Known limits

- **Fonts:** the Windows chrome (title bar, taskbar clock) is specified in Segoe UI Variable. That font can't be bundled, so the film draws that chrome text in Manrope.
- **Placeholder data:** Case 01 and Cases 04–10 show "—" until the authorised triage dataset exists, as the build prompt requires.
- **Keep in sync with the app:** the film recreates the app's screens (`../app`). If those screens change, update the film to match.
