"""Ornate carved frames as SVG, for CSS border-image (9-slice: corners stay, edges repeat with `round`).
Drawn here, not copied from anywhere: a shell and acanthus volutes at each corner, a running vine with leaves, a bead row
and a water-leaf moulding along the edges, all embossed with SVG lighting so they read as carved gilt.
viewBox 400x400, slice 120: corners (0..120) bulge past the edges, whose moulding starts at 22. Lighting is applied once to
all four sides together (so light always comes from the top left), and every edge motif tiles every 180 units.
This module holds the drawing helpers and lighting; make_frames2.py builds the eight homepage frames from them.
Run on its own it writes img/frames/<style>.svg and crest-<style>.svg, which the site doesn't use."""
import math, pathlib
OUT = pathlib.Path(__file__).resolve().parent.parent / "img" / "frames"; OUT.mkdir(parents=True, exist_ok=True)
F = lambda v: f"{v:.1f}"
S, E0, E1 = 120, 22, 280   # slice, edge start (outer), tile end (400-120)

def poly(pts, close=False): return "M" + " L".join(f"{F(x)} {F(y)}" for x, y in pts) + (" Z" if close else "")
def circ(x, y, r): return f"M{F(x-r)} {F(y)} a{F(r)} {F(r)} 0 1 0 {F(2*r)} 0 a{F(r)} {F(r)} 0 1 0 {F(-2*r)} 0"
def spiral(cx, cy, r0, r1, a0, turns, cw=True, n=70):
    return poly([(cx + (r0 + (r1 - r0) * i / n) * math.cos(a0 + (1 if cw else -1) * i / n * turns * 2 * math.pi),
                  cy + (r0 + (r1 - r0) * i / n) * math.sin(a0 + (1 if cw else -1) * i / n * turns * 2 * math.pi)) for i in range(n + 1)])
def leaf(x, y, ang, L, W, lobes=3, curl=0.0):
    """an acanthus-style leaf from (x,y) along angle ang: lobed both sides, tip curling by `curl`"""
    pts_u, pts_d = [], []
    for i in range(lobes * 4 + 1):
        t = i / (lobes * 4); u = L * t
        w = W * math.sin(math.pi * t) ** .8 * (1 - .32 * (i % 4 == 2))
        bend = curl * L * t * t
        pts_u.append((u, w + bend)); pts_d.append((u, -w + bend))
    ca, sa = math.cos(ang), math.sin(ang)
    P = lambda u, v: (x + u * ca - v * sa, y + u * sa + v * ca)
    outline = [P(*p) for p in pts_u] + [P(*p) for p in reversed(pts_d)]
    rib = [P(L * t, curl * L * t * t * t) for t in (0, .3, .6, .88)]
    return poly(outline, True), poly(rib)

def corner(st):
    plate = ("M120 22 L74 22 C64 10 52 2 38 4 C30 0 20 2 12 6 C6 10 2 18 4 26 C2 38 6 52 18 62 C14 70 22 78 22 84 L22 120 L120 120 Z")
    orn, rib = [], []
    cx, cy = 36, 36                                    # shell
    for k in range(11):
        a = math.radians(180 + k * 9)
        orn.append(("s", poly([(cx + 8 * math.cos(a), cy + 8 * math.sin(a)), (cx + 31 * math.cos(a), cy + 31 * math.sin(a))]), 4.4))
    rim = [(cx + (34 if k % 2 == 0 else 29) * math.cos(math.radians(180 + k * 4.5)), cy + (34 if k % 2 == 0 else 29) * math.sin(math.radians(180 + k * 4.5))) for k in range(21)]
    orn.append(("s", poly(rim), 4.2))
    orn.append(("f", circ(cx, cy, 9.5), 0))
    orn.append(("s", spiral(96, 44, 16, 3, math.pi * .98, 1.4, cw=True), 5.2))      # volutes
    orn.append(("s", spiral(44, 96, 16, 3, math.pi * .52, 1.4, cw=False), 5.2))
    orn.append(("s", "M62 38 C70 28 82 27 92 28", 5))
    orn.append(("s", "M38 62 C28 70 27 82 28 92", 5))
    for (x, y, a, L, W, c) in [(50, 50, 45, 56, 13, .12), (60, 42, 14, 40, 9, -.18), (42, 60, 76, 40, 9, .18),
                               (70, 30, -8, 28, 6, -.25), (30, 70, 98, 28, 6, .25)]:   # acanthus
        d, r = leaf(x, y, math.radians(a), L, W, lobes=3 if L > 35 else 2, curl=c)
        orn.append(("f", d, 0)); rib.append(r)
    orn.append(("f", circ(108, 108, 7), 0))                                           # rosette at the sight corner
    for k in range(8):
        a = k * math.pi / 4; orn.append(("f", circ(108 + 9 * math.cos(a), 108 + 9 * math.sin(a), 3), 0))
    return plate, orn, rib

def edge(st):
    plate = f"M{S} {E0} L{E1} {E0} L{E1} {S} L{S} {S} Z"
    orn, rib, grooves = [], [], []
    orn.append(("s", f"M{S-2} 28 L{E1+2} 28", 9))                                      # outer torus
    if st in ("baroque", "silver", "ebony", "bronze"):                                 # running vine, period 60
        pts = [(S + t, 54 + 9 * math.sin(2 * math.pi * t / 60)) for t in range(0, 181, 2)]
        orn.append(("s", poly([(S - 2, pts[0][1])] + pts + [(E1 + 2, pts[-1][1])]), 4.6))
        for k in range(3):
            x0 = S + 60 * k
            d, r = leaf(x0 + 15, 45, math.radians(-160), 14, 5.5, lobes=2, curl=.25); orn.append(("f", d, 0)); rib.append(r)
            d, r = leaf(x0 + 15, 45, math.radians(-20), 16, 6, lobes=2, curl=-.25); orn.append(("f", d, 0)); rib.append(r)
            d, r = leaf(x0 + 45, 63, math.radians(160), 14, 5.5, lobes=2, curl=-.25); orn.append(("f", d, 0)); rib.append(r)
            d, r = leaf(x0 + 45, 63, math.radians(20), 16, 6, lobes=2, curl=.25); orn.append(("f", d, 0)); rib.append(r)
            orn.append(("f", circ(x0 + 30, 54, 3.2), 0)); orn.append(("f", circ(x0 + 0, 54, 3.2), 0))
    else:                                                                              # laurel garland, period 15
        for k in range(12):
            x0 = S + 15 * k
            d, r = leaf(x0 + 1, 54, math.radians(-30), 16, 5, lobes=1); orn.append(("f", d, 0))
            d, r = leaf(x0 + 8, 54, math.radians(30), 16, 5, lobes=1); orn.append(("f", d, 0))
        orn.append(("s", f"M{S-2} 54 L{E1+2} 54", 2.6))
    for k in range(18):                                                                # bead row, period 10
        orn.append(("f", circ(S + 5 + 10 * k, 86, 4.3), 0))
    for k in range(12):                                                                # water leaves, period 15
        x0 = S + 15 * k
        orn.append(("f", f"M{x0+1} 112 C{x0+2} 104 {x0+5} 99 {x0+7.5} 97 C{x0+10} 99 {x0+13} 104 {x0+14} 112 Z", 0))
    orn.append(("s", f"M{S-2} 116 L{E1+2} 116", 3.6))                                 # sight fillet
    for y in (36, 76, 95):
        grooves.append(f"M{S} {y} L{E1} {y}")
    return plate, orn, rib, grooves

PAL = {  # plate light, plate dark, ornament, specular light
 "baroque": ("#e2bb5c", "#a87b26", "#dcb352", "#fff4cf"),
 "silver":  ("#d6d9de", "#8f949b", "#d2d5da", "#ffffff"),
 "laurel":  ("#e6c46a", "#ad8230", "#e0bb5c", "#fff4cf"),
 "ebony":   ("#2a221c", "#120e0b", "#d6ad4e", "#fff1c8"),
 "bronze":  ("#a4743a", "#5d3c18", "#c99a4a", "#ffe9bd"),
}
def filt(fid, blur, ss, sc, light, shadow):
    return f"""<filter id="{fid}" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">
 <feGaussianBlur in="SourceAlpha" stdDeviation="{blur}" result="b"/>
 <feDiffuseLighting in="b" surfaceScale="{ss}" diffuseConstant="1.3" lighting-color="#ffffff" result="d"><feDistantLight azimuth="225" elevation="40"/></feDiffuseLighting>
 <feComposite in="SourceGraphic" in2="d" operator="arithmetic" k1="1.32" result="lit"/>
 <feSpecularLighting in="b" surfaceScale="{ss}" specularConstant="{sc}" specularExponent="18" lighting-color="{light}" result="sp"><feDistantLight azimuth="225" elevation="40"/></feSpecularLighting>
 <feComposite in="lit" in2="sp" operator="arithmetic" k2="1" k3="1" result="o"/>
 <feComposite in="o" in2="SourceAlpha" operator="in" result="o2"/>
 <feDropShadow in="o2" dx="1.2" dy="1.6" stdDeviation="1.1" flood-color="#2a1803" flood-opacity="{shadow}"/>
</filter>"""

def svg(st):
    pl, pd, oc, light = PAL[st]
    c_plate, c_orn, c_rib = corner(st); e_plate, e_orn, e_rib, e_gr = edge(st)
    def four(inner): return "".join(f'<g transform="rotate({r} 200 200)">{inner}</g>' for r in (0, 90, 180, 270))
    plates = four(f'<path d="{c_plate}"/><path d="{e_plate}"/>')
    def ornpaths(lst): return "".join(f'<path d="{d}" fill="{oc}"/>' if k == "f" else f'<path d="{d}" fill="none" stroke="{oc}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>' for k, d, w in lst)
    orns = four(ornpaths(c_orn + e_orn) + "".join(f'<path d="{r}" fill="none" stroke="{oc}" stroke-width="1.8" stroke-linecap="round"/>' for r in c_rib + e_rib))
    grooves = four("".join(f'<path d="{g}"/>' for g in e_gr))
    defs = (f'<linearGradient id="gp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{pl}"/><stop offset=".45" stop-color="{pd}"/>'
            f'<stop offset=".55" stop-color="{pl}"/><stop offset="1" stop-color="{pd}"/></linearGradient>'
            + filt("fp", 4, 4, .45, light, .0) + filt("fo", 1.5, 5, 1.05, light, .6))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs>{defs}</defs>'
            f'<g filter="url(#fp)" fill="url(#gp)">{plates}</g>'
            f'<g fill="none" stroke="#000" stroke-opacity=".28" stroke-width="2">{grooves}</g>'
            f'<g filter="url(#fo)">{orns}</g></svg>')

def crest(st):
    pl, pd, oc, light = PAL[st]
    cx, cy = 70, 46; p = []
    for k in range(13):
        a = math.radians(180 + k * 15)
        p.append(f'<path d="{poly([(cx+9*math.cos(a), cy+9*math.sin(a)), (cx+36*math.cos(a), cy+36*math.sin(a))])}" fill="none" stroke="{oc}" stroke-width="4.6" stroke-linecap="round"/>')
    rim = [(cx + (39 if k % 2 == 0 else 33) * math.cos(math.radians(180 + k * 7.5)), cy + (39 if k % 2 == 0 else 33) * math.sin(math.radians(180 + k * 7.5))) for k in range(25)]
    p.append(f'<path d="{poly(rim)}" fill="none" stroke="{oc}" stroke-width="4.4" stroke-linejoin="round" stroke-linecap="round"/>')
    p.append(f'<path d="{spiral(22, 52, 14, 2.5, 0, 1.35, cw=False)}" fill="none" stroke="{oc}" stroke-width="5" stroke-linecap="round"/>')
    p.append(f'<path d="{spiral(118, 52, 14, 2.5, math.pi, 1.35, cw=True)}" fill="none" stroke="{oc}" stroke-width="5" stroke-linecap="round"/>')
    for (x, y, a, L, W, c) in [(44, 58, 200, 26, 7, .2), (96, 58, -20, 26, 7, -.2)]:
        d, r = leaf(x, y, math.radians(a), L, W, lobes=2, curl=c); p.append(f'<path d="{d}" fill="{oc}"/>')
    p.append(f'<path d="{circ(cx, cy, 10)}" fill="{oc}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 70" width="140" height="70"><defs>{filt("fo", 1.5, 5, 1.05, light, .6)}</defs>'
            f'<g filter="url(#fo)">{"".join(p)}</g></svg>')

if __name__ == "__main__":
  for st in PAL:
    (OUT / f"{st}.svg").write_text(svg(st), encoding="utf-8")
    (OUT / f"crest-{st}.svg").write_text(crest(st), encoding="utf-8")
  print("ok")
