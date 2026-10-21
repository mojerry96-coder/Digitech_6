---
format: 1920x1080
duration: 130s
message: "A risk score is not proof: look behind the number, decide carefully, and record why."
arc: Title and role → The flag → The stakes → Why it matters → Desktop and launch → Queue → Read the whole record → Make a judgement → Draft vs commit → Case file → Minimise/restore → Let's begin
audience: "MIVA learners, Behind the Order"
---

# Behind the Order walkthrough storyboard

## Version 2 (21 Oct 2026): story first

A test viewer didn't understand version 1 because it explained the tools but not the situation. Version 2 adds three story beats before the interface, and gives the tool tour narration that explains why each step matters.

| Time | Beat | On screen | Narration (summary) |
|---|---|---|---|
| 0–9.5 | Title and role | "Behind the **Order**", then "YOUR ROLE · Public health law and ethics analyst · County health department" | Who you are |
| 10–28 | The flag | ComplianceWatch alert ("Predicts who may stop their treatment"), then Tunde Balogun's card with an "88% HIGH RISK" badge. Headline "A patient has been **flagged**" | What the system does, and who it flagged |
| 28–41.5 | The stakes | "Compliance hearing · In 5 days", then three equal outcome pills: More support · Close the flag · Court petition to detain. Headline "A decision about **freedom**" | What your recommendation can lead to |
| 42–57 | Why it matters | Everything falls away except the 88%, which moves to centre. Headline "A score is **not proof**". Three "?" cards come out from behind it: Visits and shifts · Language and interpreter · Order history | A score can't tell you why; look behind the number |
| 57–63 | Desktop | (v1 frame 2) | Where you'll work |
| 63–77 | Queue and record | (v1 frames 3–4), headline now "Read the **whole record**" | Select a case; read everything, not just the score |
| 77–93 | Make a judgement | Four task chips appear as they are named (Sort evidence · Link records · Weigh trade-offs · Recommend), then the drag demo | Each task asks for a judgement; how to move items |
| 93–100 | Draft vs confirm | (v1 frame 6), headline "Drafts save. Confirm **locks.**" | Confirming locks the decision |
| 100–112 | Case file | (v1 frame 7), headline "Record **why,** not just what" | Others may rely on your record, so record your reasons |
| 112–119 | Minimise | (v1 frame 8) | Your work is saved |
| 119–130 | Let's begin | (v1 frame 9), plan line "Read · Judge · Record why" | No single right score; explain your reasoning |

The app beats keep the v1 choreography. The `SEG` time map in `index.html` re-times them to the new voice.

## Version 1 (12 Oct 2026)


**Spine:** one Windows 11 desktop with the Compliance Sandbox window, which the camera moves around. One object rides the whole film: the app icon. It is clicked on the desktop to open the window, the window minimises into its taskbar copy, and that taskbar icon becomes the "Let's begin" button.

**Truthfulness:**
- The UI is the specified app (build prompt plus `../reference/WINDOWS11_REFERENCE.md`), rebuilt as layers.
- The only scores shown are Tunde (88%) and Case 02 (91%).
- The tier demo uses "Demo case · Example".
- Act II and the Bridge are not shown.
- The triage note is never written on screen.

**Easing:** only the five curves in `frame.md`.

## Frame 1 — Title (0.0–3.3)
- **motion:** kinetic-type-beats (soft-blur-in, spring-pop-entrance)
- **status:** built
- "COMPLIANCE SANDBOX" blurs in and out. "Behind the" arrives, then "Order" lands last on the amber block. The lockup flies through (scale 1.15, blur 25).

## Frame 2 — Desktop, open the app (3.1–7.5)
- **motion:** device-surface-showcase (3d-camera-flight, depth-of-field-blur), cursor-ui-demo
- **status:** built
- The desktop card rises defocused in 3D and settles flat. The cursor clicks the Compliance Sandbox icon. The desktop fills the frame, the window opens (fade and scale 0.94 → 1), and the taskbar accent indicator appears.

## Frame 3 — Start with the queue (7.5–13.3)
- **motion:** cursor-ui-demo, depth-of-field-blur
- **status:** built
- The camera pushes to the queue. The headline lands over the defocused empty record pane. The other rows defocus, and the cursor selects Tunde, which shows the accent pill and tint. The record fills in.

## Frame 4 — Read beyond the score (13.3–18.8)
- **motion:** viewport-change, depth-of-field-blur
- **status:** built
- Camera on the record. "Model score 88%" grows while the five other fields stay blurred. On "Read every field" the score settles and the fields focus one by one. No field is highlighted.

## Frame 5 — Assign a review tier (18.8–25.8)
- **motion:** cursor-ui-demo (drag), spring-pop-entrance
- **status:** built
- A teaching tip points at the tiers. "Demo case" is dragged from the queue edge into Routine follow-up, and the target highlights. Then More, Move to, and Enhanced monitoring this week move it.

## Frame 6 — Drafts save, confirm commits (25.8–30.6)
- **motion:** viewport-change, cursor-click-ripple
- **status:** built
- Camera on the action strip, which reads "Draft saved" and "10 of 10 assigned". Confirm triage opens a ContentDialog ("You can't change tiers after you confirm."). Confirming leaves "Triage confirmed" and "On record".

## Frame 7 — Your case file (30.6–34.6)
- **motion:** viewport-change, soft-blur-in (stagger)
- **status:** built
- The Case file button slides in a drawer. "Triage decision" reads Confirmed, and every other record reads "Not yet recorded".

## Frame 8 — Minimise anytime (34.6–41.2)
- **motion:** cursor-ui-demo
- **status:** built
- The minimise button shrinks the window into its taskbar icon, and the indicator turns into a grey dash. The headline appears on the wallpaper. Clicking the taskbar icon restores the window exactly as it was, with the drawer still open.

## Frame 9 — Let's begin (41.2–47.0)
- **motion:** cta-morph-press (card-morph-anchor)
- **status:** built
- The window minimises. The taskbar icon lifts off as the desktop dissolves, grows, and becomes the "Let's begin" pill. The MIVA mark and "Behind the Order" appear above, with "Case review · then county review" below. The end card holds with a slow push-in.
