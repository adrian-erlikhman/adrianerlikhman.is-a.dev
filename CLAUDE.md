# Project memory — adrianerlikhman.is-a.dev (repo adrian-erlikhman/adrianerlikhman.is-a.dev)

Adrian Erlikhman's portfolio: one page, `index.html`, on GitHub Pages at **adrianerlikhman.is-a.dev** (`CNAME`). It links a
**résumé** (`resume.pdf`, 2 pages, `resume/resume-short.tex`) and a **CV** (`cv.pdf`, 4 pages, `resume/cv.tex`). College
admissions officers read it, so every fact must be true, sourced and consistent across the site and both PDFs.

**This file is the short version (split 25 Nov 2026, his "split the md").** It holds the rules that apply to every task.
The dated history, his picks and the detail live in `.claude/notes/` and are **not loaded automatically**.

## Before you change anything: read the note for that area
Grep the note for the thing you are touching (a section id, a project name, a file) and read that part. His rulings are
there, with dates; a later entry overrides an earlier one. If a note and this file disagree, this file is newer.

| Touching | Read |
|---|---|
| Anything changed since 1 Nov: miyagi, WLLFM, ARRSI materials, paper statuses, résumé clean-up | `.claude/notes/recent.md` |
| Either PDF, any `.tex`, the build, résumé wording, internships' wording, paper credits | `.claude/notes/resume.md` |
| `<head>`, title, description, JSON-LD, sitemap, robots, og card, icons, fonts, colours, `?v=` values | `.claude/notes/seo-theme-assets.md` |
| The homepage's sections, the museum (Projects), pen notes, doodles, About, Research, What's next | `.claude/notes/homepage.md` |
| Old chat-era code still in `site.js`/`home.css`, the KB, `/work/`, `/demos/` | `.claude/notes/history-chat.md` |
| Project facts and wording (Ledger, SafeJew, AIML-LI, Safe Routes, Hivemind, Monte, Citadel), logos, bout videos, honors | `.claude/notes/history-structure.md` |

**Recording new work:** add a dated entry at the top of `.claude/notes/recent.md` (what, his words, why, what is still
open). Put a rule in this file only if it applies to every task, and keep this file under 200 lines.

## Token budget (24 Nov 2026, his "create a token optimizing skill ... make this a preset for everything")
- **Always on:** follow `.claude/skills/token-saver/SKILL.md`. Small things inline; searches, long-output commands and page
  fetches to **`scout`** (haiku, low; it loads without this file, so brief it fully); specified edits and rebuilds to
  **`builder`** (sonnet, medium); one independent review or a twice-failed bug to **`reviewer`** (opus, high). Any other
  subagent or workflow `agent()` gets an explicit `model` (default `sonnet`); never dispatch a subagent on fable.
  Escalate one step at a time, effort before model, and stop after a second failure.
- Design choices, wording and anything he has ruled on stay in the main session: a cheap model must not rewrite site copy.
- Read large files in parts (`index.html`, `assets/site.js`, the notes); filter long command output; keep replies short.
- `.claude/settings.json` sets `CLAUDE_CODE_SUBAGENT_MODEL=sonnet` for unpinned subagents. The main session's model is
  his choice (25 Nov: "i dont need sonnet to be the preset"); don't set `model` there.
- `.gitignore` tracks only `.claude/skills/`, `agents/`, `notes/` and `settings.json`.
- When compacting, keep: his rulings and picks from this session, files changed, `?v=` values, what is still open.

## Deploy workflow
- Develop on the session's assigned branch.
- Per change: commit → push → open a **draft** PR → mark ready → squash-merge into `main` → resync the branch to
  `origin/main` with `--force-with-lease`.
- After a content deploy, ping IndexNow (`https://api.indexnow.org/indexnow?url=<page>&key=<key>`, the key is the root
  `7fcb94c9….txt` file) and remind him to use Request Indexing in Search Console.
- Never delete `google2a9593ca4bc38729.html` (Search Console verification) or the IndexNow key file.

## Working with Adrian
- He decides by picking from options: for a design change, mock several takes in `_mock/` and let him choose. Record
  which he picked and what he turned down.
- He rejects "AI slop": no flourishes, slogans, metaphors, category words, colon reveals or closing lines. **Copy rule:
  precise and concise. Name things, list facts, stop.**
- Never state something as done or awarded that isn't (a pilot that hasn't run, "accepted" for a paper in revision).
  When his documents disagree with each other or with a public record, ask him; don't pick.
- His UC essays are **paraphrased only**, never quoted on the site.
- Things he has reviewed and settled, **don't raise again**: the MIT recruitment line in Fencing (stays); the Philo Juang
  and Google DeepMind mentions (kept); Legatum PDF showing both authors' emails.

## The homepage now (since 2 Nov 2026)
- **First person**, plain. **One text face, Latin Modern** (self-hosted; no Google Fonts). Links are underlined navy text
  joined with " · ". Navy `#1f3a5f` on warm white `#fbfaf7`.
- **Not allowed without asking:** Geist, Plex Mono, spaced-capital labels, cards, highlighter marks, fade-ins, the dot
  grid, pill or boxed buttons, "↗" arrows, emoji, cutesy asides, anything that looks like OpenAI's branding.
- **Allowed exceptions he picked:** the pen (Shantell Sans, ballpoint blue `#2457c5`) for margin notes, polaroid captions,
  section doodles and pen underlines (`span.hl`, one per item); black handwritten phrases in About (`.hw`); **Cinzel** for
  the museum's name only.
- Order: About · Experience · Projects (the Museum of Adrian, `#work`, `#case-*`) · Research (`#papers`, `#rs-t*`) ·
  Fencing · Honors (`#record`) · Outside school (`#life`) · What's next (`#next`) · Contact. Old ids must keep landing.
- It loads `assets/notebook.css` and `assets/site.js`. `home.css` and `site.css` are unused history; large blocks of
  `site.js` (CHAT SITE, BIG VIEW, KB) skip themselves. Don't delete them unless he asks.
- **Don't bring back:** `/work/`, `/demos/`, the chat homepage, tap-to-open number "receipts", the ⌘K palette, the
  name-turns-to-dots effect, spinning logos, the Regime-Aware Portfolio Optimizer card, the Earshot and Ukraine Legatum
  papers, the LAUSD Student Innovation Challenge, prize money or project counts for SEPHacks.

## Keep in step
A fact that changes must change everywhere it appears: `index.html` (the wall label **and** its hidden `div.xd` placard),
`llms.txt`, the JSON-LD in the head, `sitemap.xml`, `resume/resume-short.tex` and `resume/cv.tex` (then rebuild both PDFs).

**Cache-busters** (bump to a value no other change has used; read `origin/main` first):
- `assets/notebook.css?v=2026-11-15-walk`, `assets/site.js?v=2026-11-20-aiml`.
- Résumé and CV links: `?v=2026-11-15-clean` on **7 links** (`grep -o "v=2026-11-15-clean" index.html | wc -l` → 7).
- `og.png?v=15` (both tags); icons `?v=2026-10-23-page`; each hosted paper PDF has its own `?v=` (see the notes).

## USA Fencing — current standings (keep in sync between site + résumés)
- **U.S. Junior (U20): No. 49** · **U.S. Senior: No. 78** · U.S. Cadet (U17): peak No. 17
- Épée · **A26 rating** · Region 4 No. 1 · Team USA · 6th at the Cadet Pan-Ams
- Public record: https://fencingtracker.com/p/100253463/Adrian-Erlikhman
- Update together: the Fencing section in `index.html`, `llms.txt`, and the fencing lines in both `.tex` files.
- Opponents in bout videos are named by school only. **"4× Junior Regional Champion" is unresolved** (his Common App says
  3×, fencingtracker shows two): leave it and ask him.

## Papers (status wording is exact)
| Paper | Status | Credit |
|---|---|---|
| LangLLM, "Interpretable Multilingual Attribution of Frontier LLMs" | Accepted, **Best Paper Finalist**, IEEE BigData 2026 High School Symposium, Phoenix, Dec. 17 | Co-first author (Adrian, Michael Tarekegn, Philo Juang) |
| "Curated to Win" | Accepted, ARRSI Workshop @ AACL-IJCNLP 2026 (virtual; presented Nov. 10) | **Sole author** |
| WLLFM, "Who Wrote This? …" | Accepted 13 Nov, WLLFM @ IEEE BigData 2026, Dec. 14-17 | Adrian, Michael Tarekegn, Philo Juang |
| Portfolio paper | **Published**, Oxford Journal of Student Scholarship, Oct 2026 | Co-first author, with Ryan Erlikhman |
| "Whose Line Is It Anyway?" | **Preprint, arXiv forthcoming** | Co-first author (Adrian, Michael, Philo) |
| Legatum robustness | **In revision**, Journal of High School Science | Co-first author, with Ryan |

- Every multi-author credit reads "Co-first author", never "First author". Site order: LangLLM, Curated to Win, WLLFM,
  portfolio, Whose Line, Legatum.
- Whose Line: never "accepted", never NeurIPS or TACL. Legatum: not "accepted" or "published" until JHSS says so.
- Curated to Win: 12 particular RewardBench items (of 2,985) flip the leader; never write "survives any 11" unscoped; no
  ACL Anthology or proceedings claim, no acceptance rate.
- WLLFM: no PDF or code link until the camera-ready (due 26 Nov); then re-render its cover and add the links.
- Numbers come from each paper's own `numbers.tex` or abstract; the notes say which.

## Fixed wording and facts
- **Ledger:** "led the build across the vision pipeline, rule engine and frontend, and wrote the two-pass vision pipeline,
  the dashboard and renewal calendar, and the static fallback". The SNAP rule is a perishable in **3 of the 4** categories.
  Claims are about the rule engine (24 test records, no false passes), never the vision model.
- **Safe Routes' 80%** is one **modeled** trip (Exposition & Normandie to LACES); say "modeled".
- **SafeJew:** funded by a JFEDLA Teen Innovation Grant; distributed through the Community Security Initiative.
- **AIML-LI:** summit is **500+ LA students**, 6 Feb 2027; show only the **nine committed partners**; the notebooks repo is
  private (link aiml-initiative.org, never the repo); no pilot numbers; "working toward" a district elective.
- **miyagi** is lowercase; Grand Prize, SanD Hacks 2026; never the SpaceX track. **Hivemind:** 1st place SEPHacks (Lemma's
  agent-monitoring track). **Monte:** 1st place, Finance track, TrojanHacks. The Citadel bot is **"dunderscore"**.
- **Firstness:** Software Engineering & ML Intern; the founder is never named; no tools or integrations named.
  **Kiddom:** ML Internship & Mentorship with Flora Xu; he is *designing* the Why Wrong evaluation: **the pilot has not
  run**. **Fjor** is "Fjor Venture Capital" (his wording), completed 2024-2026. **Lemma:** incoming intern, Summer 2027.
- National Merit: no PSAT score quoted. Class rank is out for now. Out permanently: Speech & Debate, National Honor
  Society, Cedars-Sinai, Friendship Circle LA, Mandala.
- Photo alt text names Adrian in full and nobody else.
- LinkedIn is `linkedin.com/in/adrian-erlikhman-78a262414`.

## Résumé and CV
- Both are the black-and-white Jake's Resume layout at 11pt, pure-ASCII `.tex` he can paste into Overleaf (XeLaTeX). The
  `.tex` files are the source of truth. **Résumé 2 pages, CV 4 pages**: the build refuses any other count, and neither
  has slack, so a new line usually means cutting one. Ask before cutting content.
- **One-pager: no links in the body and no bold inside a bullet** (15 Nov). The CV keeps links and bold citations; ask
  before changing it to match.
- Build: `python resume/build.py` (`short`, `cv`) needs Tectonic. Without it, run `xelatex` twice with `SOURCE_DATE_EPOCH`
  from the `%%  Updated: YYYY-MM-DD` line, then `build.check()`. Bump that line on every edit, and the CV footer's
  "Updated November 2026". `cv.pdf` is also copied to `resume-long.pdf`.
- After a rebuild: render with `pypdfium2`, read `pdftotext -raw`, bump the 7 `?v=` links.

## Dated lines to fix when the date passes
- **26 Nov:** WLLFM camera-ready; then host its PDF, re-render the cover, link code.
- **Dec. 2:** NCSS panel (San Diego). Afterwards reword everything that reads as upcoming (site Coming up, Honors,
  `llms.txt`, CV "(scheduled)").
- **Dec. 14-17:** IEEE BigData, Phoenix (LangLLM on Dec. 17, WLLFM). Afterwards the same; add Presentations lines to the
  CV once he confirms each format.
- "Right now: finishing my college applications" in What's next: drop once his applications are in.
- aiEDU podcast: "invited guest" until it records; link the episode once it airs.
- Whose Line: swap in the arXiv link and drop "forthcoming" once posted.
- aiml-initiative.org renews each 9 Nov (it lapsed in 2026 and broke links).

## Open questions for Adrian (ask, don't decide)
- "4× Junior Regional Champion" (3× or 2×?).
- Who shares co-first authorship on LangLLM and Whose Line.
- His part in Safe Routes and eDNAtlas; teammate credits on SafeJew, Ledger and Safe Routes.
- Dates for coaching, the Expo and dual enrollment; which brother is "my 11-year-old brother".
- miyagi's place in the museum (third, Claude's call) and Curated to Win's place in Research (second, Claude's call).
