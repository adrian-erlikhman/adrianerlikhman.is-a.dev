# -*- coding: utf-8 -*-
"""Last stage: deflate every content stream at level 9."""
import sys

from pypdf import PdfWriter

w = PdfWriter(clone_from=sys.argv[1])
for pg in w.pages:
    pg.compress_content_streams(level=9)
with open(sys.argv[2], "wb") as fh:
    w.write(fh)
print("wrote", sys.argv[2])
