# Decision worksheet

A linear conversation is a poor fit for a complex problem whose choices depend
on one another. This instruction file makes Claude turn such a problem into a
decision document published as an artifact: every open question gets its own
answer field, its own back-and-forth and a status, grouped by subject rather
than by order of arrival.

## How it works

- Claude groups the decisions that depend on one another by subject.
- Each line carries a status: *acté* (settled), *à trancher* (yours to decide,
  with Claude's recommendation), *ouvert* (nobody has an answer yet),
  *contradiction* (two sources disagree).
- You answer in the browser, then paste the compiled answers back into the
  conversation. Claude folds each ruling into the same artifact: settled lines
  keep only their ruling, open ones keep a short history of the exchange.
- At the end, the page exports to PDF as a written record of every decision
  and its reasons.

## How to use it

- **Claude Code:** copy `decision-worksheet.md` into your memory folder
  (`~/.claude/projects/<project>/memory/`) and add a line pointing to it in
  `MEMORY.md`. Claude applies it when a discussion sprawls across too many
  open questions.
- **Claude.ai:** paste the content of `decision-worksheet.md` at the start of
  a conversation and ask for a decision worksheet on your problem.

Artifacts must be enabled for the page to be published.

## A limit worth knowing

The quality of the result depends on how well the model understands your
problem, because the model does the splitting, and the split is already a
first judgement call. You can do the split yourself: slower, but safer.

## Origin

Built while scoping the MVP of [Merion](https://github.com/sunnywlad/Merion),
an oracle-free wrapped-BTC DEX: forty decisions closed in five passes.
