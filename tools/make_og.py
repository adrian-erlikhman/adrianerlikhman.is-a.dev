# -*- coding: utf-8 -*-
"""Render og.png, the link-preview card for adrianerlikhman.is-a.dev.

Same furniture as the card it replaces -- 7px rust spine, warm ground, Fraunces
name, IBM Plex Mono chips -- but the content does more work. The old card led
with category words ("machine learning, quantitative finance, data science")
that say nothing a hundred other pages don't. This one leads with the things
that are hard to fake and easy to check.

Cards get rendered small: ~300px in iMessage, ~360px in Slack. Only the name and
the tagline survive that. So the chips are laid out as a credential wall -- read
as texture at thumbnail size, read as receipts at full size.

Fonts come from the same families the site loads from Google Fonts.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
BG = (232, 228, 214)          # --bg
INK = (33, 31, 24)            # --ink
ACC = (193, 84, 58)           # --acc
DIM = (107, 104, 87)          # --dim
WASH = (237, 232, 218)        # the warm top-left lift
SPINE = 7

# Fraunces and IBM Plex Mono are the faces the site itself loads from Google
# Fonts. They are fetched into a gitignored cache rather than vendored: both are
# OFL, and redistributing them in-repo would mean shipping their licences too.
FD = os.path.join(os.path.dirname(os.path.abspath(__file__)), "fonts")
FONTS = {
    "Fraunces.ttf":
        "https://github.com/google/fonts/raw/main/ofl/fraunces/"
        "Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf",
    "IBMPlexMono-SemiBold.ttf":
        "https://github.com/google/fonts/raw/main/ofl/ibmplexmono/"
        "IBMPlexMono-SemiBold.ttf",
}


def ensure_fonts():
    import urllib.request
    os.makedirs(FD, exist_ok=True)
    for name, url in FONTS.items():
        dst = os.path.join(FD, name)
        if not os.path.exists(dst):
            print("fetching %s" % name)
            urllib.request.urlretrieve(url, dst)
    return [os.path.join(FD, n) for n in FONTS]


FRAUNCES = os.path.join(FD, "Fraunces.ttf")
MONO_SB = os.path.join(FD, "IBMPlexMono-SemiBold.ttf")

MARGIN = 88

KICK_L = "MACHINE LEARNING  //  LOS ANGELES"
KICK_R = "adrianerlikhman.is-a.dev"
NAME_1 = "Adrian"
NAME_2 = "Erlikhman"
TAGLINE = "Machine-learning research, quantitative finance, software that ships."

# (text, filled) -- one row per list
CHIP_ROWS = [
    [("NEURIPS 2026 — FIRST AUTHOR", True),
     ("ACCEPTED — J. OF HIGH SCHOOL SCIENCE", False)],
    [("NATIONAL MERIT SEMIFINALIST", False),
     ("1ST — DECODE THE OCEAN", False),
     ("TEAM USA ÉPÉE — NO. 49", False)],
]


def fraunces(size, wght=900, opsz=144):
    f = ImageFont.truetype(FRAUNCES, size)
    f.set_variation_by_axes([float(opsz), float(wght), 0.0, 0.0])
    return f


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
    im = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(im)

    # a soft diagonal lift from the top-left, the way the old card had it
    wash = Image.new("RGB", (W, H), WASH)
    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    for i in range(60):
        md.ellipse([-500 - i * 6, -640 - i * 6, 780 + i * 6, 520 + i * 6],
                   outline=max(0, 46 - i), width=14)
    im = Image.composite(wash, im, mask)
    d = ImageDraw.Draw(im)

    # faint dot grid
    for gy in range(46, H, 34):
        for gx in range(MARGIN // 2, W - 24, 34):
            d.point((gx, gy), fill=(224, 219, 204))

    d.rectangle([0, 0, SPINE - 1, H], fill=ACC)

    f_kick = ImageFont.truetype(MONO_SB, 19)
    f_tag = fraunces(31, wght=500, opsz=40)
    f_chip = ImageFont.truetype(MONO_SB, 18)

    # ---- kicker -------------------------------------------------------
    ky = 62
    d.line([MARGIN, ky + 11, MARGIN + 34, ky + 11], fill=ACC, width=3)
    tracked(d, (MARGIN + 50, ky), KICK_L, f_kick, DIM, 2.6)

    rw = tracked_width(d, KICK_R, f_kick, 2.6)
    rx = W - MARGIN - rw
    d.ellipse([rx - 26, ky + 6, rx - 16, ky + 16], fill=ACC)
    tracked(d, (rx, ky), KICK_R, f_kick, INK, 2.6)

    # ---- name ---------------------------------------------------------
    f_name = fraunces(132, wght=900, opsz=144)
    a1 = d.textbbox((0, 0), NAME_1, font=f_name)
    d.text((MARGIN - 6, 118 - a1[1]), NAME_1, font=f_name, fill=INK)
    a2 = d.textbbox((0, 0), NAME_2, font=f_name)
    d.text((MARGIN - 6, 256 - a2[1]), NAME_2, font=f_name, fill=ACC)

    # ---- tagline ------------------------------------------------------
    ty = 418
    tb = d.textbbox((0, 0), TAGLINE, font=f_tag)
    d.text((MARGIN, ty - tb[1]), TAGLINE, font=f_tag, fill=INK)

    # ---- chips --------------------------------------------------------
    pad_x, ch_h, gap = 21, 40, 13
    avail = W - MARGIN * 2
    y = 486
    for row in CHIP_ROWS:
        # monospace, so the row's width is predictable -- shrink until it fits
        size, track = 18, 1.7
        while size > 12:
            f_chip = ImageFont.truetype(MONO_SB, size)
            wide = sum(tracked_width(d, t, f_chip, track) + pad_x * 2
                       for t, _ in row) + gap * (len(row) - 1)
            if wide <= avail:
                break
            size -= 1
        x = MARGIN
        for text, filled in row:
            tw = tracked_width(d, text, f_chip, 1.7)
            w = tw + pad_x * 2
            box = [x, y, x + w, y + ch_h]
            if filled:
                d.rounded_rectangle(box, radius=ch_h // 2, fill=ACC)
                col = BG
            else:
                d.rounded_rectangle(box, radius=ch_h // 2,
                                    outline=(196, 190, 172), width=2)
                col = INK
            bb = d.textbbox((0, 0), text, font=f_chip)
            tracked(d, (x + pad_x, y + (ch_h - (bb[3] - bb[1])) / 2 - bb[1]),
                    text, f_chip, col, 1.7)
            x += w + gap
        print("  row: %d chips at %dpx, ends %.0f / %d" %
              (len(row), size, x - gap, W - MARGIN))
        y += ch_h + gap
    return im


def main(out):
    ensure_fonts()
    im = build()
    im.save(out, format="PNG", optimize=True)
    print("wrote %s  %dx%d  %d bytes" % (out, im.width, im.height,
                                         os.path.getsize(out)))


if __name__ == "__main__":
    main(sys.argv[1])
