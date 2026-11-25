# The current homepage (plain, first person, since 2 Nov 2026) and the museum

Moved verbatim from CLAUDE.md on 25 Nov 2026. Not loaded automatically: grep or read the part you need.

## Homepage: plain, first person (2 Nov 2026, current)
- **How it got here:** someone told Adrian they hated the chat site; he asked "how can we totally redo it to make it cooler
  but still really good for admissions officers. maybe no chatgpt" and picked **A, Notebook**, of three mocks
  (`_mock/redo-a.html`; B big type, C a launch page), which shipped that afternoon (#292): a scrapbook page with taped
  photos, highlight cards and blue handwritten asides. That evening: "make it a little more nonchalant ... dont make it in
  third person. just be like in my [site] ... no weird AI slop fonts. no weird AI slop. do a crazy PASS to remove all of
  that". The chat (29 Oct to 2 Nov) is in git history (last commit with it: 02e2997).
- **Rules now:** the site speaks in the **first person** ("I research...", "Ryan and I...", "My friends are in that
  number"). **One font, Latin Modern** (the résumés' LaTeX face, self-hosted; Google Fonts is no longer loaded), body
  19.5px. **None of:** Geist, Plex Mono, Shantell Sans/handwriting, spaced-capital labels, cards, highlighter marks, tilted
  or taped photos, fade-ins, the dot grid, pill or boxed buttons, "↗" arrows, cutesy asides. Links are underlined navy
  text, grouped with " · ". Keep it that way; ask before adding any flourish back.
- **Order:** about (`#about`: the name, then his three photos across (headshot, lunge, YC; above the writing since 4 Nov,
  his pick A of `_mock/about-photos-options.png` over photos-first), then two short paragraphs and Résumé · CV · Email ·
  LinkedIn · GitHub) · **Experience** (`#experience`, `#xp-*`, then Lemma next summer; first since 3 Nov, his
  words: "i think experience should be the first section"; titled Experience, was Internships) · **Projects, then Research**
  (since 4 Nov, his ask: "first put projects then resarhc"; the bar's links follow) · Research (`#papers`, `#rs-t1..5`: his "AI models now grade..." line, then per paper the
  first page, the title, result and venue with co-authors, a first-person paragraph, "What it asks" as `<details>`, and
  "Paper (n pages) · Code and data") · Projects (`#work`, `#case-*`, a list with a picture beside each; Ledger keeps its
  receipt; the "why I built it" stories sit in SafeJew's, AIML-LI's and Safe Routes' paragraphs; dunderscore last) ·
  Fencing (`#fencing`, the six-second touch, rankings in a
  sentence, results, the bout, coaching, `#bouts`) · Honors (`#record`, a plain table, no marks) · Off the laptop (`#life`)
  · Next (`#next`) · Contact (`#contact`). The top bar's links are plain grey text; the one in view darkens (site.js NAV).
- **Kept:** the swarm intro (its button now just says "skip"), the `status.json` maintenance screen (now "Back soon"), the
  résumé picker ("LaTeX source" at its foot), the photo viewer and the paper reader (site.js NOTEBOOK; `main.nb`,
  `[data-full]`, `[data-video]`, `/papers/` links). Old ids all land.
- **Overnight pass (3 Nov), from an admissions-officer review (a subagent's read of the page):** colon reveals became
  sentences; dates are U.S. style ("Dec. 17"); the hero gained "4.0 unweighted · SAT 1520 · 17 APs · National Merit
  Semifinalist"; "won prizes at four hackathons" now adds up because **eDNAtlas** (1st, Decode the Ocean; `/eDNAtlas/`,
  `#case-ednatlas`) is in Projects; page counts and "Paper on arXiv soon" are gone; Lemma is the first Internships row
  ("Incoming Intern, Summer 2027"); the Citadel row is titled "Citadel Terminal" with dunderscore in its text; rankings
  sit above the fencing clip. **Cut:** his aphorisms ("My default is to start before I feel ready", "Fencing taught me",
  "I learn by building"), the 14-14 bout story, the two Top 64 results, SIFMA, the favorites table, the typical day, the
  naps, the bed line and Ryan's Valentine's story; piano moved to Honors (MTAC row); NCSS and the aiEDU podcast are two
  rows. **The MIT recruitment line in Fencing stays** (Adrian, 3 Nov: "Keep it", after both reviewers flagged that other
  schools' readers see it; don't raise it again). **Left for Adrian** (his past calls or unknown facts): "4× Junior Regional Champion" (fencingtracker shows two), which brother is "my
  11-year-old brother" (Ryan is older), teammate credits on SafeJew, Ledger and Safe Routes, and project order.
- **Second overnight pass (3 Nov), from a second fresh review:** the hero's score line came out again ("the least
  nonchalant line"; scores stay in Honors) and its paragraph lost its links; it now says "Best Paper Finalist at the IEEE
  BigData High School Symposium" and "a free AI course that I'm working with LAUSD's Ed Tech office to turn into a
  district elective". Research's intro is one framing (three papers on language models, two with Ryan); Curated to Win's
  summary keeps only the 12-item sentence (the 11-under-RewardBench's-code detail stays in its questions); "What it asks"
  is "Research questions". Projects has no intro line; SafeJew says "which I co-founded"; AIML-LI is "with input from
  engineers at Google DeepMind and Microsoft" and "planning a summit" (it is 6 Feb 2027). Lemma moved to the bottom of
  Internships. The Y14 result is gone. Honors: NCSS is "Invited panelist", APs read "17 APs, 6 of them this year", and the
  MTAC row went back to the outdoors section as a sentence. "Off the laptop" is now **"Outside school"**, with three
  photos (climb, backpack, cycle). Paper pages are 104px. On phones the top bar is not sticky and its links wrap. The
  **⌘K palette is gone** from the page (its "adrian.os" prompt and toasts read as gimmicks, and "/" opened it while
  typing); its script skips itself.
- **Notes and touches (3 Nov, later; his ask: "add a little cool interactive shit and maybe some annotations, but i
  really like this base").** He picked **A (pen)** over B (LaTeX margin notes) and touches **1, 2 and 4** (not 3, scoring
  lamps on the clip) from `_mock/touches.html` (sheet `_mock/touch-shots/touches-options.png`). This lifts the plain pass's
  ban on handwriting for these notes only. **Five notes** in his ballpoint blue (`#2457c5`, Shantell Sans pinned to INFM 100 /
  BNCE 30, self-hosted as `fonts/shantell-sans-notes.woff2`), in the margins at 1180px+ only, each arrow drawing in once
  seen: "hi! that's me" (headshot), "came with a hackathon win!" (Lemma), "wrote this one on my own" (Curated to Win's
  page), "won the same weekend as Hivemind!" (Monte), "me, in the black mask" (the clip). **Touches:** (1) under the
  cursor the name turned into the loading screen's dots (**removed 3 Nov, late**: Adrian, on a screenshot of it mid-push,
  "i dont like both of these"; the big name is plain text now, don't bring the effect back); (2) a paper's first
  page lifts to 2.6x on hover (CSS); (4) Ledger's receipt prints out of the slot when it comes into view. site.js NOTES &
  TOUCHES (positions computed from the real elements, re-laid out on resize, font load and any height change); styles at
  the end of notebook.css. Reduced motion: notes and receipt shown as they end.
- **Projects is a museum wall (3 Nov, later).** Adrian rejected tighter lists (C, D), three presentations (index + stage,
  problem first, commit log), three all-at-once takes (paper figure, periodic table, marked-up contact sheet) and four of
  five more (map of LA, bookshelf, lock screen, Venn), then picked the **museum wall** (`_mock/proj4-museum.html`): each
  project framed (`.fr`) under a spotlight on a warm wall (`.ms`, wider than the text column via `.wide`, 4 across, 2 on
  phones under 820px, 1 under 480px) with a wall label (`.wl`): title and year, medium, what it is (SafeJew's and Safe
  Routes' whys kept in a clause), an italic credit line ("Gift of the Jewish Federation of Greater Los Angeles (Teen
  Innovation Grant). On view since 2024.", "On loan to LAUSD, working toward a district elective.") and its links. Ids
  `#case-*` stay on the figures; Ledger's receipt still prints in its frame. Order (his ask, 3 Nov: AIML-LI and SafeJew
  higher): AIML-LI, SafeJew, Hivemind, Monte, Ledger, eDNAtlas, Safe Routes, Citadel. The "won the same weekend as Hivemind!" note
  came off (Monte is mid-row now); four pen notes remain.
- **Research refined (3 Nov, his picks from `_mock/research2.html`).** The intro is one short paragraph about the topics, not
  the venues; since his "the research paragraph is mid and is AI slop, make it more professional" it reads "My research
  focuses on evaluating language models: identifying which model wrote a text, and testing whether LLM judges and
  benchmarks give reliable results. Two further papers, written with my brother Ryan, ...". Each paper opens with a plain
  question in italics (`p.hk`, e.g. "Do AI judges recognize their own writing?"); LangLLM's and Curated to Win's paragraphs
  lost the sentence that repeated it. Order: LangLLM, Curated to Win, the portfolio paper (published), Whose Line, Legatum
  ("yes published first"). He turned down status stamps on the first pages, then a colourful extra (result charts per
  paper, `_mock/research3-a.html`, or topic medallions, `-b.html`): "this is dtm, its chill for now". Leave Research as is.
- **The About intro is Adrian's own words (3 Nov, late).** He found the accomplishments list "mid", saw three takes
  (`_mock/about-a..c.html`) and wrote his own mix: "Hi! I'm Adrian, a senior in high school in LA. I love building things
  that help my community, and my 'weapons of choice' are software engineering and machine learning..." (recursive
  self-improvement and how well we can evaluate it; four companies from an AI research startup to a VC fund; AIML-LI and
  SafeJew; Team USA international fencer and "a semi-professional napper"). Typos fixed only, plus one fact: his "I've even
  presented at a research conference in China (though over zoom)" became "On Nov. 10 I'm presenting that research ...",
  since the ARRSI talk is on 10 Nov. **After 10 Nov, change it to "I presented".** Marked phrases: recursive
  self-improvement, the China talk, four cool companies, Team USA international fencer. **Since 3 Nov (late) they are
  written in by hand, not underlined** (`span.hw`: Shantell Sans in the notes' ballpoint blue at .94em; Adrian wanted
  "something other than underlines" and picked **C** of five takes, `_mock/em-a..e.html`: highlighter, pen loops, handwritten,
  hover cards, navy bold). The pen underlines elsewhere (wall labels, Research) stay. **The same evening (his ask, "one short parenthesis"
  each):** AIML-LI "(a free AI-literacy curriculum and student summit, supported by aiEDU and Jane Street)" (he wrote
  "curriculum supported by aiEDU and Jane Street"; Jane Street gives the summit's prizes, aiEDU backs the course, so the
  summit is named) and SafeJew "(a live map of antisemitic incidents across LA, funded by the Jewish Federation of Greater
  Los Angeles)" (JFEDLA spelled out for admissions readers).
- **Projects is the Museum of Adrian (3 Nov, late; it replaced the medallion wall below).** Adrian: "make it more like an
  actual museum, make them have different cool frames and then make it like the museum of adrian in the annotated font".
  Round 1 (`_mock/museum-v1..v5.html`): he liked 1 (grand gallery, "free admission!") and the salon's colours. Round 2
  (`museum2-*`, carved frames after an ornate gold frame photo he pasted): he liked B and C, "with the lights". Round 3
  (`museum3-*`): **3 + 3 + 2** shipped. Crimson wall (`.mus`, `.wide`), the sign "the Museum of Adrian" in Shantell Sans inside
  a carved gold frame with "free admission!" pen-scribbled beside it (`.sg`, under it on phones), then three across (`.mg`,
  flex, last row centred; two at 900px, one at 600px): each work (`figure.mf#case-*`) has a brass picture light (`::before`,
  `img/frames/lamp.svg`) throwing a warm pool (`::after`, brighter on hover), its own carved frame (`.cf`, `border-image:
  var(--fr) 120 round`), a brass plaque (`.plq`: name, result) and the wall label (`.wl2`, same copy as before). **Eight
  different frames**, `img/frames/f-<project>.svg`, drawn by `python tools/make_frames2.py` (helpers and SVG lighting in
  tools/make_frames.py; **not** copied from his photo): AIML-LI gold, shell corners, running vine; SafeJew pale gold, leaf-fan
  corners, laurel; Hivemind ebony with gold rosettes and rings; Monte silver rope; Ledger bronze fluting; eDNAtlas sea-green
  and gold wave scroll; Safe Routes walnut, egg-and-dart; Citadel cream and gold, scrolled corners. 40-66 KB each (SVG,
  gzipped by Pages). The medallions, the tilt script and the old `.ms/.mw/.fr/.wl/.md` CSS are gone; the notes below about
  the medallion wall are history. Pen underlines in the labels now style as `.wl2 .hl`.
  **A closer look (4 Nov, his ask: "if they click on a project, i want it to expand it so they can see more of it and then
  have a placcard on the side ... describing it well. then ... have the live link if they click on the thing once they
  expand it").** A click on a work's picture or plaque grows its frame out of the wall (FLIP) into a room of its own
  (`.mx`, site.js MUSEUM, appended inside `main` so the placard's Film links reach the viewer): the frame large under its
  lamp, a cream museum placard beside it (below it under 1100px), "the Museum of Adrian" top left, × and ‹ name / name ›
  with "n of 8" at the foot (arrow keys too; Esc, Back, × or a click on the bare wall closes, and the frame flies back).
  There **the picture is the live link** (`data-href`), with a pen note under the frame, "click it to open the live site!"
  ("tap" on touch; SafeJew and eDNAtlas "live map", Ledger "live demo", Citadel "visit Terminal"), and a "Visit
  host/path" band on hover. The placard is built from the wall label (title, year, medium, credit, links) plus the
  figure's hidden `div.xd` (a lead, How it works, My part; Safe Routes' third heading is Why I built it; an `.xd .cr` or
  `.xd .lk` replaces the wall's). The `.xd` text is first person, from the old big view's `D` and the wall labels; keep the
  two in step. Hivemind and Monte play their films muted in the frame (`data-video`, Hivemind from 29 s, `data-t`), with
  "Film" in the links for sound; Ledger's receipt prints again; Citadel shows the whole replay viewer (`data-img`,
  `data-ar`), and its wall picture now links to Terminal (it was a photo-viewer button). The sign has a second note on the
  left, "pick any work for a closer look!" (`.sg-h`). Ctrl/cmd-click on the wall still opens the site; no JS: plain links.
  **A white gallery since 4 Nov** (Adrian: "how can we make the museum look better and flow better with my website ...
  should we change the cream backdrop?"; he picked **B** of `_mock/museum-options.png`, mocks `_mock/mus-a|b|c.html`, over A
  a navy room and C an edge-to-edge crimson room). The page's warm white stays; the museum has no wall of its own: the
  frames hang on the page with soft warm lamp light and lighter shadows, the sign's panel is warm white with the title in
  navy, the sign's notes and the closer look's pen note are ballpoint blue, and the wall labels are white cards with a
  hairline. The closer look is the same warm white (`#f4f1ea`). **Wall labels are short since the same day**: title, year,
  medium, one line on what it is, the credit and the links; everything else lives in the placard (`.xd`). Notes above
  about the crimson wall (`#5c1f24`) are history.
  **The museum's name is in Cinzel since 4 Nov** (his ask, "change the title font of museum of adrian, give me a bunch of
  options"; he picked **E** of fourteen in `_mock/sign-fonts.html` / `.png`, over his pen, four Latin Modern cuts, Garamond,
  Didones, a script and Art Deco faces): carved Roman capitals, weight 600, self-hosted as `fonts/cinzel-600.woff2` (Latin,
  from Google Fonts, OFL). It sets the sign's title (`.sg-t`, navy, no longer `.pen`) and the closer look's corner label
  (`.mx-hd`). It is the third face on the page, for the museum's name only; everything else stays Latin Modern and the pen.
  **Plaques (4 Nov, his ask):** Hivemind "1st place, SEPHacks", Monte "1st place, TrojanHacks"; the labels and placards
  under them keep the track (Lemma's agent-monitoring track; Finance track), so neither reads as the overall prize.
- **Pen underlines on the most impressive things (3 Nov, his ask: "make it clear the most impressive things, underline
  them or make them in the annotated font").** `span.hl`: a hand-drawn ballpoint-blue stroke (SVG background) that draws
  itself under the phrase once it's on screen (site.js NOTES & TOUCHES adds `.on`; no JS or reduced motion: just there).
  Fifteen in all (the intro's four became handwriting on 3 Nov, late; see the About intro): in the intro "sole-author paper was accepted", "Best Paper Finalist", "won prizes at four hackathons",
  "6th for Team USA"; one per wall label's credit line (district elective, Teen Innovation Grant, Winner of Lemma's track,
  1st place ×3, 3rd place internationally, top 8 of 45 teams), in ink; and Research's "Best Paper Finalist", "Sole author"
  and "Published". Keep it to one per item. The wall label's block spans are `.wl>span` so an inner `.hl` stays inline.
- **The museum wall in colour (3 Nov, his ask: "cool interactive shit with their logos on top ... a little more colorful").**
  Each figure carries `--b`, the project's colour (AIML-LI #0a6a9a, SafeJew #1d4f92, Hivemind #e5484d, Monte #2f45ff, Ledger
  #1b4dff, eDNAtlas #1f8a8a, Safe Routes #dc7426, Citadel #2bb3a8): its logo sits in a white medallion (`a.md`, a link to the
  project's site; Citadel's to About Terminal) pinned over the frame's top-left corner, ringed in that colour, and the wall
  label has a top rule in it. eDNAtlas (no logo) gets a drawn double helix, Citadel a dark tile with a teal "__" for
  dunderscore. Hover: the frame tilts toward the cursor (site.js sets `--rx`/`--ry`) and lifts, the spotlight brightens and
  the medallion grows a touch (it spun once until Adrian: "i dont like that the logo spins"). Reduced motion: none of it.
  **Wall labels rewritten the same evening** ("the descriptions could be better"): medium, then what it does, his part and
  the numbers in two sentences, then a plain credit line (the museum puns, "Gift of" / "On loan to", are gone). Ledger's
  role keeps its fixed wording.
- **The top photos are polaroids since 5 Nov** (Adrian: "maybe there is a fancier way to do the photos?"; he picked **C** of
  `_mock/photo-options.png` over small gold frames, overlapping prints and arched windows): white borders, the outer two a
  little crooked, straightening on hover, and each photo's note written on its bottom in the pen (`span.pc`: "hi! that's me",
  "Team USA, Pan-Ams in Bogotá", "YC Startup School"). The three margin notes below are gone from site.js NOTES; the notes
  that remain are Lemma's, Curated to Win's and the clip's. The same day ("i feel like there is a lot of blue now"; his pick
  **D** of `_mock/ink-options.png`, over pencil, red pen and sepia) the About paragraph's handwritten phrases (`.hw`) went
  to black ink: the ballpoint blue is now only in notes, captions, doodles and pen underlines. History follows.
- **All three top photos are annotated (3 Nov, his ask: "annotate all 3 of the top photos when i land").** "hi! that's me"
  (left margin, headshot), "fencing for Team USA at the Pan‑American Championships in Bogotá" (under the middle photo: a
  new note side, `s:'b'`, centred below its target with the arrow curving up; the hyphen is non-breaking) and "at Y
  Combinator's Startup School" (right margin). These three carry `now:1`: they appear one after another as soon as the
  intro lifts, not when scrolled to. At 1180px+ the photos get 44px more room below for the middle note.
- **Section-title doodles (3 Nov, later).** One pen drawing after every h2 (`svg.doo`, 64x40, `#2457c5`), each about him:
  Experience a laptop with a rising chart and coffee; Research a paper being written with a pencil (he asked for a writing
  utensil instead of the first round's prize ribbon); Projects the Hivemind bee on a dotted loop (it bobs); Fencing him
  mid-lunge in a mask; Honors a podium; Outside school a tent under the Sierra; What's next a signpost, "CS" one way and
  "econ" the other (his ask: "something else" than the first round's grad cap); Contact an LA palm and a paper plane. He
  liked fencing, outside school, projects and contact as they were. Each draws itself in once its title is on screen
  (site.js NOTES & TOUCHES; `html.js` is set by a one-line script in the head so they don't flash in whole) and wiggles on
  hover. Not `.dd`: that class is the receipt's double rule. Paths live in the scratch script `ship_museum.py` /
  `make_titles2.py` (session scratchpad) and inline in index.html.
- **What's next, rewritten (3 Nov, later; his "the actual content of the whats next section could use a little work").**
  It opens with **Coming up**, a dated list: "Right now: finishing my college applications, between fencing practices"
  (his ask, the same evening; drop it once his applications are in), Nov. 10 Curated to Win at ARRSI (virtual), Dec. 2 NCSS panel, Dec. 17 IEEE
  BigData in Phoenix, Feb. 6, 2027 the LA Student AI Summit at LACES, Summer 2027 Lemma. **Reword or drop each line once its
  date passes** (and the same lines in llms.txt). Then **In college**, his fields in his words (3 Nov, late): **computer
  science, data science, applied math, economics and quantitative finance**, then research in them and **becoming a
  founder** (the signpost doodle points two ways: "research" and "founder"), with economics' reason from his Alliance
  work (the engine showed which startups drew which investors but never why; paraphrased from his MIT essay's idea, not its
  sentences), the Safe Routes biased-data problem, and fencing plus coaching.
  **Rewritten plain on 4 Nov** (his ask: "the content of the in college section is good, but there is a lot of slop ... writing"):
  same content, four short paragraphs, no colon reveals or closing flourishes ("sits there", "the one I kept asking", "comes with
  me" are gone); "start a company" for becoming a founder; "Three of my papers are about evaluating language models".
- **Not carried over:** typed questions and their KB, Surprise me, the welcome notes, the canvas (BIG VIEW), the highlight
  cards, the handwritten quotes (his lines are now plain sentences in Research, Projects, Fencing and Next). Their code
  still sits in site.js and skips itself.
