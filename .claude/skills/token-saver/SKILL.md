---
name: token-saver
description: Spend the fewest tokens that still get the task right - choose the model tier and effort for each piece of work (haiku scout, sonnet builder, opus reviewer), decide whether to delegate at all, and keep context small. Use at the start of any multi-step task, before spawning any subagent or workflow, and whenever the user mentions token usage, cost, limits or which model to use.
---

# Token saver

The rule: the cheapest model that can do the piece of work correctly does it, and
nothing is delegated that is cheaper to do inline. A wrong answer that has to be
redone costs more than the tier you saved.

## 1. Delegate or not

Routing makes a dispatch cheaper; it does not make dispatching cheap. Every
subagent starts a fresh context and pays for its own setup.

- **Do it inline** when it is a handful of tool calls, a lookup whose target you
  know, or a one-line edit. Ten one-line edits are one inline pass, not ten agents.
- **Delegate** when the work would put long output in your context (a search
  across many files, a build log, a page fetch) or when independent pieces can
  run in parallel. You keep the conclusion; the subagent keeps the noise.
- **Ask the user** when the task is ambiguous. Ambiguity is never a reason to
  move up a tier.

## 2. Which tier

| Work | Agent | Model | Effort |
|---|---|---|---|
| Find, list, count, grep, "where is", read a file and report, run a build or check | `scout` | haiku | low |
| Fetch and summarize a web page | `web-fetch` | (its own) | - |
| A specified edit, a copy change in several files, a script, a rebuild | `builder` | sonnet | medium |
| Anything with no named agent | pass `model: "sonnet"` | sonnet | medium |
| Review before merge, a bug two tries did not fix, cross-file fact check | `reviewer` | opus | high |
| Design choices, wording, anything the user must judge | main session | - | - |

Always pass `model` explicitly on an Agent call or a workflow `agent()` that has
no pinned agent; an unpinned subagent otherwise runs on the session's model,
which is usually the most expensive one. `scout` loads without CLAUDE.md, so put
any rule it needs in its brief.

## 3. Escalation

- Start at the tier in the table. Never open at the top.
- If a result is wrong or thin, go **exactly one step up**, and try more effort
  before a bigger model (`effort` low -> medium -> high, then haiku -> sonnet -> opus).
- A second failure one step up means the task was mis-scoped: stop, re-brief or
  ask the user. Do not keep climbing.
- A refusal is not a reason to escalate.
- `fable` is for the user to choose, not for a subagent: never dispatch one on it.
- Never downgrade `reviewer`; a review on a cheaper model is a weaker review,
  not a cheaper one.

## 4. Briefs and reports

- Brief with file paths and the exact question, not pasted file contents.
- Ask for a capped report ("at most 10 lines, `path:line` refs").
- One brief per unit of work. Batch related small items into one dispatch.
- Do not re-run a check a subagent already ran; do not delegate a check you can
  run in one command.

## 5. Context hygiene (main session)

- Read part of a file (`offset`/`limit`) or grep it; read a whole large file only
  when you need all of it. `index.html`, `assets/site.js` and `CLAUDE.md` are large.
- Pipe long command output through `tail`/`head` or a filter; never print a full
  build log or a minified file.
- Send independent tool calls in one message.
- Do not re-read a file you just edited, and do not re-derive facts already in
  the conversation.
- Keep replies short: the result, what was verified, what is open. No recap of
  the diff.
- Keep effort stable inside a session; changing it mid-session breaks the prompt
  cache.

## 6. What the user can do (say it once, when cost comes up)

- `/model sonnet` for routine site edits; `/model opusplan` to plan on Opus and
  execute on Sonnet; the top model only for the hard session.
- `/effort low` or `medium` for routine work.
- `/clear` between unrelated tasks; `/compact` with a focus line before a long
  session grows; `/context` and `/usage` to see what is filling the window.
- Turn off connectors and plugins a session does not need: each one's tool list
  is paid for on every turn.
- Keep CLAUDE.md short (the docs suggest under 200 lines): it is loaded in full
  into every session and every subagent that does not omit it.

Modelled on the MIT-licensed AqueGen/model-routing, ahnafthaqeef/orchestrate-claude-skill,
nedjamez/claude-code-model-router and arturseo-geo/token-optimizer-skill.
