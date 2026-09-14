# -*- coding: utf-8 -*-
"""Walk the text layer in content-stream order (as pypdf, PDFBox and a browser's
copy-paste do) and check that the page reads top to bottom, nothing doubled.

usage: python order_check.py file.pdf
"""
import sys

from pypdf import PdfReader

sys.stdout.reconfigure(encoding="utf-8")

# every heading and the first words of every entry, in the order they appear
KEYS = [
    "Adrian Erlikhman", "PROFESSIONAL EXPERIENCE", "Fjor Venture Capital", "Due diligence on 20+",
    "Alliance for SoCal Innovation", "Kiddom", "On the data-science team",
    "VENTURES & CIVIC TECHNOLOGY", "AI/ML Literacy Initiative", "Safe Routes LA", "SafeJew",
    "Live map of antisemitic incidents", "RESEARCH", "Comparative LLM Stylometry",
    "Cross-Lingual LLM Stylometry", "Legatum Prosperity Index", "Designed the study and derived",
    "Advanced Mathematics Research", "SELECTED TECHNICAL PROJECTS", "Regime-Aware Portfolio Optimizer",
    "Y Combinator Startup School 2026", "eDNAtlas", "Ledger", "EDUCATION",
    "Los Angeles Center for Enriched Studies", "GPA 5.2 weighted", "LEADERSHIP & ATHLETICS",
    "Competitive Fencing", "Jewish Student Union", "STEMsters", "AIML Club at LACES",
    "HONORS, SERVICE & COURSEWORK", "National Merit Semifinalist", "Certiport ITS certifications",
    "TECHNICAL SKILLS", "Python, TypeScript/JavaScript", "Spanish (intermediate).",
]

flat = " ".join(PdfReader(sys.argv[1]).pages[0].extract_text().split())
last, bad = -1, 0
for k in KEYS:
    pos, n = flat.find(k), flat.count(k)
    flag = ""
    if pos < 0:
        flag = "  <-- MISSING"
    elif pos < last:
        flag = "  <-- OUT OF ORDER"
    elif n != 1:
        flag = "  <-- appears %d times" % n
    bad += bool(flag)
    print("  %-40s at %6d%s" % (k, pos, flag))
    last = max(last, pos)
print("%s: %s" % (sys.argv[1], "reads in order, nothing doubled" if not bad else "%d problems" % bad))
