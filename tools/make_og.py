# -*- coding: utf-8 -*-
"""Render og.png, the link-preview card for adrianerlikhman.is-a.dev.

Since 15 Oct 2026 (Adrian picked C of three takes): his Team USA lunge at the
Pan-American Championships (fencing-1.jpg) fills the card, under a navy fade
from the left; the name in white Latin Modern (the LaTeX face of the site and
the résumés); his own meta-description words; three credentials as plain
lines, no bubbles (16 Oct: the credential lines went too). Earlier cards were a wall of chips, then chips beside his
headshot; he asked for "a cool picture" instead.

Cards get rendered small: ~300px in iMessage, ~360px in Slack. The name and the
photo survive that, so everything else stays inside the dark left side where
it reads at full size. Chat apps show a still, so there is no animation.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1200, 630
NAVY = (16, 30, 52)           # deeper than --acc, so white text holds over it
WHITE = (246, 247, 250)
SOFT = (214, 222, 236)        # tagline
SKY = (157, 184, 224)         # the demos' light-blue accent (--g-acc)

# Latin Modern Roman (lmroman10-*.otf) is copied into the same cache from the
# TeX distribution (Tectonic's bundle); the site serves it as woff2 from /fonts/.
# IBM Plex Mono is the face the site itself loads from Google Fonts. They are
# fetched into a gitignored cache rather than vendored: both are OFL, and
# redistributing them in-repo would mean shipping their licences too.
FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
FONTS = {
    "IBMPlexMono-SemiBold.ttf":
        "https://github.com/google/fonts/raw/main/ofl/ibmplexmono/"
        "IBMPlexMono-SemiBold.ttf",
}
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTO = os.path.join(ROOT, "fencing-1.jpg")   # Team USA, Pan-Ams, Bogotá


def ensure_fonts():
    import urllib.request
    os.makedirs(FD, exist_ok=True)
    for name, url in FONTS.items():
        dst = os.path.join(FD, name)
        if not os.path.exists(dst):
            print("fetching %s" % name)
            urllib.request.urlretrieve(url, dst)
    return [os.path.join(FD, n) for n in FONTS]


LM_BOLD = os.path.join(FD, "lmroman10-bold.otf")
LM_REG = os.path.join(FD, "lmroman10-regular.otf")
MONO_SB = os.path.join(FD, "IBMPlexMono-SemiBold.ttf")

MARGIN = 88

# 16 Oct: no dash, no coordinates; Adrian picked the full place name
KICK = "LOS ANGELES, CALIFORNIA"
NAME = ["Adrian", "Erlikhman"]
# Adrian's own words, the meta description's, one per line with a marker
# (16 Oct, the layout he picked)
TAGLINE = ["ML/NLP researcher",
           "Software, ML, investment & venture intern",
           "Team USA fencer"]
# 16 Oct: the credential lines are gone (Adrian: just the researcher and
# intern line); the site carries the achievements.


def lm(size, bold=True):
    return ImageFont.truetype(LM_BOLD if bold else LM_REG, size)


def tracked(d, xy, text, font, fill, tracking=0.0):
    """Draw with letter-spacing; returns the advance."""
    x, y = xy
    for ch in text:
        d.text((x, y), ch, font=font, fill=fill)
        x += d.textlength(ch, font=font) + tracking
    return x - xy[0] - (tracking if text else 0)


def tracked_width(d, text, font, tracking=0.0):
    if not text:
        return 0.0
    return sum(d.textlength(c, font=font) for c in text) + tracking * (len(text) - 1)


def build():
    # ---- the photo, filling the card, fencer on the right ---------------
    ph = Image.open(PHOTO).convert("RGB")
    scale = max(W / ph.width, H / ph.height)
    ph = ph.resize((round(ph.width * scale), round(ph.height * scale)), Image.LANCZOS)
    left, top = ph.width - W, (ph.height - H) // 2
    im = ph.crop((left, top, left + W, top + H)).filter(ImageFilter.GaussianBlur(0.6))

    # ---- navy fade: solid over the left third, gone by five-sixths -------
    mask = Image.new("L", (W, H))
    md = ImageDraw.Draw(mask)
    for x in range(W):
        t = x / W
        a = 250 if t < 0.34 else max(0, int(250 - (t - 0.34) / 0.5 * 250))
        md.line([x, 0, x, H], fill=a)
    im = Image.composite(Image.new("RGB", (W, H), NAVY), im, mask)
    d = ImageDraw.Draw(im)

    # ---- kicker: LOS ANGELES, CALIFORNIA -------------------------------
    f_kick = ImageFont.truetype(MONO_SB, 19)
    tracked(d, (MARGIN, 92), KICK, f_kick, WHITE, 3.2)

    # ---- name -------------------------------------------------------------
    f_name = lm(128)
    for i, t in enumerate(NAME):
        bb = d.textbbox((0, 0), t, font=f_name)
        d.text((MARGIN - 7, 150 + i * 140 - bb[1]), t, font=f_name, fill=WHITE)

    # ---- tagline: three lines, each with a light-blue marker ------------
    f_tag = lm(28, bold=False)
    for i, t in enumerate(TAGLINE):
        y = 440 + i * 42
        d.rectangle([MARGIN, y + 9, MARGIN + 4, y + 29], fill=SKY)
        d.text((MARGIN + 20, y), t, font=f_tag, fill=SOFT if i == 1 else WHITE)
    return im


def main(out):
    ensure_fonts()
    im = build()
    im.save(out, format="PNG", optimize=True)
    print("wrote %s  %dx%d  %d bytes" % (out, im.width, im.height,
                                         os.path.getsize(out)))


if __name__ == "__main__":
    main(sys.argv[1])
