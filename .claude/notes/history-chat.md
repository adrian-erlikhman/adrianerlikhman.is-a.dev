# History: the chat homepage (28 Oct to 2 Nov 2026), /work/ and /demos/

Moved verbatim from CLAUDE.md on 25 Nov 2026. Not loaded automatically: grep or read the part you need.

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
  Citadel bot's name ("dunderscore", team of three), StandWithUs on the JSU
  assembly, the AP split (11 taken, 6 this year), and one Academics row each
  for Kaggle x Google, the Deep Learning Specialization and NVIDIA DLI. The
  DeepLearning.AI and NVIDIA marks were tried on those rows and dropped as
  muddy at 15px. The Selected work caption under the heading is gone too
  (Adrian: "not needed").
- A `#section` link from another page (`/#papers`) skips the intro and lands on
  the section (`HASH_TARGET` in site.js); a plain visit still plays the intro.

## /demos/ — removed 16 Oct
- Adrian, the day after Walk or ride? went up as its fifth demo: "delete the fuck out of my demo page.
  i rly dont like it". The page (guess the model, CompLLM's classifier, the Ledger walkthrough, the
  AIML-LI Unit 1 lab, Walk or ride?) is gone with its data (`assets/guess-samples.json`,
  `stylometry-model.json`, `ledger-walkthrough.json`, `aiml-minilab.json`, `img/ledger/`), its builder
  `tools/build_demo_data.py`, its JS blocks, its sitemap and llms.txt entries, the ⌘K entry, the
  terminal's `demo` command, and every homepage link into it (R.01 and R.03's try buttons, the AIML-LI,
  Ledger and Safe Routes card links, the 80% receipt's link). Older demo CSS still sits unused in
  site.css. Git history has all of it (last commit with the page: ae30c60). Notes elsewhere in this
  file that mention /demos/ are history; don't bring any of it back unless he asks.

## Homepage redesign (28 Oct 2026; the chat, history)
Adrian rejected the paper-page, newspaper, LaTeX-editor, contents-page and "bubbly" sidebar takes ("mid... AI slop"),
then asked to emulate **Fuser** (fuser.studio) "to make it more unique", **but not its black background**: Fuser's
structure in his warm white + navy. He reviewed it as a private artifact mock (`_mock/landing6.html`) and said push it,
with "a lot of updates" still to come. What shipped:
- **Fonts:** Latin Modern (`'LM Roman'`) for display and titles, **Geist** (Google Fonts) for reading, nav and buttons
  ("some of the fonts are kinda mid"), Plex Mono only in the prompt and small meta.
- **Kept on his word:** the swarm intro ("i like the loading page"), the MIT "In active recruitment" bar with the Full
  USA Fencing record button (back from #142: "add back the mit stuff"), the Fencing section's own content (ranks, A26
  line, all results, both photos) and the three bouts as inline players ("keep the fencing videos").
- **Top:** a floating rounded nav (About, Experience, Research, Work, Fencing, Achievements, Résumé). The Fuser
  announcement bar went the same evening ("delete this").
- **No emoji and no pills anywhere** (Adrian, 28 Oct: "i dont like any weird ass emojis and bubble stuff"): no ✦ or ★,
  buttons are 8px-radius rectangles (`.btn`, `.btn.solid`), statuses are plain navy text.
- **The whole homepage is the chat since 29 Oct (evening)** (Adrian, the day the chat hero shipped: "what if it is like only
  the chatgpt. it doenst make sense for it do be both. jksut have eveyrt seciton be a par tof the chatgpt"). There is no
  nav, logo strip band, section list or footer any more: the page is one full-screen `section.cg#top` (body doesn't
  scroll; the thread does). **Every section is a conversation** (`article.cg-conv[data-conv]`) in the sidebar's Chats:
  About me ("Who are you?"), Internships ("Where have you interned?"), Research · 5 papers, What I've built, Team USA
  épée, Honors ("What else stands out?"), Contact. Each is the visitor's question in a bubble, then the answer: an
  opening line (`.cg-say`, streamed word by word; About's are his own three paragraphs), then the section's **own
  markup, unchanged, with its old id** (`.cg-blk#about`, `#experience`, `#papers`, `#work`, `#fencing`, `#record`,
  `#contact`, and inside them `#rs-t*`, `#case-*`, `#xp-*`, `#bouts`), then follow-up chips and copy/thumbs/again icons.
  The logo strip sits at the end of About under "Interned, published and selected at"; Contact's card lost its "Let's
  talk" column (the lead line says it). After the intro, "Who are you?" types itself in and About plays (Thinking, then
  the blocks build in, list items staggered); every other conversation plays the first time it is opened, from the
  sidebar, the "Adrian ⌄" menu (now "Ask about"), the chips, the logo or the account chip. New chat goes back to the
  empty screen. **Links to an old id open its conversation and scroll to it** (in-page `#…` links, a landing hash like
  `/#rs-t2`, and the ⌘K palette through `window.cgOpen`), so llms.txt, the sitemap and old links still work. Typed
  questions: contact words open Contact; a project or paper by name gets a short reply card from the big view's `D`
  (it appends to the open conversation); a topic opens its conversation; anything else gets "I can answer…" with chips.
  Without JS every conversation shows, one after another (the static `chatting` class). Inside an answer the sections
  are compacted to the 820px column and speak Geist (`.cg-a{--serif:var(--sans)}`); `.cg .btn` restores the button style
  that the chat's button reset would strip. Styles at the end of home.css; site.js CHAT SITE (the CHAT HERO script is
  gone). The section notes below still hold for content and wording; their layout notes are history.
  **No line under the composer** (Adrian, 29 Oct: remove the "© 2026 Adrian Erlikhman · Los Angeles · every answer here
  is my own work" line). He is now going through the conversations one at a time.
  **Third person and typed answers (29 Oct, later).** Adrian: "be like Adrian is this, right, switch the tense. maybe it
  should have photos". The chat now speaks about him: the questions are "Who is Adrian?", "Where has he interned?", "What
  has he built?", "Does he really fence for Team USA?", "How can I reach him?"; the sidebar says About Adrian and What
  he's built; About is his three paragraphs turned to "Adrian is... He builds..." (since 1 Nov, his pick of three takes in `_mock/about.html`: **take B**, each paragraph naming the work: SafeJew, Safe Routes and AIML-LI; both papers with their results; the four internships by kind; épée for Team USA and No. 49 among U.S. juniors; his eating/puzzles/outdoors/napping line kept), under a ChatGPT-style photo grid
  (`.cg-imgs`; since 30 Oct, his ask, "i like the fencing. then headshot, maybe the YC. choose two more good ones. the
  climbing photo is fine": the Pan-Ams lunge large, then the headshot, the YC sign, the podium with his medal, climbing;
  cycling is out; a click opens `.cg-lb`; since 2 Nov three close crops in a row, see the admissions pass). Internships are in the third person since 30 Oct (see the refine pass). **"Type literally anything"**: he
  chose written answers over a live AI model. site.js `KB` holds ~90 answers in the third person, every fact from
  llms.txt or the page (GPA, SAT, APs and dual enrollment, school, age not listed, hobbies with photos, brother, JSU,
  fields, MIT, a summary, what's next, each internship, each paper and project with a card that opens the big view, the
  paper list, co-authors, skills, hackathons, rankings, rating, Team USA, club, results, YC, leadership, contact, "is
  this AI" (no model, written ahead of time), greetings). Scoring: weight 3 for a fact, 2 for a whole topic (which opens
  its conversation instead), ties to the earlier entry; under 2 it says it doesn't have that one and gives his email.
  A question typed on the empty screen starts its own thread (`#c-ask`, cleared by New chat); typed inside a
  conversation it follows on there. Add an answer rather than stretching a pattern, and run a batch of questions
  through `best(norm(q))` in node after any change: "about" contains "bout", "leaderboard" contains "leader".
  **Honors and Fencing (30 Oct).** He asked for both to change ("you just copied the page, make it a little better
  integrated") and picked from `_mock/hf.html`: **Honors A**, one ranked table (`.cg-tb.cg-hon`: honor with its mark,
  result in navy, how selective; most selective first; rows stack on phones; National Merit has no mark, its lamp reads
  as a black bar), over sections, cards and a spotlight; **Fencing A**, one answer (a lead with Pan-Ams 6th, A26, MIT and
  the club; `.cg-media` with the six-second touch looping large and the two photos; "Where he ranks" as a table; all ten
  results as a list; "Watch him fence" (`#bouts`) as three video cards, `[data-video]`, that play in the photo viewer
  with sound; a fencingtracker source chip and an MIT badge), over a three-question back-and-forth.
  **Underlines (30 Oct, "way too many underlines in the research section ... literally everything"):** the chat
  underlines links, and a paper row is one big link, so every line of it was underlined. Links that wrap a whole row
  or card (`.pl`, `.wg`, `.tm`, `.cc`, `.cg-vids`, `.cg-src`, `.btn`) now carry none; only links inside a sentence do.
  **Research (30 Oct, later; Adrian: "like when you clicked on the research in the older version of the site. it should
  allow them to open the whole paper and the format you have it in is sucky ... dont say 5 papers, just say research").**
  The sidebar and the "Adrian" menu say just "Research". The answer is the big view's layout inline, all five papers in a
  column (he dislikes clicking to see the next one, 28 Oct): `.cg-pp` panels with the first page on the navy dot grid
  and, in Latin Modern, the title, venue, the result over its venue with the navy rule, the question-and-answer
  sentence, How, Authors and the buttons. Ids `#rs-t1..5` are on the panels. **The words are site.js BIG VIEW `D`'s**:
  the panels are static HTML built from `D` by a scratch script (dump `D` with node, write `.cg-pps`), so edit `D` and
  the panel together. "Read the paper" and the first page open **the whole PDF in `.cg-rd`**, a reader over the page
  using the browser's own PDF viewer (title, "Open in a new tab", ×, Esc); it takes every `/papers/*.pdf` link,
  including the big view's. Under 760px, where `navigator.pdfViewerEnabled` is false, or on ctrl/cmd-click, the PDF
  opens in a new tab instead. Whose Line has no hosted PDF (arXiv forthcoming), so its page and button go to the
  repo. Headless Chrome can't paint a PDF inside a frame: test the reader's state, not its pixels.
  **Since the same night Research is a list** (Adrian on those panels: "looks like booty"; he picked **A of three**,
  `_mock/rs.html?rtake=a|b|c`, over B, cards like the builds, and C, the panels restyled). One bordered list in the
  chat's Geist (`.rl`, `.rl-r`): per paper the first page, the result in navy and its venue, the title, the finding
  (`D.t`) and the authors, so all five read without a click. A row opens the paper in the canvas (BIG VIEW, as builds
  do; the row gets a dark left bar): full title, result, finding, How, Authors, "Read the paper" into `.cg-rd`. Rows
  keep `#rs-t1..5`; without JS a row opens the PDF (Whose Line: the repo); the reader leaves `[data-dv]` rows to the
  canvas. The answer opens "Five papers: a Best Paper Finalist at IEEE BigData, a sole-author paper at an AACL-IJCNLP
  workshop, one published in a student journal, one in revision at another, and a preprint." (1 Nov) Rows are still written from `D` by a
  scratch script (node evals `D`, Python writes `.rl`): change `D`, then the row. The `.cg-pp` notes above are history.
  **Since later that night Research is question-first cards** (Adrian on the list: "hard to read each paper"; of
  three more takes, D chat answer, E question first, F result first, he said "more like e, but do the actual questions
  and make the shit really nice"). One card per paper (`.rqs`, `.rq`): the venue's mark (IEEE, AACL-IJCNLP, OJSS's O;
  JHSS's is muddy at 17px and Whose Line has none), the result in navy, the venue on its own line, the full title, a
  grey line with co-authors and scale, the first page at the right (opens the PDF), then **the paper's own research
  questions**, numbered, each answered verdict first in bold ("Yes.", "Partly.", "No decline found"), then the buttons.
  LangLLM's six are its RQ1-RQ6 (intro) answered from its RQ summary table; Curated to Win, Whose Line, the portfolio
  paper and Legatum have three or four each, taken from their abstracts and introductions, with their own numbers.
  The questions live only in index.html (not in `D`); when a paper changes, update the card, `D` and llms.txt. Ids
  `#rs-t1..5` are on the cards; a paper opens in the canvas only from a typed question now. The `.rl` notes are history.
  **Since 30 Oct (late) Research asks which paper** (Adrian: "ask which paper they want to see, give them the five
  options. and then present it ... akin to how chat would do it, with the options to open the paper"). The answer ends
  "Which one do you want to see?" over a list of five (`.pk`: first page, full title, a plain question, result · venue).
  A pick asks for it as the visitor's next question ("Tell me about Curated to Win") and the chat answers in its own
  style (`.pa`): result and venue, title, authors, a plain-language paragraph, "What the paper asks" with the same
  research questions as a numbered list, then the paper and its code as file tiles (`.pa-f`; the PDF opens in the reader;
  Whose Line's PDF tile is a dashed "coming soon", marked `[EDIT]`), then the other four papers as chips. The answers
  wait in `.pas` (hidden with JS) and are moved into the thread when picked (site.js CHAT SITE `pickPaper`), so
  `#rs-t1..5` stay unique and a link to one picks it at once; picked twice, the thread scrolls back. Without JS all five
  show under the list. The `.rq` card notes above are history; the questions and numbers carried over unchanged.
- **The hero is a chat app since 29 Oct** (Adrian: "make the landing page look exactly like chatgpt. so when they type in
  the stuff it is like chatgpt"; on the mock, `_mock/chat.html`: "this is really cool ... this is the way to go"). The first
  screen (`section.cg#top`, full viewport, before the site nav, which now sticks once you scroll past it) is ChatGPT's
  layout: grey sidebar (New chat, Search chats, Résumé, six "chats", his photo and name as the account chip), "Adrian ⌄"
  as the model picker (a Jump-to menu of the sections), Email and Résumé pills, the empty screen "What do you want to
  know about Adrian?", the rounded "Ask anything" composer with a black send button, six suggestion chips, and under it
  "Every answer links to where it comes from. Scroll down for the whole site." **No OpenAI logo, name or marks**: his
  page mark and "Adrian" instead (a copy of their branding on an admissions site would read as a knockoff).
  site.js CHAT HERO: after the intro, it types six questions in turn (Who is Adrian? · What has Adrian built? · research
  · fencing · internships · What else stands out?), each with a "Thinking" shimmer, a word-by-word streamed answer
  (paragraphs, lists, three screenshot cards, a Sources row of pills to the sections, then copy/thumbs/again icons). It
  runs only while the hero is on screen and stops for good on any click, tap or keystroke, cutting off a reply mid-stream.
  Cards with a big view open it (`BIG.open`; BIG now exposes `D`). A typed question gets: contact for email/résumé words;
  else **a project or paper by name, built from the big view's own `D` entry** (hivemind, monte, citadel/dunderscore,
  ieee, curated, portfolio, legatum…); else a topic; else a short "I can answer…" with the six chips. Every answer uses
  facts already on the page; keep them in step with the sections and `D`. Phones: the sidebar slides out from ☰, cards
  scroll sideways. Under reduced motion answers appear at once and only the first runs. In headless Chrome the intro
  swarm never finishes (rAF), so test with `/#top`, which skips it. Styles `.cg-*` at the end of home.css. The old
  frames carousel (below) is gone, with its CSS and the HOME HERO script; its notes are history.
- **Hero (he chose "the og way" over five reworks, `_mock/landing8.html`):** a carousel of device frames (notched tab with
  three dots, side ports). **Every frame is his work** and the prompt box types **the problem it answers** ("Give a
  team's AI coding agents one shared memory." over Hivemind); mixed pictures (group photo, portrait, logos) didn't make
  sense to him. Seven frames: R.01, Hivemind, R.02, Monte (`img/cases/monte-home.webp`, the live site's hero), SafeJew,
  AIML-LI, Safe Routes. **No Ledger in the hero** (it stays a Selected work card). It cycles on its own, and since 28 Oct
  **a person can move it** ("let the person swipe"): swipe on a phone, drag with a mouse, ‹ › buttons, clickable dots,
  arrow keys, or a click on a side frame; the new problem **types in** then too, never just appears (his ask), and the
  cycle resumes 8 s after it finishes. **A click on the middle frame, or Open, opens the
  big view.** Data in site.js HOME HERO.
  **Captions under the prompt (`r`, 28 Oct, Adrian: "i dont like these ones. make them better"):** one pattern for all
  seven, the result in bold, then where: *Best Paper Finalist · IEEE BigData 2026*, *Won Lemma’s agent track · SEPHacks
  2026*, *Accepted, sole author · ARRSI @ AACL-IJCNLP*, *1st, Finance track · TrojanHacks 2026*, *1,300+ incidents
  mapped · JFEDLA-funded*, *Piloting with LAUSD · 500+ at the summit*, *3rd internationally · Code for Transportation*.
  No "Research" category label (copy rule). Markup is `<b>result</b><span class="d"> · </span><span class="v">where</span>`;
  at <=860px the bold sits on its own line and the dot hides, so the venue never splits mid-name.
  **Font (same day, he picked D of four):** LaTeX serif (`--serif`), the result upright bold navy, the venue in italic
  grey, 15px (13px on phones). Geist there was what he didn't like ("i dont like the font").
  **The hero has no sentence under the headline and the section titles have no side notes** (Adrian, 28 Oct: "delete
  all of the weird middle descriptions"; he picked those two from four options and kept the Selected work card lines).
- **Builds open in a canvas since 30 Oct** (Adrian on the popup below: "i dont like the format once you click on it";
  he picked **A of three takes**, `_mock/bv.html?take=a|b|c`, over B, the project as the next answer in the thread, and
  C, a tidier popup). `#dv` is now `aside.cv`: a panel on the right, as ChatGPT's canvas does. Above 1000px the sidebar
  folds away and the chat keeps the left (`.cg.cv-on`), with the clicked card outlined (`.cv-src`); at 1000px and below
  it covers the screen. Top bar: mark, name, meta, the first link as a solid button, ×. Body: the live site or film in a
  browser window (Ledger's receipt prints there), the result in navy over its venue, one sentence, then How it works and
  His part as two rows, then the other links. All Geist, no serif, no dot grid. Esc or × closes it; so does moving to
  another conversation or New chat. A paper named in a typed question opens its Research panel instead (`.cg-pp`, which
  still uses the `.dv-*` rules below). `D` speaks in the third person now ("His part", "He built the LA gazetteer",
  Safe Routes' "His friends are in that number"). The Selected work opening line is "Three of these won at hackathons
  this fall, and one placed 3rd internationally." (it replaced "Six things people use...", which he disliked), and the
  Citadel tile says "He and two teammates wrote it". The notes below describe the popup this replaced.
  **Copy, later the same day** (Adrian: "make the proejct descirptions mroe impressive", the look stays): each build
  leads with scale and outcome, all from the résumés and project notes: Hivemind works in Claude Code, Cursor, Codex
  and three other tools, eval 36/36 vs 14/36 and a 15/36 placebo; Monte prices each card net of fees and interest,
  29 cards, 36 tests; SafeJew 1,394 incidents (800 LA + 594 campus), distributed through JFEDLA's Community Security
  Initiative; AIML-LI's LAUSD path to the Chief Academic and Chief Information Officers, the summit's keynotes, the
  NCSS and podcast invites; Ledger's 18 programs across three levels of government, 24 test records with no false
  passes, twelve hours; Safe Routes to all 668 LAUSD schools over LA Metro's 5,395 stops. The answer opens "Hivemind
  and Monte won at two USC hackathons on the same weekend, Ledger won VISION HACK: South LA, and Safe Routes placed
  3rd internationally." Not used, from his college apps: the FBI/LAPD/ADL work on SafeJew, Lemma's internships, a16z
  and the ex-Uber judge on Monte, Safe Routes' mentor, the Mayor's Office showcase. Ask before adding them.
  **Refine pass (30 Oct, late), his notes on each conversation:** (1) **Clicks no longer jump to the top.** Every
  `article.cg-conv` carries `data-conv`, so the click handler's `closest('[data-conv]')` matched the article itself: any
  click in an answer reopened it at scrollTop 0 and blocked its links (Code + data, the copy and thumbs icons, typed
  answers' cards). It now matches `[data-conv]:not(.cg-conv)`, and the #link handler skips clicks already handled.
  (2) **SafeJew says who funds it:** its card's result line is "Funded by a JFEDLA Teen Innovation Grant", the canvas
  leads with it, and the opening line adds "SafeJew, his live map of antisemitic incidents, is funded by the Jewish
  Federation of Greater Los Angeles (JFEDLA)." (3) **Every build has its links under the card** (`.wc` > `.wcard` + `.wl`:
  Live site / Live map / Live demo, Devpost, Film, Write-up, Code, as in `D`); the card itself still opens the canvas.
  Citadel's panel adds About Terminal beside More. (4) **The résumé picker** (`#cvMenu`) wears the chat's menu style
  (white, 16px radius, Geist, "Résumé" header); it was the old mono caps ("the resume tab has a different font").
  (5) **"Tell me more about his work"** is a suggestion chip (`data-ask`, typed as the visitor's question) on the empty
  screen and under About; its KB answer gives research, building and internships, each linked. (6) **Internships in
  the third person**, plain for admissions readers: Firstness explained in a sentence, Kiddom's 0.87 F1 glossed "(1.0 is
  perfect)", Fjor's "machine-learning models" and "investment memos for the partners' decisions", Alliance as "this
  nonprofit for Southern California's startups". (7) **"What's his favorite…"** (his "what is his favorite [blank]") is a
  chip (`data-fill`) that types "What's his favorite " into the composer for the visitor to finish; on the empty screen
  and under About. His favorites, in his words (30 Oct): food "soviet food from grandma", movie *Good Will Hunting*,
  music Rachmaninoff ("specifically musical moment #6", i.e. Moment Musical No. 6) and Chopin's "Revolutionary" Étude,
  class "Math and CS, but logic is my fav", place "my bed or anywhere in nature"; **book: skip** (none, on his word).
  KB has one answer each, plus a list for any other favorite ("favorite color") ending in his email; "favorite sport",
  "paper" or "project" still open their conversations. Piano: the long résumé lists MTAC piano, so since 1 Nov KB answers it from there. (8) Typed answers leave blank room under the newest turn (`.cg-sp`) so its question sits at the top while
  it builds, then shrink it to fit.
  **Admissions pass (31 Oct; Adrian: "how else can we refine the site for an AO", then yes to the first idea).**
  (1) **About's highlights** (`.cg-hl`): one bordered row of four under the photos, before his paragraphs, each a link to
  its conversation. **Since 1 Nov (his pick A of three, `_mock/about2.html`; "not the inherently most impressive"):** Best
  Paper Finalist / IEEE BigData 2026, 12 of 130 (`#rs-t1`); Sole-author paper / accepted at an AACL-IJCNLP workshop
  (`#rs-t2`); Team USA épée / 6th at the Cadet Pan-Ams (`#fencing`); AI course for LAUSD / headed toward a district
  elective (`#case-aimlli`). **Then, the same evening, his words:** Sole-author paper / "At a PhD-level venue: an
  AACL-IJCNLP workshop" (not "conference": it's a workshop at one); Team USA fencer (not "épée"); 4× hackathon winner /
  Two at USC in one weekend (`#work`); AI course for LAUSD. Best Paper Finalist came off the row on his word. **About's
  photos since 2 Nov** ("the photos are not great"; he picked **B, three across**, of `_mock/photos.html`, over A, two
  big, and C, four squares): one row of one height, desktop and phone alike (`.cg-imgs.ph`; `.p` 3:4, `.w` 4:3): the
  headshot, the Pan-Ams lunge, the YC sign, as close crops in `img/about/` (`hs-portrait`, `lunge-wide`, `yc-portrait`
  .webp). The originals are only 800px, so no crop can be sharper than that; ask him for full-size photos. A click opens
  the whole original (`data-full` on the button; the lightbox reads it first). The podium and climbing came off About
  (climbing is in Off the laptop). The per-photo crops of 1 Nov (`.hs`, `.yc`, `.lunge`...) are history. The original four, now history: Best Paper Finalist / IEEE BigData 2026 (`#rs-t1`, picks the paper), Team USA épée / 6th, Cadet
  Pan-Ams (`#fencing`), National Merit / Semifinalist (`#record`), 4 hackathon wins / and a 3rd internationally (`#work`;
  TrojanHacks, SEPHacks, VISION HACK, Decode the Ocean, plus Safe Routes' 3rd). 2×2 on phones. Keep it in step with
  those conversations. (2) **"The 30-second version"** is the first chip on the empty screen (`data-ask`, the KB
  summary). (3) **The intro is ~2 s, not ~4**: the name forms by 1.1 s, bursts at 1.7 s and is gone by 2.5 s (was
  1.8 / 3.1 / 4.1), and "Who is Adrian?" starts typing 0.4 s after the page unlocks (was 0.7). The swarm itself is
  unchanged ("i like the loading page"). (4) KB fixes found by ~50 admissions-style questions: "econ" matched inside
  "second" (finance now needs `\becon`); class rank has its own answer (not listed; gives the GPA) instead of the
  fencing ranking; "spike", "what makes him different" and "30-second" go to the summary; "did AI write these" to
  the no-AI answer; "started a company" to the co-founder list. (5) The Contact email scales on phones
  (`clamp(16px,4.9vw,24px)`) and can only break at the @. Ideas offered and not yet done: say visibly that no AI writes
  the answers (he removed the composer line on 29 Oct), a "why he does this" chat in his own words, his own lines for
  college plans, a challenge and summers, past tense and photos after 10 Nov, 2 Dec and 17 Dec, and outside proof
  links (BigData program, Devpost winners, ARRSI accepted list) once posted.
- **Off the laptop and Surprise me (1 Nov).** Adrian brought a ChatGPT-written "AdrianGPT" prompt and asked what to keep.
  Settled: the name stays "Adrian" (no "GPT": nothing here is a model, GPT is OpenAI's, and "[Name]GPT" is a common
  gimmick), and the site stays one chat (no second scrolling site). He kept three ideas from `_mock/beyond.html`:
  (1) **Off the laptop**, a chat after Team USA épée ("What does he do for fun?", `#c-life`, `#life`): five outdoor photos,
  Outside, Piano (MTAC, from the long résumé), Puzzles (Games Unlimited), his favorites as a table (his 30 Oct words, no
  book), Family (Ryan as co-author). Typed hobby questions open it (KB weight 4, so "outside of school" beats the school
  answer). (2) **Surprise me**, a chip on the empty screen, under About and under Off the laptop (`data-surprise`; typed
  "fun fact" too): one of twelve facts in site.js `SUR`, shuffled with no repeats, each with "Another one"; keep them in
  step with the facts they quote. (3) A no-AI line: he picked C (under each answer) of three placements, then asked
  instead for **a short welcome walkthrough on landing** ("this is how my shit works, welcome ... short and condensed"),
  which is to carry the no-AI statement; line C did not ship. A card, a spotlight tour and a chat message
  (`_mock/welcome.html`) were "hella chatted"; he asked for it "annotated like we annotated stuff in hivemind and monte ...
  cute and not AI slop", and shipped `_mock/welcome2.html` **in honey** (`#b9771a`, the old Hivemind note's colour, over
  navy). **The welcome:** on a first visit, before "Who is Adrian?" plays, hand-written notes in Shantell Sans (Google
  Fonts, `INFM` 100 / `BNCE` 30 as on the Hivemind site) sit on the real empty screen, each pencil arrow drawing itself in:
  "my life, sorted into chats" (to the chat list; on phones to ☰, "(they live in here)"), "or ask anything! even my favorite
  movie" (to the composer), "stuck? try one of these" (to the suggestions, desktop only), "p.s. no AI in here. every answer
  is pre-written" (squiggle under "no AI"), and an "ok, let's go →" box. **They stay up until a real action** (since the
  same day, "the shit goes away too quickly"): the button, Esc, or a click on a chat, chip, composer or the sidebar, which
  goes through; clicks on empty page and other keys do nothing. They fade out over .5 s. **Ink: ballpoint blue** (`#2457c5`;
  quotes `#1f4aa6`), his pick from `_mock/inks.html` over red pen, pencil, navy, green and the first honey. On phones the suggestions hide while the notes are up. **Shown on every visit to the plain
  address** (it was once per visitor until Adrian, the same day: "if you load it just like this, it doesn't show the
  annotations. fix this"), never on a deep link. Positions are computed from the real elements (site.js CHAT SITE, `welcome`),
  so check 1440, 1280, 1024 and two phone sizes after moving anything on the empty screen.
  **More personal (same day, his ask; `_mock/welcome3.html`):** his headshot as a taped polaroid, "hi, i'm adrian!", drops
  in first at the top right; the composer note reads "or ask me anything! my épée rating, my favorite movie…"; where there's
  room left of "The 30-second version" chip, "short on time? start here" points at it (else "stuck? try one of these");
  the button says "ok, show me around →".
- **Content pass (1 Nov; Adrian picked 1, 3, 4, 5 of six ideas: his whys, Off the laptop specifics, what's next, outside
  proof).** Sources: his "MIT Interview Master Prep" doc (Drive), whose spoken lines are quoted as his words, and his "UC
  Essays" doc, **paraphrased only** (those essays go to UC readers; never copy a sentence of them onto the site, since a
  public copy could get flagged as the essay's source). His quotes show as `.cg-q`: Shantell Sans in a darker shade of the
  notes' ink (`#1f4aa6` since the blue switch), signed "— Adrian": Research ("AI models now grade other AI models' work…"), What he's built
  ("My default is to start before I feel ready…"), fencing ("Fencing taught me to go after hard things…") and What's next
  ("I learn by building…"). What he's built ends with **Why he built them** (SafeJew, AIML-LI, Safe Routes). Fencing adds
  since age nine, ~22 hours a week, and **The bout he remembers** (the 14–14 bout, box breathing). Off the laptop adds the
  backpacking states, self-taught surfing, his morning puzzles, the nap experiments (45 minutes), **A typical day**, his
  grandparents' card games (Klaberjass, Preferans) and Ryan's Valentine's story. **What's next** is a new chat after Honors
  (`#c-next`, `#next`): CS and economics, the biased-crime-data problem from Safe Routes, fencing in college; no school
  named. KB answers "why SafeJew/AIML-LI/Safe Routes/the research", college plans (open What's next), a typical day, card
  games and how long he has fenced; Surprise me has 16 facts. llms.txt gained What's next and Off the laptop. **Added
  the same day on his "Add them"** (worded from his coach brag sheet): SafeJew's data straight from the FBI, LAPD and ADL
  (Why he built them, the canvas's His part, KB); **the paid summer internship at Lemma, a Y Combinator startup in San
  Francisco, that came with Hivemind's SEPHacks win** (work opening line, a line under Internships, What's next "Next
  summer", the canvas, KB, llms.txt; not on the résumés yet); **coaching**: beginner classes at LAIFC and his 11-year-old
  brother at the club and tournaments (fencing "He coaches, too", KB); LAUSD's educators calling his first AIML-LI version
  too technical, rebuilt with teachers. Still not used: the URTC rejection (idea 2, not picked), Homo Deus (he said no
  book). Later the same day he gave the dish, **borscht and pelmeni** (favorites table, Family, KB, Surprise me), and OK'd **SafeJew's UCLA work** ("He's now working with UCLA to expand it" on the card, the canvas and llms.txt).
  **Outside proof (idea 5), same day:** a search agent loaded every candidate page. Linked: SafeJew's **Grant** button
  (card and canvas) to JFEDLA's `jewishla.org/tig-past-projects/` ("Adrian E. & Yonatan Z. – SafeJew / 10th Grade, LACES",
  2024-2025 cohort); Safe Routes' **Results** button to `youngcoderssphere.org/competition-winners`; the Honors NCSS row's
  "Student panel on AI" to the session on `eventee.com/e/ncss-2026-28032` (no student names listed). Monte's Devpost page
  now shows "WINNER Best Project in Finance" (the site says "1st place, Finance"; same prize, Devpost's name). Not public
  yet, recheck later: the BigData HSS accepted list and finalists (its program says "TBD"; the symposium's own award names
  are "Outstanding Paper / Runner-Up / Rising Star", so ask how "Best Paper Finalist" was worded in his email if it ever
  matters), ARRSI's accepted papers, the SEPHacks and VISION HACK Devpost winners, Decode the Ocean, Citadel Terminal.
- **Big view (`#dv`, site.js BIG VIEW), second take (28 Oct, late):** Adrian called the stacked version (problem bar,
  three numbers, big screenshot, columns) "lame" and asked for it "more like i had it with the bubble version...
  interesting to look at, but not doing tm, a strong precise description, send to the website, highlight the
  achievement, show the technicality in a couple lines". So it is the bubble-era orientation: **media left** on a light
  navy dot grid (builds in a browser window whose address bar is the live site and links there; papers as the first page
  with a sheet behind it), **text right**: mark, name and a mono meta line; **the achievement** in navy serif bold over an
  italic venue, with a navy rule (the hero caption style); one precise sentence (papers: the question and its answer);
  **How it works** in two or three lines with the stack; My part (Why for Safe Routes, Authors for papers); a solid
  button to the site or PDF, then the rest. A square × closes it (8px radius, no pill). No numbers row, chart, columns
  or extras. All eleven fit one desktop screen (1440x900). Facts come from the first take (6cf89dc) and the old cards
  (d7a3a82); keep them in step. Ledger's My part keeps its fixed wording.
- **Citadel Terminal (29 Oct, his ask: "take screenshots from citadel's terminal ... make it hella tuff").** Terminal's site
  needs his GitHub sign-in, so he pasted two screenshots of its replay viewer (round 41, his bot **DUNDERSCORE4_2** in
  teal, team "Claude's Plan"): `img/terminal/viewer.webp` (the whole viewer) and `board.webp` (the board). **The bot is
  "dunderscore"**, as the game spells it; older notes said "dunerscore". It shows as a panel under the Selected work grid
  (`#case-citadel`), a hero frame (the board), and a big view (the viewer, shown whole, in the browser window). The
  Achievements cell opens the same big view.
- **Research titles and copy (29 Oct, second pass: "research descriptions still suck ... have the full titles"):** every
  paper shows its full official title (from the PDFs), and its description leads with the headline result in bold, then
  the scale (essays, models, judgments, simulations) and the recognition. Same titles in the big view and llms.txt.
- **Ledger is a receipt (29 Oct; Adrian: the dashboard screenshot "deadass looks horrendous... unAIslop it... a cool theme
  that is different from the rest").** He picked A (Receipt) of three takes in `_mock/ledger-themes.html` (B green-bar ledger
  paper, C LED window sign), then "too blue": the field is `#3355a8`, not Ledger's own `#1b4dff`. The tile (`.lgr`, `.rcp` in
  home.css) is static HTML: a receipt rising out of a printer slot with the SNAP check by category and NOT MET. The big view
  (site.js BIG VIEW, `LG`) prints the whole check line by line out of a printer, with Print again. Both are **test record 18**
  from Ledger's suite (a weekly order, Corner Stop Market, VWF-885502: dairy and protein 4/7, grains and produce 7/7), from the
  old walkthrough JSON (`git show 6abd0ac^:assets/ledger-walkthrough.json`); the printer says "Test record 18", and it shows
  the rule engine, not the vision model. Tile lines: "1st place, VISION HACK: South LA" / "Tracks a corner store's licenses
  and checks its stock for SNAP." `img/cases/ledger-dashboard.webp` is no longer used on the homepage.
- **Copy pass (29 Oct, "i dont like how you describe all of the stuff"):** Experience lines in the first person, saying
  for whom and with what result; each Research finding as a plain question or sentence a non-specialist gets, numbers
  kept. **Achievements** ("the bottom section sucks") is a 4×3 board of twelve honors, most selective first (National
  Merit, YC, Citadel, All-American, All-Academic, Decode the Ocean, NCSS, AP Scholar, 4.0/1520, SIFMA, JSU, STEMsters),
  each the honor in large serif, its name and one line, no list and no pills. **Contact** is a closing card: "Let's
  talk.", the email large, Email / Résumé / LinkedIn / GitHub buttons.
- **Sections (round 8, quiet), his order:** each has a plain serif title over a rule and a small count on the right.
  About (photo and **his own three paragraphs, 28 Oct**, no School / Interested-in rows: "dont need to add school";
  the research sentence was made "chill" at his ask) · Experience (**a plain list, no logos**: company, role, one
  sentence, dates; "no logos for the experience section. make it chill"; each company name is an underlined navy link
  with a small ↗ so it reads as a link, his ask) · Research (**a publication
  list**, all five, each opening the big view) · Selected work (six screenshots with plain text under them, his
  "selected work is good"; **a click opens the big view**, ctrl/cmd-click the live site) · Fencing ("fencing looks
  good") · Achievements (two columns of plain rows and one "Also" line) · Contact (email and three links). **Lemma is off
  the logo strip.** **The strip gained AACL-IJCNLP, OJSS and JHSS on 28 Oct** (JHSS came off on 1 Nov: in revision, not published) (his ask), after IEEE: `aacl.webp`
  (the "AACL-IJCNLP" wordmark cut from 2026.aaclnet.org's `aacl-2026-logo-v2.png`, no "2026", no skyline),
  `ojss-lockup.webp` (the full lockup from oxfordjss.org's Wix header; `ojss.webp` is the bare O used on R cards) and
  `jhss.webp` (jhss.scholasticahq.com's white-on-blue logo turned to ink). Sizes are balanced by class (`.w` 16px,
  `.w2`/`.w3` 32px). **About's text is Adrian's own (28 Oct, late)**, typos fixed only: "build software" links
  `#work`, "research" links `#papers`, the internships clause `#experience` and "fence épée for Team USA" `#fencing` (underlined navy, like Experience); "which one" became "which language model"
  because the sentence no longer names models before it. Old ids kept: `#papers`, `#record`, `#contact`, `#case-*`, `#rs-t1..5`, `#xp-*`, `#bouts`.
- **Off the homepage now (git history, last commit with them d7a3a82):** Ask adrian, the Off-the-laptop photo viewer,
  the Selected work hub and its popups (Hivemind film and Lemma panel, Monte tap demo and film), the achievements
  wall's panels, the research shelf, the footer piste game, the terminal and the math notes viewer. The two launch
  films are back inside the big view, so their JSON-LD VideoObjects and sitemap entries still match the page.
- Notes below about the homepage's layout are history unless they describe content or wording rules.
