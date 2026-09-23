# Project memory — adrianerlikhman.is-a.dev (repo adrian-erlikhman/adrianerlikhman.is-a.dev, formerly adrian-erlikhman.github.io)

Personal portfolio site (single-page `index.html`), served via GitHub Pages at
the custom domain **adrianerlikhman.is-a.dev** (see `CNAME`). The site links two
résumés, `resume.pdf` (one page) and `resume-long.pdf` (three pages), both built
from LaTeX in `resume/`.

## USA Fencing — current standings (keep in sync between site + résumés)
- **U.S. Junior (U20): No. 49** — current national ranking
- **U.S. Senior: No. 78** — current national ranking
- U.S. Cadet (U17): peak No. 17
- Épée · **A26 rating** · Region 4 No. 1 · Team USA
- Public record: https://fencingtracker.com/p/100253463/Adrian-Erlikhman
- Update in three places when these change:
  - Site: `index.html`, `.fence-meta` chips (Fencing section, id currently `[06]`).
  - Both résumés: the fencing lines under LEADERSHIP & ATHLETICS in
    `resume/resume-short.tex` and `resume/resume-long.tex`, then rebuild.

## Résumé
- **Two versions, typeset in LaTeX** (since 17 Sept 2026):
  `resume/resume-short.tex` → `resume.pdf` (one page, the default link) and
  `resume/resume-long.tex` → `resume-long.pdf` (three pages, Harvard format
  since 21 Sept; see Design). The .tex files are
  the source of truth. Each is self-contained pure ASCII that Adrian can paste
  into Overleaf with the compiler set to XeLaTeX. Keep the two in step with each
  other and with the site.
- **Build:** `python resume/build.py` (or `... short` / `... long`). It needs
  Tectonic on PATH or in `TECTONIC`. On 17 Sept it was downloaded, with Adrian's
  OK, into a session scratchpad rather than installed, so it may be gone: the
  file is `tectonic-*-x86_64-pc-windows-msvc.zip` from the tectonic-typesetting
  GitHub releases, and downloading it again needs his OK. The build refuses a
  PDF with the wrong page count (1 and 3) or whose text layer, as pypdf reads
  it, doesn't name every section once, in order (mono caps in the one-pager,
  title case in the long one). It is deterministic: each PDF is stamped with the
  `%%  Updated: YYYY-MM-DD` line in its .tex header, so bump that line on edit.
- **Check every change:** render with `pypdfium2` and read `pdftotext -raw`.
  The one-pager has no slack, so a new line there means cutting one. The long
  one breaks at section heads: page 1 ends after Safe Routes, with room for
  about five more lines; page 2 runs from Research through More builds; and
  page 3 has about thirteen lines free at the end. In
  `\paper`, the author line opens with `\noindent`: without it `\color` drops a
  whatsit into the vertical list, and that makes the glue after `\nopagebreak`
  a legal break between a title and its authors. `\tail`
  right-aligns dates and statuses; `\raggedright` is on, so `\tail` must keep its
  `\rightskip=0pt` or the dates drift off the margin. Section breaks carry no
  penalty and a head can't split from its first bullet: that keeps pages full.
- **Design:** the one-pager is IBM Plex Sans and Mono with the site's rust
  (`#B4472E`), with mono rust section heads and a hairline to the margin. The
  long one is **Harvard format** (Adrian's ask, 21 Sept), after the Mignone
  Center's template: name over a rule, then a centered contact line with •
  separators; centered bold title-case heads; each entry an organization line
  (bold) over a position line (italic), with context on the right of the first
  and dates on the right of the second; all black. Harvard puts a location in
  that first right-hand slot, but none is known for most entries, so it holds
  the organization's site or a short description; don't guess locations. The
  face is Times (`newtxtext`, 10 pt), not the Garamond of Harvard's samples:
  pypdf reads EB Garamond's T and V as separate words ("PyT orch",
  "T ensorFlow"), and a résumé parser might too. The one-pager keeps Adrian's
  own design; switching it too is his call.
- **Header (Adrian chose "the most standard", 19 Sept):** centered name, then
  one centered contact line — phone, email, `adrianerlikhman.is-a.dev`,
  LinkedIn, GitHub, the last four as links (rust in the one-pager, black in the
  long one, which adds Harvard's rule under the name), with LinkedIn and GitHub
  as labels rather than URLs. No location, no tagline; the one-line "receipts"
  strap that ran under the name until 19 Sept is gone.
- **Every paper and poster carries its links** as small `[tags]` (rust in the
  one-pager, black in the long one) at the end of its last bullet:
  - LangLLM: `[abstract]`, `[poster]` (byte-equal to the repo's), `[code]`.
  - Earshot: `[abstract]`, `[code]`. The repo's `paper/abstract.md` is a stale
    draft that says so at the top — never link that one.
  - Legatum and the portfolio paper: `[pdf]` on the site.
  - **CompLLM has no link on purpose.** The only copy is a private Drive file
    and JUDGe review is double-blind; add a link after the 29 Sept decision.
  - Both abstracts are **site-hosted PDFs**, `papers/langllm-abstract-urtc2026.pdf`
    and `papers/earshot-abstract-neurips2026.pdf`, exported from Adrian's Google
    Docs on 19 Sept (`download_file_content` with `exportMimeType:
    application/pdf`; doc ids 1mDDaOc_5K5laR3hPhYH_7BLBSvU5yX_c3HBFH5tXESU and
    1pJb-8l70qeS_keGV-mFunK2RkPZIBEASfMniU5VxiAQ). The docs themselves are
    shared only with Flora Xu, and the Drive tool here can only share with a
    named person, so the docs could not be made link-viewable. **Re-export the
    Earshot one after he submits**: the published copy is a snapshot of a draft
    that was still due on 21 Sept.
  - **LangLLM's venue changed.** URTC didn't take it (CMT notice, 18 Sept).
    A full paper went to the **IEEE BigData 2026 High School Symposium** on
    21 Sept (SP19343, "Interpretable Multilingual Attribution of Frontier
    LLMs", authors Adrian, Michael Tarekegn, Philo Juang; decision 9 Oct).
    The R.01 card and both résumés say "Under review" there. The R.01 summary
    follows that paper's abstract (`LangLLM/paper/main.tex`): no decline
    *detected*, n-grams more accurate within a language but the features
    transfer better, 57–70% on translations, and judges at 20–25%. The old
    "models converge, ρ = −0.96" claim is gone because Michael's revision
    showed it was a Grok effect. The `[abstract]`/`[poster]` tags and the card's
    POSTER button are still the URTC artifacts, some of whose numbers the
    paper corrected; Adrian chose to keep them (21 Sept). He also chose to
    drop LangLLM's author line everywhere, because the old one ("with Michael
    Tarekegn & Ryan Erlikhman · Advisor: Philo Juang") didn't match the
    submitted paper (Adrian, Michael, Philo), so the card and both résumés
    just say "First author". The site keeps the friendlier title "Do LLM
    Fingerprints Survive Outside English?" unless he asks.
- **Two titles carry a deliberate line break.** Earshot's in the one-pager (at
  its colon) and Legatum's in the long one (after the question mark), both with
  `\newline`. Without them the title filled the line and the italic venue was
  stranded alone on the next one. Keep the break if you edit either title.
  In the long one, a paper's status sits on the right of its italic author
  line, which is why the two advised papers list co-authors as "R. Erlikhman,
  M. Tarekegn" with no "and": with it the status drops to a line of its own.
- **Section order** follows Adrian's 9 Sept choice (PR #63), paid work first:
  Professional Experience · Ventures & Civic Technology · Research ·
  Competitions · Education · Leadership & Athletics · Skills. The long version
  adds Talks & Presentations after Competitions & Builds, and Honors before
  Skills. Harvard's own template leads with Education; the long one keeps
  Adrian's order anyway.
- **Content rules:**
  - **Firstness** (firstness.ai, an AI research engine for discovering new
    hypotheses): Adrian's internship, secured 21 Sept 2026, as a **Software
    Engineering & ML Intern**, 2026–present, working directly under the
    founder. His work, in his words: refining the platform "to connect into the
    research stack", then making it "easier to understand with demos". Every
    mention says that, glossing the research stack as the literature databases
    and reference managers researchers already work in, and names no project
    or integration beyond it. The founder isn't named. It leads Professional
    Experience in both résumés: the long one has three bullets (the platform
    and the founder, the research stack, demos for new users). The one-pager has
    one bullet, with "reporting directly to the founder" on its role line. To fit
    it, the one-pager's Alliance bullet lost its partner routing and its LangLLM
    bullet says "Google Translate" rather than "machine translation"; the long
    one keeps both.
  - Kiddom is a **Machine Learning Internship** everywhere.
  - Legatum: First author with Ryan Erlikhman, no advisor (the manuscript's
    acknowledgements say no mentor supervised it). Both résumés say "Accepted
    with revisions, Journal of High School Science", matching the site; the old
    hand-authored résumé said "Accepted".
  - Ledger's role wording is fixed; see Site structure.
  - The summit is 200+ LA public-school students, never 500, and lists only
    committed partners.
  - Research statuses track the site's R cards: update both .tex files when
    JUDGe and AI for Peace decide (29 Sept) and when BigData does (9 Oct).
  - The portfolio paper (R.05, with Ryan) got a **conditional acceptance** from
    the Oxford Journal of Student Scholarship on 21 Sept 2026: revise, answer
    the reviewers and reformat to the journal's template within 14 days, by
    5 Oct. The R.05 card and the long résumé say "Accepted with revisions", as
    Legatum's do, and the card adds "in revision"; the meta, og and JSON-LD
    blurbs say "accepted". Drop "in revision" once it is published. The
    one-pager doesn't carry this paper.
  - Class rank is out **temporarily**; Adrian wants it back later. Speech &
    Debate, National Honor Society, Cedars-Sinai, Friendship Circle LA, Mandala
    and Caltech are out permanently.
  - Dual enrollment, with the numbers Adrian asked for on 19 Sept: Linear
    Algebra is **MATH 270** at L.A. Southwest College (MATH 275 there is
    Ordinary Differential Equations), Programming in Python is **CS 119**, and
    the one he plans to take, Python Programming for Data Science and Machine
    Learning, is **CS 121** (LACCD numbering). Drop "planned" from CS 121 once
    he is enrolled.
- **NCSS 2026 talk:** aiEDU (Ashley Renick, then Lindsay Berger) invited Adrian,
  with Michael, onto the student panel in its pre-conference session "Transform
  Your School's AI Readiness" at NCSS 2026, the National Consortium of STEM
  Schools conference, San Diego, 2 Dec 2026 (conference 2–5 Dec, about 100
  educators). He accepted on 17 Sept; a prep call was still being set. It is in
  both résumés and on the site: the AIML-LI case study, the homepage's
  Recognition list and the Achievements on /work/. After 2 Dec, reword anything
  that reads as upcoming.
- **Site links:** every résumé link carries `data-cv-menu` and opens the
  `#cvMenu` picker (short, long, LaTeX source); without JS it opens the
  one-pager. The ⌘K palette and the terminal read their URLs from the picker.
  The `?v=` cache-buster lives in **eleven places**: on the homepage the three
  triggers (nav `.navcv`, the hero's résumé button, Contact) and the two picker
  options, and on `/work/` and `/demos/` each a nav trigger and two picker
  options (root-absolute, `/resume.pdf`). `grep -c "v=2026-09p"` should print
  5, 3 and 3. Bump all eleven whenever either PDF changes. Currently `?v=2026-09p`.
  JSON-LD `subjectOf` and `sitemap.xml` list both PDFs.
- **Retired:** the hand-authored résumé Adrian exported on 8 Sept
  (`~/Downloads/Adrian_Erlikhman_Resume.pdf`) and the surgery pipeline that
  patched it (`scratchpad/rebuild.py`, `sortstream.py`, `finalize.py`,
  `pixdiff.py`, `order_check.py`; `tools/build_resume.py` before that). Nothing
  links that PDF any more. If Adrian sends a new hand-authored export, ask
  whether it replaces the LaTeX one-pager before touching anything.

## Deploy workflow
- Develop on branch `claude/migrate-github-io-dev-domain-kw4o17`.
- Per change: commit → push → open a **draft** PR → mark ready → squash-merge
  into `main` → resync the branch to `origin/main` with `--force-with-lease`.

## Shared assets
- Since 21 Sept the site's styles and scripts live in `assets/site.css` and
  `assets/site.js`, shared by every page that uses the house design; the
  JSON-LD and the code-preview samples stay inline in the page that needs them.
  Each page links them with `?v=`; bump it on every page when either file
  changes. Every script block checks its elements exist, and URLs in the
  script are root-absolute (`/papers/…`), so a page without an overlay or
  section just skips it.

## /work/ — every project, experiment and achievement (since 21 Sept)
- `work/index.html` holds the full collection so the homepage can stay curated:
  Projects (P.01 SafeJew, P.02 eDNAtlas, P.03 Safe Routes, P.04 Ledger),
  Experiments (E.01–E.04, the four ML/quant repos, with the code previews and
  their `text/plain` samples) and the complete Achievements section. Its HUD is
  the homepage's with links back (`/#papers` …); the wordmark goes home.
- A `#section` link from another page (`/#papers`) skips the intro and lands on
  the section (`HASH_TARGET` in site.js); a plain visit still plays the intro.

## /demos/ — the two interactive demos (since 22 Sept)
- Adrian moved them off the homepage ("the comp / langllm demo takes up too much
  space... maybe it can be a separate page where you are prompted to it, and it
  has a short demo walkthrough explaining what to do"). `demos/index.html`
  carries both, each behind a three-step walkthrough (`.steps`) that says what
  to do: `[01]` **Which model wrote this?** (the `#guess` band, unchanged) and
  `[02]` **Does your writing read like a model?** (the CompLLM stylometry toy,
  which is the old `#stylo` overlay with `sv-inline` added, so it sits in the
  page instead of over it and drops its own kicker, heading and sub).
- The homepage prompts people to it from Research: one `.tryline` row above the
  paper list, plus a TRY THE DEMO link on R.01 (`/demos/#guess-sec`) and on R.02
  (`/demos/#stylometry`). Link the section, not `#guess`, so the steps come
  first. The ⌘K palette and the terminal's `demo` command open the page.
- The stylometry script renders on load when the panel isn't hidden; the guess
  script still waits for the band to come near. `sitemap.xml` lists the page.

## Site structure (homepage `index.html`, rebuilt 21–22 Sept after a design review)
Hero · `[01]` About me (`about`, with the photos in `#offclock`) ·
`[02]` Experience · `[03]` Research (`papers`) · `[04]` Fencing ·
`[05]` Achievements (`record`) · `[06]` Selected work (`work`) · `[07]` Contact.
That order is **Adrian's**, 22 Sept, and the nav and ⌘K palette follow it:
About, Experience, Research, Fencing, Achievements, Selected work, Contact.
- **Hero** (Adrian's shape, 22 Sept: name left, photo right): the stable
  one-line intro ("i'm a senior in los angeles. i build machine-learning tools
  for real communities, and i study how language models behave"), three buttons
  (*selected work ↓*, *all achievements ↗*, *résumé*), then `.guide` — six rows
  headed "what's here" that say what the site holds and double as the way in:
  selected work, research, experience, achievements ↗, demos ↗, fencing. Keep
  those descriptions current, since they carry what the old "right now" list
  used to say (interning at Firstness, two papers in review). That list and its
  `.now` styles are gone; the old typewriter and the six interest labels too,
  though the typewriter's script still sits in site.js, guarded, if he wants it
  back. The hero's top padding is trimmed so all six rows land above the fold
  at 1280×900.
- **Copy rule (Adrian, 22 Sept): name the thing, not the category.** He called
  the old section labels cliché, so "// ventures · internships · skills" became
  "// four internships, 2024 - now", "// papers & writeups" became "// six
  papers · two in review", and the hero guide lists an incident map, a free AI
  course, a compliance scanner and a safer walk to school instead of "four
  things I built". The hero's one line now ends "i study what gives a language
  model away" rather than "how language models behave". Apply the same test to
  any new copy.
- **Selected work** is four case studies, each *the problem · my part · the
  hard call · where it stands*: SafeJew, AIML-LI, Ledger, Safe Routes to
  School. Screenshots are `img/cases/*.webp` (live pages captured headlessly);
  AIML-LI shows its six units instead. Every claim is sourced: SafeJew's
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
  unless he asks. **Achievements** groups the whole record (competitions,
  founding and leadership, academics) and links to `/work/#achievements` for
  the detailed version. **About** is the
  short intro plus the Fei-Fei Li quote (Adrian: keep it) and the photo fan.
  The fan **focuses on hover** (Adrian, 22 Sept): resting on a card centres it,
  leaving the deck lays them back down, and a mouse click does nothing. Touch
  keeps a tap that toggles, since a finger can't hover.
- The MIT logo and "In active recruitment" banner stay (Adrian, 21 Sept),
  though the review suggested dropping them.
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
- **The AIML-LI mini-lab** (`#aiLab`, under the AIML-LI case study, since 22 Sept)
  is Unit 1's ethics lab annotated: `u01_l01_ethics_minilab_intro_ai_v1.ipynb`,
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
- **Research** runs R.01 LangLLM · R.02 CompLLM · R.03 Earshot · R.04 Legatum
  robustness · R.05 portfolio optimization · R.06 advanced math. The Ukraine
  Legatum-ML paper (the old R.03) came off on 13 Sept 2026 because Adrian found
  it too similar to R.04, along with its PDF, ⌘K entry, terminal command and
  sitemap entry. Don't bring it back.
- **Earshot (R.03)**, with Michael Tarekegn, is headed for the AI for Peace
  workshop at NeurIPS 2026 (Paris, 12–13 Dec). The abstract is due 21 Sept AoE
  through a Google Form (pasted text, no PDF), and decisions come 29 Sept, so
  there is no paper to link: the card, the ⌘K palette and `read earshot` all
  point at the public repo, `adrian-erlikhman/earshot`. Take every number from
  the FINAL STATUS table in that repo's `CLAIMS.md`. Quote only the era-matched
  odds ratio, 1.03 [0.38, 2.78], never the crude control comparison, and never
  call it the first to link NLP papers to patents. The title is the repo brief's
  recommendation; Adrian left the choice to Claude. Update the status line once
  it's submitted or decided.
- **"Which model wrote this?"** (on `/demos/` since 22 Sept; it opened as a band
  atop Research that day) is
  real LangLLM data in `assets/guess-samples.json`: ten English essays, two
  per model, drawn at random with seed 20260922 from `LangLLM/data/raw`. Each
  carries the prompt's topic and stance, whether the 21-feature logistic
  regression named it (leave-one-prompt-out, `results/rq1_cell_correct.csv`),
  and every model's answer to "who wrote this?" (`data/judge`). The game
  quotes the whole English set: classifier 72% of 120 essays, models 23% of
  600 calls, chance 20%. Rebuild it from the repo rather than editing by hand,
  and keep the random order (the first essay happens to be a classifier miss).
- **The CompLLM stylometry demo** (on `/demos/`, linked from R.02) is a toy, and says so:
  six hand-set profiles (Human, GPT, Claude, Gemini, Grok, DeepSeek) matched on
  four features, with percentages that are shares of similarity, not
  probabilities. Its note gives the paper's real setup (190 responses, five
  models, 18 features, 86.3%). Don't describe it as the paper's classifier.
- **Safe Routes' 80%** is one modeled trip: Exposition & Normandie to LACES by
  two buses (40 min, 750 m on foot) against walking it (118 min, 9.3 km),
  measured as the route's modeled street-crime exposure. Say "modeled", and
  name the trip where there is room.
- **Research R.04**, the Legatum robustness paper, links
  `papers/legatum-robustness-audit.pdf?v=2026-09-13` from three places: the
  card, the ⌘K palette and the terminal's `PAPERS` map. Bump the query in all
  three whenever the PDF changes. The PDF is the 13 Sept 2026 JHSS revision
  exactly as Adrian exported it; its title page lists both authors' emails, and
  he chose to publish it that way. Its status line stays "Accepted with
  revisions · Journal of High School Science · in revision" until he says
  otherwise.
