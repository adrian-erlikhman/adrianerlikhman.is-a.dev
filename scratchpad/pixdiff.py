# -*- coding: utf-8 -*-
"""Strict render comparison: count pixels that differ at all, at one or more
render scales (a half-pixel rounding flip shows at one scale and not another).

usage: python pixdiff.py a.pdf b.pdf [scale ...]      (default: 3)
"""
import sys

import numpy as np
import pypdfium2 as pdfium


def render(path, scale):
    doc = pdfium.PdfDocument(path)
    return [np.asarray(doc[i].render(scale=scale).to_pil().convert("RGB")).astype(np.int16)
            for i in range(len(doc))]


a, b = sys.argv[1], sys.argv[2]
for scale in [float(s) for s in sys.argv[3:]] or [3.0]:
    ra, rb = render(a, scale), render(b, scale)
    if len(ra) != len(rb):
        print("scale %g: page count %d vs %d" % (scale, len(ra), len(rb)))
        continue
    for i, (x, y) in enumerate(zip(ra, rb)):
        n = int((np.abs(x - y).max(axis=2) > 0).sum()) if x.shape == y.shape else -1
        print("scale %-4g page %d: %s" % (scale, i, "shape differs" if n < 0 else "%d pixels differ" % n))
