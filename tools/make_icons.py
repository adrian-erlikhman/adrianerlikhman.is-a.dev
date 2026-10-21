"""Build the site's [a/e] squircle mark (logo 6a, picked 21 Oct 2026).

Writes favicon.svg (glyphs outlined, so no font is needed), favicon.ico,
favicon-48/96.png, icon-192/512.png, apple-touch-icon.png and
img/logos/ae-mark.svg. Needs fontTools and Pillow, and IBM Plex Mono Bold
(PLEX env var, or the Tectonic cache path below).
"""
import os
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PLEX = os.environ.get("PLEX") or str(next(Path.home().glob(
    "AppData/Local/TectonicProject/Tectonic/cache/bundles/data/*/IBMPlexMono-Bold.otf")))
NAVY, LB, WHITE = "#1f3a5f", "#9db8e0", "#ffffff"

font = TTFont(PLEX)
gs, cmap = font.getGlyphSet(), font.getBestCmap()
upm = font["head"].unitsPerEm
adv = gs[cmap[ord("a")]].width


def glyph_path(ch, cx, baseline, size):
    """SVG path of one glyph, centred on cx, in the 120-unit box."""
    s = size / upm
    pen = SVGPathPen(gs)
    tp = TransformPen(pen, (s, 0, 0, -s, cx - adv * s / 2, baseline))
    gs[cmap[ord(ch)]].draw(tp)
    return pen.getCommands()


SQ = "M60 3C108 3 117 12 117 60S108 117 60 117 3 108 3 60 12 3 60 3Z"
BR = "M36 26H27v68h9M84 26h9v68h-9"


def svg(edge=True):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">'
            f'<path d="{SQ}" fill="{NAVY}"' + (f' stroke="{LB}" stroke-width="3"' if edge else '') + '/>'
            f'<path d="{BR}" fill="none" stroke="{LB}" stroke-width="5"/>'
            f'<path fill="{WHITE}" d="{glyph_path("a", 60, 56, 32)}"/>'
            f'<path d="M46 63h28" stroke="{WHITE}" stroke-width="3"/>'
            f'<path fill="{WHITE}" d="{glyph_path("e", 60, 92, 32)}"/></svg>\n')


(ROOT / "favicon.svg").write_text(svg(), encoding="utf-8")
(ROOT / "img/logos/ae-mark.svg").write_text(svg(), encoding="utf-8")


# ---- raster: draw the same geometry with Pillow at 1024 and downsample
def cubic(p0, p1, p2, p3, n=40):
    return [tuple((1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t * t * c + t ** 3 * d
                  for a, b, c, d in zip(p0, p1, p2, p3)) for t in (i / n for i in range(n + 1))]


def squircle():
    pts = cubic((60, 3), (108, 3), (117, 12), (117, 60))
    pts += cubic((117, 60), (117, 108), (108, 117), (60, 117))
    pts += cubic((60, 117), (12, 117), (3, 108), (3, 60))
    pts += cubic((3, 60), (3, 12), (12, 3), (60, 3))
    return pts


def glyph_polys(ch, cx, baseline, size):
    from fontTools.pens.recordingPen import DecomposingRecordingPen
    s = size / upm
    rp = DecomposingRecordingPen(gs)
    gs[cmap[ord(ch)]].draw(rp)
    polys, cur, last = [], [], None
    tf = lambda p: (cx - adv * s / 2 + p[0] * s, baseline - p[1] * s)
    for op, args in rp.value:
        if op == "moveTo":
            cur = [tf(args[0])]; last = args[0]
        elif op == "lineTo":
            cur.append(tf(args[0])); last = args[0]
        elif op == "curveTo":
            cur += [tf(q) for q in cubic(last, *args)[1:]]; last = args[-1]
        elif op == "qCurveTo":
            pts = [last, *args]
            for i in range(1, len(pts) - 1):
                a = pts[i - 1] if i == 1 else ((pts[i - 1][0] + pts[i][0]) / 2, (pts[i - 1][1] + pts[i][1]) / 2)
                b = pts[i]
                c = pts[i + 1] if i == len(pts) - 2 else ((pts[i][0] + pts[i + 1][0]) / 2, (pts[i][1] + pts[i + 1][1]) / 2)
                cur += [tf(((1 - t) ** 2 * a[0] + 2 * (1 - t) * t * b[0] + t * t * c[0],
                            (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * b[1] + t * t * c[1]))
                        for t in (k / 12 for k in range(1, 13))]
            last = args[-1]
        elif op in ("closePath", "endPath"):
            if cur: polys.append(cur)
            cur = []
    return polys


def raster(px, pad=0):
    S = 1024
    k = S / 120
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    P = lambda pts: [(x * k, y * k) for x, y in pts]
    d.polygon(P(squircle()), fill=NAVY, outline=LB, width=round(3 * k))
    w = round(5 * k)
    for seg in [[(36, 26), (27, 26), (27, 94), (36, 94)], [(84, 26), (93, 26), (93, 94), (84, 94)]]:
        d.line(P(seg), fill=LB, width=w, joint="curve")
    d.line(P([(46, 63), (74, 63)]), fill=WHITE, width=round(3 * k))
    # glyphs: even-odd fill via a mask (counters punch out)
    for ch, base in (("a", 56), ("e", 92)):
        m = Image.new("L", (S, S), 0)
        for poly in glyph_polys(ch, 60, base, 32):
            pm = Image.new("L", (S, S), 0)
            ImageDraw.Draw(pm).polygon(P(poly), fill=255)
            m = Image.fromarray(__import__("numpy").bitwise_xor(__import__("numpy").array(m), __import__("numpy").array(pm)))
        im.paste(Image.new("RGBA", (S, S), WHITE), (0, 0), m)
    out = im.resize((px - 2 * pad, px - 2 * pad), Image.LANCZOS)
    if pad:
        bg = Image.new("RGBA", (px, px), NAVY)
        bg.paste(out, (pad, pad), out)
        out = bg
    return out


for name, px in [("favicon-48.png", 48), ("favicon-96.png", 96), ("icon-192.png", 192), ("icon-512.png", 512)]:
    raster(px).save(ROOT / name)
# iOS masks its own corners, so the touch icon is full-bleed navy
raster(180, pad=10).convert("RGB").save(ROOT / "apple-touch-icon.png")
raster(256).save(ROOT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print("icons written")
