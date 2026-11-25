# Resume and CV: design, build, content rules and history

Moved verbatim from CLAUDE.md on 25 Nov 2026. Not loaded automatically: grep or read the part you need.

Personal portfolio site (single-page `index.html`), served via GitHub Pages at
the custom domain **adrianerlikhman.is-a.dev** (see `CNAME`). The site links a
**résumé**, `resume.pdf` (two pages, `resume/resume-short.tex`), and since 3 Nov 2026 an academic **CV**, `cv.pdf`
(four pages, `resume/cv.tex`), both built from LaTeX in `resume/`.

## Résumé
- **A résumé and a CV since 3 Nov 2026** (Adrian: "instead of two resumees. lets do a resume and a CV"). The short
  résumé is unchanged. The long one became **`resume/cv.tex` → `cv.pdf`**, an academic CV in the same Jake's layout:
  Education (LACES; L.A. Southwest College dual enrollment as its own entry) · Research Interests · Publications, as
  numbered full citations ([1]-[5]: conference and workshop papers, journal articles, preprints; his name bold, author
  order as on each paper, the status bold, "Co-first author"/"Sole author", underlined PDF/Code words) with one or two
  bullets each · Presentations (dated lines) · Honors & Awards (one dated line each) · Experience (the internships, then
  the maths research) · Selected Projects · Leadership & Service (JSU, STEMsters, coaching at LAIFC) · Athletics ·
  Skills (with a Music line for MTAC). Its section heads are unkerned (`\headnokern`): kerned small-caps "Aw" read as
  "A wards" and failed the build. `build.py cv` (or `long`) builds it and **copies it to `resume-long.pdf`** too, so old
  links to the long résumé still open; the sitemap, JSON-LD and llms.txt list `cv.pdf`. Notes below about the long
  résumé's sections describe what the CV grew out of; its content rules (Kiddom, Firstness, credits) still hold.
- **CV refined (3 Nov, later; his "refine the CV"), from a fresh reviewer's read:** dated entries keep the date top right
  on their first line (`\dated` is two minipages); the footer says "Updated November 2026" (change it when you edit);
  project headers carry their result; the in-revision Legatum paper moved to "Manuscripts in revision and preprints" with
  Whose Line; citations carry place and year; talks after today say "(scheduled)" (drop it after 10 Nov, 2 Dec, 17 Dec);
  current roles in the present tense; LangLLM gained its Code link (github.com/adrian-erlikhman/LangLLM, public). Facts
  tightened: Whose Line's tests are "significantly" and the 86.3% is "of the chat-app essays"; Legatum's band is ranks
  68-100 and no compute-saving claim; Safe Routes' 80% names its one modeled trip; SafeJew is funded by the Teen
  Innovation Grant and distributed through the Community Security Initiative (the one-pager said the Initiative funded
  it and claimed "a citable source on every pin"; both fixed there too); "open-source" is off AIML-LI in both (the
  notebooks repo is private); YC admitted him as AIML-LI's co-founder; JSU is President since 11th grade, Secretary in
  10th (his College Apps notes), so 2024-Present; AP Scholar years 2025 and 2026 (his Common App); coaching is beginner
  classes and his younger brother. MTAC moved to Honors. **Still open, for Adrian:** who shares co-first authorship on
  LangLLM and Whose Line (an asterisk key would be standard); his part in Safe Routes and eDNAtlas; dates for coaching,
  the Expo and dual enrollment; and **"4× Junior regional champion"**: his final Common App says **3×**, fencingtracker
  shows two, the site and both résumés say 4×.
- **Alliance: deep tech and Caltech (3 Nov, his ask).** "add a line for the alliance talked about deeptech companies i
  worked with, including companies coming out of caltech". From his Common App entry: a coalition of USC, UCLA, Caltech
  and 20+ organizations; he diligenced 35 startups. CV: a role line naming the coalition and a bullet ("Worked with
  Southern California's deep-tech startups, including companies spun out of Caltech: diligenced 35 startups, led outreach
  to 80+ founders and mapped the region's deep-tech ecosystem"); one-pager: "Worked with SoCal deep-tech startups,
  including Caltech spinouts"; site and llms.txt match. (The old "Caltech is out permanently" rule was about something
  else; this is his own ask.)
- **Since 20-21 Oct 2026 both résumés are the classic black-and-white Jake's Resume
  layout at 11pt** (Adrian: "the normal black and white latex format like the most
  famous one", "make the font the size of the actual resume"; no navy, no colour).
  Short is **2 pages**, long **4** (his pick over cutting content); `build.py`
  checks those counts and reads small-caps heads case-insensitively. The section
  is **Ventures** (was Ventures & Civic Technology). Paper titles are underlined
  links (PDF if the site hosts one, else the repo); no [pdf]/[code] tags. Long's
  Talks lists IEEE BigData HSS and ARRSI (his ask, 21 Oct); eDNAtlas is last in
  Competitions. The LAUSD Student Innovation Challenge is gone everywhere (site
  wall, résumés): don't re-add. The URTC abstract and poster are deleted. Notes
  below about navy, 8.8pt, 1/3 pages and [tags] are history.
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
  **Without Tectonic** (12 Oct, cloud session): TeX Live's `xelatex` builds the
  same layout. Run it twice (the long one's footer needs `LastPage`) with
  `SOURCE_DATE_EPOCH` set from the Updated line, then run `build.check()` on the
  result. On 12 Oct the unchanged sources gave text identical, line for line,
  to the Tectonic PDFs, and the 12 Oct PDFs were built that way.
- **Check every change:** render with `pypdfium2` and read `pdftotext -raw`.
  The one-pager has no slack: a two-line Kiddom bullet pushed it to two pages
  on 24 Sept and had to be cut back, so a new line there still means removing
  one. (On 12 Oct the one-pager took Curated to Win, title, status line and a
  two-line bullet, without cutting anything, so it has some room again; check the
  render rather than trusting this.) Since the switch to Computer Modern (26 Sept) the one-pager is 8.8/10.6
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
  right"). Since 15 Oct the site wears the same navy and Latin Modern (see
  Site theme). Two text-layer fixes come with the
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
  - Curated to Win: `[pdf]` (the site's copy of the camera-ready) and `[code]`
    (the public repo `adrian-erlikhman/curated-to-win`).
  - **CompLLM has no paper link yet.** JUDGe rejected it on 29 Sept 2026; it
    was **submitted to TACL on 2 Oct 2026 (submission 11824)** as "Most
    Apparent Self-Recognition in LLM Judges Does Not Survive a Peer Baseline",
    with Adrian, Michael Tarekegn and Philo Juang as authors (not Ryan, whom
    the paper thanks). **TACL desk-rejected it on 6 Oct** because Table 3 was
    unreadable in the PDF; Adrian replied the same day asking them to review
    the corrected PDF he had uploaded, or he'll resubmit in a later cycle. An
    arXiv version (`paper_arxiv/` in the now-public repo
    `adrian-erlikhman/self-recognition-peer-baseline`) was waiting on
    Michael's review on 6 Oct. **Adrian withdrew it from TACL on 14 Oct
    2026**, so that a separate paper built from CompLLM's open-weight panel
    can go to the archival WLLFM 2026 workshop at IEEE BigData (due 26 Oct).
    Since 15 Oct (his pick) R.03's status is "Preprint · arXiv forthcoming",
    both résumés say "Preprint, arXiv forthcoming", llms.txt and the JSON-LD
    description call it a preprint, and nothing on the site mentions TACL.
    The WLLFM paper is a different paper, so it doesn't go on this card.
    BigData's LangLLM acceptance took TACL's place in the teasers (the og
    card's lead chip, now "BEST PAPER FINALIST — IEEE BIGDATA 2026"; the
    og/twitter alt text; the hero typewriter's first line). Never "accepted"
    or NeurIPS for CompLLM.
    **Title since 11 Oct 2026: "Whose Line Is It Anyway? Auditing Self- and
    Other-Recognition in LLM Judges"** (the arXiv version's; Adrian took it
    from Philo's suggestions). The R.03 card, both résumés and llms.txt use
    it; TACL had the paper under the old title. The card's finding, summary
    and both résumés' bullets follow the arXiv abstract: 15 of 37 cases
    flagged, 8 survive the false-alarm control, 3 beat the pooled peers,
    none beats its strongest single peer (Claude 33 of 38, GPT names Claude
    on 32).
    On 7 Oct the R.03 card (R.02 until 12 Oct) took the submitted title and a summary from the
    arXiv abstract, plus a CODE + DATA link to the public repo, but Adrian
    chose to keep its old credit line (Ryan and Michael, Philo as advisor)
    until **15 Oct, when he chose each paper's real author list**: the site's
    R.03 panel and llms.txt now say Adrian Erlikhman, Michael Tarekegn, Philo
    Juang, co-first author. Both résumés match since 1 Nov (Adrian's OK). Swap the dashed "PDF · ARXIV SOON" for the arXiv
    link once it is posted (the R.03 card's `[EDIT]` comment marks the spot),
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
    LLMs", authors Adrian, Michael Tarekegn, Philo Juang). **Accepted** on
    9 Oct 2026 (email 10 Oct 03:26 UTC) for presentation at the symposium,
    17 Dec 2026, Phoenix, AZ; oral or poster not yet assigned; included in
    the proceedings; camera-ready and registration instructions to follow.
    **Best Paper Finalist** (email 10 Oct 05:31 UTC, "Best Paper Finalist
    Award: Submission SP19343"): one of 12 papers, top 16 of the 130
    accepted; presented with a certificate at the Phoenix ceremony, 17 Dec.
    Found on 15 Oct and put on the Achievements wall, llms.txt and the JSON-LD
    awards; the same day (Adrian's OK) the R.01 card got a "★ Best Paper
    Finalist" pill, an Award row and that label on its shelf tab, and both
    résumés' LangLLM status became "Best Paper Finalist, IEEE BigData 2026 HS
    Symposium" (the long one also leads Honors with it). Rebuilt with Tectonic
    from `~/bin/tectonic.exe`.
    The R.01 card says "Accepted" and "★ Best Paper Finalist" ·
    IEEE BigData 2026 High School Symposium · Phoenix, 17 Dec, both résumés
    "Best Paper Finalist, IEEE BigData 2026 HS Symposium", and the JSON-LD
    and llms.txt match. Once the format is
    assigned it can go under the long résumé's Talks, and after 17 Dec the
    card's "Phoenix, 17 Dec" should stop reading as upcoming. The R.01 summary
    follows that paper's abstract (`LangLLM/paper/main.tex`): no decline
    *detected*, n-grams more accurate within a language but the features
    transfer better, 57–70% on translations, and judges at 20–25%. The old
    "models converge, ρ = −0.96" claim is gone because Michael's revision
    showed it was a Grok effect. The `[abstract]`/`[poster]` tags and the card's
    POSTER button are still the URTC artifacts, some of whose numbers the
    paper corrected; Adrian chose to keep them (21 Sept). He also chose to
    drop LangLLM's author line everywhere, because the old one ("with Michael
    Tarekegn & Ryan Erlikhman · Advisor: Philo Juang") didn't match the
    submitted paper (Adrian, Michael, Philo). Since 15 Oct the site's R.01
    panel and llms.txt list the paper's real authors (Adrian Erlikhman,
    Michael Tarekegn, Philo Juang); both résumés still just say "Co-first
    author" (see the credit rule below). Since 29 Oct (his ask, "have the full titles") the site
  uses the paper's own title, "Interpretable Multilingual Attribution of Frontier LLMs".
- **Legatum's title carries a deliberate line break** in the long one (after
  the question mark; since 1 Nov through `\papertwo`, because `\newline` inside the underline never broke). Without it the title filled the line and
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
    or integration beyond it. The founder isn't named. **Since 15 Oct the site's
    Firstness file follows his UC activities doc ("UC Activities & Awards —
    FINAL v3", Drive)** after he asked for the founder part to be "a little
    more specific": the org line says "working directly with the founder, a
    UC Berkeley- and UCSF-affiliated neuroscientist" (still unnamed), the
    connectors reach "the tools scientists already use for literature, data
    and analysis" (no tools named; the doc itself says [NAME tools]), and the
    demos turn "the founder's LLM research" into product demos. The headline
    stat is "1:1 with the founder". The résumés keep the older wording. It leads Professional
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
    the R.03 card, the CompLLM credit in both résumés, and the AIML-LI bullet
    in the long one; the summit keynote lines and the partner logo are about
    the company, not him. Two things he saw and accepted: his own URTC poster
    lists Philo as a **co-author at UCLA**, not an advisor at Google DeepMind,
    and the CompLLM submission is anonymized, so nothing in the paper states
    the advising relationship. Since 15 Oct the R.01 and R.03 panels list
    him as an author (no affiliation), and R.01's cover image is the BigData
    paper's first page, which names him at UCLA.
  - Legatum: Co-first author with Ryan Erlikhman, no advisor (the manuscript's
    acknowledgements say no mentor supervised it). Both résumés say "In revision,
    Journal of High School Science" since 1 Nov, matching the site.
  - Ledger's role wording is fixed; see Site structure.
  - The summit is **500+ LA students** since 15 Oct 2026 (Adrian: "event is for
    500 + students", told that his Sept prep notes and aiml-initiative.org still
    say 200+; he answered "it's grown"). It lists only committed partners.
  - Research statuses track the site's R cards: update both .tex files when
    CompLLM's preprint posts (BigData accepted LangLLM on 9 Oct).
  - The portfolio paper (R.04 since 12 Oct, R.03 from 7 Oct, with Ryan) got a **conditional acceptance** from
    the Oxford Journal of Student Scholarship on 21 Sept 2026: revise, answer
    the reviewers and reformat to the journal's template within 14 days, by
    5 Oct. The card and the long résumé say "Accepted with revisions", as
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
    submitted" once it is published. The one-pager carries it since 1 Nov (see Status pass).
  - **Curated to Win** (R.02 since 12 Oct): "Curated to Win: Certifying
    Reward-Model and Judge Selection Against Evaluation-Set Curation", Adrian's
    **sole-author** paper, so its credit reads "Sole author", the one exception to
    the "Co-first author" rule (that rule was about not overclaiming, and he is
    the only author on the camera-ready). Accepted 12 Oct 2026 (OpenReview email
    09:17 UTC, paper #13) at **ARRSI**, the first Workshop on Autonomous Research
    and Recursive Self-Improvement, at AACL-IJCNLP 2026, Hengqin, China, 10 Nov
    2026. Status everywhere: "Accepted, ARRSI Workshop @ AACL-IJCNLP 2026" (the
    card's pill uses "·" and spells the name out in its `title`). Adrian can't
    travel to China; on 12 Oct he planned to ask the organizers to present
    virtually and to **withdraw if they say no**, so if he withdraws, take it off
    the card, both résumés, llms.txt and the JSON-LD (or reword) at once. Don't
    claim the ACL Anthology or proceedings until he confirms he chose archival,
    don't quote an acceptance rate, and don't add a talk or poster line until the
    format is settled. The site's PDF, `papers/curated-to-win-arrsi2026.pdf`, is
    the camera-ready uploaded to OpenReview on 2 Nov (repo commit 6e0f9cf, after a
    third council round) with only Title/Author metadata appended; linked with
    `?v=2026-11-02-cr` from index.html (3 links) and site.js (4: ⌘K, `PAPERS`, the
    big view's `D`). Bump them all if it changes. Numbers on the site, résumés and
    llms.txt come from the paper's `numbers.tex`: 12 particular RewardBench items
    (of 2,985) flip the leader, and 11 suffice under RewardBench's own scoring code
    (the 2 Nov camera-ready's addition), so never write "survives any 11" unscoped;
    RB2's leader survives any 39 under its own code (42 renormalized);
    200-item RewardBench samples: the 8% certified at 2 points are right 87% vs 43%.
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
- **aiEDU podcast (29 Oct 2026):** Christian Pinedo (aiEDU VP, External Affairs & Advocacy) introduced
  Adrian to Lange Luntao (Chief of Staff), who produces aiEDU's podcast, hosted by CEO Alex Kotran, about
  being a guest (Gmail "Connecting aiEDU <> LAUSD Student"); Adrian said yes the same day and added
  Michael. No date or format yet, so it is "invited guest" everywhere: the one-pager's AIML-LI bullet
  ("Invited by aiEDU:", shared with NCSS), the long one's Talks (`\role{aiEDU Podcast}`), the Honors board's
  NCSS tile ("NCSS 2026 · aiEDU podcast"), llms.txt, and one sentence in the Common App doc's Additional
  Info (261/300 words; he pastes it into the portal). Date it once it records; link the episode once it airs.
- **Site links:** every résumé link carries `data-cv-menu` and opens the
  `#cvMenu` picker (short, long, LaTeX source); without JS it opens the
  one-pager. The ⌘K palette and the terminal read their URLs from the picker.
  **Since 3 Nov** the hero and Contact show **Résumé · CV** as two plain links, and only the top bar's Résumé opens the
  picker ("Résumé or CV": Résumé, 2 pages; CV, 4 pages, with publications; LaTeX source). The `?v=` cache-buster is on
  **seven links** on five lines: `grep -o "v=2026-11-03-cv2" index.html | wc -l` should print 7. Bump them all whenever
  either PDF changes, to a value nobody else has used. Currently `?v=2026-11-03-cv2`.
  JSON-LD `subjectOf` and `sitemap.xml` list both PDFs.
- **Retired:** the hand-authored résumé Adrian exported on 8 Sept
  (`~/Downloads/Adrian_Erlikhman_Resume.pdf`) and the surgery pipeline that
  patched it (`scratchpad/rebuild.py`, `sortstream.py`, `finalize.py`,
  `pixdiff.py`, `order_check.py`; `tools/build_resume.py` before that). Nothing
  links that PDF any more. If Adrian sends a new hand-authored export, ask
  whether it replaces the LaTeX one-pager before touching anything.
