# Project memory — adrianerlikhman.is-a.dev (repo adrian-erlikhman/adrianerlikhman.is-a.dev, formerly adrian-erlikhman.github.io)

Personal portfolio site (single-page `index.html`), served via GitHub Pages at
the custom domain **adrianerlikhman.is-a.dev** (see `CNAME`). `resume.pdf` is the
résumé linked from the site.

## USA Fencing — current standings (keep in sync between site + resume)
- **U.S. Junior (U20): No. 49** — current national ranking
- **U.S. Senior: No. 78** — current national ranking
- U.S. Cadet (U17): peak No. 17
- Épée · **A26 rating** · Region 4 No. 1 · Team USA
- Public record: https://fencingtracker.com/p/100253463/Adrian-Erlikhman
- Update in two places when these change:
  - Site: `index.html`, `.fence-meta` chips (Fencing section, id currently `[06]`).
  - Résumé: the Competitive Fencing bullet under LEADERSHIP & ATHLETICS, which
    carries the A rating and the peak ranking rather than the current ones.
    Edit it through `scratchpad/rebuild.py` (see Résumé below);
    `tools/build_resume.py` no longer runs.

## Résumé
- `resume.pdf` is a **hand-authored file Adrian uploads** — that PDF is the
  source of truth. It is edited by surgery, never regenerated. The generator in
  the superseded section below now dies with `KeyError: '/fzFrm1'` on this
  layout; don't run it. **A fresh export from Adrian wipes every edit here**
  unless the change is also in his source document.
- The pristine source is `~/Downloads/Adrian_Erlikhman_Resume.pdf` (50,521 bytes,
  8 Sept 2026). **Always rebuild from that**, never from an already-patched
  `resume.pdf` — each patch-on-a-patch embeds another font subset and the file
  balloons. `scratchpad/original_resume.pdf` in this repo is **not** it: that is
  the older 3 Sept upload, with different sections.
- The build scripts are committed in `scratchpad/`. Keep the intermediates in
  your session scratchpad, not the repo:
  ```
  python scratchpad/rebuild.py ~/Downloads/Adrian_Erlikhman_Resume.pdf $SCRATCH/r1.pdf
  python scratchpad/sortstream.py $SCRATCH/r1.pdf $SCRATCH/r2.pdf
  python scratchpad/finalize.py $SCRATCH/r2.pdf resume.pdf
  python scratchpad/pixdiff.py $SCRATCH/r1.pdf resume.pdf 2 3 4   # all 0: the sort is lossless
  python scratchpad/order_check.py resume.pdf                     # in order, nothing doubled
  ```
  The build is deterministic: run unchanged, it reproduces the committed
  `resume.pdf` byte for byte, so check that first. Three stages:
  1. **Text edits.** Each `EDITS` entry has a `band` — the device-space y range
     whose text blocks get stripped out of the content stream — a `first`
     baseline, and an `expect` line count the build asserts. If a rewrite wraps
     to a different number of lines, fix the wording, not the assertion: the
     layout plan depends on it. Text is 6.92 pt DejaVu Serif, 7.49 pt leading,
     wrapped at 545 pt, x 30.72 (bullet glyphs sit at x 21.75).
     A heading shares its baseline with its **right-hand date**, and stripping
     is by baseline — so redrawing a heading silently deletes the date next to
     it. Entries take an optional `right` run, `(x, font, text)`, drawn on the
     same baseline, for exactly that. Only Kiddom uses it; the Legatum heading
     has no date because its band strips the original and nothing redraws it.
     An **insertion** has `band=None` and names its `sec`. Ledger is one: two
     new lines under the competitions bullet, whose first baseline falls below
     EDUCATION's original heading, so `section_of` alone would move it with the
     wrong section. Never re-wrap an original paragraph to append to it: the
     author wrapped wider than 545 pt (the eDNAtlas line measures 558.8), so a
     re-wrap costs a line.
     There is **no white-out rectangle** — the stale blocks are removed from the
     stream, and a rect wide enough to cover a paragraph also erases the heading
     of the section below it once sections move. That is what clipped
     "HONORS, SERVICE & COURSEWORK" down to "H".
  2. **Section reorder.** Whole sections move by translating their existing text
     *and path* operators, so every glyph stays the author's own typesetting.
     Bullet markers and section rules are **vector paths, not text** — they need
     the same translation, or the dots float away from their lines. The rules
     live in a scaled space: `page_y = 792 - rule_y * 0.5808`.
  3. **Reading order.** The re-typeset lines arrive as a merged overlay, drawn
     after all of the original and under a different CTM. `sortstream.py` lifts
     every text block to the top level in one sequence sorted by baseline, each
     inside `q … Q` with the **exact chain of `cm` operators** it was drawn
     under and the graphics state it inherited, so the render does not change.
     Before 13 Sept it sorted blocks only within their own CTM space, which
     left every re-typeset paragraph after TECHNICAL SKILLS in the stream, and
     that is how pypdf, PDFBox and copy-paste read the live résumé. Don't move a
     block across spaces with a single inverse matrix instead: that lands it
     ~1e-5 pt off, and a baseline exactly on a half pixel (the third Legatum
     line, at render scale 3) then shifts a whole pixel.
- **Line budget:** the page ends at 45.02 pt against the 45 pt floor in
  `rebuild.py`. There is no spare line; adding one means taking one out.
- `finalize.py` deflates the content streams at level 9; the file lands near
  130 KB.
- Kiddom is a **Machine Learning Internship** on both the site and the résumé —
  it used to read "Data Science Mentorship" on the résumé only. Keep them in
  step: site card is in Experience `[02]`, résumé entry is last under
  Professional Experience.
- The Legatum entry follows the 13 Sept 2026 JHSS revision: **First Author ·
  Co-author: Ryan Erlikhman**, and no advisor, because the manuscript's
  acknowledgements say no mentor supervised it (Abdulla Kerimov mentored the
  separate Ukraine paper, R.03 on the site). "Accepted, Journal of High School
  Science" is Adrian's wording; keep it until he changes it.
- Ledger closes the competitions bullet, and VISION HACK also sits in the first
  HONORS line, next to Decode the Ocean.
- **Section order on the page:** Professional Experience · Ventures & Civic
  Technology · Research · Selected Technical Projects · Education · Leadership
  & Athletics · Honors, Service & Coursework · Technical Skills.
- Standing content notes: class rank is out of EDUCATION and HONORS
  **temporarily** — Adrian wants it back later. Speech & Debate, National Honor
  Society, Cedars-Sinai and Friendship Circle LA are out permanently.
- Always render with `pypdfium2` **and** walk the text layer before committing:
  check that it looks right, that no heading is clipped, that bullets sit on
  their lines, and that the text reads in order with nothing doubled.
  `order_check.py` and `pdftotext -raw` read in stream order, as a parser does;
  plain `pdftotext` sorts by position and hides an ordering bug.
- The site links the PDF with a cache-busting query. **Bump it in all four
  places in `index.html` whenever the PDF changes**, or browsers keep serving
  the old file. Currently `resume.pdf?v=2026-09f`.

### (superseded) Résumé generation
- `resume.pdf` is patched in place by `tools/build_resume.py`:
  `python tools/build_resume.py resume.pdf`. Needs `reportlab` + `pypdf`; the
  DejaVu Serif faces come from the ones matplotlib ships (`mpl-data/fonts/ttf`).
- **It is idempotent.** It always redraws from the `COMPLLM` / `PROJECTS` /
  `LEADERSHIP` / `SKILLS` / `AWARDS` constants at the top of the file, so
  re-running is safe. Edit those constants; never hand-edit the PDF.
- Page 2 is patched by white-boxing two bands (the CompLLM spill lines at the
  top, and everything from the SELECTED TECHNICAL PROJECTS list down through
  AWARDS & HONORS), **stripping the stale text out of the content stream** so
  nothing hidden survives in the text layer, then redrawing.
- Page 1 needs more care. PR #23 removed the Mandala entry by showing one shared
  `/fullpage` form **twice** — clipped to y ≥ 181 unshifted, and to y ≤ 129.7
  lifted by 51.3 — so the band between the cuts falls away. It renders right but
  puts every glyph in the content twice, and text extraction read both copies
  interleaved, which made the file useless to a resume parser. The script now
  rebuilds page 1 as two forms (`/srTop`, `/srBot`) that each carry only the
  text they show. **Anything below the RESEARCH heading renders 51.3 pt higher
  than its authored baseline** — that is what `SHIFT` is for.
- Layout is asserted, not hoped for: a bullet that does not wrap to exactly two
  lines aborts the build, as does a page-1 form shift that is not 51.3. Keep
  replacement text within the same line count.
- Render with `pypdfium2` and re-run `pdftotext` before committing — check both
  that it looks right and that the text layer reads in order with no doubling.

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
  the site, "CD 9 Champion, U18" on the résumé, and the badge says 1st place.
  As of 13 Sept Devpost had posted neither winners nor its project gallery;
  when it does, confirm the label and add the Devpost project link to the
  banner. Role wording is Adrian's call: led the build across the vision
  pipeline, rule engine and frontend, and wrote the two-pass vision pipeline,
  the dashboard and renewal calendar, and the static fallback. Keep every
  mention to exactly that. The SNAP stocking rule Ledger scores against is 7
  varieties and 21 units per category with a perishable in **3 of the 4**
  categories — not in every category.
- **Research R.04**, the Legatum robustness paper, links
  `papers/legatum-robustness-audit.pdf?v=2026-09-13` from three places: the
  card, the ⌘K palette and the terminal's `PAPERS` map. Bump the query in all
  three whenever the PDF changes. The PDF is the 13 Sept 2026 JHSS revision
  exactly as Adrian exported it; its title page lists both authors' emails, and
  he chose to publish it that way. Its status line stays "Accepted with
  revisions · Journal of High School Science · in revision" until he says
  otherwise.
