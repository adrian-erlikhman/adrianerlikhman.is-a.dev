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
  - Résumé: `tools/build_resume.py` → the `USA Fencing` entry in the `AWARDS`
    list, then regenerate (see below).

## Résumé
- `resume.pdf` is a **hand-authored file Adrian uploads** — that PDF is the
  source of truth. It is edited by surgery, never regenerated. The generator in
  the superseded section below now dies with `KeyError: '/fzFrm1'` on this
  layout; don't run it. **A fresh export from Adrian wipes every edit here**
  unless the change is also in his source document.
- The pristine source is `~/Downloads/Adrian_Erlikhman_Resume.pdf` (50 KB).
  **Always rebuild from that**, never from an already-patched `resume.pdf` —
  each patch-on-a-patch embeds another font subset and the file balloons.
- The working scripts are `scratchpad/rebuild.py` and `scratchpad/sortstream.py`
  (session scratch; re-create from this note if they are gone). Three stages:
  1. **Text edits.** Each `EDITS` entry has a `band` — the device-space y range
     whose text blocks get stripped out of the content stream — a `first`
     baseline, and an `expect` line count the build asserts. If a rewrite wraps
     to a different number of lines, fix the wording, not the assertion: the
     layout plan depends on it. Text is 6.92 pt DejaVu Serif, 7.49 pt leading,
     wrapped at 545 pt, x 30.72 (bullet glyphs sit at x 21.75).
     A heading shares its baseline with its **right-hand date**, and stripping
     is by baseline — so redrawing a heading silently deletes the date next to
     it. Entries take an optional `right` run, `(x, font, text)`, drawn on the
     same baseline, for exactly that. Kiddom is the only entry that needs it.
     There is **no white-out rectangle** — the stale blocks are removed from the
     stream, and a rect wide enough to cover a paragraph also erases the heading
     of the section below it once sections move. That is what clipped
     "HONORS, SERVICE & COURSEWORK" down to "H".
  2. **Section reorder.** Whole sections move by translating their existing text
     *and path* operators, so every glyph stays the author's own typesetting.
     Bullet markers and section rules are **vector paths, not text** — they need
     the same translation, or the dots float away from their lines. The rules
     live in a scaled space: `page_y = 792 - rule_y * 0.5808`.
  3. **Reading order.** `sortstream.py` re-sorts text blocks in the stream by
     baseline so a résumé parser walking it sees the sections in the order they
     appear. A block may only trade places with one drawn under the **same
     CTM** — the page mixes an upright space with the original's flipped form
     space, and a block moved across that line renders upside down.
- Finish with `compress_content_streams(level=9)`; the file lands near 128 KB.
- Kiddom is a **Machine Learning Internship** on both the site and the résumé —
  it used to read "Data Science Mentorship" on the résumé only. Keep them in
  step: site card is in Experience `[02]`, résumé entry is last under
  Professional Experience.
- **Section order on the page:** Professional Experience · Ventures & Civic
  Technology · Research · Selected Technical Projects · Education · Leadership
  & Athletics · Honors, Service & Coursework · Technical Skills.
- Standing content notes: class rank is out of EDUCATION and HONORS
  **temporarily** — Adrian wants it back later. Speech & Debate, National Honor
  Society, Cedars-Sinai and Friendship Circle LA are out permanently.
- Always render with `pypdfium2` **and** re-extract the text before committing:
  check that it looks right, that no heading is clipped, that bullets sit on
  their lines, and that the text layer reads in order with nothing doubled.
- The site links the PDF with a cache-busting query. **Bump it in all four
  places in `index.html` whenever the PDF changes**, or browsers keep serving
  the old file. Currently `resume.pdf?v=2026-09e`.

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
- Two flagship `.dist-flag` banners open Achievements: eDNAtlas (1st, Decode the
  Ocean) and Safe Routes to School (3rd, Code for Transportation). Both also
  have a Projects card — eDNAtlas at P.06, Safe Routes at P.07 — and are
  intentionally **not** in Experience.
- The Safe Routes banner uses the `.df-multi` variant (a `div`, not an `a`) so it
  can carry two links. The second is a `.df-soon` placeholder waiting on the
  Young Coders' Sphere write-up; swap it for a real `<a>` when that is posted.
