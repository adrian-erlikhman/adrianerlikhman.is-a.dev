# -*- coding: utf-8 -*-
"""Render og.png, the link-preview card for adrianerlikhman.is-a.dev.

Since 3 Nov 2026 it is the LaTeX card (tools/og-card.html): an editor with a
short LaTeX file on the left (document class "senior", packages nlp and epee,
research 5, hackathons 4, fencing Team USA) and, on the right, the title page
it compiles to: his name, "Los Angeles, Class of 2027" and a one-line abstract.
Adrian turned down the scrapbook card (2 Nov) and four plain takes ("really
basic ... i want something techy and unique and quirky"); this is take A of
four techy ones in _mock/og3.html (B a fencing scoring box at 15-14, C a
receipt on Ledger's blue, D a chip datasheet). Earlier cards are in git history.

Cards get rendered small: ~300px in iMessage, ~360px in Slack. The name on the
page carries it there; the code reads as texture until the card is opened large.
Chat apps show a still, so there is no animation.

Fonts: Latin Modern Roman comes from /fonts/ (the site's woff2). Latin Modern
Mono is lmmono10-regular.otf, copied from the Tectonic cache
(%LOCALAPPDATA%/TectonicProject/Tectonic/cache/bundles/data/<hash>/) into the
gitignored tools/fonts/. Needs Chrome (set CHROME to its path if it isn't the
default). Writes og.png at the repo root, or the path given:
    python tools/make_og.py [out.png]
"""
import functools
import http.server
import os
import subprocess
import sys
import tempfile
import threading

from PIL import Image

W, H = 1200, 630
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROME = os.environ.get(
    "CHROME", r"C:\Program Files\Google\Chrome\Application\chrome.exe")


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def serve():
    """Serve the repo on a free port: the card loads /fonts/ and the photos
    root-absolute, and Chrome won't load web fonts from file:// URLs."""
    srv = http.server.ThreadingHTTPServer(
        ("127.0.0.1", 0), functools.partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


def main(out):
    srv = serve()
    url = "http://127.0.0.1:%d/tools/og-card.html" % srv.server_address[1]
    with tempfile.TemporaryDirectory() as td:
        shot = os.path.join(td, "og.png")
        # the virtual-time budget lets the fonts and photos land before the shot
        subprocess.run([CHROME, "--headless=new", "--disable-gpu",
                        "--hide-scrollbars", "--force-device-scale-factor=1",
                        "--window-size=%d,%d" % (W, H),
                        "--virtual-time-budget=10000",
                        "--user-data-dir=" + os.path.join(td, "profile"),
                        "--screenshot=" + shot, url],
                       check=True, capture_output=True, timeout=120)
        im = Image.open(shot).convert("RGB")
    srv.shutdown()
    if im.size != (W, H):
        raise SystemExit("screenshot is %dx%d, not %dx%d" % (*im.size, W, H))
    im.save(out, format="PNG", optimize=True)
    print("wrote %s  %dx%d  %d bytes" % (out, W, H, os.path.getsize(out)))


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "og.png"))
