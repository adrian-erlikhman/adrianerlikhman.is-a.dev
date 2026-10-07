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
  `resume/resume-long.tex` → `resume-long.pdf` (three pages). Both use the
  same house design; see Design. The .tex files are
  the source of truth. Each is self-contained pure ASCII that Adrian can paste
  into Overleaf with the compiler set to XeLaTeX. Keep the two in step with each
  other and with the site.
- **Build:** `python resume/build.py` (or `... short` / `... long`). It needs
  Tectonic on PATH or in `TECTONIC`. On 17 Sept it was downloaded, with Adrian's
  OK, into a session scratchpad rather than installed, so it may be gone: the
  file is `tectonic-*-x86_64-pc-windows-msvc.zip` from the tectonic-typesetting
  GitHub releases, and downloading it again needs his OK. The build refuses a
  PDF with the wrong page count (1 and 3) or whose text layer, as pypdf reads
  it, doesn't name every section once, in order (mono caps in both since
  24 Sept). It is deterministic: each PDF is stamped with the
  `%%  Updated: YYYY-MM-DD` line in its .tex header, so bump that line on edit.
- **Check every change:** render with `pypdfium2` and read `pdftotext -raw`.
  The one-pager has no slack: a two-line Kiddom bullet pushed it to two pages
  on 24 Sept and had to be cut back, so a new line there still means removing
  one. Since the switch to Computer Modern (26 Sept) the one-pager is 8.8/10.6
  on 0.45in side margins and fills the page to the last line; the long one is
  9.1/11.1 on 0.5in sides, with page 2 ending before Ledger's first bullet and
  page 3 nearly full. Computer Modern's bold is extended and runs wider than
  Plex did, so at the old sizes both spilled a page. In
  `\paper`, the author line opens with `\noindent`: without it `\color` drops a
  whatsit into the vertical list, and that makes the glue after `\nopagebreak`
  a legal break between a title and its authors. `\tail`
  right-aligns dates and statuses; `\raggedright` is on, so `\tail` must keep its
  `\rightskip=0pt` or the dates drift off the margin. Section breaks carry no
  penalty and a head can't split from its first bullet: that keeps pages full.
- **Design: both résumés use Adrian's own LaTeX design** in **Computer
  Modern** (Latin Modern: `lmroman9` by file, `lmmono10` for dates and tags)
  with a **navy** accent (`accent`, `#1F3A5F`), bold navy caps section heads
  with a cool grey hairline to the margin, dates in mono on the right. On 26
  Sept Adrian said the résumé "cant be orange", picked navy from four options
  (ink only, navy, deep green, charcoal and slate), asked for "the latex
  fonts", and chose the Computer Modern preview over Plex ("the one the
  right"). The site stays rust and Plex. Two text-layer fixes come with the
  face: common ligatures are off (`Ligatures={TeX,NoCommon}`), so parsers read
  "ff" and "fi" as letters, and section heads are unkerned (`\headkern`),
  because bold "AT" kerns tightly enough that pypdf read "EDUCA TION" and
  failed the build. Greek and the long résumé's `\geqsym` go through math on
  both engines, since Latin Modern's text fonts lack them. The long one wore the
  **Harvard template from 21 to 24 Sept**, when he said "i dont like this
  format, go back to the latex format": it now shares the one-pager's preamble,
  with `\role`, `\paper` (title, link, authors, status), `\lnk` and a mono
  running foot. Don't reintroduce the Harvard look. The Times/Garamond note
  from that era is moot, though the underlying lesson stands: check what pypdf
  reads out of any new face before adopting it.
- **Header (Adrian chose "the most standard", 19 Sept):** centered name, then
  one centered contact line — phone, email, `adrianerlikhman.is-a.dev`,
  LinkedIn, GitHub, the last four as links (navy in the one-pager, ink in the
  long one, whose contact line is dim grey under the name), with LinkedIn and
  GitHub as labels rather than URLs. No location, no tagline; the one-line "receipts"
  strap that ran under the name until 19 Sept is gone.
- **Everything clickable looks clickable** (Adrian, 27 Sept): every
  organisation's site sits in the same navy mono `[tag]` as the paper links --
  `[firstness.ai]`, `[kiddom.co]`, `[aiml-initiative.org]`, `[safejew.org]`,
  `[safe-routes-la.github.io]` -- through the `\lnk` macro, and the header's
  email, site, LinkedIn and GitHub are navy in both files. Adding a tag to a
  role line pushes its date onto its own line if the line grows too long, which
  is why Firstness dropped "AI research engine" and Kiddom dropped "K--12
  EdTech" from their detail slots.
- **Every paper and poster carries its links** as small navy `[tags]` at the
  end of its last bullet, in both:
  - LangLLM: `[abstract]`, `[poster]` (byte-equal to the repo's), `[code]`.
  - Legatum and the portfolio paper: `[pdf]` on the site.
  - **CompLLM has no paper link yet.** JUDGe rejected it on 29 Sept 2026; it
    was **submitted to TACL on 2 Oct 2026 (submission 11824)** as "Most
    Apparent Self-Recognition in LLM Judges Does Not Survive a Peer Baseline",
    with Adrian, Michael Tarekegn and Philo Juang as authors (not Ryan, whom
    the paper thanks). **TACL desk-rejected it on 6 Oct** because Table 3 was
    unreadable in the PDF; Adrian replied the same day asking them to review
    the corrected PDF he had uploaded, or he'll resubmit in a later cycle. An
    arXiv version (`paper_arxiv/` in the now-public repo
    `adrian-erlikhman/self-recognition-peer-baseline`) was waiting on
    Michael's review on 6 Oct. Adrian's call (7 Oct): the site still says it
    is in submission at TACL, plus the preprint. R.02's status is "In
    submission · TACL · arXiv preprint forthcoming", llms.txt matches, and
    the search snippet says "submitted to TACL". Never "accepted" or NeurIPS.
    On 7 Oct the R.02 card took the submitted title and a summary from the
    arXiv abstract, plus a CODE + DATA link to the public repo, but Adrian
    chose to **keep its old credit line** (Ryan and Michael, Philo as
    advisor). The og card's chip "CO-FIRST AUTHOR — TACL (IN SUBMISSION)" and
    both résumés' "In submission, TACL" were left as they were (the résumés wait
    on a Tectonic download). Swap the dashed "PDF · ARXIV SOON" for the arXiv
    link once it is posted (the R.02 card's `[EDIT]` comment marks the spot),
    and drop "forthcoming".
  - LangLLM's abstract is a **site-hosted PDF**, `papers/langllm-abstract-urtc2026.pdf`,
    exported from Adrian's Google Doc on 19 Sept (`download_file_content` with
    `exportMimeType: application/pdf`; doc id
    1mDDaOc_5K5laR3hPhYH_7BLBSvU5yX_c3HBFH5tXESU). The doc is shared only with
    Flora Xu, and the Drive tool here can only share with a named person, so it
    could not be made link-viewable.
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
    just say "Co-first author" (see the credit rule below). The site keeps the
    friendlier title "Do LLM Fingerprints Survive Outside English?" unless he asks.
- **Legatum's title carries a deliberate line break** in the long one (after
  the question mark, with `\newline`). Without it the title filled the line and
  the italic venue was stranded alone on the next one. Keep the break if you
  edit the title. In the long one, `\paper` puts the status in italic navy on
  the right of the title line and the authors in dim grey under it, so a long
  title pushes its status onto its own line (Legatum's and the portfolio
  paper's do); that is fine, but check it after editing a title.
- **Section order** follows Adrian's 9 Sept choice (PR #63), paid work first:
  Professional Experience · Ventures & Civic Technology · Research ·
  Competitions · Education · Leadership & Athletics · Skills. The long version
  adds Talks & Presentations after Competitions & Builds, and Honors before
  Skills.
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
  - **Kiddom is a Machine Learning Internship & Mentorship** (Adrian's wording,
    24 Sept), 2026–present, with Director of Data Science **Flora Xu**. What it
    actually is, per the Gmail thread "Following Up": she mentors him on
    applying ML to teacher-facing problems. On 17 Sept she told him to take an
    existing project deeper; on 24 Sept she pointed him at **Why Wrong** for
    15 Oct — have his LAUSD teacher review the item bank and the misconception
    labels, pilot it on de-identified responses from one class, then write up
    where the tool and the teacher agree and where they don't, with validating
    Safe Routes against held-out 2024 incidents as the fallback. So the résumés
    and the site say *designing* that evaluation: **the pilot has not run**,
    and it can't be written as if it had. The older line about being "on the
    data science team… product-usage data" was unsupported and is gone.
  - **Every paper credit reads "Co-first author"** (Adrian, 26 Sept 2026),
    on both résumés and on the R cards; "First author" is out everywhere,
    including the og and twitter image alt text. He asked for it while
    checking he was not overclaiming before Philo Juang writes a letter of
    recommendation.
  - **Philo Juang and Google DeepMind: reviewed and kept** (Adrian, 26 Sept
    2026). Before Philo writes him a letter of recommendation he asked for
    every mention, checked them, and said they were fine, so leave them alone
    rather than raising it again. For the record, the four advisor claims are
    the R.02 card, the CompLLM credit in both résumés, and the AIML-LI bullet
    in the long one; the summit keynote lines and the partner logo are about
    the company, not him. Two things he saw and accepted: his own URTC poster
    lists Philo as a **co-author at UCLA**, not an advisor at Google DeepMind,
    and the CompLLM submission is anonymized, so nothing in the paper states
    the advising relationship. LangLLM names him nowhere on the site even
    though he is an author on it.
  - Legatum: Co-first author with Ryan Erlikhman, no advisor (the manuscript's
    acknowledgements say no mentor supervised it). Both résumés say "Accepted
    with revisions, Journal of High School Science", matching the site; the old
    hand-authored résumé said "Accepted".
  - Ledger's role wording is fixed; see Site structure.
  - The summit is 200+ LA public-school students, never 500, and lists only
    committed partners.
  - Research statuses track the site's R cards: update both .tex files when
    BigData decides (9 Oct) and TACL does.
  - The portfolio paper (R.04, with Ryan) got a **conditional acceptance** from
    the Oxford Journal of Student Scholarship on 21 Sept 2026: revise, answer
    the reviewers and reformat to the journal's template within 14 days, by
    5 Oct. The R.04 card and the long résumé say "Accepted with revisions", as
    Legatum's do, and the card adds "revision submitted"; the meta, og and
    JSON-LD blurbs say "accepted". The revision went in on 1 Oct 2026 (OJSS
    confirmed it). Since 7 Oct the site's PDF is Ryan's own clean export,
    `OJSS_Revised_Manuscript_CLEAN.pdf` (his email of 2 Oct, 14:34 UTC, no
    subject), with only the Title/Author metadata added. Its text matches the
    earlier "Updated Papel" export the site had from 2 to 7 Oct, but that copy
    set part of Figure 2's caption and a paragraph on pages 11–12 in a
    monospace font. The template's "July 2026 · Vol 10. No 1." footer
    is the journal's own. Linked as `?v=2026-10-02` from the card, the ⌘K
    palette and the terminal; bump all three if it changes. Drop "revision
    submitted" once it is published. The one-pager doesn't carry this paper.
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
  Recognition list. After 2 Dec, reword anything
  that reads as upcoming.
- **Site links:** every résumé link carries `data-cv-menu` and opens the
  `#cvMenu` picker (short, long, LaTeX source); without JS it opens the
  one-pager. The ⌘K palette and the terminal read their URLs from the picker.
  The `?v=` cache-buster lives in **eight places**: on the homepage the three
  triggers (nav `.navcv`, the hero's résumé button, Contact) and the two picker
  options, and on `/demos/` a nav trigger and two picker options
  (root-absolute, `/resume.pdf`). `grep -c "v=2026-10b"` should print 5 and 3.
  Bump all eight whenever either PDF changes. Currently `?v=2026-10b`.
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

## SEO (5 Oct 2026)
- Adrian asked for the site to be the first result for his name. The head
  already carried title, description, canonical, og/twitter and a Person
  JSON-LD; on 5 Oct the JSON-LD gained the two published papers
  (ScholarlyArticle) and the three bouts (VideoObject), every photo's alt
  names him in full, and `sitemap.xml` lists the homepage's photos and videos.
  Keep the JSON-LD's statuses and `llms.txt` (a plain summary for AI search)
  in step with the R cards and Experience.
- `7fcb94c90a7a7574f5deb93f88ae9e26.txt` at the root is the **IndexNow key**
  (Bing, Yandex, and through Bing DuckDuckGo and Yahoo). After a deploy that
  changes content, ping `https://api.indexnow.org/indexnow?url=<page>&key=<key>`.
- **Search snippet (Adrian, 5 Oct):** title "Adrian Erlikhman — ML Research ·
  Full-Stack · Team USA Épée" (he asked for research, building, then
  fencing). Description since 7 Oct, Adrian's own words: "ML/NLP
  researcher. Software, ML, investment, and venture intern. Team USA
  fencer." The four internships map to Firstness, Kiddom, Fjor and Alliance.
  He turned down a longer draft that named the companies and the hackathons.
  No National Merit, no ranking. Same text in the og and twitter tags.
- **Images in the search result (Adrian, 7 Oct):** he wants his headshot, a
  fencing photo and a Startup School photo, not the climbing and hiking
  shots Google had picked. Google chooses these itself, so the site steers it
  three ways: the Person JSON-LD `image` lists `adrian.jpg`, `fencing-1.jpg`
  and `img/ycs/yc-sign.jpg`; the sitemap's homepage images are those same three; and
  `robots.txt` blocks Googlebot-Image from the seven outdoor `life-*.jpg`
  photos and `img/ycs/main-stage.jpg` (he isn't in it). Delete those robots lines
  to let them back into image search.
- **Icons** are the `[ ae ]` mark, regenerated 5 Oct in IBM Plex Mono Bold
  (from the Tectonic cache) on rust: `favicon.svg` (outlined paths),
  `favicon.ico`, `favicon-48/96.png`, `icon-192/512.png`,
  `apple-touch-icon.png`, plus `site.webmanifest`. Google had been showing
  the August glitch "AE", which survived in `apple-touch-icon.png`.
- **Google Search Console**: URL-prefix property for
  `https://adrianerlikhman.is-a.dev/`, verified by the root file
  `google2a9593ca4bc38729.html` (6 Oct). Never delete it: Google drops the
  verification. A domain property can't work: the is-a.dev record is a CNAME,
  which can't sit beside a TXT record.

## Shared assets
- Since 21 Sept the site's styles and scripts live in `assets/site.css` and
  `assets/site.js`, shared by every page that uses the house design; the
  JSON-LD and the code-preview samples stay inline in the page that needs them.
  Each page links them with `?v=`; bump it on every page when either file
  changes. Every script block checks its elements exist, and URLs in the
  script are root-absolute (`/papers/…`), so a page without an overlay or
  section just skips it.

## /work/ — removed 26 Sept
- Adrian: "i dont think i need the everything all in one place page". The
  page (projects P.01–P.04, experiments E.01–E.04 with code previews, the full
  achievements list) is gone, with its sitemap entry, ⌘K entry and the five
  homepage links; the hero button and guide row now go to `#record`. Its CSS
  (`.dist-flag`, the code previews) still sits unused in site.css. Git history
  has the page if he wants anything from it back. Notes below that mention
  `/work/` are history.
- What it held that the homepage lacked moved into Achievements (Adrian: "add
  everything that should be added to the main page achievement page"): the
  Citadel bot's name ("dunerscore", team of three), StandWithUs on the JSU
  assembly, the AP split (11 taken, 6 this year), and one Academics row each
  for Kaggle x Google, the Deep Learning Specialization and NVIDIA DLI. The
  DeepLearning.AI and NVIDIA marks were tried on those rows and dropped as
  muddy at 15px. The Selected work caption under the heading is gone too
  (Adrian: "not needed").
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
- **Copy rule (Adrian, 22 Sept): precise and concise, "not flourishy at all".**
  He rejected two drafts before this one. Name things, list facts, stop. No
  metaphors, no trailing clauses, no category words. The section labels are
  "// four internships, 2024 - now" and "// five papers · two in review".
  Anything warmer has been cut twice, so don't reintroduce it.
- **Selected work** is four case studies, each *the problem · my part · the
  hard call · where it stands*: SafeJew, AIML-LI, Ledger, Safe Routes to
  School. Screenshots are `img/cases/*.webp` (live pages captured headlessly);
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
  unless he asks. **Achievements** (rebuilt 27 Sept from five mockups, Adrian
  picked "something more like 1 or 3"): the three podium finishes lead as
  `.pod` cards with a black header carrying the placement, then six `.ac`
  cards for the rest of the honours, then the Founding and Academics groups as
  `.recog` rows. **Every mark sits in
  the same `.al` box** so they read at one weight: square marks 21px tall and
  capped at 26px wide, wordmarks 15px tall and capped at 100px, which is what
  keeps Citadel's long lockup from dominating its card. Cards with no mark
  keep an empty `.al` so the titles still line up. **About** is the
  short intro plus the Heinlein quote, "Everything is theoretically impossible,
  until it is done." (Adrian's wording, 26 Sept; it replaced the Fei-Fei Li one),
  and the photo fan.
  The photos are a **swipe strip** (Adrian, 26 Sept, replacing the hover fan):
  one row of cards that snaps to each photo; touch and trackpads swipe it, a
  mouse drags it, the arrow keys and the ← → buttons step it, and each button
  greys out at its end (`site.js` LIFE STRIP; the element keeps id `lifedeck`).
  The strip is the seven outdoor photos only. The Startup School photos sat
  in it for an hour on 7 Oct before Adrian asked for them "elsewhere".
- **Startup School 2026 photos** (Adrian, 7 Oct) are a row of three under
  Achievements (`.ycs-grid`, framed like the bouts, cropped 4:3), right after
  the `.ac` cards that include Y Combinator Startup School: `img/ycs/yc-sign.jpg`
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
- The MIT logo and "In active recruitment" banner stay (Adrian, 21 Sept),
  though the review suggested dropping them.
- **The top-left mark is option 40** (Adrian picked it from three sheets of
  mockups, 22 Sept): a rust block reading `[ ae ]` in mono, with the full name
  beside it as `.sr-only` so screen readers and crawlers still get it. It
  hovers to ink. Same on all three pages; `.ae-mark .nm.blk` in site.css.
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
  (oxfordjss.org favicon, white knocked out) beside R.04's, and Coursera's
  wordmark (the inline SVG on coursera.org, fill #0056D2) on the Deep Learning
  Specialization row at 12px. Dropped as muddy at size: NeurIPS, JHSS, LACES
  (only a touch icon), and the square StandWithUs and Coursera marks.
  StandWithUs's wordmark was clean but left off the JSU row, where it would
  read as the club's own; Correlation One was clean but the Citadel card
  already carries a mark. aiEDU would need its tagline cropped.
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
- **Research summaries** open on hover or focus and are capped at 640px
  (was 200px until 7 Oct, which clipped three on desktop and cut every one
  roughly in half on a phone). Keep the cap above the tallest summary at
  390px wide.
- **Research** runs R.01 LangLLM · R.02 CompLLM · R.03 Legatum robustness ·
  R.04 portfolio optimization · R.05 advanced math. Two papers have come off,
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
- **Research R.03**, the Legatum robustness paper, links
  `papers/legatum-robustness-audit.pdf?v=2026-09-13` from three places: the
  card, the ⌘K palette and the terminal's `PAPERS` map. Bump the query in all
  three whenever the PDF changes. The PDF is the 13 Sept 2026 JHSS revision
  exactly as Adrian exported it; its title page lists both authors' emails, and
  he chose to publish it that way. Its status line stays "Accepted with
  revisions · Journal of High School Science · in revision" until he says
  otherwise.
