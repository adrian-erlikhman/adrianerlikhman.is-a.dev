# History and content rules from the Sept-Oct site (cards, logos, bouts, papers, Ledger, AIML-LI)

Moved verbatim from CLAUDE.md on 25 Nov 2026. Not loaded automatically: grep or read the part you need.

## Site structure (homepage `index.html`, rebuilt 21–22 Sept after a design review)
Hero · `[01]` About me (`about`, with the photos in `#offclock`) ·
`[02]` Experience · `[03]` Research (`papers`) · `[04]` Selected work (`work`) ·
`[05]` Fencing · `[06]` Achievements (`record`) · `[07]` Contact.
That order is **Adrian's**: his 22 Sept order, with Selected work moved up from
`[06]` on 15 Oct ("selected work should be higher"). The nav, the phone strip,
the rail and the ⌘K palette follow it.
- **Admissions pass (15 Oct 2026).** Adrian: the site "is going to be looked at by
  college admissions counselors", so it should skim well, and be "really really
  cool". What shipped:
  - **Ask adrian** (`#askBox`, `.ask-*`, site.js ASK ADRIAN) replaced the
    At-a-glance stat box under the hero buttons on 16 Oct. Adrian wanted
    "something interactive" that a non-technical person can use, picked the
    "click a question" terminal of four takes (`_mock/hero-term.html`), and
    edited the answers himself: six questions (research · built · fencing ·
    interned · what else stands out · interests), each answer typing out and
    ending in a yellow button to its section; question 1 answers itself on
    load; the box holds the tallest answer's height; two columns of questions
    on phones; without JS all answers show. His calls in the copy: "accepted
    by two peer-reviewed journals" (both are accepted *with revisions*;
    Research still says so), the sole-author paper described by its result
    (12 of 2,985 benchmark questions flip the leader), "three hackathon
    winners" (1st, 1st, 3rd), YC first under "what else stands out", the
    summit at 500+. **Dated line:** "Coming up: AACL-IJCNLP in Hengqin, China
    (10 Nov), NCSS in San Diego (2 Dec), and IEEE BigData in Phoenix (17
    Dec)"; reword after each date, and drop China if he withdraws from ARRSI.
    **Second pass (16 Oct):** answers in Plex Mono, not Latin Modern ("i
    dont love the font"); the button is a light-blue outline, not yellow;
    "What has he built?" covers SafeJew, AIML-LI, Why Wrong, the portfolio
    optimizer and the three hackathon winners, one line each; "What is he
    interested in?" is his fields (ML, NLP, AI evals & infra, data science,
    quant finance, startups, VC, AI in education) and then his papers by
    broad topic, with no "off the laptop" line (he cut it).
    **Third pass (16 Oct):** every answer is short bullets (Adrian: "this
    should be a brief overview"), one line each at desktop width: a
    `[bracket]` tag in light blue (he picked B of four marker styles,
    `_mock/ask-markers.html`), a bold phrase, a dim tail. Research opens with
    "PUBLICATIONS · 4 accepted · 1 preprint" and tags each paper by venue:
    [IEEE] [AACL] [OJSS] [JHSS] [arXiv] ("make sure it is clear that it is
    publication"). Bullets slide in, no typing; the button is a plain
    "→ jump to …" link (he disliked the yellow, then the outlined box).
    Check new lines with a 1280px wrap test; each answer's tag column is as
    wide as its widest tag.
    **Fourth pass (16 Oct, current):** Adrian still didn't like bullets and
    picked the **code editor** (style 5 of `_mock/ask-styles.html`): each
    answer is a small Python file (publications.py, built.py, fencing.py,
    internships.py, highlights.py, interests.py) with a tab, line numbers and
    syntax colours (keys light blue, strings green, comments grey italic;
    no star on the Best Paper comment, Adrian took it out 17 Oct); lines
    slide in one by one.
    highlights.py says Citadel Terminal "1,000+ applied; top 8 of 45 teams"
    (Adrian, 17 Oct; his Common App honors list: "Top 8, 60/1000+ selected").
    The Achievements wall's Citadel panel and llms.txt carry it too (17 Oct).
    The panels are generated with a tiny highlighter (scratch script
    `ask_v6.py` in that session); to edit by hand, keep the
    `<span class="l"><span class="c">` structure. Long lines soft-wrap beside
    their number on phones; on desktop no line wraps (check at 1280px).
    **Compact since 23 Oct** (Adrian: "i dont like how big this box becomes"; it opened at ~576px beside a ~346px
    intro): the box takes the wider About column (.9fr/1.1fr), the questions are a two-column list of plain lines,
    the "→ jump to" link sits in the file's tab bar, the code is 12px, and the held height applies only above
    820px. At 1280px it is ~377px tall and no line wraps; re-check that after adding a line.
    The `.facts` CSS is unused now. History of the stat box:
  - **At a glance** (`.facts`, under the hero buttons): three linked cells in a
    row, his wording (a fourth, "200+ LA public-school students", came off the
    same day: "i dont like the fourth box"). "4 accepted papers" (IEEE BigData · ARRSI @ AACL · 2 journals, the
    R-card count); "Top 20 U.S. épée" with "Team USA · peak No. 17, Cadet" under
    it, because he asked for "top 20 US" and only the peak cadet ranking
    supports it (current junior is No. 49), so the qualifier must stay; "4
    internships" across ML, software and venture capital; "200+ LA
    public-school students" was the fourth until he dropped it (he had written
    "200+ LA schools"; the summit figure is students, never schools). The
    numbers count up on reveal.
  - **Fixes:** the hero lines are a real swipe now (the box clips; the old line
    leaves left as the new one enters right, never overlapping); Experience
    cards no longer fade to 35% until reached; reveals fire when a block's top
    enters the screen (threshold .16 left tall blocks blank for a whole phone
    screen).
  - **Phones** get a section strip under the bar (`.secnav`, static HTML) that
    follows the scroll. **Wide screens (1360px+)** get a rail in the right
    margin (`.rail`, built by site.js from the `[0n]` labels).
  - **Fencing** opens on `video/fence-loop.mp4`: six muted seconds ending on
    one of Adrian's touches. Since 15 Oct (late) it is **"A"**, his touch to
    6-8 in the Senior team relay (he is the black mask on the right), cut from
    Boutcaster's 1080p original `hqvideos.boutcaster.com/c0669e4aee914a220dc1193ff3bce1e0.mp4`
    from 56.6 s (that file starts 51 s before our `bout-team-afm.mp4`),
    cropped 1920x580 from y=124 so the name boxes and score bar are out,
    1440x436, ~1 MB; poster `img/bouts/fence-loop.webp`, both `?v=2026-10-15-a`.
    The same evening he tried "E" (touch to 11-10, from the 540p copy) and a
    1080p Div I touch to 4-2 (Cloudflare Stream `d7d19a4c…` at 2:51, he is on
    the left there, which needed the caption on the right: `.reel-r`, still
    in site.css). The seven team-relay touches were found by reading the
    overlay's score bar (his team 5→13, AFM 8→10). It loads near the screen, plays only
    on screen, and stays a poster under reduced motion or Save-Data.
  - **Second pass, same day** (Adrian: research "still need[s] to refine";
    Experience "smoother / tuffer... some bullets and then different
    orientation"; Selected work "shorter and more condensed... what it is,
    the support i got, what i built... mimic other similar professional
    websites"):
    - **Research** was a publication list (`.paper` rows) for one day; it is
      now the cover shelf (see Research shelf).
    - **Experience is a CV list since 24 Oct** (`.xpl`, `.xp-r`; Adrian: the files were "lowk too complicated, i just
      need to immediately show my internships"; he picked B of `_mock/xp-simple.html`). All four show at once: dates,
      role and linked company, an italic context line, three bullets with bold leads ("more impressive", every fact
      from the long résumé or the old files), the mark on the right. No Current/Completed (his call). The tab script
      is gone; the `.xf` CSS is unused. Ask adrian links to `#xp-firstness` etc. The notes below are history.
    - **Experience** is a set of **internship files** (`#xpFiles`, `.xf`), the
      fourth design that day. Adrian found the vertical list "mid", then the
      year-track board (`#xpBoard`, #150) not what he wanted, asked for "like
      10 very distinct options" (mocked in a throwaway `_mock/`: terminal,
      deck, side-scroll, big type, transit map, bento, ticker, case files,
      scroll story, flip cards), liked case files, and from three takes on it
      picked **B**: "make what i did very clear". **No auto-advance since 15 Oct** (Adrian: "not timed... they can stay on the tab for as long as they want"); the Alliance tab is its mark alone, like Kiddom and Fjor. One manila file per
      internship behind tabs: a typed sheet with "Internship · 0n / 04 ·
      dates", a Current/Completed stamp, the role, the company with its mark
      and who he worked with, then **What I did** (a dark label, three items,
      each a bold action and one sentence), then "Tools & skills" (tools only
      where on record: Why Wrong's JavaScript, naive Bayes and k-means for
      Kiddom, HubSpot for Alliance; Firstness and Fjor show skills only until
      he names their tools). Beside it a sticky note with the headline and a
      paper-clipped Deliverables card (✓ done, dashed … in progress). It steps
      through the files while on screen (9 s, the tab's underline is the
      timer) until a click or key; without JS all four show. Content rules for
      Firstness and Kiddom hold here too.
      **Second pass (same day; Adrian: the work "tuff", the headline "way
      tuffer", logos on the tabs, Fjor completed):** each What I did item is an
      imperative action ("Diligence 20+ AI startups") and one tight sentence;
      the yellow sticky became a navy **headline card**: one sentence that says
      what the internship amounted to, then two or three numbers.
      **Third pass (15 Oct, late; Adrian: the big top part should make "clear
      what i did", the bullets "can be more abstract"):** the headline card now
      says concretely what he built or does ("Built the scoring models a $15M
      fund used on 134 Y Combinator startups, and led the screen"; Adrian liked
      the items and the stats, asked for the headlines tightened once more),
      and each
      What I did item is an area of work (Platform engineering, Applied ML,
      Deal screening, Data engineering…) with one short general line. The
      Deliverables card's paperclip is an SVG gem clip (`.xf-clip::before`,
      a data URI with a metal gradient), since 15 Oct. Tabs carry
      each company's mark (Kiddom and Fjor by mark alone, their names in
      `.sr-only`). Fjor's sectors (enterprise SaaS, fintech, deep tech) come
      from his MIT profile doc. **Fjor and Alliance now follow his college-app
      descriptions** (Drive: "UC Activities & Awards — FINAL v3", the Common App
      activities doc, his MIT essay 1), which he pointed to on 15 Oct: Fjor is
      an "Investment & Software Engineering Intern" at a $15M early-stage fund
      who built classifier and scoring models to screen 134 YC S25 startups,
      led that screen, did 20+ diligences and 10+ memos, and built the fund's
      internal software tools; Alliance is a "Venture & Data Strategy Intern"
      who built a Python/SQL investor-matching engine over 10K contacts at 250+
      firms (matches from investment histories and company characteristics;
      deduplication cut lookups from days to under a minute), led outreach to
      80+ founders, mapped SoCal deep tech, and redesigned the pipeline. Those
      titles and facts are on the site, in llms.txt and, since the same day
      (his OK), in both résumés: one bullet each in the one-pager, three each
      in the long one.
  - **Fjor is completed** (Adrian, 15 Oct 2026): 2024–2026 on the site, both
    résumés (rebuilt) and llms.txt; its file is stamped Completed.
    - **Selected work** is a 2x2 grid of cards (`.works` / `.wk`): screenshot,
      kicker, a one-line title that says what it is, then Built / Backed by /
      Result (Safe Routes adds Why, with "My friends are in that number").
      AIML-LI's media is the nine committed partner logos. "The hard call"
      lines are gone. The **Ledger walkthrough and the AIML-LI Unit 1 lab moved
      to /demos/** as `[03]` (`#ledger-sec`) and `[04]` (`#ailab-sec`); the
      cards link there.
  - The intro overlay was left as is then; it cost a first-time visitor up to 3.6 s (about 2 s since 31 Oct).
- **Hero** (Adrian's shape, 22 Sept: name left, photo right): "hi, i'm
  adrian", then the **hero story**: four lines that swipe sideways on their
  own every 3.2s, always leaving left and entering right, with four clickable
  dots; hover or focus pauses it, and reduced motion or no-JS shows them
  stacked (`site.js` HERO STORY, `.js-story`). Adrian's wording, 26 Sept:
  "i'm a senior in los angeles." / "i build ML and full-stack tools for
  people." (one link, to #work, "not separate ones") / "i do ML / NLP
  research." (#papers) / "i fence épée for team usa." (#fencing). A version
  that pinned the hero and swiped one line per scroll step shipped first
  (#118); he didn't like how the scroll worked, so nothing is pinned now.
  Then three buttons (*selected work ↓*, *achievements ↓*, *résumé*) and the
  photo. Earlier that day he called the one-sentence description "horrible"
  and dropped the six-row "what's here" guide (the nav covers it; `.guide`
  CSS still sits in site.css). Four whole-hero layouts (logo strip, facts
  band, six tiles, full-width name) were mocked up and not taken.
- **Receipts are gone entirely (17 Oct).** First their "scale"/"measured" labels (Adrian: "remove all of these bs
  things"), then, the same evening, every tap note too ("delete every single one of these... i dont like any of
  them"): the numbers are plain text, and the `.rc`/`.rc-n` CSS and the RECEIPTS script are deleted. Don't bring
  back numbers that open notes. The history below is what they were.
- **Receipts (16 Oct, Adrian picked it from `_mock/feedback.html`):** thirteen key numbers in the
  Research findings and the Selected work cards are `.rc` buttons, underlined by type (`data-t`: m
  measured, s scale, o result, p plan, dashed), with a small sup label; a tap opens a dark note
  (`.rc-n`, hidden until then) under the line saying what the number is and where it comes from. A
  `.rc-key` legend sits under both section heads, and each hero fact has a `.fsrc` line (2 accepted · 2
  accepted with revisions; USA Fencing national rankings; the four companies). The summit's 500+ is
  the one "plan". Keep each note in step with its number. site.js RECEIPTS.
- **Copy rule (Adrian, 22 Sept): precise and concise, "not flourishy at all".**
  He rejected two drafts before this one. Name things, list facts, stop. No
  metaphors, no trailing clauses, no category words. The section labels are
  "// four internships, 2024 - now" and "// five papers · four accepted" (12 Oct;
  "four papers · three accepted" from 10 Oct;
  "five papers · two in review" before LangLLM's acceptance).
  Anything warmer has been cut twice, so don't reintroduce it.
- **Hivemind leads Selected work** (17 Oct, Adrian: "put it as one of my first selected works, include the really
  good video"): a full-width `.wk-wide` card (`#case-hivemind`) above SafeJew. Built with Michael Tarekegn for
  SEPHacks 2026 (USC SEP x LA Tech Week); Devpost `devpost.com/software/hivemind-v7rwgx`, site
  `hivemind-q17i.onrender.com`, film `youtu.be/wmBzH3som4A`. The player is the 1:20 Fuser-style ad cut, re-encoded
  from `~/Downloads/hivemind-demo-4k.mp4` to `video/hivemind-ad.mp4` (1080p, ~13 MB) with poster
  `img/cases/hivemind-ad.webp` (frame at 29 s), both `?v=2026-10-17`. It plays muted on screen; "Watch with sound"
  and six chapter buttons (caption start times) restart it with sound (site.js HIVEMIND FILM). Adrian's part, per
  the repo split: website, web app, the terminal app's design, the film; Michael's: engine, hooks, eval. Result is
  the Devpost eval (36/36 vs 14/36, placebo 15/36), with its limits in the receipt.
  **Won the Agent Behaviour Monitoring track** (Adrian, 17 Oct evening: "we won the lemma hack track for agents"),
  announced in person at the closing ceremony; no email or Devpost winner badge yet. Sponsored and judged by Lemma (uselemma.ai, "production
  monitoring for AI agents"). On the card's kicker and Result (receipt `rc-hmw`), a Winner
  tile first in Achievements' Builds row (Lemma's logotype, `img/logos/lemma.webp`, from Devpost's sponsor list;
  that row now holds five tiles on a 20-column grid, the others four), built.py, llms.txt, JSON-LD `award`, and
  both résumés (the one-pager's line sits after the two 1st places). Link the Devpost winners page once it shows.
  **The Lemma track panel** (`#lemma-track`, `.trk`, a div: a `<section>` picks up the site's section padding) sits
  full width under the card: SEPHacks' own Devpost header as a banner (`img/cases/sephacks-banner.webp`), Winner ·
  SEPHacks 2026 · USC SEP x LA Tech Week, one line on Lemma (no stat: Adrian called the "22 → 0" slop, 17 Oct), the
  track's three required Devpost questions (how does your agent know it is failing / what counts as a failure / what
  guardrails) with one-sentence answers, then Hosted by (USC SEP as text, Tech Week's mark from tech-week.com's
  `logo-white.svg` inked, `img/logos/techweek.svg`; latechweek.com is a parked domain) and Sponsors (AfterQuery,
  SideShift, Lemma, Outcast Ventures, Figma, from Devpost's sponsor list, backgrounds knocked out). **Adrian, 17 Oct:
  no prize money and no project count anywhere** (site, llms.txt, résumés); they came out the same day. Devpost first
  named the prize "Continual Failure Detection". The card's links and the Achievements panel point to it.
  **The badge's note** (`.hm-note`): "click here for the live site!" in Shantell Sans (Google Fonts) with a pencil
  arrow that draws in once Selected work is revealed, copied from the Hivemind site's `notes.tsx` (Adrian: "annotate
  it with the arrows like on the actual hivemind website").
  **Copy (17 Oct, Adrian: "a lot of ai sloppity... make the writing more precise"):** the card title is just "Shared
  memory for a team's AI coding agents."; What, the track answers and the Achievements panel say literally what the
  product does (saves a correction as a lesson, a team lead approves, agents load it next session). No slogans, no
  "X's answer is that...", no stat callouts. Also in built.py, llms.txt, JSON-LD
  (VideoObject `#hivemind-film`) and sitemap. **On both résumés since 17 Oct** (his OK), last in the
  one-pager's Competitions (one line, [live] [devpost], no eval numbers) and after eDNAtlas in the long one (two
  bullets with the 36/36). To fit, the one-pager's SafeJew bullet lost "Next.js, TypeScript, Supabase" and the
  long one lost Citadel's second bullet (what Terminal is), "(Andrew Ng" from the DL Specialization, and a few
  words in Citadel, YC, More builds and JSU. Both résumés now have no slack at all.
- **Selected work is a hub since 24 Oct.** The loose 12-column layout (#243) lasted an hour: Adrian disliked the
  mixed sizes, asked for five versions (`_mock/wk5.html`), then iterations of the snake and constellation
  (`_mock/wk-it.html`), and picked **2b, the hub**: the page mark in a white circle in the middle, the six same-size
  builds around it (01 Hivemind top left, then clockwise; the middle two pushed out 34px), every wire running out from
  the centre with pulses, two dashed rings, on **2c's dot grid made smooth** (a radial mask fades it out, no border).
  His note, "click on any one!", is in the Hivemind note's hand (Shantell Sans, drawn-in arrow). Hovering a build lights
  its wire, fades the rest and names it in the hub ("03 · SafeJew"). Drag, Reset and scroll drift are gone. Phones
  keep the one column and left rail, with the dots and the note. site.css `.wk-hub`, `.wk-ring`, `.wk-note`; site.js
  WORK CANVAS builds hub wires above 900px and rail wires below.
- **Selected work is six staggered bubbles wired like the films** (18 Oct). Adrian: the cards were "way too big...
  minimize that shit so people can choose to open each ones", "go to michelle lius portfolio and emulate that"
  (liumichelle.com, the UCLA product designer: big rounded cover tiles with a "Name · year" pill), "but connect it with
  the lines like in the videos i made". He then rejected the first take (#203: one dotted box, blurred covers, cards
  opening below): "each one should be its own bubble that is connected by line but also staggered", covers **not
  blurred**, and the card in a **popup** "with an easy way to exit". So: six floating tiles (`#wkCanvas`, `.wk-node`,
  `.wk-tile`), two columns with the right one shifted down (`translateY(44%)`), each its project's sharp screenshot
  (AIML-LI's is its homepage, `img/cases/aimlli-home.webp`, captured 18 Oct; a shot of the site's "Summit partners"
  rows replaced it on 24 Oct (#245) and Adrian had it reverted the same evening: "i liked what you had before") with its mark, a result tag, a pill, a
  caption, and "Open ↗" on hover. site.js WORK CANVAS draws rounded connector wires with ports down the middle, with
  navy pulses once seen. A tile opens its card in a popup (`.wk-modal`, built by site.js; `.wk-x` panels move into it):
  Esc, the Close button or a click outside closes it, focus stays inside and returns to the tile. Links to
  `#case-…`/`#lemma-track` open the right popup. Without JS the cards sit in the page. Monte's panel is light and
  dotted (Adrian: "make the background not a slop color").
- **Monte sits second in Selected work** (18 Oct, Adrian: "WE WON... integrate this into my website in a really cool
  way", "be sure to add the apple pay tap demo as one of the main features"): **1st place, Finance track, ACM
  TrojanHacks 2026** (LA Tech Week), with Michael Tarekegn, announced in person; no email or Devpost badge yet, so
  link the winners page once it shows. A full-width `.wk-wide` card (`#case-monte`) under Hivemind's Lemma panel (his
  pick: second, not first). Its dark panel has two tabs: **Tap to pay** (default) and the **Launch film · 1:17**
  (`video/monte-film.mp4`, 1080p ~18 MB, from `~/Claude Code/monte-video-FINAL-v2.mp4`, the Devpost video
  `youtu.be/Tn4YrpoLjh8`; poster `img/cases/monte-film.webp`, both `?v=2026-10-18`). The tap demo copies the live
  site's (`ace/components/ace/tap-demo.tsx`) in vanilla JS (site.js MONTE TAP, `.mt-*` CSS): a countertop reader
  with four contactless lights and a beep, an Apple Pay-style phone (Monte card, Hold Near Reader, cards flip, drawn
  check), five steps with pencil notes, four stores. **On the site it plays itself** (Adrian, 18 Oct: "i want it to
  go through automatically with the timer"): 3.2 s a step with the timer filling on the step bar, a rest once paid,
  then the next store; only while on screen; a pause button, and Next/Back restart the timer. (The live Monte site's
  own demo stays click-through: "i want to be the one to go through this" was for presenting.) Its numbers are the Monte engine's `tap()` for Jordan (synthetic person) baked on 18 Oct; re-bake from the
  repo rather than editing. Uber and Mobil show the balance rule (Apple Card skipped). Card art in `img/monte/`
  (issuer art from the Monte repo), badge `img/logos/monte.svg`. Ownership per the repo's SPEC: Adrian the
  interface, tap demo, brand and film; Michael the backend, Monte Carlo and tests. Claims are Michael's verified
  ones (29 cards' published terms, 36 tests). Live `ace-eta-beryl.vercel.app`, Devpost
  `devpost.com/software/monte-calygj`, code `github.com/michae6345-crypto/monte`. Also a "1st" tile first in
  Achievements' Builds row (now six tiles on a 60-column grid), built.py, llms.txt, JSON-LD award and VideoObject
  `#monte-film`, sitemap. **Résumés (his OK, 18 Oct):** one line in the one-pager, one bullet in the long one. To fit,
  the one-pager's Monte, Hivemind and Safe Routes lines lost their role clauses and parentheticals (Lemma, Young
  Coders' Sphere, the 80% trip), and the long one lost the **More builds (Quant)** line. Ask before restoring any.
- **Selected work** is four cards since 15 Oct (see the admissions pass); until
  then it was four case studies, each *the problem · my part · the
  hard call · where it stands*: SafeJew, AIML-LI, Ledger, Safe Routes to
  School. Screenshots are `img/cases/*.webp` (live pages captured headlessly). Since
  15 Oct (Adrian: "use the most impressive ones... most impressive /
  technical") they are 1600x900 shots at 2x from headless Chrome over CDP:
  SafeJew's map with one incident's sourced record open
  (`safejew-incident`), Ledger's live demo after a sample scan, the rule and
  per-category counts (`ledger-scan`), and Safe Routes' worked example with
  the tour dismissed (`saferoutes-walk`). AIML-LI keeps the partner logos.
  **15 Oct, card by card (Adrian):** the frame is Chrome-like (window dots,
  a tab with the page's own favicon and `<title>`, back/forward/reload and an
  address box; no LIVE tag, which he disliked). SafeJew: title adds U.S.
  college campuses; Backed by is "A Teen Innovation Grant from the Jewish
  Federation of Greater Los Angeles (JFEDLA)" with the TIG seal
  (`img/logos/tig-seal.webp`, the inner seal of `21040-JBPTIG-Outlined.png`
  from jewishla.org's TIG page); Result is "1,300+ incidents tracked across
  Greater LA, including 33 college campuses nationwide" (800 + 594).
  AIML-LI: Built names the six units; a Worked with row follows
  aiml-initiative.org's own Supporters wording (engineers at Google DeepMind
  and Microsoft, a UCLA professor, a YC-backed founder, Arm and PhET, aiEDU,
  LAUSD's Ed Tech & Innovation office; never the professor's or engineer's
  names); Result says it taught a 4-week version at LACES and is "piloting
  with LAUSD, working toward a standing AI-literacy elective" (no pilot
  numbers), and the summit is 500+. Ledger: screenshot is the live dashboard
  with the sample store loaded (`ledger-dashboard.webp`); What/How rows
  explain it (eighteen programs, renewal reminders, two vision passes, the
  rule, lines it won't count); Result adds the rule engine matching all 24
  hand-scored test records with no false passes (the rule engine, never the
  vision model). Safe Routes: blocks scored by hour, offline, EN/ES, and the
  80% trip named.
  **The Regime-Aware Portfolio Optimizer card was deleted on 17 Oct** (Adrian: "delete the whole hmm thing"), with
  its images, its terminal print script, its Ask adrian, ⌘K, terminal and llms.txt entries; the long résumé's More
  builds line still names it. The note below is history.
  **Fifth card, full width (15 Oct, Adrian: "add one of my impressive coding
  projects... one of the finance ML ones, quant ones"; he picked it over the
  two under-review finance papers, whose repos aren't public): the
  Regime-Aware Portfolio Optimizer** (public repo
  adrian-erlikhman/regime-aware-portfolio-optimizer, Aug 2026). `.wk-wide`:
  a dark terminal (`.wk-term`) with the README figure redrawn dark
  (`img/cases/regime-paths.webp`, plot.py's markov generator, seed 7) and the
  README's 24-seed table printing line by line on screen (`.wk-out`, site.js
  TERMINAL PRINT); "14 passed" is `pytest -q` run on 15 Oct. Every number is
  the README's; the data is simulated, and the card says so. Badge is
  `img/logos/regime.svg` (Claude's mark; the project has none).
  Each card also has a browser frame (`.wk-bar`: dots, the live address, a
  pulsing LIVE) and the project's own mark as an app-icon badge across the
  seam (`.wk-badge`, Adrian: "add our logos in a cool way"):
  `img/logos/safejew.webp`, `aimlli-mark.webp` (the emblem cropped from
  AIML-LI's `public/logo.jpg`, no wordmark), and Ledger's and WalkHome's own
  favicons as `ledger.svg` / `walkhome.svg` (`.app`, full-bleed). On hover the
  badge tips and a sheen crosses the screenshot. Ledger's frame links
  `/demo`, the page in its screenshot.
  SafeJew needs `sj_intro_seen` (sessionStorage) and
  `sj_cookie_notice_ack` (localStorage) set before load to skip its intro and
  cookie bar;
  AIML-LI shows its one-activity lab instead. **Short copy** (Adrian, 26
  Sept: "the other ones are solid, but need a little less writing"; he likes
  the screenshots, their links and the scroll): each fact is a sentence or
  two, three proof bullets at most. Every claim is sourced: SafeJew's
  scraper runs daily (its workflow); Safe Routes' "My friends are in that
  number" is from Adrian's published video script, and its hard call from the
  project README; AIML-LI follows his public-copy rules (committed partners,
  no pilot numbers, no A–G claims).
- **Experience** is the internships only (Firstness, Kiddom, Fjor, Alliance);
  SafeJew and AIML-LI are case studies. Each role's organisation line links to
  the company (Adrian, 22 Sept): `firstness.ai`, `www.kiddom.co`, `www.fjor.co`
  and `alliancesocal.org`, all checked that day. The last two are not the
  obvious domains, and the Fjor site calls itself **Fjor Founders Fund** while
  the site says "Fjor Venture Capital", which is Adrian's wording; leave it
  unless he asks. **Achievements is a logo wall** (15 Oct; Adrian picked E of
  six mockups in `_mock/ach.html`, then "make sure everything there is really
  tuff"): twelve tiles (`#awWall`, `.aw-t`; seventeen since 17 Oct), greyed marks that colour on
  hover, and one panel at a time beside them (`#awPanel`, `.aw-it`) that steps
  every 6 s while on screen until touched (`site.js` ACHIEVEMENTS WALL);
  without JS every panel shows, stacked. **Rule: nothing on the wall repeats
  another section** (Adrian: "i dont want any overlap"). So VISION HACK and
  Code for Transportation live only on the Ledger and Safe Routes cards, the
  Teen Innovation Grant and NCSS only on the Selected work cards, the papers in
  Research, the rankings and results in Fencing; All-American and
  All-Academic moved here *from* Fencing. The twelve: Best Paper Finalist
  (IEEE BigData HSS), Decode the Ocean 1st, YC Startup School (its panel holds
  the three Startup School photos), National Merit, Citadel Terminal, 3×
  All-American, 3× All-Academic, 2× AP Scholar with Distinction, 4.0 · 1520,
  SIFMA top 5% statewide (solo entrant), JSU president, STEMsters co-founder &
  president (30+ *volunteers*; the old "Founder… 30+ students" was wrong).
  Cut as weak: Kaggle × Google, the Deep Learning Specialization, NVIDIA DLI,
  and LAUSD "invited presenter". He said no to class rank and to the junior
  regional titles here (those stay in Fencing). The old `.pod`/`.ac`/`.ycs-grid`
  CSS is unused in site.css. **About** is the
  short intro with the "Off the laptop" card beside it on the right (15 Oct:
  Adrian dropped the Heinlein quote and moved the card up "so it takes up less
  space"; `#offclock` is display:contents inside `.about`, so the photo panel
  still opens full width underneath).
  The photos sit **behind a topo card** (Adrian, 7 Oct: they shouldn't be
  among the first things people see). He picked card C from three mockups
  (trail ridge, elevation profile, topo map): "Off the laptop", one line, a
  "have a look" button, and contour lines that drift, faster on hover. It
  opens **one big frame with a numbered list** (layout 3 of three: grid,
  pinned prints, frame), crossfading between photos; arrows and keys step it.
  Captions are his: 05 is "Alpine lake", and 07 is "Coast at dusk" (he asked
  for 07 to change without naming it; that was Claude's pick). `site.js`
  OFF THE LAPTOP; the panel only collapses once the script runs. The old
  swipe strip (26 Sept) and its CSS are gone.
  The viewer is the seven outdoor photos only. The Startup School photos sat
  in the old strip for an hour on 7 Oct before Adrian asked for them "elsewhere".
- **Startup School 2026 photos** (Adrian, 7 Oct) sit in the YC panel of the
  Achievements wall since 15 Oct (a row under Achievements before that):
  `img/ycs/yc-sign.jpg`
  (three of them under the YC sign), `main-stage.jpg` (the stage from the
  stands) and `deepmind-yc.jpg` (two of them on a San Francisco rooftop at a
  **DeepMind × YC event**, Adrian's words; it isn't Startup School itself).
  Resized to 600x800 / 800x600 with EXIF stripped. The alt text doesn't name
  the other attendees or the speaker on screen; add names only if Adrian
  gives them.
- **Fencing bouts** (28 Sept): two Div I pool bouts from Summer Nationals
  2026 sit under the Fencing section, side by side (`.bouts`), now below the
  team leg (see Team bout): a 5-2 win vs. a
  Harvard fencer and a 4-3 win vs. a UCSD fencer. They are the Boutcaster
  recordings Adrian sent Coach Arpad on 27 June; he asked for opponents by
  school only ("they are current fencers there now"), so the captions name no
  one and the burned-in name box bottom left is covered with a dark label
  reading "Harvard" / "UCSD" (ffmpeg drawbox + drawtext). Trimmed to the bout
  (Harvard from 1:58, UCSD from 0:38, both to the end), 960x540 H.264 at 30 fps,
  no audio (Boutcaster's is muted), `video/bout-*.mp4` at 24 and 32 MB, with
  `preload="none"` and posters in `img/bouts/`. Opponents' surnames still show
  small on their jacket backs. ffmpeg came from `pip install imageio-ffmpeg`.
  Each caption carries the school's athletics mark (Adrian, 28 Sept: "add the
  harvard and ucsd logos"): Harvard's crimson H shield (`logo_main.svg` from
  gocrimson.com) and UC San Diego's Triton trident (`logo_scrollstick.svg` from
  ucsdtritons.com), both 22px tall; the Harvard seal and the "UC San Diego"
  wordmark from the university sites were too fine at that size.
- **Team bout** (4 Oct): Adrian's R3 relay leg in Senior Team Men's Épée
  (T32), Summer Nationals 2026, vs. AFM's Samyak Jain, whom Adrian describes
  as on the U.S. cadet travel team; the team finished top 8 (his word). He
  asked for it to be "the first one people see" in the bouts block, so it is
  the first `.bout`. It spanned the row until 5 Oct, when Adrian said it
  looked blurry that big: the three clips are now equal tiles in one row of
  three (one column under 900px), team leg first. The scoreboard runs 8-5 to 10-13 and **Adrian is the
  right-hand fencer** (black mask), so his leg is 8-2, +6. Boutcaster's name
  boxes had the sides swapped, so both are covered: "AFM" left (red),
  "Erlikhman, Adrian" right (green). Source is the Boutcaster MP4
  (`hqvideos.boutcaster.com/c0669e4a….mp4`, 1080p, 6:43), cut 0:51-6:40,
  960x540 CRF 28, no audio, `video/bout-team-afm.mp4`; poster
  `img/bouts/team-afm.webp`. All three video URLs carry `?v=2026-10-04`;
  bump it if a clip is re-cut.
- **The MIT "In active recruitment" banner and the "Full USA Fencing record"
  button are off the Fencing section** (Adrian, 9 Oct: "remove this from my
  site for now... we will add more later"); it now opens on the rankings.
  Their CSS (`.fence-recruit`, `.fence-cta`, `.ft-link`, `.mit-logo`,
  `.fr-txt`) and `mit-logo.svg` are kept for when he brings something back.
  Contact's Fencing link and the JSON-LD `sameAs` still point to
  fencingtracker.
- **The top-left mark** is the page mark since 23 Oct (see Icons under SEO).
- **Company and competition marks** (`img/logos/`, since 22 Sept). Adrian asked
  for them and told Claude to fetch them ("search them on google you got it and
  download them yourself"). Each came from the organisation's own site that
  day: `firstness.ai/favicon.svg`; kiddom.co's header SVG on
  cdn.prod.website-files.com; fjor.co's Wix original; alliancesocal.org's theme
  asset `alliance_logo_black.png`; youngcoderssphere.org's Wix original;
  `lovable.dev/icon.svg`; `citadel.com/.../Citadel-Logo.png`; and Y
  Combinator's header SVG, which that page serves inline as a data URI. PNGs
  are resized to 120px tall WebP, SVGs kept as they came. Experience carries
  one per role (`.orgl`), Achievements one per award that has a mark (`.rl`):
  Lovable, Hacker Fund, Young Coders' Sphere, Citadel, Y Combinator.
  Correlation One's was downloaded and left out, to keep the Citadel row to a
  single mark. They identify the organisations, nothing more; if one ever
  objects, delete the file and its `<img>`.
  A second sweep the same day added NCSS, LAUSD, College Board, Kaggle,
  DeepLearning.AI, NVIDIA, USA Fencing, SafeJew's own mark, and GitHub's and
  LinkedIn's glyphs on Contact; `/work/` carries the same marks on its
  dist-flags and cards. **Four were deliberately dropped after looking at them
  at 17px:** National Merit (their only asset is 117x57 and goes soft), the
  Stock Market Game badge and the Teen Innovation Grant ring (grey discs at
  that size), and AIML-LI's own logo, an illustration that reads as a smudge.
  Jewish Student Union and STEMsters have no mark. Judge a mark at its real
  size before committing it; a muddy logo is worse than clean text.
- **26 Sept sweep ("add logos wherever you can")**: an agent pulled candidates
  from each organisation's own site. Kept: IEEE's blue mark (brand-experience.
  ieee.org; ieee.org blocks scripts) beside R.01's status pill, OJSS's "O"
  (oxfordjss.org favicon, white knocked out) beside the portfolio paper's, and Coursera's
  wordmark (the inline SVG on coursera.org, fill #0056D2) on the Deep Learning
  Specialization row at 12px. Dropped as muddy at size: NeurIPS, JHSS, LACES
  (only a touch icon), and the square StandWithUs and Coursera marks.
  StandWithUs's wordmark was clean but left off the JSU row, where it would
  read as the club's own; Correlation One was clean but the Citadel card
  already carries a mark. aiEDU would need its tagline cropped.
- **Achievements tiles, 15 Oct (Adrian):** the IEEE Best Paper tile came off
  ("a tad redundant": Research shows it); VISION HACK (1st, Ledger, wording per
  the Ledger rule) and Code for Transportation (3rd, Safe Routes) went in after
  Decode the Ocean, and NCSS 2026 (invited speaker) after Startup School: 14
  tiles. New marks, each from the organisation's own site that day:
  `img/logos/jsu.webp` (jsu.org's white lockup on Cloudinary, recolored to
  JSU's navy 0,4,83 sampled from their footer mark), `laces.webp` (the
  L.A.C.E.S. Unicorns seal, lacesmagnetschool.org's apple-touch-icon, white
  outside the ring knocked out) and `visionlab.webp` (Vision Lab @ South LA,
  VISION HACK's Luma calendar image). STEMsters' mark (`stemsters.webp`) is
  the file Adrian sent that evening, white knocked out; it has no web presence.
  He then asked what else was impressive enough to add, and two sourced items
  filled the grid to 16 (4x4): the **LAUSD Student Innovation Challenge**
  (invited presenter, a $10,000 district challenge, for AIML-LI; `lausd.webp`)
  after NCSS, and the **JFEDLA Teen Innovation Grant** (for SafeJew;
  `jfedla.webp`, the Federation's primary logo with its teal boxes knocked out
  and the lettering set in their teal 0,104,127) before the leadership tiles.
  **Refined the same night (Adrian: "do all five"):** the 16 tiles sit in four
  labelled rows of four (`.aw-gl`): Builds & competitions (Decode the Ocean,
  VISION HACK, Code for Transportation, Citadel), Selected & invited (National
  Merit, Startup School, NCSS, LAUSD), Academics & athletics (All-American,
  All-Academic, AP Scholar, GPA/SAT), Finance, funding & leadership (SIFMA,
  JFEDLA grant, JSU, STEMsters); tiles carry `data-g`. Marks are in colour
  (the grey-at-55% treatment is gone); All-Academic carries the USA Fencing
  mark. Five panels show proof (`.aw-shot`): eDNAtlas (`img/cases/ednatlas.webp`,
  its hero captured headlessly), the Ledger dashboard, the Safe Routes worked
  example, the podium photo and the SafeJew map. Every panel has a context
  line, a row of numbers (`.aw-stats`) and a sentence. On phones (<=700px)
  the grid is 4-up and the detail moves inside the wall under the tapped
  row (`place()` in site.js), with auto-advance off there.
  **Detail pass, same night:** the proof screenshots came out again (Adrian:
  "dont do the cut outs like in the selected work section again. i will find
  photos you can add"), so only Startup School has photos until he sends more.
  Every panel got a fuller sentence from his own docs (Citadel: the game, the
  bot, the three of them reviewing replays, from his MIT fencing brief; YC:
  the curriculum and what it was used for, from the UC doc). **AP Scholar lists
  all 17 APs** (from his recruiting profile: 11 taken, ★ marking the four 5s
  his UC doc names; 6 this year), and the academics tile ("GPA · SAT ·
  courses") lists the three dual-enrollment courses. National Merit no longer
  quotes a PSAT score: his UC doc says 1480, his June recruiting profile 1490
  (760/730); ask before quoting either.
- **The Regime-Aware Portfolio Optimizer badge** (`img/logos/regime.svg`) is two
  Gaussian regimes on the dark tile, a tall narrow calm curve in the chart's
  cool white and a low wide turbulent one in its amber (Adrian disliked the
  stepped-allocation glyph, 15 Oct).
- **National Merit and SIFMA** were found on 27 Sept, when Adrian asked again.
  nationalmerit.org serves only a 117x57 logo, so the **Lamp of Learning** mark
  came out of NMSC's own annual report
  (`nationalmerit.org/s/1758/images/gid2/editor_documents/annual_report.pdf`):
  its last page prints the mark dark on white beside the note explaining it, so
  page 56 renders at 8x, auto-trims and knocks out the white. The cover carries
  the same mark in white on green, which is no use on cream. SIFMA's is the SVG
  from sifma.org. The Stock Market Game's own lockup was tried in three crops
  and dropped: at 15px its type is unreadable, while "sifma" still reads and
  matches the award's name. `.al.mk` is a third size for marks wider than a
  square but shorter than a wordmark: 18px tall, 64px wide.
- **Summit partner logos** (`img/sponsors/*.webp`, under the AIML-LI case
  study) are the **nine committed partners only**: DeepMind, Microsoft, Google,
  Snap, Jane Street, MongoDB, Confluent, Discovery Education, Hacker Fund. The
  files are AIML-LI's own, copied from `aimlinitiative.github.io/src/assets/
  supporters` and resized to 120px tall as WebP. `AIML-LI_docs_source.zip` in
  Downloads also holds Arm, Render, Check Point, ServiceNow and LADWP: those
  are *in conversation, not committed*, so they must never appear. Snap's is
  square and gets `.sq` for a little more height.
- On `/work/`, the three flagship `.dist-flag` banners open Achievements:
  eDNAtlas (1st, Decode the Ocean), Ledger (1st, VISION HACK: South LA) and
  Safe Routes to School (3rd, Code for Transportation).
- Ledger and Safe Routes use the `.df-multi` variant (a `div`, not an `a`) so
  each can carry two links. `.df-soon` is the dashed style for a link that is
  not live yet.
- **Ledger** (VISION HACK: South LA, 12 Sept 2026). The award label is Devpost's
  prize name, "CD 9 Champion U18": "Council District 9 Champion, Under 18" on
  the site, "Council District 9 Champion, U18" on the résumés, and the badge
  says 1st place. As of 13 Sept Devpost had posted neither winners nor its
  project gallery;
  when it does, confirm the label and add the Devpost project link to the
  banner. Role wording is Adrian's call: led the build across the vision
  pipeline, rule engine and frontend, and wrote the two-pass vision pipeline,
  the dashboard and renewal calendar, and the static fallback. Keep every
  mention to exactly that. The SNAP stocking rule Ledger scores against is 7
  varieties and 21 units per category with a perishable in **3 of the 4**
  categories — not in every category.
- **The Ledger walkthrough** (`#ledgerWalk`, under the Ledger case study, since
  22 Sept) plays four synthetic records from Ledger's test suite
  (`eval/fixtures` in michae6345-crypto/visionhack): full restock, typical
  weekly order, glare, produce by weight. They're exported to
  `assets/ledger-walkthrough.json` with their images in `img/ledger/`. Each
  line's decision and each verdict is the eval's hand label, which the shipped
  rule engine matches on all 24 records with no false passes. The readings
  were written for the tests, so the walkthrough shows the rule engine, not
  the vision model, whose accuracy on real photos hasn't been measured. The
  note under it says exactly that; keep it. Re-export from the repo rather than
  editing the JSON.
- **The AIML-LI lab** (`#aiLab`, the AIML-LI case study's media panel). On 26
  Sept Adrian said the old one had "too much going on" and asked for "just one
  interactive AIML activity", so it is now one question, five buttons (1 in 2
  to 1 in 20), two bars (accuracy, winners found, pooled over 25 draws) and a
  one-line verdict. The six-unit grid, the annotated code, the chart and the
  notebook's prompts are gone; the history below is what the data still is.
  It was Unit 1's ethics lab annotated: `u01_l01_ethics_minilab_intro_ai_v1.ipynb`,
  "When Class Balance Changes", from the **private** repo
  `adrian-erlikhman/AIML-LI` -- so link aiml-initiative.org, never the repo.
  A visitor picks how rare the scholarship is and sees the notebook's own cell
  with the one line students edit, what it prints on the notebook's seed, and
  the same cell pooled over draws 1-25: accuracy climbs from 96.3% to 98.1%
  while the share of real winners found falls from 95.8% to 66.9%. The pooled
  numbers carry the claim, not the single seed -- one draw of 400 applicants is
  noisy, and on the lesson's own seed the 1-in-10 run is perfect. Data is
  `assets/aiml-minilab.json`, written by running that notebook's code on
  scikit-learn 1.9.0 with only `new_positive_weight` changed; regenerate it
  rather than editing it. The four margin notes are the site's; the prompts
  under the lab (predict before you run, ethics, summary) are the notebook's
  own words, and the teacher-key numbers in the notebook don't match what the
  code prints on this scikit-learn, so don't quote them.
- **Research shelf (15 Oct, Adrian: the list was "too long to scroll
  through"; he wanted "the front page of the paper seen like on a small
  interactive clickly thingy", then where it was accepted and who worked on
  it).** A row of six front pages (`.rshelf`, `.rs-b` tabs; a swipe strip
  under 700px), and below it one panel per paper (`.rp`), only the picked one
  shown; arrows, Home and End move along the shelf, and without JS the shelf
  hides and every panel shows. A panel is the big cover (links the PDF where
  the site hosts one), the status pill (solid when accepted, outlined
  `.st-open` otherwise), the title, a facts list (Venue, Presenting/Status,
  Authors, My role), the one-line finding (`.find`, from the summary; update
  it with the summary), the summary, and the links. Covers are page 1 of each
  PDF at 640px wide, `img/papers/r0N-*.webp` (pypdfium2); re-render one when
  its PDF changes. R.01's is the BigData paper's (`LangLLM/paper/main.pdf`),
  shown as an image with no PDF link until the camera-ready is posted
  (Adrian, 15 Oct); R.03's is the arXiv version's; R.06's is a CSS ruled
  sheet (`.rs-notes`). The label is "// five papers · four accepted" (R.06 is
  a study, not a paper).
  **Under each cover the venue is the headline** (option C of three, picked
  15 Oct after Adrian said the nickname labels were "not impressive at all"):
  the venue in big navy serif (`.rs-v`), a mono sub-line (`.rs-v2`), the
  paper's title in italics (`.rs-t`), then the status pill and his role.
  The two journal papers' pills say "Accepted with revisions", never just
  "Accepted".
  Adrian's wording for two sub-lines (15 Oct): R.01's says "HSS · Phoenix"
  (not "High School Symposium"; the panel's Venue row keeps the full name),
  and R.02's spells ARRSI out and says it is in China ("Workshop on
  Autonomous Research & Recursive Self-Improvement · Hengqin, China"); the
  R.02 panel has a Where row, "Hengqin, China · 10 Nov 2026". That is where
  the workshop is, not a claim that he presents there.
- **Research** runs R.01 LangLLM · R.02 Curated to Win · R.03 CompLLM ·
  R.04 portfolio optimization · R.05 Legatum robustness · R.06 advanced math.
  Curated to Win went in at R.02 on 12 Oct, after the other accepted NLP paper;
  that placement was Claude's call, so move it if Adrian asks. (Adrian swapped R.03 and R.04
  on 7 Oct). Two papers have come off,
  each with its PDF, ⌘K entry, terminal command and sitemap entry; don't bring
  either back. The Ukraine Legatum-ML paper went on 13 Sept 2026 because Adrian
  found it too similar to the Legatum robustness paper. **Earshot** (NLP
  patents and surveillance, with Michael Tarekegn) was rejected by the AI for
  Peace workshop at NeurIPS 2026, and on 2 Oct Adrian had it taken off the site
  and both résumés ("i dont think it has a place anywhere").
- **"Which model wrote this?"** (on `/demos/` since 22 Sept; it opened as a band
  atop Research that day) is
  real LangLLM data in `assets/guess-samples.json`: ten English essays, two
  per model, drawn at random with seed 20260922 from `LangLLM/data/raw`. Each
  carries the prompt's topic and stance, whether the 21-feature logistic
  regression named it (leave-one-prompt-out, `results/rq1_cell_correct.csv`),
  and every model's answer to "who wrote this?" (`data/judge`). Since 10 Oct
  each also carries `classifier`: that regression refit without the essay's
  prompt, with its five probabilities and the features pushing hardest
  toward its pick (z times the class's weight minus the mean weight). The
  build stops unless the refit matches rq1_cell_correct on all 120. The game
  quotes the whole English set: classifier 72% of 120 essays, models 23% of
  600 calls, chance 20%. Rebuild it from the repo rather than editing by hand,
  and keep the random order (the first essay happens to be a classifier miss).
- **Run the classifier** (on `/demos/`, linked from R.03 as RUN THE
  CLASSIFIER) is CompLLM's own: the 18 features of `src/features.py`, ported
  to JS line for line (`stylFeatures` in site.js; on 10 Oct it matched the
  Python on all 190 essays, every feature, and on every held-out prediction),
  and a StandardScaler + LogisticRegression(C=1) on the 190 chat-app essays
  (`assets/stylometry-model.json`). Pasted text is scored by the fit to all
  190; the ten sample essays (two per model, seed 20261010) by the GroupKFold
  fit that held out their prompt. Held out by prompt, the regression is right
  on **87.4%**; the paper's 86.3% is its random forest, so quote the 87% as the
  regression's and the 86.3% as the paper's. The percentages are real
  probabilities. It has no human option, and says so. If the JS port is ever
  edited, re-check parity against the Python before shipping.
- **Safe Routes' 80%** is one modeled trip: Exposition & Normandie to LACES by
  two buses (40 min, 750 m on foot) against walking it (118 min, 9.3 km),
  measured as the route's modeled street-crime exposure. Say "modeled", and
  name the trip where there is room.
- **Research R.05** (R.04 from 7 Oct, R.03 before), the Legatum robustness paper, links
  `papers/legatum-robustness-audit.pdf?v=2026-09-13` from three places: the
  card, the ⌘K palette and the terminal's `PAPERS` map. Bump the query in all
  three whenever the PDF changes. The PDF is the 13 Sept 2026 JHSS revision
  exactly as Adrian exported it; its title page lists both authors' emails, and
  he chose to publish it that way. Its status is "In revision" since 1 Nov (see Status pass).
