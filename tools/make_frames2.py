"""Eight distinct carved frames, one per project (3 Nov, Adrian: "make the frames a little more different for each one").
Each mixes a finish, a corner and a frieze, so no two look alike. Reuses the helpers and lighting of make_frames.py.
Writes img/frames/f-<project>.svg, the eight frames on the homepage's museum wall: python tools/make_frames2.py"""
import math, sys, pathlib
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import make_frames as M
from make_frames import poly, circ, spiral, leaf, filt, S, E0, E1
OUT = M.OUT

PAL = {  # plate light, plate dark, ornament, specular
 "gold":      ("#e2bb5c", "#a87b26", "#dcb352", "#fff4cf"),
 "palegold":  ("#efd58a", "#b89344", "#e8c96f", "#fff8dc"),
 "ebony":     ("#2a221c", "#120e0b", "#d6ad4e", "#fff1c8"),
 "silver":    ("#d6d9de", "#8f949b", "#d2d5da", "#ffffff"),
 "bronze":    ("#a4743a", "#5d3c18", "#c99a4a", "#ffe9bd"),
 "verdigris": ("#8fae96", "#4d6b57", "#cfb15a", "#f4ffe8"),
 "walnut":    ("#7a5233", "#3e2614", "#d3aa52", "#fff1c8"),
 "cream":     ("#f4ecda", "#cdbf9d", "#d4ac50", "#fff8e0"),
}
FRAMES = {  # project: finish, corner, frieze
 "aimlli":     ("gold", "shell", "vine"),
 "safejew":    ("palegold", "palmette", "laurel"),
 "hivemind":   ("ebony", "rosette", "guilloche"),
 "monte":      ("silver", "shell", "rope"),
 "ledger":     ("bronze", "rosette", "flute"),
 "ednatlas":   ("verdigris", "palmette", "wave"),
 "saferoutes": ("walnut", "scroll", "eggdart"),
 "citadel":    ("cream", "scroll", "vine"),
}
PLATE_C = "M120 22 L74 22 C64 10 52 2 38 4 C30 0 20 2 12 6 C6 10 2 18 4 26 C2 38 6 52 18 62 C14 70 22 78 22 84 L22 120 L120 120 Z"

def corner(kind):
    if kind == "shell":
        _, orn, rib = M.corner("baroque"); return orn, rib
    orn, rib = [], []
    if kind == "rosette":
        cx, cy = 54, 54
        for k in range(10):
            a = k * math.pi / 5 + math.pi / 10
            d, r = leaf(cx, cy, a, 34, 8.5, lobes=2, curl=.08); orn.append(("f", d, 0)); rib.append(r)
        orn.append(("f", circ(cx, cy, 12), 0))
        orn.append(("s", circ(cx, cy, 17), 3))
        for k in range(10):
            a = k * math.pi / 5
            orn.append(("f", circ(cx + 21 * math.cos(a), cy + 21 * math.sin(a), 2.6), 0))
    elif kind == "palmette":
        for i, ang in enumerate((8, 27, 45, 63, 82)):
            L = 64 if ang == 45 else (52 if ang in (27, 63) else 40)
            d, r = leaf(14, 14, math.radians(ang), L, 9 if ang == 45 else 7.5, lobes=3 if L > 45 else 2, curl=(ang - 45) / 220)
            orn.append(("f", d, 0)); rib.append(r)
        orn.append(("f", circ(16, 16, 10), 0))
        orn.append(("s", spiral(92, 40, 12, 2.5, math.pi, 1.3, cw=True), 4.6))
        orn.append(("s", spiral(40, 92, 12, 2.5, math.pi / 2, 1.3, cw=False), 4.6))
        orn.append(("f", circ(108, 108, 6), 0))
    elif kind == "scroll":
        orn.append(("s", spiral(58, 34, 18, 3, math.pi * .9, 1.45, cw=True), 5.4))
        orn.append(("s", spiral(34, 58, 18, 3, math.pi * .6, 1.45, cw=False), 5.4))
        orn.append(("s", "M20 20 C30 22 36 28 40 34", 5)); orn.append(("s", "M20 20 C22 30 28 36 34 40", 5))
        for (x, y, a, L, W, c) in [(46, 46, 45, 50, 11, 0), (80, 30, 0, 32, 6, -.2), (30, 80, 90, 32, 6, .2)]:
            d, r = leaf(x, y, math.radians(a), L, W, lobes=2, curl=c); orn.append(("f", d, 0)); rib.append(r)
        orn.append(("f", circ(14, 14, 8), 0))
    return orn, rib

def frieze(kind):
    orn, rib = [], []
    if kind == "vine":
        _, o, r, _ = M.edge("baroque")
        # keep only the vine part (between the outer torus and the bead row)
        return [x for x in o if x[2] != 9 and not (x[0] == "f" and "a4.3" in x[1]) and "112" not in x[1] and not x[1].startswith(f"M{S-2} 116")], r
    if kind == "laurel":
        for k in range(12):
            x0 = S + 15 * k
            d, _ = leaf(x0 + 1, 54, math.radians(-30), 16, 5, lobes=1); orn.append(("f", d, 0))
            d, _ = leaf(x0 + 8, 54, math.radians(30), 16, 5, lobes=1); orn.append(("f", d, 0))
        orn.append(("s", f"M{S-2} 54 L{E1+2} 54", 2.6))
    elif kind == "rope":
        for k in range(21):
            x0 = S - 4 + 9 * k
            orn.append(("s", f"M{x0} 66 C{x0+3} 60 {x0+7} 48 {x0+12} 42", 6.2))
        orn.append(("s", f"M{S-2} 38 L{E1+2} 38", 2.4)); orn.append(("s", f"M{S-2} 70 L{E1+2} 70", 2.4))
    elif kind == "guilloche":
        for k in range(10):
            x0 = S + 9 + 18 * k
            orn.append(("s", circ(x0, 54, 11), 3.6)); orn.append(("f", circ(x0, 54, 3.4), 0))
        orn.append(("s", f"M{S-2} 40 L{E1+2} 40", 2.2)); orn.append(("s", f"M{S-2} 68 L{E1+2} 68", 2.2))
    elif kind == "wave":
        for k in range(6):
            x0 = S + 30 * k
            orn.append(("s", f"M{x0} 64 C{x0+6} 64 {x0+7} 44 {x0+17} 44", 4.4))
            orn.append(("s", spiral(x0 + 18, 53, 9, 2, -math.pi / 2, 1.0, cw=True), 4.4))
            orn.append(("s", f"M{x0+27} 56 C{x0+28} 62 {x0+29} 64 {x0+30} 64", 4.4))
    elif kind == "flute":
        for k in range(30):
            orn.append(("s", f"M{S + 3 + 6 * k} 40 L{S + 3 + 6 * k} 68", 3.4))
        orn.append(("s", f"M{S-2} 36 L{E1+2} 36", 2.4)); orn.append(("s", f"M{S-2} 72 L{E1+2} 72", 2.4))
    elif kind == "eggdart":
        for k in range(9):
            x0 = S + 20 * k
            orn.append(("f", f"M{x0+10} 54 m-7 0 a7 10 0 1 0 14 0 a7 10 0 1 0 -14 0", 0))
            orn.append(("s", f"M{x0+10} 54 m-9.5 0 a9.5 12.5 0 1 0 19 0", 2.4))
            orn.append(("s", f"M{x0} 42 L{x0} 68", 3))
    return orn, rib

def edge_common(beads=True):
    o = [("s", f"M{S-2} 28 L{E1+2} 28", 9)]
    if beads:
        o += [("f", circ(S + 5 + 10 * k, 86, 4.3), 0) for k in range(18)]
    else:
        o += [("s", f"M{S-2} 86 L{E1+2} 86", 7)]
    o += [("f", f"M{S+15*k+1} 112 C{S+15*k+2} 104 {S+15*k+5} 99 {S+15*k+7.5} 97 C{S+15*k+10} 99 {S+15*k+13} 104 {S+15*k+14} 112 Z", 0) for k in range(12)]
    o.append(("s", f"M{S-2} 116 L{E1+2} 116", 3.6))
    return o

def svg(project):
    fin, ck, fk = FRAMES[project]
    pl, pd, oc, light = PAL[fin]
    c_orn, c_rib = corner(ck); f_orn, f_rib = frieze(fk)
    e_orn = edge_common(beads=fk not in ("rope", "flute")) + f_orn
    def four(inner): return "".join(f'<g transform="rotate({r} 200 200)">{inner}</g>' for r in (0, 90, 180, 270))
    plates = four(f'<path d="{PLATE_C}"/><path d="M{S} {E0} L{E1} {E0} L{E1} {S} L{S} {S} Z"/>')
    def ornpaths(lst): return "".join(f'<path d="{d}" fill="{oc}"/>' if k == "f" else f'<path d="{d}" fill="none" stroke="{oc}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>' for k, d, w in lst)
    orns = four(ornpaths(c_orn + e_orn) + "".join(f'<path d="{r}" fill="none" stroke="{oc}" stroke-width="1.8" stroke-linecap="round"/>' for r in c_rib + f_rib))
    grooves = four("".join(f'<path d="M{S} {y} L{E1} {y}"/>' for y in (36, 76, 95)))
    defs = (f'<linearGradient id="gp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{pl}"/><stop offset=".45" stop-color="{pd}"/>'
            f'<stop offset=".55" stop-color="{pl}"/><stop offset="1" stop-color="{pd}"/></linearGradient>'
            + filt("fp", 4, 4, .45, light, .0) + filt("fo", 1.5, 5, 1.05, light, .6))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs>{defs}</defs>'
            f'<g filter="url(#fp)" fill="url(#gp)">{plates}</g><g fill="none" stroke="#000" stroke-opacity=".28" stroke-width="2">{grooves}</g>'
            f'<g filter="url(#fo)">{orns}</g></svg>')

for p in FRAMES:
    (OUT / f"f-{p}.svg").write_text(svg(p), encoding="utf-8")
print("ok", len(FRAMES))
