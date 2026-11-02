# -*- coding: utf-8 -*-
"""Render og.png, the link-preview card for adrianerlikhman.is-a.dev.

Since 2 Nov 2026 (Adrian: the old card "is not great lets make some cool ass
unique shit"; he picked B, "the scrapbook", of three takes in _mock/og.html,
over A, a still of the chat, and C, a paper's title page): the card is
tools/og-card.html, screenshotted by headless Chrome. His name in Latin Modern
on the site's warm white and dot grid; three notes in the welcome's ballpoint
blue handwriting (Shantell Sans) with a pen arrow to a taped print of his Team
USA lunge at the Pan-Ams; his headshot as the welcome's polaroid, "hi, i'm
adrian!". The cards before it (the navy fade over the lunge, 15 Oct; chips;
chips beside the headshot) were drawn here with PIL and are in git history.

Cards get rendered small: ~300px in iMessage, ~360px in Slack. The name and
the two photos carry it there, so the notes are set large. Chat apps show a
still, so there is no animation.

Needs Chrome (set CHROME to its path if it isn't the default) and a network
connection for Google Fonts. Writes og.png at the repo root, or the path given:
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
