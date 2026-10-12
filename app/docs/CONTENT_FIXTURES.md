# Content fixtures: what has to be replaced before this is a finished assessment

The storyboard (DT01_RD_03_03, pp. 18–42) doesn't supply everything a scored, playable build needs. To make the simulation fully playable, I wrote the missing pieces as **development fixtures**.

- **In the code:** every fixture is in `src/content/scenario.ts` (marked `fixture: true` or commented as a fixture). Scoring weights and endings are in `src/state/run.ts`.
- **In the app:** each one carries a yellow **FIXTURE** tag wherever learners can see it.

None of it is presented as storyboard data. Replace each item with authoritative content from the content owner, then remove the tag.

| # | What | Where it shows | File / symbol |
|---|---|---|---|
| 1 | Eight of the ten triage cases (scores, missed visits, history, language). Only Tunde Balogun and Case 02 come from the storyboard. Case 01 must stay above 91% because Tunde is "3rd highest" | Scene 1 queue and record (tagged FIXTURE DATA) | `CASES` |
| 2 | Triage answer key (`accept` tiers per case) and the "context sort" rule | Scoring only | `CASES[].accept`, `scoreStage("s1")` |
| 3 | Scene 2 bins for the 88% score, the interpreter requests and the English intake (the storyboard places only three of six) | Scoring only | `SCORE_ITEMS[].key` where `fixtureKey: true` |
| 4 | Scene 4 replies for the "Lead with the order" and "Offer reassurance" openings, and their detailed-record wording | Home-visit transcript (tagged) | `INTERVIEW.order`, `INTERVIEW.reassure` |
| 5 | Scene 5 consequence previews for extreme weightings | Weighting preview (tagged) | `S5Weighting.tsx` `previews` |
| 6 | Scene 6 evidence categories, the evidence→remedy key, and all three six-week epilogues | Rule editor and epilogue (tagged) | `EVIDENCE_CATS`, `MATCH`, `EPILOGUE` |
| 7 | Scene 7 raw patient list (names other than Tunde) | Patient list drawer | `S7Cohort.tsx` `NAMES` |
| 8 | Scene 8 county geometry, clinics, transit line and all 40 patient records. Built so that petitions are 6/20 (30%) in each language group, the mean score gap is about 25 points, and petitions cluster in the three transit-desert districts | Cohort map (tagged FIXTURE DATASET) | `DISTRICTS`, `CLINICS`, `TRANSIT`, `PATIENTS` |
| 9 | Scene 9 advocate opening line, all three of your opening lines, and her replies to the stonewall and reassurance branches. The "Was that you?" follow-up and the three replies are storyboard text | Advocate call (tagged) | `CALL_OPENINGS`, `S9Call.tsx` |
| 10 | Scene 10 hour step (4 h) and the definition of "balanced" (every stream ≥ 8 h and ≤ 32 h) | Allocation note (tagged) | `HOUR_STEP`, `scoreStage("s10")` |
| 11 | Scene 11 second safeguard option ("interpreter review after filing") and the threshold × safeguard × communication compatibility table | Policy modules (tagged) | `SAFEGUARDS[1]`, `jointA`, `jointB` |
| 12 | Scene 12 outcome-card wording for non-constructive policies, and every card's "actual" week | Board timeline review (tagged) | `boardCards()` |
| 13 | Score weights not in the p.41 matrix (cropped columns), the band thresholds, and two of the four endings ("A Good File, a Missed Pattern" and "Back to the Record"). "Rigorous & Fair, Twice" and "Lucky, Not Ready" are the storyboard's | Outcome report (non-storyboard endings tagged) | `scoreStage`, `ending`, `band` |
| 14 | Act I documentation-strength measure (0–5: barrier note, ≥1 annotation, attached note, detailed interview, rationale). It drives the Bridge, the Scene 10 spot-check and the board minutes card | Indirect | `docsScore()` |

## Storyboard text used verbatim (not fixtures)

- Mr Balogun's and Case 02's case details.
- The Scene 2 items and the disclaimer.
- The Scene 3 records and the social-worker note.
- Scene 4 openings A, B and C, the B-branch evidence, and both record wordings.
- The "nine similar cases" line.
- The filing notice.
- The Bridge copy.
- Scene 7 items, the correct bins and their reasons.
- The continuity-risk question.
- "Was that you?" and the three replies.
- The Scene 11 threshold, the first safeguard and both communication plans, plus the Exhibit 7 messages.
- The board-minutes variants.
- Per-scene feedback and the strongest responses.
- The reflection prompt.

## Assets

- `public/assets/img/homevisit.jpg` and `advocate.jpg` are AI-generated images of fictional people (Higgsfield `gpt_image_2_5`, 12 Oct 2026). The source PNGs are in `_source-images/`. **Review them for representation before release**, or replace them with commissioned photography or illustration.
- `wallpaper.jpg` is an original generated wallpaper.
- The partner logos and chevron come from `Fix_the_Prompt_Opener.zip`.
- The opener's unit label ("Public Health Policy, Law & Ethics") is a placeholder until the curriculum team confirms the course/unit label.
