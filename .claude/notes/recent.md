# Recent changes, Nov 2026 (newest first)

Moved verbatim from CLAUDE.md on 25 Nov 2026. Not loaded automatically: grep or read the part you need.

## SanD Hacks Grand Prize and WLLFM (15 Nov 2026, his "WE WON SAND HACKS GRAND PRIZE ... i also got into wllfm. add this to webstie resume, linked")
- **miyagi** (lowercase, as its brand writes it): **Grand Prize, SanD Hacks 2026** (UC San Diego, 14-15 Nov), with Michael
  Tarekegn; his word, announced in person, no Devpost winner badge seen yet. Turns any coding tutorial into an auto-graded lab
  that pauses at every step until your code works. Live `miyagi.study` (his repo adrian-erlikhman/miyagi), Devpost
  `devpost.com/software/miyagi-x5cw4g`, demo `youtu.be/TXrGOwRW3OM`, code `github.com/michae6345-crypto/miyagi` (public).
  Split per that repo's README Team section: Adrian the Electron overlay (`app/`) and the brand (and miyagi.study); Michael the
  engine and the VS Code companion. At judging Adrian did the pitch's intro and outro, Michael the demo. Tracks entered: Bright
  Data, Gemini, Tiger Data, GoDaddy; **never** the SpaceX track (no Grok in it).
  On the site: a museum work third, after SafeJew (`#case-miyagi`, Claude's placement: the biggest hackathon prize; move it if
  he asks), in a **red-lacquer frame with rosettes and laurel** (`img/frames/f-miyagi.svg`, `make_frames2.py` "lacquer"; the
  other eight files came out byte-identical). Wall picture `img/cases/miyagi-home.webp` (its og card, the bonsai, padded to
  16:10). **The closer look plays a walkthrough, not a picture** (15 Nov, his "i want an actual walkthrough when you
  open the painting, not just a screenshot"): the six frames of the miyagi.study landing page's own story (`img/cases/miyagi-walk/
  1-ask … 6-learns.webp`, 1200x800, a real neural-net lesson), each with "Step n of 6", its title and one line (his landing copy
  in sentence case), in a small dark player in the frame: story bars that fill as it plays (about 6 s a step, looping), pause,
  the live link (miyagi.study) on top; a bar or the picture jumps; arrow keys step it when focus is inside; paused under
  reduced motion. Markup is a `<template class="walk">` in `#case-miyagi`; site.js MUSEUM `walk()`; CSS `.wt-*`, and
  `.mx-w.wk` sizes the frame to the screen and pins it while the placard scrolls (desktop). Any other work can get one the
  same way. `miyagi-box.webp` is no longer used.
  The sign says "nine works". An Honors row after Citadel, JSON-LD `award`, llms.txt; one-pager: first line of Competitions;
  CV: Honors line, and a Selected Projects entry after SafeJew (one bullet, link on the role line, to keep the CV at 4 pages).
- **WLLFM: accepted 13 Nov** (S22216, "Who Wrote This? LLM Judges Encode Authorship Without a Detectable Sense of Self",
  Adrian Erlikhman, Michael Tarekegn, Philo Juang, in that order; Fourth Workshop on Large Language and Foundation Models at
  IEEE BigData 2026, Phoenix, 14-17 Dec; archival, IEEE Xplore). It is the follow-up to Whose Line, built from CompLLM's
  open-weight panel; private repo `adrian-erlikhman/complm`, branch `wllfm` (4b0f2f3 = the submitted version). Research card
  `#rs-t6`, third (after Curated to Win; accepted papers first). Numbers from `paper_wllfm/numbers.tex`: 960 texts, probe AUCs
  0.90-0.98, 0.77-0.89 on 32-word texts, Claude 53.1% as an outside reader. **No PDF or code link yet**: the camera-ready is due
  26 Nov and the code is promised "with the paper". The cover (`img/papers/r06-wllfm.webp`) is page 1 of the branch's
  Tectonic `main.pdf`, whose abstract predates the final wording (invisible at 104px); re-render it from the camera-ready, host
  the PDF, and make the cover and title links (the card's `[EDIT]` comment). Presentation format (oral, poster, online) is not
  assigned, so, as with ARRSI before, **no Presentations line on the CV yet**; add it once he confirms.
- Dated lines fixed the same day: the About now says "In November I presented that research ..." (the ARRSI talk ran 10 Nov
  as his recorded video, played by the organizer); the Nov. 10 Coming-up line is gone; BigData reads "Dec. 14-17" with both
  papers; the CV's ARRSI talk lost "(scheduled)". "Four of my papers are about evaluating language models".
- **Résumé clean-up (15 Nov, later; his "too messy and not clean ... cut out the links ... no weird bolding in the
  description"):** the one-pager's body has **no links** (only the header's email, site, LinkedIn and GitHub) and **no
  bold inside a bullet**. Every entry is a bold name, an italic "title | detail" line and verb-first bullets; papers put
  status | credit on the italic line (every multi-author paper names its co-authors) and run in the site's order
  (LangLLM, Curated to Win, WLLFM, portfolio, Whose Line, Legatum); Competitions are "Result, Event: Project, what it
  is." in order of result. Ledger is "compliance tracking for corner stores" there (the fixed role wording is no longer
  quoted on the one-pager; the CV keeps it). The CV still has its links and bold citations: ask before changing it to match.
- Résumé cache-buster is now `?v=2026-11-15-clean` (7 links). Both PDFs built with XeLaTeX (checked first: HEAD's cv.tex
  reproduced the live cv.pdf text exactly), `build.check()` passed (2 and 4 pages).

## AIML-LI's domain (expired 9 Nov, renewed 20 Nov 2026)
- aiml-initiative.org lapsed on 9 Nov and was parked; from 18 to 20 Nov the AIML-LI site ran at aimlinitiative.github.io and
  this site linked there (#331). It was renewed on 20 Nov on the `aimlinitiative` Namecheap account, and every link is back on
  aiml-initiative.org (the museum figure `#case-aimlli`, llms.txt, site.js BIG VIEW `D`). It renews each 9 Nov.

## ARRSI talk materials (5 Nov 2026, his "submit it and also updat my site")
- Curated to Win's slides (12 pages) and A0 poster went into the AACL-IJCNLP presentation form on 5 Nov (Underline code
  **W7_7**, submission 6aece44ce842ed4ed804e0bf, confirmation email the same day; he told Claude to sign the release for him).
  The same PDFs are on the site as `papers/curated-to-win-arrsi2026-slides.pdf` and `-poster.pdf`, linked `?v=2026-11-05` from
  R.02's links ("Paper · Slides · Poster · Code and data", with `data-title` for the paper reader), llms.txt and the sitemap.
  Sources are the Slides and Design artifacts from that session. They are plain white Arial on purpose (he called the first,
  navy and IBM Plex, "horribly chatted"), so the site's Latin Modern rules don't apply to them.
- The status line now says "(virtual)". **The talk video is not done:** he records it, and the form uses the latest submission
  only, so a video resubmission must carry the poster and slides too. Add a "Talk" link only once a video exists. The old rule
  below ("don't add a talk or poster line until the format is settled") is settled for slides and poster; the Anthology
  rule still stands.

## Status pass (1 Nov 2026, Adrian's "Yes, fix them" after a college-app audit)
- **Portfolio paper: Published** (OJSS, 29 Oct 2026, Oct 2026 Vol. 12 No. 7, pp. 510-529; journal page
  `oxfordjss.org/oct-2026-vol-12-issue-7/does-portfolio-optimization-beat-splitting-evenly`; DOI 10.65161/recqxelaA8evrueNC
  was still registering on 1 Nov, so it is not linked yet). The site's PDF is the journal's published copy (20 pp, Title/Author
  metadata added), `?v=2026-10-29` in the answer, `D`, ⌘K and `PAPERS`; R.04's answer has an "In the journal" tile
  (`.pa-gh` holding the OJSS O). Long résumé: "Published, Oxford Journal of Student Scholarship, Oct 2026", title without the
  old "Markowitz vs. the 1/N Portfolio" subtitle (the published title has none), credit "Co-first author, with Ryan Erlikhman".
  **The one-pager carries it since 1 Nov** (his yes), after Legatum, one bullet (74% of 250 simulations, Sharpe 0.70 vs 0.51).
- **Legatum: In revision** (JHSS's second decision, 20 Oct, was again revise and resubmit). Site, llms.txt, JSON-LD (dropped
  from `award`) and both résumés. Its logo is off the "Interned, published and selected at" strip. Say "Accepted with
  revisions" or "published" again only once JHSS says so.
- Both résumés: LangLLM's real title, "dunderscore", Whose Line credited "Co-first author, with M. Tarekegn, P. Juang" (long)
  and "with Michael Tarekegn and Philo Juang" (short); no "advised by" there any more (AIML-LI's advisor line stays). Long's
  Talks lists ARRSI as Virtual (registered virtual, 21 Oct; pre-recorded talk). Long's Legatum title uses `\papertwo`
  (two underlined lines: `\underline` is an hbox and can't wrap, so the old `\newline` ran the title off page 2).
- Fencing results fixed against fencingtracker: Top 16 Y14 is the March 2024 NAC (9th of 218), not Summer Nationals 2023;
  November NAC Cadet is Top 64 (33rd of 269). The "4× Junior Regional Champion" line was left alone (fencingtracker shows
  two Junior wins; ask him).
- Honors: NCSS/podcast row reads "Invited speaker & guest". KB: résumé "(two pages, or four)", ARRSI "present it
  virtually", a piano answer from the long résumé's Honors (MTAC, Level 9 candidate, five state-honors exams).
