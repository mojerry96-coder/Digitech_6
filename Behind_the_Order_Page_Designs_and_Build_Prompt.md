# Behind the Order — Lite Software Design and Claude Build Prompt

Revised direction: a realistic workstation desktop launches a lite case-and-cohort application. Use this prompt with the original storyboard, the minimal UI guide, and the new desktop and application mockups. The new mockups take precedence over the original 15 mockups for the opening and shared software shell. The scene tasks and consequences remain those of the storyboard.

## Primary instruction to Claude — closely reproduce the software UI/UX

Build the simulation as a **lite software look-alike of the DHIS2 Tracker environment**, using the **DHIS2 Capture application** as the primary reference for individual-case screens. Closely reproduce the reference software's recognisable screen structure, control placement, information hierarchy, record navigation and interaction behaviour. Apply our minimal design specification to that structure. Software resemblance is an acceptance requirement, not an optional source of inspiration.

The learner should feel they are operating a credible public-health data system. The case list, selected record, evidence fields, stage/history views, notes, save states and cohort tools should have the functional relationships seen in the reference. Keep the simulation's own **Compliance Sandbox** identity and the realistic Windows-style desktop launch. The twelve scenes are contextual tools and states inside this one application.

### Inspect the real interface before implementation

Use the actual application screenshots in the official Capture documentation, together with supplied software references and our revised mockups. Review a consistent current Capture interface rather than mixing unrelated versions of Capture, legacy Tracker Capture and other DHIS2 applications.

Reference sources:

- [DHIS2 Tracker overview](https://dhis2.org/tracker/).
- [DHIS2 Capture interface and user guide](https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/tracking-individual-level-data/capture.html), particularly Tracker working lists, tracked-entity search, enrollment dashboard, top-bar context and event view/edit screens.
- [DHIS2 Maps interface and user guide](https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/analysing-data/maps.html) for the cohort map's native tool behaviour.
- [Official DHIS2 demos](https://dhis2.org/demo/) as an optional reference for observing public demonstration workflows when accessible.

Use the references to identify the real layout and behaviour before coding. Record a concise component/reference mapping in development notes, then continue implementing the functional simulation. If live reference access is unavailable, use the official documentation screenshots and the supplied reference images; state any remaining fidelity limitation in development notes. Do not claim a screen is an exact match without having inspected its reference.

### What must closely match the reference

| Software feature | Fidelity requirement | Our lite adaptation |
| --- | --- | --- |
| Application frame and context | Preserve a compact software header, clear current context, recognisable navigation and practical utility placement. | Compliance Sandbox window identity; Case review / County review phases; visible case context; Case file and Help utilities. |
| Working lists | Reproduce credible table/list organisation, aligned metadata columns, selected-row state and ordinary search/filter behaviour. | Ten-case triage queue; only the scenario's relevant columns and supplied data. |
| List-to-record navigation | Selecting or opening a record must lead to the correct record workspace. Returning preserves list context, filters, ordering and the relevant selection. | Keep the selected case visible while its evidence and decisions are reviewed. No unrelated lesson landing page between operations. |
| Record workspace | Match the reference's relationship between identity/context, record details, stage/event history, notes and contextual actions. | Use the required patient fields, evidence records, interview record and legal-review tools. Simplify the number of sections while preserving their operational relationship. |
| Forms and selectors | Reproduce recognisable field alignment, input states, labels, selection feedback, validation and contextual save/confirm actions. | Concise British English; empty learner answer fields; one dominant task action. |
| Save and read-only states | Make draft, saved, committed and archived states visibly distinct and truthful. | Autosave is separate from assessed commitment; the bridge is the actual immutable Act I record. |
| Cohort tables and evidence views | Use native data-review patterns: stable columns, meaningful row selection, contextual details and source access. | Only the figures and interactions required by the complaint investigation. |
| Maps | Preserve a map-first workspace with practical edge tools, layer/source controls and clear prediction/reveal states. | Full-canvas fictional county map; compact supporting controls; actual results plotted from the authorised dataset. |
| Returning to earlier evidence | Keep record context and navigation consistent throughout the run. | Earlier committed records can be read; the archived Act I record cannot be rewritten. |

The legal-action tier assignment, evidence sorting, interview choices, ten-point weighting, 72-hour allocation, policy assembly, branching and final assessment are **custom simulation features** supplied by the storyboard. Present them using the reference software's visual and interaction language. Do not imply that they are standard DHIS2 functions. Do not remove or redesign these tasks merely because the source software uses a different native workflow.

### Our minimal design spec applied to the software

Apply these requirements while preserving recognisable software structure and task flow:

- **Afacad** headings and **Manrope** body/control text inside the application; system typography for the simulated desktop/window chrome.
- **Phosphor icons only** for UI controls, using consistent regular-weight icons. Use actual SVG icon components in the build.
- Light working screens, deep navy text, flat blue primary controls, restrained status colours and fine separators.
- Compact working headings, short labels, an 8px spacing scale, comfortable row spacing and progressive disclosure of supporting material.
- One persistent app window, two main open working regions for table/editor tasks, and a visible primary action. Avoid unnecessary nested card wrappers and oversized display headings.
- **When an image is present, it fills the working screen and is the primary focus.** Text, icons and controls are compact secondary overlays. This applies to the home visit and advocate call; the map follows the same visual hierarchy. Keep most of the image/map unobstructed and all important evidence readable.
- Dark emphasis can be used within the same application for the bridge and final report. Preserve the surrounding window/taskbar identity.
- Maintain the functional meaning of essential software controls even when shortening their labels or simplifying their presentation.

Minimalism may change typography, colours, icon family, padding, surface treatment and the visibility of nonessential details. It must preserve the software's recognisable working relationships and the storyboard's complete evidence and decision mechanics.

### Resolve reference differences explicitly

1. **The storyboard** governs narrative, required tasks, evidence, branches, consequences and assessment.
2. **The user's design requirements** govern minimal styling, Phosphor icons, typography, flat buttons, desktop launch and image-first scenes.
3. **The inspected DHIS2 interface** governs the software-like organisation and behaviour wherever compatible with those requirements.
4. **The latest revised mockups** show the agreed adaptation. Use the full-screen image versions, not the superseded split home-visit design or small advocate avatar.

Do not introduce extra patient-management tasks, permissions screens, enrollment steps or administration menus simply because they exist in DHIS2. Include only controls needed for the storyboard or the specified desktop/window behaviour. The result is a focused lite application with close UI/UX resemblance, rather than the entire DHIS2 platform.

### Claude implementation and review requirements

- Implement working components and persistent scenario state, not a screenshot with hotspots. Every visible control must perform its specified action.
- Use the existing project stack when one is supplied. For a new project, React and TypeScript are a suitable baseline; separate the desktop shell, window controls, case/cohort tools, media overlays, source records and scenario-state logic.
- Build the simulated software experience from the supplied scenario data. A live DHIS2 deployment or external service connection is not required by this brief.
- Keep real reference screenshots and generated mockups as visual references. Narrative images may be scene assets; table text, icons, forms, maps and plotted results must remain functional native UI.
- Preserve all twelve scenes, both acts, the passive bridge, state carry-over and branch-dependent outcomes. Do not combine this storyboard with the PDF's separate Gateway Stats simulation.
- Compare the rendered working list and record workspace with the inspected software references. Check control location, row geometry, context visibility, navigation and save behaviour; then verify our fonts, icons, colours and minimal spacing.
- Inspect the desktop launch, every primary task, the bridge and final report at standard laptop and desktop sizes. Check keyboard/touch alternatives, progress persistence, image dominance and action visibility. Keep those review notes factual; distinguish checks that ran from checks that were unavailable.
- Deliver the runnable implementation, brief setup instructions and any specific missing production content identified by the source. Continue through implementation and verification; a plan alone is not the requested deliverable.

All remaining sections below specify the scene content, interactions and visual states to implement under this directive. The historical generation briefs are reference notes; this Claude directive and the latest image-first requirement take precedence wherever an older brief conflicts.

## Build instruction

Design **Behind the Order** as an immersive software-use simulation within the **Compliance Dataset Sandbox**. The learner starts at a realistic Windows-style monitor desktop, clicks the **Compliance Sandbox** application shortcut, and enters a lite professional case-management workspace. Use familiar DHIS2 Tracker case-list, record, and analysis workflow conventions with the user's minimal UI specification. The application has its own original visual identity and the storyboard supplies its custom decision mechanics.

The shortened visible application name is **Compliance Sandbox**. The full **Compliance Dataset Sandbox** name can appear in About. **ComplianceWatch** remains the fictional source of model scores inside the records; it is not the name of a second desktop application. **Behind the Order** remains the simulation title, shown sparingly in About or the final report.

Use the **Behind the Order** storyboard in pages 18–42 of `DT01_RD_03_03_Dataset Analysis Sandbox.pdf`. The first portion of that PDF is a separate Gateway Stats simulation. Keep its story, five-scene structure and scoring formula outside this build.

Use `Clean_Minimal_AI_Native_Design_Master_Prompt (1).md` as the visual and UX specification. The generated images are design references. All text, controls, timelines and data displays must be implemented as accessible native UI; do not use a screenshot as an interactive page.

This pass covers the desktop opening, application launch, twelve primary scenes, the passive bridge and the final outcome. The desktop and launch are shell states, not extra assessed scenes. The three optional bonus extensions remain outside this initial page set. If an already agreed Miva logo introduction exists, retain it before the desktop; the first playable environment is the desktop. Launch directly into the triage queue using any already collected player identity, without adding another login or menu gate.

## Shared visual system

**Latest user requirement — image hierarchy:** whenever a scene uses imagery, the image fills the working screen and is the primary focus. Icons, labels, text and controls support it as compact overlays. Do not place the image in half a screen, a small card or an avatar. For photographic scenes and the map, this takes precedence over the two-pane default below. Keep most of the image unobstructed, with legible supporting controls clear of faces and evidence. The desktop wallpaper already fills its display. Table/editor scenes continue to use native open software panes.

- Desktop chrome and shortcut labels use Segoe UI or a system sans-serif. Inside the application, use Afacad for work-area headings and Manrope for body text, controls and buttons. Load the actual application fonts.
- **Phosphor is the only UI icon family.** Use `@phosphor-icons/react`, regular weight, mostly 18–22px. Icon buttons still have at least 44×44px interaction targets. The desktop app tile uses a white `DatabaseIcon` on flat blue. Keep meaningful status labels alongside status icons.
- One persistent application window and shared component system across both acts. A thin native-style title bar provides minimise, maximise/restore and close controls. A 56px taskbar stays beneath the application and shows its running state.
- Near-white working backgrounds, deep navy text, flat blue active controls, light grey separators. Use frosted translucency only for OS-like taskbar/popovers, not for every workspace surface.
- The dark blue desktop supplies opening atmosphere. The bridge and outcome may darken the central application canvas, with a small gold bridge accent and small green cohort-mode accent. Keep the surrounding window chrome recognisable.
- Two main open working regions. Adapt their proportions to the task; for triage use a 30% case-list pane and a 70% selected-case/assignment pane. Use fine dividers and aligned rows rather than floating cards or a giant rounded content container.
- Use an 8px spacing system, 24–32px working-pane padding, 6–10px control corners, and 8–12px outer window corners. A subtle shadow belongs to the application window; avoid nested surface shadows.
- One visually dominant action per interactive state, with a **flat solid colour**. Do not use gradient or glowing CTA buttons. The passive bridge has no decision action.
- Small application identifier, horizontal Case review / County review modes, and Case file / Help utilities. No persistent navigation sidebar, lesson-number stepper, or repeated large simulation title.
- Show supporting details through drawers, expanded evidence rows and contextual tools. The active task appears as the current software tool, not a separate lesson page.
- Use concise British English. Keep task instructions to one short line where possible. Preserve required source evidence and dialogue rather than truncating the evidence itself.
- Keep the main action inside the viewport. Reference composition: 16:9 at 1920×1080. A very thin monitor bezel is optional and must not reduce the useful display area significantly. Do not frame the monitor within a room photograph or add a keyboard/desk foreground.
- Use restrained fade, slight rise, crossfade and stagger. Launch the window from the shortcut location into its working bounds. Respect reduced motion.
- Give every drag operation a keyboard and tap/click equivalent. Use visible focus, labelled inputs, minimum 44px targets, transcripts and colour-independent status.
- Keep learner answer fields empty. Neutral answer choices and tiers must not reveal correctness before commitment. Autosave drafts is distinct from committing an assessed decision.

## Persistent simulation state

Use one case-and-cohort data model, not twelve disconnected mini-apps. Save the learner's decisions and the record they actually created:
- Triage tier and documentation note.
- Evidence classifications and item-level annotations.
- Linked timeline records and whether the full social-worker note was attached or summarised.
- Interview opening, evidence gathered and wording of the saved interview record.
- Four-value allocation and its rationale.
- Final individual recommendation.
- Cohort evidence classifications, map prediction and interpretation.
- Advocate dialogue choices.
- Review-time allocation.
- Assembled policy, safeguards, communication plan and consistency result.
- Outcome timeline and debrief history.

At the bridge, take a read-only snapshot of the Act I record. The learner cannot retroactively edit it. Act II must use this actual snapshot, including missing annotations and abbreviated notes.

Preserve the storyboard's legal-evidence reasoning, branch consequences and documented scoring rules. Do not substitute the Gateway Stats score formula. Qualitative results shown in the mockups are examples of one possible branch, not predetermined learner outcomes.

## Scene behaviour

1. **The Flag Arrives:** Sort ten flagged cases into Prepare detention petition / Enhanced monitoring this week / Routine follow-up. Reveal case metadata on selection. Mr Balogun has 88% risk, one missed visit with a work-shift conflict, a first order, Yoruba as his primary language and two unfulfilled interpreter requests. The contrast case has 91% risk, three missed visits, a previous non-compliance finding and a modified order. After triage, support the source's documentation choice and retain the actual note.

2. **Reading the Compliance Score:** Sort the six displayed evidence groups into Strong evidence / Weak or ambiguous / Not evidence. Expand the model-language disclaimer on demand. Allow a one-line rationale for Strong or Weak items. Preserve annotations for Act II. Keep the two historical pattern-match features grouped within the evidence item, matching the source's six-group presentation.

3. **The Paper Trail:** Connect the order, DOT-time request, missed visit/work shift and social-worker note. The learner chooses whether to attach the full note or save a summary. Preserve the distinction in later evidence review; an attached note and a summary are separate record types.

4. **The Home Visit:** Present the interpreter-assisted conversation with Mr Balogun. The learner chooses the opening approach and types or speaks the first question. Reveal the appropriate interview evidence through the existing branches. Then let the learner save either a detailed paraphrase or a compressed note, as the storyboard requires.

5. **Weighing It All:** Allocate ten total points across Public health safety, Least restrictive means, Consistency and Administrative efficiency/speed. Update consequences near the controls. Retain the rationale and make the nine similar structural-barrier cases relevant to the consistency preview. The partial allocation in the image is an unfinished example, not a recommended answer.

6. **The Decision and Its Aftermath:** Build the recommendation from evidence-category conditions. Available pathways are a detention petition, enhanced DOT with evening-slot and interpreter arrangements, or closure of the flag with documented rationale. Show the six-week epilogue after commitment, then the neutral filing notice that connects the acts.

**Bridge:** Reveal the exact earlier record three months later, now Exhibit 7 of 11. Show retained, summarised and missing material truthfully. This is a passive reveal with no decisions or record editing.

7. **First Login:** Sort the six cohort figures by whether they answer the complaint, merely sound relevant or mislead. Preserve the source values: petition rates are approximately 30% in both groups; average scores have a 25-point gap; 94% predictive accuracy is the vendor's marketing claim, not a validated result. Do not invent a correlation coefficient.

8. **Filtering the Cohort:** Ask for a map prediction before revealing the distribution of forty flagged patients. Compare the prediction with clinic access and evening-transit coverage. Include Mr Balogun's case inset and the source's interpreter/transit interpretation. Use real deterministic plotting from the supplied data in the final build. The mockup only shows an illustrative basemap in the pre-reveal state.

9. **The Advocate Calls:** Preserve the honest-partial, stonewall and false-reassurance openings, plus the Tunde follow-up in the honest-partial branch. Keep all reply options visually equal until committed. Record the learner's response and update the source's trust and rigour states.

10. **Competing Deadlines:** Allocate exactly seventy-two hours among deeper cohort analysis, individual file spot-checks, the board report and interpreter services. This is a resource budget, not a real countdown. The evidentiary value of a spot-check must depend on the actual Act I documentation.

11. **Building the Decision Rule:** Assemble the legal threshold, safeguard and communication plan. Make the alignment/rotation interaction meaningful by checking whether the pieces agree. Test the policy against the evidence and the learner's own Act I remedy. The Exhibit 7 check must report a real consistency or inconsistency, not a hard-coded success message.

12. **The Oversight Board Meeting:** Generate five outcome cards from the policy and accumulated state, then place them on a four-week timeline. Always include the source's board-minutes reference to Mr Balogun. The five short labels in the mockup illustrate a constructive branch; production copy must reflect the learner's actual policy and consequences.

**Final outcome:** Generate the compound ending from both acts, including the source's “Rigorous & Fair, Twice” and “Lucky, Not Ready” outcomes where appropriate. Show a concise decision review and reflection. Provide one dominant Review my decisions action with Run again as a secondary text action.

## Source details that need production completion

The exported PDF crops the right edges of several tables. It also does not supply a complete raw dataset for every triage case, the county map coordinates, all spoken dialogue, every consequence-card wording or a complete numerical ending-threshold table.

The layouts are complete visual concepts; those missing production parameters should be supplied as structured content before treating the build as a finished assessment. If development fixtures are needed, keep them separate from authoritative source values and clearly identify them in development documentation. Do not present invented statistics as figures supplied by the storyboard.

## Implementation checks

- A partial ten-point weighting and an incomplete seventy-two-hour allocation cannot be committed as complete.
- Act I annotations and full attachments survive into the read-only bridge and Act II spot-check.
- Map prediction happens before the actual distribution reveal.
- Reply buttons do not expose correctness before commitment.
- Policy consistency uses the learner's saved individual remedy.
- The bridge contains no edit operation or decision.
- The same workspace, fonts, contrast, spacing and motion language persist across all states.
- Every interaction works with keyboard and tap/click controls.
- No mockup-image background is used as a substitute for functional text, data or controls.
- A single click, tap, Enter or Space on the desktop shortcut opens the application; double-clicking cannot create duplicate launches.
- Minimise and restore preserve the current task, draft and focus context. Closing and reopening resume the same run rather than resetting it.
- Act II tools cannot bypass Act I or edit the archived Act I record. The County review tab unlocks through the existing bridge.

## Individual page design briefs

### Opening — Workstation Desktop

Full-screen, straight-on view of a realistic workstation monitor. Use an original calm blue abstract desktop wallpaper and a very thin graphite bezel. Place three normal-size desktop shortcuts in a tidy upper-left column: **Recycle Bin**, **Compliance Sandbox**, **Case files**. Make Compliance Sandbox the clearly recognisable application icon: flat blue rounded-square tile, white Phosphor database glyph, short readable two-line name. The desktop has no large headline or Start simulation CTA. A restrained Windows-style taskbar sits along the bottom, with Start, Search, file viewer and the app shortcut centred, then network, sound and a compact clock/date at the right. The desktop clock is environmental detail; it does not consume the storyboard's review-time budget.

The app is initially closed. Clicking its shortcut is the action that starts the workflow. On hover or focus, show ordinary desktop selection feedback. If the learner has not acted after six seconds, reveal only one short contextual hint near the shortcut: "Open Compliance Sandbox". Remove it once the application launches. This hint adds no new assessment or compulsory tutorial gate.

### Launch — Open the Application

Select the app shortcut immediately, then animate one application window into place over about 450ms. If actual loading needs more time, display a small loading state within the window; do not impose an artificial multi-second wait. The taskbar gains a running-app indicator. Focus moves into the app. Load the saved stage if this run already exists; for a new run, show the ten-case triage queue directly. Do not route to another marketing title page, operating-system login, fake credentials form or second Main Menu.

### Shared Application Shell

Use a 40–44px native-style window title bar with the blue database glyph, **Compliance Sandbox**, and functional minimise, maximise/restore and close controls. Under it, use a 56–64px compact application header: **Compliance Review Unit**, the **Case review** and **County review** mode tabs, and **Case file** / Help utilities. Case review is active in Act I. County review is locked until the bridge has completed; if activated early, a compact explanation says "Available after case review." This is a phase constraint, not a new game rule. The current tool name can appear in a small breadcrumb. Main task headings inside the software are about 28–36px rather than oversized landing-page titles. A bottom task/action strip keeps the current draft status and single commit action visible.

### Scene 1 — The Flag Arrives

Light software working state within the shared application shell. Left pane: Afacad heading **Flagged cases**, small count **10 awaiting review**, a working **Search cases** input, and a compact table with **Case** and **Model score** columns. Ten aligned rows use normal drag handles: Case 01, Case 02, Tunde Balogun, Case 04 through Case 10. The concept mockup shows only the two source-specified scores, Case 02 91% and Tunde 88%; other scores use an em dash until authorised case data is supplied. Tunde is third in the queue and selected with a pale-blue row highlight. Production ordering and scores must come from the completed dataset.

Right pane: small breadcrumb **Case review / Triage**, heading **Tunde Balogun**, neutral **Review pending** state and a compact open metadata grid: Model score 88%; Missed DOT visits 1; Order history First order; Primary language Yoruba; Visit context Work-shift conflict; Interpreter requests 2 · Unfulfilled. Beneath a fine divider, show **Review tier** and **Assign each case to a tier.** Three broad neutral empty assignment targets read **Prepare detention petition**, **Enhanced monitoring this week**, **Routine follow-up**. Selecting another queue row replaces the metadata; dragging a row or selecting it then choosing a tier assigns that actual case. Allow reassignment before commitment. Do not preassign any case or colour a tier as correct.

Footer: actual draft-save status, collapsed **Triage note**, small queue count **0 of 10 assigned**, and **Confirm triage**. The confirm action remains disabled until the required assignments are complete. After triage, preserve the storyboard's documentation choice and the learner's actual note. Do not infer a complete production dataset from the mockup's placeholder rows.

### Applying the Shell to the Remaining Mockups

Render each following scene brief inside this same software window. The briefs define evidence and interactions; the updated shell, typography, flat buttons and open-pane surfaces above define their presentation. Replace older giant page headings and rounded card wrappers with compact tool titles and working panes. Preserve genuine input fields, drop targets, evidence tokens and conditional-rule modules where their boundaries help the interaction.

### Scene 2 — Reading the Compliance Score

Light working state. Heading "Read beyond the score". Left working region shows six neat evidence rows, not six floating marketing cards: "88% model score", "One missed visit · work shift", "Two unresolved interpreter requests", "Historical pattern matches", "Intake conducted in English", "Model language disclaimer". Each row has a small handle for dragging, no assigned correctness. Right working region has three neutral vertically stacked evidence bins: "Strong evidence", "Weak or ambiguous", "Not evidence". A quiet contextual "Add rationale" affordance appears near an active evidence row, with an empty note field showing "Your reason". Primary action "Save assessment". Do not put correct rationales into the input or imply that the model score is a legal finding.

### Scene 3 — The Paper Trail

Light working state. Heading "Connect the paper trail", short subline "Link records that explain the missed visit." Left main region is a spacious interactive case timeline with four concise records: "Day 1 · Order issued", "Day 6 · DOT-time change requested", "Day 11 · Missed visit / work shift", "Two days before flag · Social-worker note". Use small connection ports on records; one unfinished blue drag line is visible to show the interaction, without a completed correct route. Right main region is a records pane headed "Social-worker note" containing this exact short evidence quote: "Anxious about losing job. Asked twice for evening DOT." Below it two equally weighted neutral preservation controls "Attach full note" and "Write a summary", neither preselected; a small empty summary field may be visible. One primary CTA "Save the record". No fabricated dates or medical information.

### Scene 4 — The Home Visit

Full-bleed home-visit image across the entire working canvas, with the slim native application chrome retained. Tunde Balogun, a fictional middle-aged Nigerian man in a dark green shirt, is the dominant subject; the interpreter sits alongside in his modest home. No boxed photograph or image/text split. Use small overlaid labels "Home visit", "Tunde Balogun" and "Interpreter present · Yoruba / English". At a lower corner, compact secondary controls show the three neutral approaches "Lead with the order", "Ask about his week", "Offer reassurance", an empty question field "Type your first question", a microphone icon, an optional collapsed Transcript control and "Begin interview". Keep roughly 75% or more of the image unobstructed and all faces visible. This mockup shows a visual frame of the conversation: the storyboard does not prescribe still image or video. Preserve its dialogue and voice/text interaction whichever media format is chosen. No video-call toolbar or hang-up controls.

### Scene 5 — Weighing It All

Light working state. Heading "Weigh the trade-offs". Left region four understated allocation sliders labelled "Public health safety", "Least restrictive means", "Consistency", "Administrative speed". Show an unfinished example allocation: 3, 2, 1, 0 respectively; small total "6 of 10 allocated". These are an incomplete interaction state, not a recommended answer. Empty optional field "Your rationale". Right region is a quiet consequence-preview surface, main text "4 points remaining", small neutral helper "Preview updates as you adjust." A single subtle conceptual balance motif is allowed, but do not draw statistical data or show a moral correct answer. The primary CTA "Save weighting" appears disabled until allocation is complete. No timer countdown. The supporting instruction is exactly 'Allocate 10 points across the four values.'

### Scene 6 — The Decision and Its Aftermath

Light working state. Heading "Build the recommendation". Left region a clear conditional rule editor with "IF" label and an empty evidence-category slot "Choose evidence", followed by a connecting line to an empty "THEN" remedy slot "Choose a pathway". Three equally styled draggable remedy tokens in a tray: "Petition for detention", "Enhanced DOT", "Close the flag". Enhanced DOT includes an evening slot and confirmed interpreter access. Show its read-only arrangements after selection; there is no optional checklist in the unselected state. Right region titled "Case record" with compact links "Triage note", "Score annotations", "Social-worker note", "Interview record", "Weighting rationale". No preselected remedy. One primary CTA "Confirm recommendation". Show the state before commitment; the six-week epilogue is not yet revealed.

### The Bridge — Three Months Later

Dark passive transition, navy with a restrained warm-gold accent. Heading "Three months later". Small supporting line "Your case file is now Exhibit 7 of 11." A large light read-only document surface dominates the centre-left, headed "Tunde Balogun · Case record". Six compact retained-record rows labelled "Triage note", "Score annotations", "Social-worker note", "Interview record", "Weighting rationale", "Final recommendation". Use unobtrusive document icons and neutral states like "Retained", "Attached", "Saved", with no scores. Right region a simple county-review folder receiving the file, purely a conceptual filing visual, not a data diagram. Footer text "What you recorded is what this review will see." No edit buttons, no choices, no action CTA: this is deliberately a read-only reveal. Preserve the calm same-product visual language. Keep the six row labels without descriptive sublabels. Do not introduce child or family records.

### Scene 7 — First Login

Light working state with a subtle small green "County review" mode label. Heading "Which figures answer the complaint?" Left region six draggable evidence rows, exact concise text: "Petition rates · about 30% in both groups", "Average scores · 25-point gap", "Vendor claim · 94% predictive accuracy", "Patient names and scores", "Interpreter-delay correlation", "Within-group score spread". Small collapsed "Exhibit 7" link is allowed. Right region has three neutral vertically stacked bins: "Answers the complaint", "Relevant-sounding", "Actively misleading". All bins are empty in this before-commitment state; do not reveal the correct sorting or show fake correlation coefficients. One main CTA "Confirm evidence". Same shell and spacing as the single-case pages.

### Scene 8 — Filtering the Cohort

The fictional county map fills the working canvas edge to edge and remains the primary focus. Fine pale streets, muted districts and a small river provide an illustrative pre-reveal basemap. No plotted patient locations, distribution chart, numeric scales or invented dataset results. A short unfinished blue prediction sketch is visible. Overlay only the small title "Sketch your prediction", one brief instruction "Mark where you expect petitions to cluster", compact pen/eraser controls, a small collapsed Case 7 record inset for Tunde Balogun with 88% risk score, and the flat "Reveal the pattern" action. No right-hand source sidebar, avatar or opaque action strip consumes the map. Keep most of the canvas unobstructed. The later actual distribution is still plotted deterministically from the authoritative dataset.

### Scene 9 — The Advocate Calls

Full-bleed photographic call visual fills the working canvas: a fictional middle-aged Nigerian woman community advocate, dark skin, short natural hair and a modest blouse, speaking by phone in a believable quiet work setting. Her face and phone are the dominant visual. No small avatar or image/answer split. Overlay a small "Call connected" status, "Community advocate" label and the current quote "Was that you?" with brief context "Tunde mentioned the interpreter-assisted visit." At a lower corner, keep three compact equally styled neutral responses: "That was one case. Here’s what the eleven together show.", "His case is a good example of the pattern.", "I can’t discuss individual patients." No preselected reply or correctness cues. The small flat "Send response" button and optional Transcript icon support the image. Keep roughly 75% or more of the image unobstructed. This is the honest-partial branch's follow-up frame; other dialogue branches still use their actual source text. The media format remains a design choice, not a storyboard requirement.

### Scene 10 — Competing Deadlines

Light working state. Heading "Allocate the review time". Left main region four allocation controls, all starting at 0 hours: "Deeper cohort analysis", "Individual file spot-checks", "Board report", "Interpreter services". Each row has a slider and a clearly labelled hour field, ample spacing. Right region a large simple typographic balance "72h" and "Available", not a chart or clock countdown. Beneath it, a collapsed "Exhibit 7" source drawer; no invented allocation outcome or correct allocation preset. Small copy "Distribute 72 hours across the work." One main CTA "Confirm allocation" is disabled while all hours remain unallocated. Same persistent shell, no decorative data widgets or repeated titles.

### Scene 11 — Building the Decision Rule

Light working state. Heading "Build the decision rule". Left main region is a clean practical policy assembly tool, with three large linked interlocking modules arranged vertically: "Legal threshold", "Safeguard", "Communication". Each has an empty selector ("Choose threshold", "Choose safeguard", "Choose communication") and a small circular rotate handle illustrating the align interaction. No preselected correct policy. Right main region labelled "Policy preview", quiet placeholder "Your rule will appear here", with a small collapsed "Exhibit 7 consistency" check that runs only after testing. One primary CTA "Test the policy". Avoid toy-like multicoloured jigsaw puzzle art; use restrained white and pale blue pieces that feel like professional software.

### Scene 12 — The Oversight Board Meeting

Light working state. Heading "Trace the consequences". Main right work region a broad four-week placement timeline with four large understated columns labelled "Week 1", "Week 2", "Week 3", "Week 4", empty drop targets. Left region an outcome tray with five concise cards illustrating a constructive policy branch: "Interpreter access checked", "Evening DOT slots reviewed", "Petition criteria updated", "Transparency report published", "Exhibit 7 cited in board minutes". These are policy-generated consequences, not new actions for the learner to invent. One unfinished drag motion of a single card may be shown, without indicating the correct placement. Primary CTA "Review the outcome". Same quiet professional tool style, no success ticks before placement and no charts.

### Final Outcome — Rigorous and Fair, Twice

Dark final outcome state, same navy and subtle blue-cyan glow as the opening. Large but restrained heading "Rigorous & Fair, Twice". Short subline "Your case file supported the county review." Two large pale working regions: left "Your record" with concise retained-item labels "Evidence preserved", "Interview documented", "Decision explained"; right "Your decisions" with qualitative review labels "Rigour", "Trust", "Consistency", and no fabricated numeric scores or chart bars. One visible reflection prompt "Which earlier decision would you spend more time on?" One dominant CTA "Review my decisions", plus a quiet small text link "Run again". No confetti, stars, trophy or leaderboard. This is one illustrative possible ending from the storyboard, not a claim about an actual learner's score.

## Software tool mapping

Use professional tool names to maintain the software illusion. The scene names remain in content/configuration and facilitator documentation, rather than becoming a permanent lesson navigation menu. These are contextual tools within one application, not separate desktop apps.

| Storyboard state | Visible software tool | Main work area | Action |
| --- | --- | --- | --- |
| 1 · The Flag Arrives | Triage | Case queue + selected-case metadata and tier targets | Confirm triage |
| 2 · Reading the Compliance Score | Score review | Feature list + evidence categories and annotations | Save assessment |
| 3 · The Paper Trail | Record timeline | Connectable records + source-note viewer | Save the record |
| 4 · The Home Visit | Field visit record | On-site interview media/transcript + opening and record controls | Begin interview; then save record |
| 5 · Weighing It All | Case weighting | Four-value allocation + consequence preview | Save weighting |
| 6 · The Decision and Its Aftermath | Recommendation | Evidence/remedy rule editor + case record | Confirm recommendation |
| Bridge | Archived case file | Actual Act I snapshot becoming Exhibit 7, read-only | Passive reveal |
| 7 · First Login | Cohort evidence | Six figures + complaint relevance categories | Confirm evidence |
| 8 · Filtering the Cohort | Cohort map | Prediction canvas; then data, clinic and transit layers | Reveal the pattern |
| 9 · The Advocate Calls | Advocate call | Caller/transcript + neutral response controls | Send response |
| 10 · Competing Deadlines | Review planning | Four 72-hour budget controls + evidence preview | Confirm allocation |
| 11 · Building the Decision Rule | Policy rule | Threshold, safeguard and communication modules + consistency check | Test the policy |
| 12 · The Oversight Board Meeting | Board timeline | Generated outcomes + four-week timeline | Review the outcome |
| Final outcome | Review report | Branch-dependent record/decision assessment + reflection | Review my decisions |

Retain the storyboard's sequence. Completed source records may be reopened for reading through Case file; revisiting them must not bypass required tasks or rewrite a committed decision. The home visit remains an on-site visit with an interpreter, not a video-call scene. The advocate call is the actual call workflow. These different story contexts must not be collapsed into one generic conferencing widget.

## Window and desktop behaviour

| Control | Exact behaviour |
| --- | --- |
| Application shortcut | Single click/tap, Enter or Space opens the one application window. Double-click works by the same idempotent handler. |
| Minimise | Hides the window, shows the desktop and keeps the run active; update the taskbar state. |
| Active taskbar app icon | Restores a minimised window. If the window is visible, it can toggle minimise. Use the same saved run. |
| Maximise / Restore | Maximises within the simulated display above the taskbar, or restores to near-full-display bounds. Do not resize by zooming or scaling the UI as an image. |
| Close | Autosaves the current draft, closes the application view and returns to the desktop. Keep the run and committed history. Reopening resumes the last task. |
| Case files desktop shortcut | Opens a small read-only file viewer for the existing case record and attached/saved documents. Before any record exists, show a simple empty state. Do not expose evidence that the learner has not unlocked. |
| Recycle Bin | Opens a small empty-bin view. It is an environmental prop and cannot delete learner evidence. |
| Start | Opens a compact launcher listing Compliance Sandbox and Case files; selecting either uses its existing handler. |
| Search | Searches the two available local simulation tools/files; no internet search or additional app inventory. |
| Sound tray control | Changes simulation sound/mute if audio exists. Expose the actual value. |
| Network indicator | Quiet environment status. A small status popover is sufficient; it must not invent a network failure or assessment branch. |
| Help | A compact contextual explanation for the current interaction. No worked answer or correctness clue. |
| Run again | The only ordinary action that creates a new run. Preserve the existing confirmation behaviour if one exists. |

The simulated desktop lives entirely inside the experience. All foreground controls are working HTML/React UI. Use an image only for wallpaper and appropriate narrative media. The provided visual mockups are reference compositions and must not become clickable screenshot backgrounds.

Keep one taskbar and one application shell mounted. Store window visibility separately from the simulation state. Closing or hiding a window must not unmount the run store or reset the record. Autosave after changes, persist before closing, and take the immutable Act I snapshot at the existing bridge. Disable duplicate submissions during save/commit, with a visible actual save result. If a save fails, keep the draft in memory and show a concise retry state; never display "Draft saved" unconditionally.

Window controls do not pause or spend the narrative 72-hour resource allocation. They are workspace controls, not game choices. Do not create a real countdown from the OS clock. Use a live environment clock/date in implementation; the mockup's 09:41 and 12/10/2026 are illustrative screen details.

### Minimal window-state model

This reducer defines shell behaviour only. The existing scenario state and decision reducer remain independent and persist through every shell action.

```ts
export type WindowState = {
  visibility: "closed" | "launching" | "visible" | "minimised";
  size: "restored" | "maximised";
};

export type WindowAction =
  | { type: "OPEN" }
  | { type: "LAUNCH_READY" }
  | { type: "MINIMISE" }
  | { type: "TOGGLE_SIZE" }
  | { type: "CLOSE" };

export const initialWindowState: WindowState = {
  visibility: "closed",
  size: "restored",
};

export function windowReducer(
  state: WindowState,
  action: WindowAction,
): WindowState {
  switch (action.type) {
    case "OPEN":
      if (state.visibility === "visible" || state.visibility === "launching") {
        return state;
      }
      return {
        ...state,
        visibility: state.visibility === "minimised" ? "visible" : "launching",
      };
    case "LAUNCH_READY":
      return state.visibility === "launching"
        ? { ...state, visibility: "visible" }
        : state;
    case "MINIMISE":
      return state.visibility === "visible"
        ? { ...state, visibility: "minimised" }
        : state;
    case "TOGGLE_SIZE":
      return state.visibility === "visible"
        ? { ...state, size: state.size === "restored" ? "maximised" : "restored" }
        : state;
    case "CLOSE":
      return { ...state, visibility: "closed" };
  }
}
```

Use the same OPEN handler for desktop shortcut, Start launcher and reopening from the taskbar. Complete LAUNCH_READY when the run is hydrated and the launch transition is ready. Cancel a pending launch effect when the window closes. When minimising or closing, return keyboard focus to the taskbar icon or desktop shortcut. On restore, return it to the last relevant in-app control. Hidden windows and desktop popovers must not leave their controls in the tab order.

## Phosphor icon specification

Install `@phosphor-icons/react` in the implementation. Use named imports for the required icons and regular weight defaults. Do not mix Phosphor with Lucide, emoji, unrelated SVG packs or improvised decorative glyphs. Branding assets, if already supplied, remain separate from UI icons.

| Function | Phosphor React component |
| --- | --- |
| Application shortcut / app identity | `DatabaseIcon` |
| Case files / file viewer | `FolderIcon` |
| Recycle Bin | `TrashIcon` |
| Start launcher | `SquaresFourIcon` |
| Search | `MagnifyingGlassIcon` |
| Case file / source record | `FileTextIcon` |
| Cohort context | `UsersThreeIcon` |
| Map tool | `MapTrifoldIcon` |
| Allocation / weighting controls | `SlidersHorizontalIcon` |
| Timeline / record history | `ClockCounterClockwiseIcon` |
| Voice input | `MicrophoneIcon` |
| Advocate call | `PhoneIcon` |
| Help | `QuestionIcon` |
| Minimise / maximise / restore / close | `MinusIcon` / `SquareIcon` / `CopySimpleIcon` / `XIcon` |
| Drag handle | `DotsSixVerticalIcon` |
| Sound / network | `SpeakerHighIcon` / `WifiHighIcon` |
| Saved / warning status | `CheckCircleIcon` / `WarningCircleIcon` |

```tsx
import { IconContext, DatabaseIcon, FileTextIcon } from "@phosphor-icons/react";

<IconContext.Provider
  value={{ size: 20, weight: "regular", color: "currentColor" }}
>
  <button type="button" onClick={openApplication} aria-label="Open Compliance Sandbox">
    <DatabaseIcon size={36} aria-hidden="true" />
    <span>Compliance Sandbox</span>
  </button>
  <button type="button" onClick={openCaseFile}>
    <FileTextIcon aria-hidden="true" />
    <span>Case file</span>
  </button>
</IconContext.Provider>
```

In production, bind the callbacks to the actual handlers. Label icon-only buttons with the action, such as "Minimise Compliance Sandbox", "Restore window" or "Close Compliance Sandbox". Show a brief tooltip on hover/focus. Keep visible text for modes, unfamiliar tools and statuses; minimal text must not make the software ambiguous.

## Geometry, colours and motion

```css
:root {
  --font-os: "Segoe UI", system-ui, sans-serif;
  --font-display: "Afacad", system-ui, sans-serif;
  --font-body: "Manrope", system-ui, sans-serif;
  --app-paper: #ffffff;
  --app-panel: #fbfdff;
  --app-chrome: #f3f6fa;
  --app-ink: #071127;
  --app-muted: #53617b;
  --app-rule: #e5eaf1;
  --app-blue: #176bff;
  --app-selected: #eaf2ff;
  --app-dark: #06101f;
  --app-radius: 10px;
  --control-radius: 8px;
  --taskbar-height: 56px;
  --titlebar-height: 44px;
  --header-height: 64px;
  --actionbar-height: 64px;
}

.desktop {
  position: relative;
  min-height: 100dvh;
  font-family: var(--font-os);
  overflow: hidden;
}

.application-window {
  position: absolute;
  inset: 24px 24px calc(var(--taskbar-height) + 16px);
  display: grid;
  grid-template-rows: var(--titlebar-height) var(--header-height) minmax(0, 1fr);
  overflow: hidden;
  border-radius: var(--app-radius);
  background: var(--app-paper);
  color: var(--app-ink);
  font-family: var(--font-body);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.18);
}

.application-window[data-size="maximised"] {
  inset: 0 0 var(--taskbar-height);
  border-radius: 0;
}

.workspace {
  display: grid;
  grid-template-rows: minmax(0, 1fr) var(--actionbar-height);
  min-height: 0;
}

.work-regions {
  display: grid;
  grid-template-columns: minmax(320px, 30fr) minmax(0, 70fr);
  min-height: 0;
}

.working-pane {
  min-width: 0;
  min-height: 0;
  padding: 24px 32px;
  overflow: auto;
}

.work-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(28px, 2vw, 36px);
  font-weight: 600;
  line-height: 1.05;
  letter-spacing: -0.03em;
}

.primary-action {
  min-height: 44px;
  padding: 0 24px;
  border: 0;
  border-radius: var(--control-radius);
  background: var(--app-blue);
  color: #ffffff;
  font: 600 14px var(--font-body);
}

.icon-button {
  min-width: 44px;
  min-height: 44px;
}

:focus-visible {
  outline: 2px solid var(--app-blue);
  outline-offset: 3px;
}

@media (max-width: 900px) {
  .work-regions { grid-template-columns: 1fr; }
  .application-window { inset: 8px 8px calc(var(--taskbar-height) + 8px); }
  .working-pane { padding: 16px 20px; }
}
```

The geometry is a baseline, not permission to crop evidence or compress controls below readability. At desktop sizes, fit the ten-case list and three tier targets without page scrolling. When longer source records require scrolling, scroll their pane only and keep the action strip fixed. For narrow displays, use a list/detail switch within the app so a tall case list does not push the current decision out of view; preserve reading order and the fixed action strip. Native window behaviour must remain usable on touch.

Use a 120ms shortcut-selection transition; a roughly 450ms window opening using opacity, position and a slight scale; and 60–80ms content staggers after the window settles. Avoid repeatedly animating the taskbar or moving case rows during a drag. Reduced-motion mode shows the window directly and uses a brief crossfade, with no focus delay. Any optional sound is subtle and independently mutable; no operating-system boot sequence is needed.

## Completion criteria for this design direction

- The opening looks immediately like a believable monitor desktop, and clicking the app icon starts the application.
- The first task is a real triage queue with selected-case details and empty review tiers.
- The app title bar and taskbar behaviours work and preserve progress.
- Every primary scene renders in the same application shell with its source interaction intact.
- All interface icons come from Phosphor; OS-like chrome uses system typography and the workspace uses Afacad/Manrope.
- Controls use flat fills, readable text, generous spacing and fine separators; there is no nested rounded-card dashboard.
- Saved status reflects an actual persisted draft. A draft is not treated as an assessed commitment.
- Case files and later cohort evidence show the learner's actual record, including omissions.
- Full-record versus summary decisions, allocations, prediction-before-reveal and policy consistency remain functional.
- The raw ten-case dataset, map coordinates, branch dialogue and ending rules still require authoritative production content where the source omits them. Keep temporary fixtures explicitly identified in development files.

## Reference sources

- User's UI specification: `Clean_Minimal_AI_Native_Design_Master_Prompt (1).md`.
- Storyboard: `DT01_RD_03_03_Dataset Analysis Sandbox.pdf`, Behind the Order section, pages 18–42.
- [DHIS2 Tracker overview](https://dhis2.org/tracker/): reference for individual case records, follow-up and aggregate analysis workflows. This proposal is a custom lite simulation application; its branching, weighting and scoring are defined by the storyboard.
- [DHIS2 Capture user guide](https://docs.dhis2.org/en/use/user-guides/dhis-core-version-master/tracking-individual-level-data/capture.html): reference for working-list and selected-record behaviour.
- [Official Phosphor React documentation](https://github.com/phosphor-icons/react): named icon imports, regular weights and `IconContext` defaults.

The two new visual mockups were created with the built-in image-generation tool: one closed-app desktop view and one open-app triage view. They establish the presentation direction. Functional implementation should follow the rules above rather than relying on generated pixels for text, icons or data.

## Exact visual mockup briefs

The following generation briefs document the two revised reference screens; they are visual instructions, not substitutes for live UI.

### Desktop before launch

```text
Use case: ui-mockup
Asset type: opening scene visual concept for an immersive browser learning simulation, 16:9 landscape.
Primary request: A highly realistic Windows-style workstation desktop on a real-looking monitor, viewed directly from the seated user's point of view. This is the idle desktop BEFORE the learner launches their case-analysis application. Make the monitor screen occupy virtually the whole image, with only a very thin graphite physical monitor bezel at the outer edges. Straight-on framing, no distorted perspective, no desk or keyboard, no room, no external labels.
Scene/backdrop: original smooth dark-to-mid-blue flowing abstract wallpaper with layered satin folds and calm illumination, familiar contemporary Windows desktop visual language without reproducing a stock wallpaper.
Subject: a convincingly real desktop with sparse upper-left desktop shortcuts and a low translucent taskbar.
Composition/framing: 16:9 wide display. Three desktop icons in a tidy upper-left vertical column: a recycle bin labelled "Recycle Bin", then the prominent application shortcut labelled on two lines "Compliance Sandbox", then a plain folder labelled "Case files". The application icon is a flat blue rounded-square tile containing a crisp white outline database cylinder in the consistent visual language of Phosphor regular icons. Each shortcut is normal desktop size, around 56px, not oversized. The app shortcut is subtly selected with a faint translucent blue rectangular desktop selection. A normal small white pointer rests beside this application icon.
Along the bottom a realistic 52px-high frosted translucent Windows-style taskbar: a small four-pane start glyph, quiet search glyph, file-manager icon, and the blue app icon around the centre; compact network and volume glyphs at the right, clock "09:41" and date "12/10/2026". Leave almost the entire wallpaper free of content.
Style/medium: extremely polished realistic monitor and desktop UI concept; sharp native-style icons and text; realistic slim black screen border and restrained screen luminosity, no heavy glare, no dramatic reflections, no floating-card website styling.
Typography: desktop labels in a readable Segoe-style system sans-serif, 14-16px equivalent, white text with subtle contrast shadow. No headline typography on the desktop.
Text (verbatim): "Recycle Bin"; "Compliance Sandbox"; "Case files"; "09:41"; "12/10/2026".
Constraints: application closed; no application window yet. No website navigation bar, no big "start simulation" button, no hero heading, no educational overlays, no lesson text, no slogan, no unrelated applications or branded browser icon. The student's next action should clearly be to click the application shortcut. No callout arrows, no diagram, no extra captions. Generate ONE full-frame mockup, not a collage.
```

### Application after launch

```text
Use case: ui-mockup
Asset type: second screen concept for the same realistic workstation simulation, after the desktop application launches, 16:9 landscape.
Primary request: Design the OPEN application "Compliance Sandbox" as a convincing lite professional patient case-analysis software workspace. It uses familiar DHIS2-style case-management workflow with an ORIGINAL calm minimal visual design. Render one full-size sharp realistic application-window mockup on a blue Windows-style desktop. The application's working UI is the focus and fills around 94% of the monitor display; narrow blue desktop margins and the translucent taskbar remain visible below. Same very thin dark physical monitor bezel as a real front-on screen.
Style/medium: realistic functional software screenshot rendered within a monitor, with crisp precise typography, generous whitespace, subtle separators, and flat controls. Not a marketing webpage, lesson page, or futuristic sci-fi dashboard.
Shell: topmost native-style slim light-grey window title bar with a small blue rounded-square database app icon, text "Compliance Sandbox", and right-aligned minimise, maximise, and close glyphs. Beneath this, a slim white software header with a compact original database symbol and "Compliance Review Unit" at left. Quiet horizontal tabs "Case review" (selected with blue underline) and "County review" (muted, small lock glyph). Far right: small "Case file" utility with outline file icon and a quiet help glyph. All glyphs use a consistent Phosphor regular outline style.
Working layout: exactly TWO main open work regions divided by a fine vertical rule, no floating cards or large outer content box, no persistent navigation sidebar. Left queue region is around 30% width and right case/triage working region is around 70%. White and very pale grey backgrounds.
Left work region: modest Afacad heading "Flagged cases", metadata "10 awaiting review". A small quiet search input labelled "Search cases" with magnifying-glass icon. A slim data table with columns "Case" and "Model score", ten compact comfortable rows: "Case 01" with dash; "Case 02" with "91%"; "Tunde Balogun" with "88%"; "Case 04" through "Case 10" each with dash. Tunde's row has a restrained pale-blue selection and thin blue edge, not a correctness colour. Use tiny six-dot drag handles and understated file glyphs. No invented percentages for other cases. The entire ten-row queue fits vertically. At the bottom a small quiet status "0 of 10 assigned".
Right work region: top a small breadcrumb "Case review / Triage", then Afacad heading "Tunde Balogun" around 36px equivalent, a quiet neutral "Review pending" status. Selected case metadata laid out in an OPEN compact grid with text labels, not separate KPI cards: "Model score" -> "88%"; "Missed DOT visits" -> "1"; "Order history" -> "First order"; "Primary language" -> "Yoruba"; "Visit context" -> "Work-shift conflict"; "Interpreter requests" -> "2 · Unfulfilled". Below this summary, a thin horizontal rule.
Under the rule, modest heading "Review tier" and one short line "Assign each case to a tier." Then THREE broad shallow neutral empty assignment targets stacked vertically, each around 86px high, with fine dashed pale-grey boundary, small neutral tray glyph and no selected case inside. Exact labels: "Prepare detention petition"; "Enhanced monitoring this week"; "Routine follow-up". No tier has a coloured warning or recommendation.
Footer inside the app: quiet left text "Draft saved", a collapsed "Triage note" control with outline note icon, and one aligned flat solid disabled blue-grey button at bottom right "Confirm triage". Keep all controls in the viewport.
Typography: Afacad for work-area headings; Manrope for application body, table rows, inputs and controls; Segoe-like system sans for the native window bar and desktop taskbar. Good readable 15-16px body equivalent. Flat solid blue active accents #176BFF, navy text #071127, white #FFFFFF, separators #E5EAF1. App control corner radii 6-10px only. No gradients on buttons, no heavy shadows or glass inside the working UI.
Desktop taskbar below window: small centred start, search, folder, blue database app icons with active app indicator, right network and volume symbols, time "09:41", date "12/10/2026". Original dark blue flowing abstract wallpaper only visible in the small margins. Monitor fills canvas, no desk, no keyboard, no other person.
Constraints: this is the scene before the student assigns any case. All three tier containers are empty. No completed answers, no checkmarks, no scoring meter, no lesson paragraphs, no game title banner, no scene-number stepper, no unrelated data charts. Preserve normal professional software proportions, generous yet practical whitespace. Generate ONE full-frame screen, not a collage, not an annotated design board.
```

## Image-first scene implementation

The current home-visit, advocate-call and map designs supersede the earlier split image/text layouts. Preserve their evidence and interaction mechanics while making the visual fill the working canvas. The native window chrome remains slim; the scene image or map is behind the contextual UI. Keep roughly 75% or more of the visual unobstructed. Avoid covering faces, objects being inspected or meaningful map regions. Media format remains open unless separately agreed: a photographic mockup is a reference frame, not a requirement to use still images.

```css
.workspace[data-visual-primary="true"] {
  position: relative;
  display: block;
  min-height: 0;
  overflow: hidden;
}
.scene-visual { position: absolute; inset: 0; }
.scene-visual > img, .scene-visual > video {
  width: 100%; height: 100%; display: block;
  object-fit: cover;
  object-position: var(--visual-focus, 40% 50%);
}
.scene-map { position: absolute; inset: 0; }
.scene-label { position: absolute; top: 24px; left: 24px; z-index: 2; }
.scene-identity { position: absolute; bottom: 24px; left: 24px; z-index: 2; }
.scene-support {
  position: absolute; right: 24px; bottom: 24px; z-index: 2;
  width: min(420px, calc(100% - 48px));
  display: grid; gap: 8px;
  background: none;
}
.scene-support .primary-action { justify-self: end; }
```

Use compact, readable controls on a gentle local contrast treatment where needed. The contrast treatment belongs behind supporting text; it must not become a large opaque sidebar. Required answer text remains fully readable. On small screens, expand a focused input temporarily when the learner edits it, then collapse it back to the small overlay. Native maps fill the stage and their tools/source drawers sit at the edges. Do not implement the cohort map as a generated-image result; the production dataset and geographic layers still drive its actual plotted results.

## Revised full-sequence visual briefs

The following briefs produced the revised software screens with the built-in image-generation tool. They accompany the original desktop and triage references. The latest versions of the home visit, map and advocate call apply the user's image-first rule. The refined score-review, policy and final-report screens supersede their initial variants. All mockup text, controls and data must be implemented as live accessible UI.

### Shared generation brief

```text
Use case: ui-mockup
Asset type: one full-screen 16:9 high-fidelity page concept for Behind the Order, an immersive software-use learning simulation.
Input images: Image 1 is the approved OPEN application screen, supplied ONLY as the shared visual-design reference. Create a new task screen; do not reproduce the triage content. Preserve this reference's realistic slim graphite monitor bezel, nearly full-display application window, narrow blue desktop margins, bottom Windows-style taskbar, native light window title bar and original blue database app identity.
Shared shell, unchanged across all pages: title bar "Compliance Sandbox", database tile at left, minimise/maximise/close at right. White application header "Compliance Review Unit", horizontal "Case review" / "County review" tabs, quiet "Case file" and help icon at right. Bottom desktop taskbar has small centred launch/search/folder/database glyphs, compact network/sound at right, time "09:41", date "12/10/2026". Front-on readable monitor view, no desk or room. App occupies around 94% of screen.
Application design: Afacad headings around 28–36px equivalent, Manrope body and controls around 15–16px, system sans for OS chrome. White/near-white open working panes with navy text, thin pale-grey separators, flat solid blue actions, 8px control corners. Phosphor REGULAR outline icon visual language throughout. No gradient buttons, no glass in work panes, no decorative floating cards, no large outer rounded content box, no permanent sidebar, no giant repeated simulation title. Two main working regions, with their proportions adapted to the task. One main action in a bottom in-app strip, always inside the viewport. Taskbar stays below the app.
Accuracy constraints: render only the supplied words, values and task state. Do not invent percentages, charts, dates, extra scenes, completed answers or correctness cues. Empty answer fields remain empty. All alternatives have equal neutral styling until commitment. A small source-record status may be shown, but no scoring, confetti, trophy or decorative illustration. The interface must look like actual professional lite software, not a website or presentation. Produce ONE standalone screen, not a collage or an annotated board.

```

### Scene 2 · Score review

```text
Task-specific content: Case review selected with blue underline; County review muted with a small lock glyph. Breadcrumb "Case review / Score review". Compact heading "Read beyond the score", small context "Tunde Balogun".
Left 55% open working region: six comfortable evidence rows with small drag handles and fine horizontal dividers. Exact row text: "88% model score"; "One missed visit · work shift"; "Two unresolved interpreter requests"; "Historical pattern matches"; "Intake conducted in English"; "Model language disclaimer". The final item has a quiet expand chevron. No row has an assigned evidence category. Below, a small empty rationale field labelled "Your reason", not a completed answer.
Right 45% region: heading "Evidence assessment". Three broad neutral empty category drop areas stacked vertically, labels "Strong evidence", "Weak or ambiguous", "Not evidence". Thin pale dashed outlines mark actual drop areas only. No moral colour coding or recommended target. Brief instruction "Sort the evidence."
Footer: "Assessment draft" at left, quiet "Case record" source link, one flat blue action "Save assessment" at right. Fit all six rows and all three bins without page scrolling.
```

Final refinement:

```text
Use case: ui-mockup. Edit this existing software screen with one precise minimal-copy change: REMOVE the redundant line 'Drag each item to the category that best fits.' beneath 'Evidence items', leaving the one short instruction 'Sort the evidence.' on the right. Close up the freed vertical spacing naturally. Preserve every other word, all six evidence items, three empty bins, empty Your reason field, original shell, monitor frame, footer, taskbar, colours, fonts and spacing. Do not change content or fill any answer. Keep one full 16:9 screen.
```

### Scene 3 · Record timeline

```text
Task-specific content: Case review selected; County review locked. Breadcrumb "Case review / Record timeline". Heading "Connect the paper trail". Small context "Tunde Balogun".
Left 60% open region: an uncluttered vertical interactive record timeline, four white record rows separated by whitespace rather than nested cards. Exact labels "Day 1 · Order issued"; "Day 6 · DOT-time change requested"; "Day 11 · Missed visit / work shift"; "Two days before flag · Social-worker note". Each row has a small connection port. One thin blue line starts at a port and stops unfinished in open space; do not draw a complete correct connection.
Right 40% document/evidence pane: heading "Social-worker note"; concise source text exactly "Anxious about losing job. Asked twice for evening DOT." Under a fine divider, two equally styled neutral record-method controls "Attach full note" and "Write a summary", neither selected. An EMPTY optional summary textarea labelled "Your summary". No invented clinical evidence and no prefilled summary.
Footer left "Record draft"; one flat blue action "Save the record" on the right. Restrained outline document/link glyphs from the Phosphor visual family. No correctness checkmarks.
```

### Scene 4 · Home visit

```text
LATEST USER DESIGN PRIORITY, overriding any two-column layout for media scenes: whenever an image or map is used, it is the PRIMARY focus and fills the entire working screen edge to edge. Keep native OS/app chrome slim. Inside the working canvas use full-bleed imagery, with small supporting Phosphor-style icons, short labels and compact overlay controls. No half-screen photo, small avatar, large opaque answer panel, boxed hero image or side-by-side image/text split. Preserve readable text and the required interactions. Keep at least about 75% of the image unobstructed.
Case review selected; County review locked. This is a revised home-visit screen.
The image from the earlier home-visit mockup expands to cover the entire application working canvas, from immediately beneath the slim app header to the bottom of the app. Preserve Tunde's face, the interpreter, clothing, modest home, believable seated first-person perspective and natural daylight. Tunde, a middle-aged Nigerian man in a dark green shirt, is the dominant visual subject at centre-left; the interpreter sits quietly further back. Extend the photographic room naturally into the right side to allow overlay controls. The photograph is not bounded in a card and has no border.
A small supporting label at top-left reads "Home visit". Near the lower-left, discreet white text "Tunde Balogun" and "Interpreter present · Yoruba / English", on a gentle local contrast scrim.
At lower-right ONLY, compact response controls overlay the picture, taking less than one quarter of the canvas, without an opaque half-screen panel: small label "Your opening question"; three compact equal neutral approach controls "Lead with the order", "Ask about his week", "Offer reassurance", none selected. An EMPTY short textarea "Type your first question" with a small microphone icon. A collapsed Transcript glyph can sit at the edge. One flat solid blue "Begin interview" button. The controls use readable Manrope 14–16px equivalents and Phosphor regular outlines. Keep every control secondary to the photograph and away from Tunde's face.
Do not add a second work-area heading, giant instruction, big portrait frame, large blank white area, video-call toolbar, play triangle or player timeline. This is a media-neutral visual frame; image versus video is still open in implementation. OS/taskbar/window identity remain those of the approved shell.
```

### Scene 5 · Case weighting

```text
Task-specific content: Case review selected; County review locked. Breadcrumb "Case review / Case weighting". Heading "Weigh the trade-offs". Only one short supporting instruction: "Allocate 10 points across the four values."
Left 62% region: four widely spaced professional allocation sliders with exact labels and current unfinished values: "Public health safety" 3; "Least restrictive means" 2; "Consistency" 1; "Administrative speed" 0. Value fields are aligned at row ends; solid-blue fills represent these numbers on a shared 0–10 scale. Beneath the sliders, concise total "6 of 10 allocated" and an EMPTY optional textarea labelled "Your rationale". Do not show a recommended or completed distribution.
Right 38% open preview region: small heading "Weighting preview"; large modest typographic "4" with "points remaining", a quiet line "Preview updates as you adjust." A collapsed "Similar cases" record link is allowed. NO consequence chart, numeric score, moral judgement or decorative balance scale.
Footer: "Weighting draft" and a visibly DISABLED flat blue-grey action "Save weighting". All controls and totals are inside the app viewport.
```

### Scene 6 · Recommendation

```text
Task-specific content: Case review selected; County review locked. Breadcrumb "Case review / Recommendation". Heading "Build the recommendation". Small "Tunde Balogun" context.
Left 62% open editor: a practical conditional editor with small "IF" label and an EMPTY selector/drop slot "Choose evidence"; a restrained connector to "THEN" and an EMPTY remedy selector/drop slot "Choose a pathway". A neutral draggable remedy tray below holds three equally styled tokens: "Petition for detention", "Enhanced DOT", "Close the flag". These are actual editor tokens, not marketing cards. No pathway is preselected; do not display an epilogue or arrangement checklist before selection.
Right 38% region: heading "Case record"; five compact source-file links with Phosphor-style file glyphs and dividers: "Triage note", "Score annotations", "Social-worker note", "Interview record", "Weighting rationale". Do not invent note contents or a successful score.
Footer: "Recommendation draft" at left, single flat blue action "Confirm recommendation" at right. No prediction of the correct remedy.
```

### Bridge · Three months later

```text
Task-specific content: this is the PASSIVE bridge, not another learner decision. Keep title bar, header and desktop taskbar LIGHT and matching the reference. Only the central working canvas becomes deep navy #06101F with a restrained warm-gold accent. Case review remains the previous context; County review is poised to unlock after the reveal.
Compact heading "Three months later". Small line "Your case file is now Exhibit 7 of 11."
Left 68%: a large clean read-only document viewer, pale near-white surface with simple fine separators, titled "Tunde Balogun · Case record". Exactly six record rows: "Triage note", "Score annotations", "Social-worker note", "Interview record", "Weighting rationale", "Final recommendation". Quiet small document icons and neutral record states "Saved" or "Retained" may illustrate an existing learner record; no green correctness ticks or score badges. Header of viewer shows a small lock glyph and "Read-only".
Right 32%: a restrained native-software exhibit destination panel with an outline folder glyph, label "County Compliance Review", and a small gold "Exhibit 7 of 11" badge. This is a legal-file reveal, not a chart or a game graphic.
Bottom text inside canvas: "What you recorded is what this review will see." NO edit controls, answer fields, decisions, Continue button, primary CTA, countdown or permission gate. Show one calm archival reveal state within the same application.
```

### Scene 7 · Cohort evidence

```text
Task-specific content: County review is selected with the same thin underline and a small green contextual accent, Case review is available as a read-only earlier-record context. Breadcrumb "County review / Cohort evidence". Heading "Which figures answer the complaint?"
Left 58% region: six neutral draggable evidence rows with exact text: "Petition rates · about 30% in both groups"; "Average scores · 25-point gap"; "Vendor claim · 94% predictive accuracy"; "Patient names and scores"; "Interpreter-delay correlation"; "Within-group score spread". Mark the 94% figure clearly as Vendor claim, do not display it as verified performance. No actual correlation coefficient or invented additional statistics.
Right 42% region: three broad empty neutral category bins labelled "Answers the complaint", "Relevant-sounding", "Actively misleading". All bins empty, alternatives equally styled, no coloured answer hints or filled rationales.
Footer: collapsed "Exhibit 7" source link left, single flat blue action "Confirm evidence" right. The list and all bins fit without full-page scroll. Same readable software shell.
```

### Scene 8 · Cohort map

```text
LATEST USER DESIGN PRIORITY, overriding any two-column layout for media scenes: whenever an image or map is used, it is the PRIMARY focus and fills the entire working screen edge to edge. Keep native OS/app chrome slim. Inside the working canvas use full-bleed imagery, with small supporting Phosphor-style icons, short labels and compact overlay controls. No half-screen photo, small avatar, large opaque answer panel, boxed hero image or side-by-side image/text split. Preserve readable text and the required interactions. Keep at least about 75% of the image unobstructed.
County review selected. Small supporting top-left title "Sketch your prediction", with one brief line "Mark where you expect petitions to cluster."
A broad pale, illustrative FICTIONAL county basemap fills the ENTIRE working canvas edge to edge. Fine street lines, muted districts and a subtle river create a believable map-tool view. This is the pre-data-reveal prediction stage, not a precise geographic or statistical result: do not plot patient positions, heatmaps, invented dataset results, named real towns, charts, clinic markers or numeric geographic scales. A single unfinished thin blue freehand learner outline appears in one region, not an answer or actual pattern.
Two small Phosphor-style pen and eraser controls float near the map's left edge. The Case 7 source record is a small COLLAPSED overlay at a lower corner, rather than a right-side pane: concise label "Case 7 · Tunde Balogun", supporting "88% risk score", and a small Case record glyph. No portrait or interpretation.
One flat blue "Reveal the pattern" button sits above the map's bottom-right edge. Tiny Prediction draft status is allowed at the opposite bottom corner. No opaque footer bar or sidebar consumes the map. The map is visually primary and at least 80% unobstructed; icons and supporting text are secondary. Preserve the thin native title bar, app header and taskbar.
```

### Scene 9 · Advocate call

```text
LATEST USER DESIGN PRIORITY, overriding any two-column layout for media scenes: whenever an image or map is used, it is the PRIMARY focus and fills the entire working screen edge to edge. Keep native OS/app chrome slim. Inside the working canvas use full-bleed imagery, with small supporting Phosphor-style icons, short labels and compact overlay controls. No half-screen photo, small avatar, large opaque answer panel, boxed hero image or side-by-side image/text split. Preserve readable text and the required interactions. Keep at least about 75% of the image unobstructed.
County review selected. The advocate-call screen is visually immersive.
A realistic wide photograph fills the ENTIRE working canvas beneath the slim app header, continuing behind the compact response controls to the bottom. Fictional middle-aged Nigerian woman community advocate, dark skin, short natural hair, modest neutral blouse, seated in a simple believable work setting, holding a phone to her ear. She is the clear primary subject at centre-left. Natural daylight, physically plausible perspective, quiet environment, no photo frame, no circular avatar, no stock-image collage.
Small supporting top-left status with a Phosphor-style phone icon reads "Call connected". Lower-left has a discreet label "Community advocate". This is a visual of a PHONE conversation, not a video-call interface.
At upper-right, a short supporting dialogue quote "Was that you?" and a small context line "Tunde mentioned the interpreter-assisted visit." Use restrained readable text; no giant heading.
At lower-right, three compact equal neutral response controls over a gentle local contrast scrim, occupying less than a quarter of the canvas. Exact labels: "That was one case. Here’s what the eleven together show."; "His case is a good example of the pattern."; "I can’t discuss individual patients." No choice selected, A/B/C, correctness colours or trust score. One small flat blue button "Send response" below. A small collapsed Transcript icon may sit nearby.
Leave the woman's face, phone and most of the photographic environment visible. No white response sidebar, large opaque panel, media player controls, hang-up CTA or call-duration counter. A media-neutral scene visual, not a requirement to produce video. Keep icon family, button style, OS chrome and taskbar consistent with the approved app.
```

### Scene 10 · Review planning

```text
Task-specific content: County review selected. Breadcrumb "County review / Review planning". Heading "Allocate the review time". One short line "Distribute 72 hours across the work."
Left 64% region: four generously spaced resource allocation rows with aligned sliders and hour-value inputs. Exact labels: "Deeper cohort analysis", "Individual file spot-checks", "Board report", "Interpreter services". ALL four sliders are at 0 and each field reads "0 h". Tracks are pale grey with no blue filled portion. No allocation preset or recommendation.
Right 36% open remaining-budget region: large but restrained typographic "72 h", label "Available", small total "0 of 72 h allocated". A collapsed "Exhibit 7" source drawer below. This is a WORK BUDGET, not a clock or timer: do not show a countdown, ticking seconds, urgency gauge, chart or fictional consequences.
Footer: "Allocation draft" left, visibly DISABLED flat blue-grey action "Confirm allocation" right. No moral correctness indicators.
```

### Scene 11 · Policy rule

```text
Task-specific content: County review selected. Breadcrumb "County review / Policy rule". Heading "Build the decision rule".
Left 62% open policy assembly tool: three restrained linked vertical modules titled "Legal threshold", "Safeguard", "Communication". Each module is white/pale blue, with a slight interlocking tab or join that clearly supports the alignment interaction. Selector prompts are EMPTY: "Choose threshold", "Choose safeguard", "Choose communication". Small circular rotate handles on each module indicate actual alignment controls. Use professional original software module shapes with fine outlines, not toy jigsaw art, coloured puzzle pieces or a lesson illustration. Do not preselect any threshold or suggested policy.
Right 38% open preview: heading "Policy preview", empty placeholder "Your rule will appear here". Beneath, a quiet collapsed "Exhibit 7 consistency" section, neutral and not marked passed. No scores or reassuring success message.
Footer: "Policy draft" left, single flat action "Test the policy" right, disabled until required selections exist. Compact Phosphor-style rotate/link/source glyphs only where they identify controls.
```

Final refinement:

```text
Use case: ui-mockup. Edit this existing policy editor to remove redundant copy ONLY. In each of the three modules, REMOVE the extra standalone line 'Choose threshold', 'Choose safeguard', or 'Choose communication' above the dropdown. Keep each same phrase INSIDE its empty dropdown. Shorten the instruction below the main heading to 'Select and align the components.' Close up freed internal spacing naturally while retaining the module geometry and rotate handles. Preserve all other controls, module titles, policy preview placeholder, Exhibit 7 consistency drawer, disabled Test the policy button, app header, title bar, monitor and taskbar exactly. No answer selections or new data. Keep one full 16:9 screen.
```

### Scene 12 · Board timeline

```text
Task-specific content: County review selected. Breadcrumb "County review / Board timeline". Heading "Trace the consequences".
Left 30% region: compact outcome tray holding FIVE actual draggable outcome tokens, a CONSTRUCTIVE-BRANCH concept example. Exact concise labels: "Interpreter access checked"; "Evening DOT slots reviewed"; "Petition criteria updated"; "Transparency report published"; "Exhibit 7 cited in board minutes". Neutral surfaces, small handles, no completed placements or correctness ticks. Do not invent alternative actions or make these learner-authored policy choices.
Right 70% working area: a broad four-week placement timeline, four aligned vertical columns "Week 1", "Week 2", "Week 3", "Week 4", with clean lightly outlined EMPTY drop areas. One token may be slightly lifted with a subtle drag shadow but do not assign it to a particular week. No graph axes, numerical measures, invented outcomes, five additional boxes or correct-order annotations.
Footer: quiet "Timeline draft" left, one flat solid blue button "Review the outcome" right. Preserve the compact original software shell and readable outcome text.
```

### Final outcome · Review report

```text
Task-specific content: County review selected; native title bar, app header and bottom desktop taskbar remain LIGHT, matching the shared reference. Only the central application canvas becomes deep navy with restrained blue illumination.
Small breadcrumb "County review / Review report". A clear Afacad result heading around 40px "Rigorous & Fair, Twice". One concise line "Your case file supported the county review." This is ONE illustrative possible ending, not a hard-coded outcome for every run.
Two broad open working regions with thin separators and minimal inset surfaces: left heading "Your record" with three concise retained-record labels "Evidence preserved", "Interview documented", "Decision explained"; right heading "Your decisions" with three qualitative review labels "Rigour", "Trust", "Consistency". Do not invent numeric scores, percentage bars, stars, trophy, leaderboard or confetti.
Near the lower middle, a small reflection area with exact prompt "Which earlier decision would you spend more time on?" and an EMPTY short response field. Footer main action is one FLAT solid blue button "Review my decisions"; secondary small text action "Run again". No duplicate Start button, no hero illustration and no extra lesson paragraphs. The result feels like the report section of the same professional lite software.
```

Final refinement:

```text
Use case: ui-mockup. Edit this existing final review report with precise two changes. FIRST remove the small LOCK glyph beside the selected County review tab in the top application header; County review is unlocked in this completed Act II state. Keep its existing selected underline and all header text. SECOND remove the outer rectangular rounded borders around the two sections 'Your record' and 'Your decisions', preserving their internal fine row dividers, labels, icon sizes and original two-column alignment, so they feel like open regions rather than bounded cards. Preserve all other text, result heading, reflection field, buttons, dark report background, native title bar, monitor and desktop taskbar. No scores, new copy or extra illustration. One full 16:9 screen.
```



