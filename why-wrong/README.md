# why-wrong — deployed copy

This directory is a **deployed copy**, not the source. It is what serves
<https://adrianerlikhman.is-a.dev/why-wrong/>.

The source of truth is **[adrian-erlikhman/why-wrong](https://github.com/adrian-erlikhman/why-wrong)**.
Edit there, then re-sync here:

```sh
rsync -a --delete \
  --exclude .git --exclude test --exclude package.json \
  --exclude LICENSE --exclude README.md --exclude .gitignore --exclude .nojekyll \
  ../why-wrong/ ./why-wrong/
```

It lives here because `adrianerlikhman.is-a.dev` is served by *this* repo (see the
root `CNAME`), so the `/why-wrong/` path can only be served from here — the same
way `eDNAtlas/` and `linkedin-games-unlimited/` are.
