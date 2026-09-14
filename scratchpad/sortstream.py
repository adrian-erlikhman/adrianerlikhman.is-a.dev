# -*- coding: utf-8 -*-
"""Put page 1's text into visual reading order in the content stream.

rebuild.py moves sections by translating their text operators, then merges the
re-typeset paragraphs in as an overlay: a second content block, drawn after all
of the original and under its own CTM. That renders right, but a parser that
walks the stream (pypdf, PDFBox/Tika without position sorting, pdftotext -raw,
a browser's copy-paste) reads every re-typeset paragraph after TECHNICAL
SKILLS. The first version of this script sorted blocks only within their own
CTM space, which put the original sections in order but left the overlay
trailing at the end.

So every text block is lifted out and re-emitted at the end of the stream, at
the top level, in one sequence sorted by baseline (top down, then left to
right). Each goes inside its own q ... Q, preceded by:

  * the exact chain of `cm` operators it was drawn under, replayed in order
    from the default space, so its CTM is bit-identical to the original. A
    block wrapped in one inverse matrix instead lands ~1e-5 pt off, and a
    baseline that falls exactly on a half pixel then renders a pixel away.
  * the graphics state it inherited: ExtGState, fill colour and text state,
    defaults included, so nothing from its new neighbours leaks in.

State operators stay where they were (including any inside a lifted block), so
every path after them keeps its colour. Text and vector paths never overlap on
this page, so painting the text last changes nothing on screen.
"""
import sys

from pypdf import PdfWriter
from pypdf.generic import ContentStream, FloatObject, NumberObject

IDENT = (1, 0, 0, 1, 0, 0)
SHOW = (b"Tj", b"TJ", b"'", b'"')
STYLE = (b"gs", b"cs", b"CS", b"scn", b"SCN", b"sc", b"SC",
         b"rg", b"RG", b"g", b"G", b"k", b"K")
TEXT_STATE = (b"Tc", b"Tw", b"Tz", b"TL", b"Tf", b"Tr", b"Ts")
TEXT_DEFAULTS = ((b"Tc", [NumberObject(0)]), (b"Tw", [NumberObject(0)]), (b"Tz", [NumberObject(100)]),
                 (b"TL", [NumberObject(0)]), (b"Tr", [NumberObject(0)]), (b"Ts", [NumberObject(0)]))


def _mul(a, b):
    return (a[0]*b[0]+a[1]*b[2], a[0]*b[1]+a[1]*b[3], a[2]*b[0]+a[3]*b[2],
            a[2]*b[1]+a[3]*b[3], a[4]*b[0]+a[5]*b[2]+b[4], a[4]*b[1]+a[5]*b[3]+b[5])


class GState:
    """The parts of the graphics state a lifted text block depends on."""

    def __init__(self):
        self.ctm = IDENT
        self.text = {}      # text-state operator -> operands
        self.fill = []      # ops that reproduce the non-stroking colour
        self.gs = None      # operands of the last gs

    def copy(self):
        g = GState()
        g.ctm, g.text, g.fill, g.gs = self.ctm, dict(self.text), list(self.fill), self.gs
        return g

    def apply(self, operands, op):
        if op == b"cm":
            self.ctm = _mul(tuple(float(v) for v in operands), self.ctm)
        elif op in TEXT_STATE:
            self.text[op] = operands
        elif op == b"TD":
            self.text[b"TL"] = [FloatObject(-float(operands[1]))]
        elif op in (b"rg", b"g", b"k", b"cs"):
            self.fill = [(operands, op)]
        elif op in (b"sc", b"scn"):
            space = [f for f in self.fill if f[1] in (b"cs", b"rg", b"g", b"k")][:1]
            self.fill = space + [(operands, op)]
        elif op == b"gs":
            self.gs = operands

    def replay(self):
        ops = [(self.gs, b"gs")] if self.gs is not None else []
        ops.extend(self.fill or [([NumberObject(0)], b"g")])
        for k, default in TEXT_DEFAULTS:
            ops.append((self.text.get(k, default), k))
        if b"Tf" in self.text:
            ops.append((self.text[b"Tf"], b"Tf"))
        return ops


def sort_page(page, writer):
    cs = ContentStream(page.get_contents(), writer)
    st, chain, stack = GState(), [], []
    out, blocks, in_block = [], [], False

    for operands, op in cs.operations:
        if op == b"BT":
            in_block, block, pos = True, [(operands, op)], None
            snap, snap_chain = st.copy(), list(chain)
            tm = tlm = IDENT
            leading = float(st.text[b"TL"][0]) if b"TL" in st.text else 0.0
            continue
        if in_block:
            block.append((operands, op))
            st.apply(operands, op)
            if op == b"Tm":
                tm = tlm = tuple(float(v) for v in operands)
            elif op in (b"Td", b"TD"):
                tx, ty = float(operands[0]), float(operands[1])
                if op == b"TD":
                    leading = -ty
                tlm = _mul((1, 0, 0, 1, tx, ty), tlm)
                tm = tlm
            elif op == b"TL":
                leading = float(operands[0])
            elif op == b"T*":
                tlm = _mul((1, 0, 0, 1, 0, -leading), tlm)
                tm = tlm
            elif op in SHOW and pos is None:
                m = _mul(tm, st.ctm)
                pos = (m[5], m[4])
            elif op == b"ET":
                in_block = False
                if pos is None:                     # sets state, draws nothing: leave it
                    out.extend(block)
                    continue
                # the state it set still has to happen here, for what follows
                out.extend((o, p) for o, p in block if p in STYLE or p in TEXT_STATE)
                # round the baseline so a heading and its right-hand date, which
                # can differ by a hundredth of a point, still sort as one line
                blocks.append(dict(key=(-round(pos[0], 1), round(pos[1], 1)),
                                   ops=block, snap=snap, chain=snap_chain))
            continue

        if op == b"q":
            stack.append((st.copy(), list(chain)))
        elif op == b"Q":
            st, chain = stack.pop() if stack else (GState(), [])
        else:
            st.apply(operands, op)
            if op == b"cm":
                chain.append(operands)
        out.append((operands, op))
    if stack:
        sys.exit("unbalanced q/Q: %d levels still open at the end of the stream" % len(stack))

    for b in sorted(blocks, key=lambda b: b["key"]):
        out.append(([], b"q"))
        out.extend((c, b"cm") for c in b["chain"])
        out.extend(b["snap"].replay())
        out.extend(b["ops"])
        out.append(([], b"Q"))
    print("  lifted %d text blocks to the top level, CTM chains of length %s"
          % (len(blocks), sorted({len(b["chain"]) for b in blocks})))
    cs.operations = out
    page.replace_contents(cs)
    return len(blocks)


def main(src, dst):
    w = PdfWriter(clone_from=src)
    n = sort_page(w.pages[0], w)
    print("sorted %d text blocks" % n)
    with open(dst, "wb") as fh:
        w.write(fh)
    print("wrote", dst)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
