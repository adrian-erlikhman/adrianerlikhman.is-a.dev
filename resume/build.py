"""Build the two résumé PDFs the site links to, from the LaTeX sources here.

    python resume/build.py            # both
    python resume/build.py short      # just one

resume-short.tex -> resume.pdf       (one page; the default link)
resume-long.tex  -> resume-long.pdf  (the same house design, several pages)

Needs Tectonic (https://tectonic-typesetting.github.io), a one-file XeLaTeX
engine that fetches the TeX packages it needs on first run. Put it on PATH or
point TECTONIC at it. The build is reproducible: each PDF is dated from the
"Updated:" line in its .tex header, so rebuilding unchanged sources gives
byte-identical PDFs. Bump that line when you edit.

Each PDF is checked before it replaces the old one: its page count, and that
its text layer names every section once, in order, which is how a resume
parser reads it.
"""
import os
import re
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent

TARGETS = {
    "short": ("resume-short.tex", "resume.pdf", 1),
    "long": ("resume-long.tex", "resume-long.pdf", 3),
}
# How each section head reads in the text layer. Both are mono caps since
# 24 Sept, when the long one came back to the house design.
SECTIONS = {
    "short": ["PROFESSIONAL EXPERIENCE", "VENTURES & CIVIC TECHNOLOGY", "RESEARCH",
              "COMPETITIONS", "EDUCATION", "LEADERSHIP & ATHLETICS", "SKILLS"],
    "long": ["PROFESSIONAL EXPERIENCE", "VENTURES & CIVIC TECHNOLOGY", "RESEARCH",
             "COMPETITIONS & BUILDS", "TALKS & PRESENTATIONS", "EDUCATION",
             "LEADERSHIP & ATHLETICS", "HONORS", "SKILLS"],
}


def tectonic() -> str:
    exe = os.environ.get("TECTONIC") or shutil.which("tectonic")
    if not exe:
        sys.exit("tectonic not found: put it on PATH or set TECTONIC=/path/to/tectonic")
    return exe


def source_date(tex: Path) -> str:
    """The "Updated:" date in the .tex header, as SOURCE_DATE_EPOCH."""
    m = re.search(r"^%%\s+Updated:\s+(\d{4}-\d{2}-\d{2})", tex.read_text(encoding="utf-8"), re.M)
    if not m:
        sys.exit(f"{tex.name}: add a '%%  Updated: YYYY-MM-DD' line to the header")
    day = datetime.strptime(m.group(1), "%Y-%m-%d").replace(tzinfo=timezone.utc)
    return str(int(day.timestamp()))


def check(name: str, pdf: Path, pages: int) -> None:
    reader = PdfReader(pdf)
    if len(reader.pages) != pages:
        sys.exit(f"{pdf.name}: {len(reader.pages)} pages, expected {pages}; cut something")
    lines = [ln.strip() for p in reader.pages for ln in p.extract_text().splitlines()]
    heads = [ln for ln in lines if ln in SECTIONS[name]]
    if heads != SECTIONS[name]:
        sys.exit(f"{pdf.name}: section heads read {heads}, expected {SECTIONS[name]}")


def build(name: str) -> None:
    tex_name, pdf_name, pages = TARGETS[name]
    tex = HERE / tex_name
    env = dict(os.environ, SOURCE_DATE_EPOCH=source_date(tex))
    with tempfile.TemporaryDirectory() as tmp:
        run = subprocess.run([tectonic(), "-X", "compile", "-Z", "deterministic-mode",
                              "-o", tmp, str(tex)], env=env, capture_output=True, text=True,
                             encoding="utf-8", errors="replace")
        if run.returncode:
            sys.exit(f"{tex_name} failed:\n{run.stdout}\n{run.stderr}")
        built = Path(tmp) / (tex.stem + ".pdf")
        check(name, built, pages)
        shutil.copyfile(built, ROOT / pdf_name)
    print(f"{tex_name} -> {pdf_name}: {pages} page(s), {(ROOT / pdf_name).stat().st_size:,} bytes")


if __name__ == "__main__":
    for name in sys.argv[1:] or list(TARGETS):
        build(name)
