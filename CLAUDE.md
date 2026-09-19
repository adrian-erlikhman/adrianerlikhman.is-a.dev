# Project memory — adrianerlikhman.is-a.dev (repo adrian-erlikhman/adrianerlikhman.is-a.dev, formerly adrian-erlikhman.github.io)

Personal portfolio site (single-page `index.html`), served via GitHub Pages at
the custom domain **adrianerlikhman.is-a.dev** (see `CNAME`). The site links two
résumés, `resume.pdf` (one page) and `resume-long.pdf` (two pages), both built
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
  `resume/resume-long.tex` → `resume-long.pdf` (two pages). The .tex files are
  the source of truth. Each is self-contained pure ASCII that Adrian can paste
  into Overleaf with the compiler set to XeLaTeX. Keep the two in step with each
  other and with the site.
- **Build:** `python resume/build.py` (or `... short` / `... long`). It needs
  Tectonic on PATH or in `TECTONIC`. On 17 Sept it was downloaded, with Adrian's
  OK, into a session scratchpad rather than installed, so it may be gone: the
  file is `tectonic-*-x86_64-pc-windows-msvc.zip` from the tectonic-typesetting
  GitHub releases, and downloading it again needs his OK. The build refuses a
  PDF with the wrong page count (1 and 2) or whose text layer doesn't name every
  section once, in order. It is deterministic: each PDF is stamped with the
  `%%  Updated: YYYY-MM-DD` line in its .tex header, so bump that line on edit.
- **Check every change:** render with `pypdfium2` and read `pdftotext -raw`.
  The long version has about three lines of slack at the end of page 2 and the
  short one has none left, so a new line there means cutting one. `\tail`
  right-aligns dates and statuses; `\raggedright` is on, so `\tail` must keep its
  `\rightskip=0pt` or the dates drift off the margin. Section breaks carry no
  penalty and a head can't split from its first bullet: that keeps pages full.
- **Design:** IBM Plex Sans and Mono with the site's rust (`#B4472E`); mono rust
  section heads with a hairline to the margin.
- **Header (Adrian chose "the most standard", 19 Sept):** centered name, then
  one centered contact line — phone, email, `adrianerlikhman.is-a.dev`,
  LinkedIn, GitHub, the last four as rust links, with LinkedIn and GitHub as
  labels rather than URLs. No location, no tagline; the one-line "receipts"
  strap that ran under the name until 19 Sept is gone.
- **Every paper and poster carries its links** as small rust `[tags]` at the end
  of its last bullet:
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
  - The URTC submission's own title is *Interpretable Attribution of Frontier
    Language Models Across Languages and Translation*, not the friendlier "Do
    LLM Fingerprints Survive Outside English?" the site and both résumés use.
    Flagged to Adrian on 19 Sept; leave it unless he asks for the real one.
- **Two titles carry a deliberate line break.** Earshot's in the one-pager (at
  its colon) and Legatum's in the long one (after the question mark), both with
  `\newline`. Without them the title filled the line and the italic venue was
  stranded alone on the next one. Keep the break if you edit either title.
- **Section order** follows Adrian's 9 Sept choice (PR #63), paid work first:
  Professional Experience · Ventures & Civic Technology · Research ·
  Competitions · Education · Leadership & Athletics · Skills. The long version
  adds Talks & Presentations after Competitions & Builds, and Honors before
  Skills.
- **Content rules:**
  - Kiddom is a **Machine Learning Internship** everywhere.
  - Legatum: First author with Ryan Erlikhman, no advisor (the manuscript's
    acknowledgements say no mentor supervised it). Both résumés say "Accepted
    with revisions, Journal of High School Science", matching the site; the old
    hand-authored résumé said "Accepted".
  - Ledger's role wording is fixed; see Site structure.
  - The summit is 200+ LA public-school students, never 500, and lists only
    committed partners.
  - Research statuses track the site's R cards: update both .tex files when
    JUDGe and AI for Peace decide (29 Sept) and when URTC does.
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
  both résumés and on the site: the Who paragraph, the AIML-LI Experience card,
  an Achievements item and a hero-typewriter line. After 2 Dec, reword anything
  that reads as upcoming.
- **Site links:** every résumé link carries `data-cv-menu` and opens the
  `#cvMenu` picker (short, long, LaTeX source); without JS it opens the
  one-pager. The ⌘K palette and the terminal read their URLs from the picker.
  The `?v=` cache-buster lives in **four places**: the two triggers (nav
  `.navcv`, Contact) and the two picker options. Bump all four whenever either
  PDF changes. Currently `?v=2026-09j`. JSON-LD `subjectOf` and `sitemap.xml`
  list both PDFs.
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

## Site structure (section indices in `index.html`)
`[01]` Who · `[02]` Experience · `[03]` Research · `[04]` Achievements
(id=`record`; sub-cards: Competitions & Awards / Founding & Leadership /
Craft & Mastery) · `[05]` Projects · `[06]` Fencing · `[07]` Contact ·
`[08]` Off the clock.
- Three flagship `.dist-flag` banners open Achievements, the two firsts ahead of
  the third: eDNAtlas (1st, Decode the Ocean), Ledger (1st, VISION HACK: South
  LA) and Safe Routes to School (3rd, Code for Transportation). Each also has a
  Projects card — eDNAtlas at P.06, Safe Routes at P.07, Ledger at P.08 — and
  none of them is in Experience, intentionally.
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
- **Research R.04**, the Legatum robustness paper, links
  `papers/legatum-robustness-audit.pdf?v=2026-09-13` from three places: the
  card, the ⌘K palette and the terminal's `PAPERS` map. Bump the query in all
  three whenever the PDF changes. The PDF is the 13 Sept 2026 JHSS revision
  exactly as Adrian exported it; its title page lists both authors' emails, and
  he chose to publish it that way. Its status line stays "Accepted with
  revisions · Journal of High School Science · in revision" until he says
  otherwise.
