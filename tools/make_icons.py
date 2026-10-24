"""Build the site's page mark (23 Oct 2026, Adrian's pick: take 1 of _mock/logo-eg.html, "E on G").

A white dog-eared page outlined in navy, with an italic a and a subscript e on it, set in Latin Modern italic
(the site's own face). Writes favicon.svg (glyphs outlined, so no font is needed), favicon.ico,
favicon-48/96.png, icon-192/512.png, apple-touch-icon.png and img/logos/ae-mark.svg. Needs fontTools,
numpy and Pillow, and lmroman10-italic.otf (LMI env var, or the Tectonic cache path below).
"""
import os
from pathlib import Path
import numpy as np
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.recordingPen import DecomposingRecordingPen
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
LMI = os.environ.get("LMI") or str(next(Path.home().glob(
    "AppData/Local/TectonicProject/Tectonic/cache/bundles/data/*/lmroman10-italic.otf")))
NAVY, WHITE, BG = "#1f3a5f", "#ffffff", "#fbfaf7"

font = TTFont(LMI)
gs, cmap = font.getGlyphSet(), font.getBestCmap()
upm = font["head"].unitsPerEm

# the page, in a 120-unit box: body with the top-right corner cut, and the fold
PAGE = [(14, 4), (82, 4), (106, 28), (106, 116), (14, 116)]
FOLD = [(82, 4), (82, 28), (106, 28)]
STROKE = 6


def placements(cx=58, cy=70, S=92):
    """(char, x origin, baseline, size) for a and its subscript e, centred on (cx, cy).
    The a's ink spans 98..525 units; the e is 0.56 of its size, tucked in and dropped 0.22 S."""
    s, s2 = S / upm, 0.56 * S / upm
    x0, y = cx - 0.605 * S / 2, cy + 0.108 * S
    return [("a", x0 - 98 * s, y, S), ("e", x0 + 0.407 * S - 114 * s2, y + 0.22 * S, 0.56 * S)]


def fmt(v):
    return f"{v:.2f}".rstrip("0").rstrip(".")


def glyph_path(ch, x, baseline, size):
    s = size / upm
    pen = SVGPathPen(gs, ntos=fmt)
    gs[cmap[ord(ch)]].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
    return pen.getCommands()


def svg():
    pts = lambda p: " ".join(f"{x} {y}" for x, y in p)
    glyphs = "".join(glyph_path(*g) for g in placements())
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">'
            f'<path d="M{pts(PAGE)}Z" fill="{WHITE}" stroke="{NAVY}" stroke-width="{STROKE}" stroke-linejoin="round"/>'
            f'<path d="M{pts(FOLD)}" fill="none" stroke="{NAVY}" stroke-width="{STROKE}" stroke-linejoin="round"/>'
            f'<path fill="{NAVY}" d="{glyphs}"/></svg>\n')


(ROOT / "favicon.svg").write_text(svg(), encoding="utf-8")
(ROOT / "img/logos/ae-mark.svg").write_text(svg(), encoding="utf-8")


# ---- raster: draw the same geometry with Pillow at 1024 and downsample
def cubic(p0, p1, p2, p3, n=24):
    return [tuple((1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d
                  for a, b, c, d in zip(p0, p1, p2, p3)) for t in (i / n for i in range(1, n + 1))]


def glyph_polys(ch, x, baseline, size):
    s = size / upm
    rp = DecomposingRecordingPen(gs)
    gs[cmap[ord(ch)]].draw(rp)
    tf = lambda p: (x + p[0] * s, baseline - p[1] * s)
    polys, cur, last = [], [], None
    for op, args in rp.value:
        if op == "moveTo":
            cur, last = [tf(args[0])], args[0]
        elif op == "lineTo":
            cur.append(tf(args[0])); last = args[0]
        elif op == "curveTo":
            cur += [tf(q) for q in cubic(last, *args)]; last = args[-1]
        elif op in ("closePath", "endPath"):
            if cur: polys.append(cur)
            cur = []
    return polys


def raster(px, bg=None, pad=0):
    S = 1024
    k = S / 120
    P = lambda pts: [(x * k, y * k) for x, y in pts]
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    d.polygon(P(PAGE), fill=WHITE)
    w = round(STROKE * k)
    d.line(P(PAGE + PAGE[:2]), fill=NAVY, width=w, joint="curve")
    d.line(P(FOLD), fill=NAVY, width=w, joint="curve")
    # glyphs: even-odd fill via a mask, so the counters punch out
    m = np.zeros((S, S), np.uint8)
    for g in placements():
        for poly in glyph_polys(*g):
            pm = Image.new("L", (S, S), 0)
            ImageDraw.Draw(pm).polygon(P(poly), fill=255)
            m ^= np.array(pm)
    im.paste(Image.new("RGBA", (S, S), NAVY), (0, 0), Image.fromarray(m))
    out = im.resize((px - 2 * pad, px - 2 * pad), Image.LANCZOS)
    if bg:
        base = Image.new("RGBA", (px, px), bg)
        base.paste(out, (pad, pad), out)
        out = base
    return out


for name, px in [("favicon-48.png", 48), ("favicon-96.png", 96), ("icon-192.png", 192), ("icon-512.png", 512)]:
    raster(px).save(ROOT / name)
# iOS fills transparency with black, so the touch icon sits on the site's warm white
raster(180, bg=BG, pad=22).convert("RGB").save(ROOT / "apple-touch-icon.png")
raster(256).save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("icons written")
