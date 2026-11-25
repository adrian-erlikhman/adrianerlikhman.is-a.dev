# SEO, site theme, og card, icons, shared assets

Moved verbatim from CLAUDE.md on 25 Nov 2026. Not loaded automatically: grep or read the part you need.

## SEO (5 Oct 2026)
- **Search result pass (7 Nov 2026; his "boost my site to first ... refine what it looks like here").** Search Console's URL
  Inspection showed the homepage had **not been crawled since 6 Oct**, with no referring page detected, so nothing after that
  had reached Google (the 7 and 8 Oct description, the chat, the notebook). The "hi, i'm adrian Adrian Erlikhman" snippet
  and the climbing photos were that month-old copy; the 8 Oct note below about Google "ignoring" the description was really
  this. He picked (of three): title just **"Adrian Erlikhman"**; description "I'm Adrian Erlikhman, a high school senior in
  Los Angeles. I research language models, build software and fence épée for Team USA." (same in og and twitter; the title
  and description notes below are history). `data-nosnippet` moved off the h1 (Google supports it only on span, div and
  section) onto `section#about`, and is on `#intro` (its hidden name made the doubled "Adrian Erlikhman") and `#offline`.
  ProfilePage has `primaryImageOfPage` (the headshot; og.png would otherwise be a thumbnail candidate); WebSite's
  alternateName no longer lists the domain, which Google was showing as the site name; the sitemap also lists the three
  on-page crops; the preload is the real first image. Rank that day: Google #1 for his name (28-day average 2.9), Bing about
  4th with a copy still saying "under review at NeurIPS", DuckDuckGo 3rd. He OK'd a Request Indexing and a Temporary Removal
  of the `/life-*` photos after this deploy. **After a content deploy, ping IndexNow and use Request Indexing: Google does
  not come back on its own.** Inbound links are the remaining lever (safejew.org and aiml-initiative.org name him but
  don't link here). Pages' Enforce HTTPS was still off, so plain http answers 200.
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
  On 8 Oct Google was still ignoring it and quoting the hero ("hi, i'm adrian
  Adrian Erlikhman ... i fence épée for team usa"), because the description
  didn't contain the name people search. So the meta description (not og or
  twitter) now opens "Adrian Erlikhman: ", and the hero's h1 and story carry
  `data-nosnippet`, which keeps them out of snippets without affecting
  ranking.
- **Images in the search result (Adrian, 7 Oct):** he wants his headshot, a
  fencing photo and a Startup School photo, not the climbing and hiking
  shots Google had picked. Google chooses these itself, so the site steers it
  three ways: the Person JSON-LD `image` lists `adrian.jpg`, `fencing-1.jpg`
  and `img/ycs/yc-sign.jpg`; the sitemap's homepage images are those same three; and
  `robots.txt` blocks Googlebot-Image from the seven outdoor `life-*.jpg`
  photos and `img/ycs/main-stage.jpg` (he isn't in it). Delete those robots lines
  to let them back into image search.
- **Icons and the top-left mark are the page mark since 23 Oct 2026.** Adrian called the [a/e] squircle
  (#234) "booty" and off-theme, picked E (italic a with a subscript e) and G (a dog-eared page) from eight
  Latin Modern takes (`_mock/logo-paper.html`), then take 1 of four combinations (`_mock/logo-eg.html`): a white
  page outlined in navy with a<sub>e</sub> on it in Latin Modern italic. `python tools/make_icons.py` writes
  `favicon.svg` (outlined paths), `img/logos/ae-mark.svg`, `favicon.ico`, `favicon-48/96.png`,
  `icon-192/512.png` (transparent) and `apple-touch-icon.png` (on `#fbfaf7`). The head links carry
  `?v=2026-10-23-page`; bump it when the icons change. The bar shows the page and "Adrian Erlikhman" in
  Latin Modern (`.ae-mark .pgm`, `.nm.pgn`); the `~/ae` prompt and its Reenie Beanie name are gone. Earlier
  marks (the `[ ae ]` block, the squircle) are history. **Since 3 Nov (late) the notebook homepage's top bar shows
  only the page mark** (`a.brand` > `img/logos/ae-mark.svg`, 30px, aria-label "Adrian Erlikhman, back to top"):
  Adrian disliked the bar's "Adrian Erlikhman" sitting over the big one and picked **A** of four takes
  (`_mock/top-a..d.html`: the page mark, a<sub>e</sub> without the page, a pen signature, nothing).
- **LinkedIn is `linkedin.com/in/adrian-erlikhman-78a262414`** (8 Oct). Until
  then the site, both résumés, llms.txt, the ⌘K palette and the GitHub README
  linked `…-55489620b`, a separate, empty "Adrian Erlikhman" account (no photo,
  no headline). The real profile, the one Adrian is signed in to, lists the
  site as its website. The GitHub profile's website field has been set to the
  site since 8 Oct.
- **Google Search Console**: URL-prefix property for
  `https://adrianerlikhman.is-a.dev/`, verified by the root file
  `google2a9593ca4bc38729.html` (6 Oct). Never delete it: Google drops the
  verification. A domain property can't work: the is-a.dev record is a CNAME,
  which can't sit beside a TXT record.

## Site theme (15 Oct 2026)
- Adrian "officially" didn't like the cream and rust any more and asked for
  "maybe latex font". He picked **B** of four previews on the live homepage:
  the résumés' **navy** (`--acc:#1f3a5f`) on warm white (`--bg:#fbfaf7`), with
  **Latin Modern Roman** for headings and text and **IBM Plex Mono kept for
  the small labels** (over all-LaTeX, cobalt on grey, and forest green).
- The tokens are in `site.css`'s `[data-theme="light"]` block; every serif
  heading goes through `--serif` (it was Fraunces, written into ~20 rules),
  and `--disp`/`--sans` point at it. Latin Modern's bold is wide, so the big
  heads' tracking is reset to -.01em at the end of site.css.
- Fonts are self-hosted: `fonts/lmroman10-{regular,bold,bolditalic}.woff2`
  and `lmroman9-italic.woff2` (no 10pt italic in the bundle), made from the
  Tectonic cache's OTFs with fontTools, subset to Latin, Greek and symbols
  (~33 KB each). GUST font licence. Google Fonts now loads only Plex Mono.
- The demos' dark panels (`.guess`, the lab) went from warm brown to deep
  navy with a light-blue accent (`--g-acc:#9db8e0`); wrong answers stay red.
- **`og.png` is the commit grid since 3 Nov (later)** (`?v=15`): `tools/og-card.html` (`python tools/make_og.py`, local
  fonts only). A contribution-style heatmap, Mar to 3 Nov, whose darkest cells spell ADRIAN in a 5x7 font (the other cells
  are seeded noise: no counts, no GitHub logo), over "Adrian Erlikhman" in navy Latin Modern bold and "ML/NLP research ·
  software · Team USA épée"; the URL and "Los Angeles" small in LM Mono. Adrian turned down the LaTeX card and every other
  take ("i dont like any of the placcards"), was shown six more (`_mock/og4.html`: swarm, ASCII headshot, neofetch,
  blueprint, player select, commit grid), said "A or F", and Claude shipped F from the refined pair (`_mock/og5/`,
  sheet `_mock/og-shots/og5-options.png`) because it reads best at phone size. **A, the swarm (his loading screen's
  dots), is ready in `_mock/og5/a.html`** if he asks for it. The og and twitter alt text describe the grid.
- Before that (3 Nov, morning), **`og.png` was the LaTeX card** (`?v=14`): `tools/og-card.html`, rendered by `python tools/make_og.py`. A dark
  editor on the left holds a short LaTeX file (`\documentclass{senior}`, `\usepackage{nlp, epee}`, `\title{Adrian
  Erlikhman}`, `\date{Class of 2027}`, `\research{5} % papers`, `\hackathons{4} % wins`, `\fencing{Team USA}`) over a
  "compiled" bar; on the right, the title page it compiles to (name, "Los Angeles · Class of 2027", a one-line abstract:
  ML/NLP researcher and Team USA fencer, five papers, four hackathon wins, A26). Latin Modern Roman and Mono only; the
  Mono OTF sits in the gitignored `tools/fonts/` (copied from the Tectonic cache). Why: on 2 Nov evening Adrian called the
  scrapbook card and four plain takes (`_mock/og2.html`) "really basic ... i dont want ai slop, but i want something techy
  and unique and quirky". Of four techy takes in `_mock/og3.html` (A LaTeX, B a fencing scoring box at 15-14 with his green
  lamp, C a receipt on Ledger's blue, D a chip datasheet "AE-2027"), Claude shipped A overnight while he slept; **he has
  not picked it yet**, so swap in another take if he asks. The og and twitter alt text describe the card.
- Before that, **`og.png` was the scrapbook** (2 Nov, `?v=13`; Adrian: the old card "is not great lets make some cool ass
  unique shit"; he picked **B** of three takes in `_mock/og.html`, over A, a still of the chat, and C, a paper's title
  page). Its source is `tools/og-card.html`; `python tools/make_og.py` serves the repo and screenshots it with headless
  Chrome at 1200x630 (needs the network for Google Fonts). On the site's warm white and dot grid: "LOS ANGELES,
  CALIFORNIA" in Plex Mono, the name in navy Latin Modern bold, three notes in the welcome's ballpoint blue (Shantell
  Sans), "i do ML/NLP research", "i build things: 4× hackathon winner", "i fence épée for Team USA", with a pen arrow to a
  taped print of the Pan-Ams lunge (`img/about/lunge-wide.webp`), and the headshot as the welcome's polaroid, "hi, i'm
  adrian!". The og and twitter alt text describe it; change them with it. **Before 2 Nov** (history, drawn with PIL; the
  OTFs for it sit in the gitignored `tools/fonts/`): since 15 Oct
  (Adrian picked C of three takes, after asking for no bubbles and "a cool
  picture"): his Team USA lunge at the Pan-Ams (`fencing-1.jpg`) across the
  card under a navy fade from the left; "LOS ANGELES, CALIFORNIA" on top
  (16 Oct, his pick of three: no dash, no coordinates, not "high school
  senior"); the name in white Latin Modern; his meta-description words as
  three lines, each with a light-blue marker, and nothing else (the credential
  lines came off on 16 Oct: "just do the researcher intern stuff"). Earlier
  the same day it was chips, then chips beside his headshot. Chat apps show a
  still, so no animation. Bump
  `?v=` on both tags when it changes; chat apps cache the first preview of a
  URL. Never "accepted" alone for the two journal papers. The 404 page keeps
  its own dark neon design.

## Shared assets
- **Since 2 Nov the homepage loads `assets/notebook.css`** (see Homepage: plain, first person). It holds the new
  design plus copies of the rules for the intro, the maintenance screen, the résumé picker, ⌘K and toasts. `home.css`
  (the chat, 28 Oct to 2 Nov) and `site.css` stay in the repo as history; nothing loads them. `site.js` is still shared:
  its NOTEBOOK block (the photo viewer and paper reader) runs the homepage, while CHAT SITE and BIG VIEW find no `.cg` or
  `#dv` and skip. Both links carry `?v=` (currently notebook.css and site.js both `2026-11-15-walk`).
- 28 Oct to 2 Nov the homepage loaded `assets/home.css` (the chat), not `site.css`.
- Since 21 Sept the site's styles and scripts live in `assets/site.css` and
  `assets/site.js`, shared by every page that uses the house design; the
  JSON-LD and the code-preview samples stay inline in the page that needs them.
  Each page links them with `?v=`; bump it on every page when either file
  changes, to a value **no other change has used**: read origin/main's value
  first and don't just increment a letter. On 15 Oct two sessions both bumped
  to `2026-10-15e` (#151, then #152), so browsers that had #151's stylesheet
  never fetched #152's rules and Experience rendered unstyled; fixed with
  `2026-10-15-xf`. Every script block checks its elements exist, and URLs in the
  script are root-absolute (`/papers/…`), so a page without an overlay or
  section just skips it.
