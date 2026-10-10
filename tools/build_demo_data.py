"""Build the data behind the two demos on /demos/.

    python tools/build_demo_data.py [--langllm PATH] [--complm PATH]

1. assets/guess-samples.json (LangLLM, "Which model wrote this?")
   Keeps the ten essays already in the file (seed 20260922) and adds, for each,
   what the paper's English classifier did with it: the 21-feature logistic
   regression (StandardScaler + LogisticRegression(C=1), as in
   langllm/analysis.py), refit leave-one-prompt-out so the model that judges
   an essay never saw its prompt. Stored per essay: the five probabilities,
   the prediction, and the features that pushed hardest toward it, with the
   essay's value and each model's English mean. The prediction must agree with
   results/rq1_cell_correct.csv, or the build stops.

2. assets/stylometry-model.json (CompLLM, "Does your writing read like a model?")
   The paper's 18 surface features (src/features.py, ported to JS in
   assets/site.js) and a logistic regression on the 190 chat-app essays
   (responses_v1.csv minus prompt M5): the paper's robustness classifier, run
   in the browser. The full fit scores pasted text; the five GroupKFold fold
   models score the sample essays, each by the fold that held out its prompt.
   The paper's 86.3% is its random forest; the file records the logistic
   regression's own prompt-disjoint accuracy, which is what the page quotes.

Both repos are read-only inputs. Re-run this rather than editing the JSON.
"""
from __future__ import annotations

import argparse
import json
import random
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GroupKFold, LeaveOneGroupOut
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

SITE = Path(__file__).resolve().parents[1]
HOME = Path.home()

LANGLLM_LABELS = {
    "mattr": ("vocabulary variety", "MATTR, 50-word window"),
    "hapax_rate": ("words used once", "share of tokens"),
    "mean_token_len": ("word length", "characters"),
    "zipf_slope": ("word-frequency slope", "Zipf"),
    "sent_len_mean": ("sentence length", "words"),
    "sent_len_sd": ("sentence-length spread", "SD, words"),
    "burstiness": ("sentence burstiness", "B"),
    "dep_depth": ("parse-tree depth", "levels"),
    "subord_rate": ("subordinate clauses", "per sentence"),
    "func_word_ratio": ("function words", "share of tokens"),
    "first_person_rate": ("first person", "per 1k words"),
    "para_count": ("paragraphs", "count"),
    "para_len_mean": ("paragraph length", "words"),
    "question_rate": ("questions", "share of sentences"),
    "connective_rate": ("connectives", "per 1k words"),
    "comma_per_1k": ("commas", "per 1k words"),
    "colon_per_1k": ("colons", "per 1k words"),
    "dash_per_1k": ("dashes", "per 1k words"),
    "semicolon_per_1k": ("semicolons", "per 1k words"),
    "bigram_entropy": ("character-pair entropy", "bits"),
    "digit_rate": ("digits", "per 1k characters"),
}

COMPLM_LABELS = {
    "word_count": ("length", "words"),
    "ttr": ("vocabulary variety", "type-token ratio"),
    "hapax_rate": ("words used once", "share of words"),
    "avg_word_len": ("word length", "characters"),
    "avg_sent_len": ("sentence length", "words"),
    "sent_len_sd": ("sentence-length spread", "SD, words"),
    "sent_count": ("sentences", "count"),
    "passive_rate": ("passive voice", "per 100 words"),
    "flesch_reading_ease": ("reading ease", "Flesch"),
    "flesch_kincaid_grade": ("grade level", "Flesch-Kincaid"),
    "gunning_fog": ("fog index", "Gunning"),
    "hedge_per_100w": ("hedges", "per 100 words"),
    "para_count": ("paragraphs", "count"),
    "avg_para_len": ("paragraph length", "words"),
    "comma_per_100w": ("commas", "per 100 words"),
    "emdash_per_100w": ("dashes", "per 100 words"),
    "colon_per_100w": ("colons", "per 100 words"),
    "semicolon_per_100w": ("semicolons", "per 100 words"),
}


def lr():
    return make_pipeline(StandardScaler(), LogisticRegression(C=1.0, max_iter=5000, random_state=2026))


def pushes(pipe, x, k):
    """Each feature's push toward class k, relative to the average class:
    z_j * (w_kj - mean_c w_cj). Positive means it pointed to k."""
    sc, clf = pipe[0], pipe[-1]
    z = (x - sc.mean_) / sc.scale_
    w = clf.coef_
    return z * (w[k] - w.mean(axis=0)), z


def r(v, n=4):
    return float(round(float(v), n))


# ----------------------------------------------------------------- LangLLM
def build_langllm(root: Path) -> None:
    sys.path.insert(0, str(root))
    from langllm.features import FEATURE_NAMES  # noqa: E402
    assert set(FEATURE_NAMES) == set(LANGLLM_LABELS)

    feats = pd.read_csv(root / "data/features/features.csv")
    en = feats[feats.lang == "en"].reset_index(drop=True)
    assert len(en) == 120 and not en[FEATURE_NAMES].isna().any().any()
    cells = pd.read_csv(root / "results/rq1_cell_correct.csv")
    truth = dict(cells[cells.lang == "en"][["cell_id", "correct"]].itertuples(index=False))

    X = en[FEATURE_NAMES].to_numpy(float)
    y = en.model_key.to_numpy()
    g = en.prompt_id.to_numpy()

    # Check the refit reproduces the paper's English cells before trusting it.
    pred = np.empty_like(y, dtype=object)
    for tr, te in LeaveOneGroupOut().split(X, y, g):
        pred[te] = lr().fit(X[tr], y[tr]).predict(X[te])
    agree = [int(p == t) == truth[c] for c, p, t in zip(en.cell_id, pred, y)]
    assert all(agree), f"refit disagrees with rq1_cell_correct on {agree.count(False)} essays"
    acc = float((pred == y).mean())

    means = en.groupby("model_key")[FEATURE_NAMES].mean()
    path = SITE / "assets/guess-samples.json"
    data = json.loads(path.read_text(encoding="utf-8"))
    for s in data["samples"]:
        i = int(np.flatnonzero(en.cell_id == s["id"])[0])
        tr = g != g[i]
        pipe = lr().fit(X[tr], y[tr])
        classes = list(pipe[-1].classes_)
        proba = pipe.predict_proba(X[i:i + 1])[0]
        k = int(np.argmax(proba))
        assert (classes[k] == y[i]) == s["classifier_correct"], s["id"]
        push, z = pushes(pipe, X[i], k)
        top = np.argsort(-push)[:3]
        s["classifier"] = {
            "pred": classes[k],
            "proba": {c: r(p, 3) for c, p in zip(classes, proba)},
            "why": [{
                "f": FEATURE_NAMES[j],
                "v": r(X[i, j]),
                "z": r(z[j], 2),
                "means": {m: r(means.loc[m, FEATURE_NAMES[j]]) for m in classes},
            } for j in top if push[j] > 0],
        }
    data["features"] = {f: {"label": a, "unit": b} for f, (a, b) in LANGLLM_LABELS.items()}
    data["english"]["classifier_accuracy"] = r(acc, 3)
    data["note"] = (
        "Ten English essays, two per model, drawn at random (seed 20260922). classifier: the "
        "21-feature logistic regression refit leave-one-prompt-out, so the model scoring an essay "
        "never saw its prompt; its prediction matches results/rq1_cell_correct.csv. why: the "
        "features pushing hardest toward that prediction, z * (w_k - mean w), with each model's "
        "English mean. judges: each model's answer to 'which of these five models wrote this "
        "text?' (data/judge). Built by tools/build_demo_data.py.")
    path.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    print(f"guess-samples.json: 10 essays, English LOPO accuracy {acc:.3f}")


# ----------------------------------------------------------------- CompLLM
def build_complm(root: Path) -> None:
    sys.path.insert(0, str(root / "src"))
    from features import FEATURES, frame  # noqa: E402
    assert list(COMPLM_LABELS) == FEATURES

    df = pd.read_csv(root / "data/responses_v1.csv")
    df["prompt_id"] = df["prompt_id"].astype(str)
    df = df[df.prompt_id != "M5"].reset_index(drop=True)
    assert len(df) == 190
    X = frame(df["text"])[FEATURES].to_numpy(float)
    y = df.model.to_numpy()
    g = df.prompt_id.to_numpy()

    def export(pipe):
        sc, clf = pipe[0], pipe[-1]
        return {"mean": [r(v, 6) for v in sc.mean_], "scale": [r(v, 6) for v in sc.scale_],
                "coef": [[r(v, 6) for v in row] for row in clf.coef_],
                "intercept": [r(v, 6) for v in clf.intercept_]}

    folds, fold_of, oof = [], {}, np.empty_like(y, dtype=object)
    for f, (tr, te) in enumerate(GroupKFold(n_splits=5).split(X, y, g)):
        pipe = lr().fit(X[tr], y[tr])
        assert list(pipe[-1].classes_) == sorted(set(y))
        folds.append(export(pipe))
        oof[te] = pipe.predict(X[te])
        for p in set(g[te]):
            fold_of[p] = f
    acc = float((oof == y).mean())
    full = lr().fit(X, y)

    # Two essays per model, drawn at random; the order is shuffled too.
    rng = random.Random(20261010)
    picks = []
    for m in sorted(set(y)):
        idx = list(np.flatnonzero(y == m))
        picks += rng.sample(idx, 2)
    rng.shuffle(picks)
    samples = [{"author": y[i], "prompt": g[i], "fold": fold_of[g[i]],
                "pred": oof[i], "text": df.text[i]} for i in picks]

    means = pd.DataFrame(X, columns=FEATURES).assign(model=y).groupby("model").mean()
    out = {
        "source": "https://github.com/adrian-erlikhman/self-recognition-peer-baseline",
        "note": ("The 18 features of src/features.py (ported to JS in assets/site.js) and a "
                 "StandardScaler + LogisticRegression(C=1) fitted to the 190 chat-app essays. "
                 "full: fitted to all 190, scores pasted text. folds: the five GroupKFold-by-prompt "
                 "fits; each sample is scored by the fold that held out its prompt. "
                 "Built by tools/build_demo_data.py."),
        "classes": list(full[-1].classes_),
        "features": FEATURES,
        "labels": {f: {"label": a, "unit": b} for f, (a, b) in COMPLM_LABELS.items()},
        "hedges": None,
        "essays": 190, "prompts": int(len(set(g))),
        "lr_accuracy": r(acc, 3), "rf_accuracy": 0.863,
        "means": {m: [r(v) for v in means.loc[m]] for m in full[-1].classes_},
        "mean_words": r(np.mean(X[:, 0]), 1),
        "full": export(full),
        "folds": folds,
        "samples": samples,
    }
    import features as cf  # the hedge list is part of the feature definition
    out["hedges"] = sorted(cf.HEDGES)
    path = SITE / "assets/stylometry-model.json"
    path.write_text(json.dumps(out, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    # Parity fixture for the JS port: every essay's features, kept out of the site.
    fx = {"texts": list(df.text), "X": X.tolist(), "oof": list(oof), "fold": [fold_of[p] for p in g]}
    (Path(sys.argv[0]).resolve().parent / "stylometry-parity.json").write_text(json.dumps(fx), encoding="utf-8")
    print(f"stylometry-model.json: LR prompt-disjoint accuracy {acc:.3f} on 190 essays")


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--langllm", type=Path, default=SITE / "LangLLM")
    ap.add_argument("--complm", type=Path, default=HOME / "Downloads/complm")
    a = ap.parse_args()
    build_langllm(a.langllm)
    build_complm(a.complm)
