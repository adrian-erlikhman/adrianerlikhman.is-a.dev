# -*- coding: utf-8 -*-
"""Rebuild resume.pdf from the original upload: text edits + section reorder.

Two transformations, in one pass, always from the pristine 50 KB upload so only
one font subset is ever embedded.

TEXT EDITS  re-typeset nine blocks in place, and insert one new entry (Ledger)
            as two fresh lines under the competitions bullet, which itself stays
            untouched: the author wrapped that bullet wider than 545 pt, so
            re-setting it would cost a line.
REORDER     move whole sections by translating their existing text operators,
            which preserves the original glyphs and kerning exactly. Only the
            edited paragraphs are re-set; everything else is the author's own
            typesetting, moved.

The section rules live in a scaled space where page_y = 792 - rule_y * 0.5808,
so a section moving down by D page-points needs its rule_y raised by D / 0.5808.
"""
import io
import os
import sys

import matplotlib
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from pypdf import PdfReader, PdfWriter
from pypdf.generic import ContentStream, FloatObject, NameObject

FD = os.path.join(os.path.dirname(matplotlib.__file__), "mpl-data", "fonts", "ttf")
for nm, fn in (("DVS", "DejaVuSerif.ttf"), ("DVSB", "DejaVuSerif-Bold.ttf"),
               ("DVSI", "DejaVuSerif-Italic.ttf"), ("DVSBI", "DejaVuSerif-BoldItalic.ttf")):
    pdfmetrics.registerFont(TTFont(nm, os.path.join(FD, fn)))

S, LEAD, WRAP, XB = 6.92, 7.49, 545.0, 30.72
RULE_S = 0.5808
DOT, DASH, NDASH, TIMES, GE = "·", "—", "–", "×", "≥"

# ---------------------------------------------------------------- edits ----
# band  device-space y range whose original text blocks are stripped (None for
#       a pure insertion, which strips nothing)
# sec   section whose translation the redrawn lines take; defaults to the
#       section of `first`. An insertion below a section's last original line
#       can fall under the NEXT section's original heading, so it must say.
EDITS = [
    # Legatum follows the 13 Sep 2026 JHSS revision: Adrian is first author, and
    # there is no advisor (its acknowledgements say no mentor supervised it).
    dict(name="Legatum head", band=(611.4, 618.9), first=613.36, expect=1, x=23.23, runs=[
        ("DVSB", "Legatum Prosperity Index Robustness Audit"),
        ("DVS", " %s First Author %s " % (DASH, DOT)),
        ("DVSI", "Co-author: Ryan Erlikhman")]),
    dict(name="Legatum body", band=(595.8, 610.8), first=605.29, expect=3, runs=[
        ("DVS", "Designed the study and derived rank leverage, c²(1 − ρ²), the only part of a weight's "
                "influence that can reorder countries; it tracks Sobol' total effects under all four "
                "normalizations (Spearman 0.91–0.99). Rankings hold globally (median Spearman ≥ 0.9899 "
                "under three weight priors) but not mid-table, where the median 90% rank interval is 36 "
                "places."),
        ("DVSB", " Accepted,"), ("DVSBI", " Journal of High School Science.")]),
    dict(name="Kiddom head", band=(366.8, 374.3), first=370.75, expect=1, x=23.23,
         right=(571.19, "DVS", "2026"), runs=[
        ("DVSB", "Kiddom"),
        ("DVS", " %s Machine Learning Intern %s " % (DASH, DOT)),
        ("DVSI", "K%s12 EdTech" % NDASH)]),
    dict(name="Kiddom body", band=(353.7, 366.2), first=362.68, expect=2, runs=[
        ("DVS", "On the data-science team, applying ML to educational content and product usage "
                "data with Director of Data Science Flora Xu. Turning classroom usage into models "
                "the product team can act on, and keeping them honest in production.")]),
    dict(name="SafeJew", band=(446.5, 461.5), first=456.03, expect=3, runs=[
        ("DVS", "Live map of antisemitic incidents across Greater LA, in production at safejew.org: "
                "800 plotted in LA (100 individually sourced with a citable link on each, the rest "
                "from the ADL H.E.A.T. Map) plus 594 across 33 campuses nationwide. A daily GitHub "
                "Action scrapes news and geocodes it through a dependency-free LA gazetteer written "
                "for this. Next.js, TypeScript, Supabase on Vercel; rebuilt as V2 for a Hillel "
                "International pitch.")]),
    # Ledger closes the competitions run. Its first baseline (one lead under the
    # eDNAtlas line at 282.00) is below EDUCATION's original heading at 271.05,
    # hence sec="SELECTED".
    dict(name="Ledger", band=None, sec="SELECTED", first=274.51, expect=2, runs=[
        ("DVSB", "Ledger"),
        ("DVS", " %s " % DASH),
        ("DVSB", "1st place, VISION HACK: South LA"),
        ("DVS", " (CD 9 Champion, U18; Hacker Fund %s City of LA Vision Lab, 2026): led the build of "
                "a corner-store compliance tracker and wrote its renewal calendar and two-pass vision "
                "pipeline, which scores a wholesale-order photo against the SNAP stocking rule." % TIMES)]),
    dict(name="EDUCATION", band=(243.7, 258.7), first=253.19, expect=2, runs=[
        ("DVS", "GPA 5.2 weighted / 4.0 unweighted %s SAT 1520 (Math 770 / EBRW 750) %s 11 AP courses "
                "completed, 6 more senior year, plus dual-enrollment linear algebra and programming "
                "(CS 119, Python)." % (DOT, DOT))]),
    dict(name="AIML Club", band=(148.0, 163.0), first=157.53, expect=1, runs=[
        ("DVSB", "AIML Club at LACES"),
        ("DVS", "%s Co-Founder & President; the weekly club (9 members, grades 9%s12) that grew into "
                "AIML-LI." % (DASH, NDASH))]),
    dict(name="HONORS 1", band=(112.3, 134.8), first=129.29, expect=3, runs=[
        ("DVS", "National Merit Semifinalist %s AP Scholar with Distinction %s JFEDLA Teen Innovation "
                "Grant %s Decode the Ocean Hackathon, 1st place %s VISION HACK: South LA, CD 9 Champion "
                "(U18) %s Code for Transportation, 3rd place %s Citadel Terminal Finalist %s YC Startup "
                "School ($30k+ credits) %s SIFMA Stock Market Game, top 5%% statewide (solo entrant) %s "
                "MTAC Piano, Level 9 candidate, five state-honors exams." % ((DOT,) * 9))]),
    dict(name="HONORS 2", band=(89.8, 112.3), first=106.81, expect=2, runs=[
        ("DVS", "Certiport ITS certifications: Software Development, Cybersecurity, Python, Data "
                "Analytics, AI, HTML/CSS %s Kaggle %s Google Generative AI Intensive %s Coursera Deep "
                "Learning Specialization (Andrew Ng) %s NVIDIA Deep Learning Fundamentals."
                % (DOT, TIMES, DOT, DOT))]),
]

# ------------------------------------------------- section layout plan -----
# (name, original heading baseline, original height, delta lines)
SECTIONS = [
    ("RESEARCH", 741.86, 172.30, +1),        # Legatum body gains a line
    ("VENTURES", 569.56, 131.97, +1),        # SafeJew gains a line
    ("PROFESSIONAL", 437.59, 93.35, 0),
    ("SELECTED", 344.24, 73.19, +2),         # Ledger adds two lines
    ("EDUCATION", 271.05, 36.30, 0),
    ("LEADERSHIP", 234.75, 95.67, -1),       # AIML Club loses a line
    ("HONORS", 139.08, 58.20, -1),           # coursework loses a line
    ("SKILLS", 80.88, 20.88, 0),
]
NEW_ORDER = ["PROFESSIONAL", "VENTURES", "RESEARCH", "SELECTED",
             "EDUCATION", "LEADERSHIP", "HONORS", "SKILLS"]
# content inside RESEARCH that sits BELOW the Legatum body and must take the
# extra line as well
RESEARCH_TAIL_ABOVE = 597.80      # anything with baseline < this, inside RESEARCH


def wrap(runs, width=WRAP):
    words = [(fn, w) for fn, t in runs for w in t.split(" ") if w]
    lines, cur, cw = [], [], 0.0
    for fn, w in words:
        ww = pdfmetrics.stringWidth(w, fn, S)
        sp = pdfmetrics.stringWidth(" ", fn, S) if cur else 0.0
        if cur and cw + sp + ww > width:
            lines.append(cur); cur, cw = [(fn, w)], ww
        else:
            cur.append((fn, (" " if cur else "") + w)); cw += sp + ww
    if cur:
        lines.append(cur)
    return lines


def plan():
    h = {n: ht + d * LEAD for n, _, ht, d in SECTIONS}
    old = {n: t for n, t, _, _ in SECTIONS}
    top, deltas, tops = 741.86, {}, {}
    for n in NEW_ORDER:
        tops[n] = top
        deltas[n] = top - old[n]
        top -= h[n]
    return deltas, tops, top


def _mul(a, b):
    return (a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3], a[2]*b[0]+a[3]*b[2],
            a[2]*b[1]+a[3]*b[3], a[4]*b[0]+a[5]*b[2]+b[4], a[4]*b[1]+a[5]*b[3]+b[5])


IDENT = (1, 0, 0, 1, 0, 0)
SHOW = (b"Tj", b"TJ", b"'", b'"')


def section_of(y):
    for n, top, _, _ in SECTIONS:
        if y <= top + 0.5:
            cur = n
        else:
            break
    # SECTIONS is top-down; find the last whose top >= y
    best = None
    for n, top, _, _ in SECTIONS:
        if top + 0.5 >= y:
            best = n
    return best


def transform(page, writer, deltas, edits):
    """Translate every text block by its section delta, dropping blocks that
    fall inside an edited band (those are redrawn by the overlay)."""
    bands = [e["band"] for e in edits if e["band"]]
    cs = ContentStream(page.get_contents(), writer)
    out, ctm, stack = [], IDENT, []
    block, in_block, blk_y = [], False, None
    tm = tlm = IDENT
    leading = 0.0
    dropped = 0
    moved = 0
    for operands, op in cs.operations:
        if op == b"BT":
            in_block, block, blk_y = True, [(operands, op)], None
            tm = tlm = IDENT
            continue
        if in_block:
            block.append((operands, op))
            if op == b"Tm":
                tm = tlm = tuple(float(v) for v in operands)
            elif op in (b"Td", b"TD"):
                tx, ty = float(operands[0]), float(operands[1])
                if op == b"TD":
                    leading = -ty
                tlm = _mul((1, 0, 0, 1, tx, ty), tlm); tm = tlm
            elif op == b"TL":
                leading = float(operands[0])
            elif op == b"T*":
                tlm = _mul((1, 0, 0, 1, 0, -leading), tlm); tm = tlm
            elif op in SHOW and blk_y is None:
                blk_y = _mul(tm, ctm)[5]
            elif op == b"ET":
                in_block = False
                if blk_y is None:
                    out.extend(block); continue
                if any(lo <= blk_y <= hi for lo, hi in bands):
                    dropped += 1
                    continue
                sec = section_of(blk_y)
                d = deltas.get(sec, 0.0)
                if sec == "RESEARCH" and blk_y < RESEARCH_TAIL_ABOVE - 0.5:
                    d -= LEAD                       # below the Legatum body
                if sec == "VENTURES":
                    pass                            # SafeJew is last; nothing below it
                if abs(d) > 1e-9:
                    nb = []
                    for o2, p2 in block:
                        if p2 == b"Tm":
                            v = [float(z) for z in o2]
                            v[5] += d / (ctm[3] if ctm[3] else 1.0)
                            o2 = [FloatObject(z) for z in v]
                        nb.append((o2, p2))
                    block = nb
                    moved += 1
                out.extend(block)
            continue
        if op == b"q":
            stack.append(ctm)
        elif op == b"Q":
            ctm = stack.pop() if stack else IDENT
        elif op == b"cm":
            ctm = _mul(tuple(float(v) for v in operands), ctm)
        elif op in (b"m", b"l", b"c", b"v", b"y", b"re"):
            # bullet glyphs and section rules are vector paths, not text, so
            # they need the same translation the text around them got
            vals = [float(v) for v in operands]
            dy = ctm[3] if abs(ctm[3]) > 1e-9 else 1.0
            ys = [1] if op in (b"m", b"l", b"re") else list(range(1, len(vals), 2))
            page_y = vals[1] * dy + ctm[5]
            sec = section_of(page_y)
            d = deltas.get(sec, 0.0)
            if sec == "RESEARCH" and page_y < RESEARCH_TAIL_ABOVE - 0.5:
                d -= LEAD
            if abs(d) > 1e-9:
                for i in (list(range(1, len(vals), 2)) if op != b"re" else [1]):
                    vals[i] += d / dy
                operands = [FloatObject(v) for v in vals]
        out.append((operands, op))
    cs.operations = out
    page.replace_contents(cs)
    return dropped, moved


def main(src, dst):
    deltas, tops, bottom = plan()
    print("new section tops:")
    for n in NEW_ORDER:
        print("  %-13s %7.2f   (delta %+8.2f)" % (n, tops[n], deltas[n]))
    print("  page content ends at %.2f" % bottom)
    if bottom < 45:
        sys.exit("content would run past the bottom margin (%.2f)" % bottom)

    laid = []
    for e in EDITS:
        ls = wrap(e["runs"])
        if len(ls) != e["expect"]:
            sys.exit("%s wrapped to %d lines, expected %d" % (e["name"], len(ls), e["expect"]))
        laid.append(ls)

    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=(612, 792))
    for e, ls in zip(EDITS, laid):
        sec = e.get("sec") or section_of(e["first"])
        d = deltas.get(sec, 0.0)
        # No white-out rectangle: transform() strips the stale text blocks out
        # of the content stream, and a rect wide enough to cover a paragraph
        # also reaches the heading of the section below it once things move.
        c.setFillColorRGB(0, 0, 0)
        y = e["first"] + d
        if e.get("right"):
            rx, rfn, rtxt = e["right"]
            c.setFont(rfn, S); c.drawString(rx, y, rtxt)
        for line in ls:
            x = e.get("x", XB)
            for fn, txt in line:
                c.setFont(fn, S); c.drawString(x, y, txt)
                x += pdfmetrics.stringWidth(txt, fn, S)
            y -= LEAD
    c.showPage(); c.save(); buf.seek(0)

    w = PdfWriter(clone_from=src)
    dropped, moved = transform(w.pages[0], w, deltas, EDITS)
    print("dropped %d edited blocks, translated %d" % (dropped, moved))
    w.pages[0].merge_page(PdfReader(buf).pages[0])
    with open(dst, "wb") as fh:
        w.write(fh)
    print("wrote", dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
