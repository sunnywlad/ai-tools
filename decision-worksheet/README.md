# Decision worksheet

[Français](#français) · [English](#english)

## Français

Une conversation linéaire est inadaptée à un problème complexe, dont les choix
dépendent les uns des autres. Ce fichier d'instructions demande à Claude de
transformer ce problème en document de décision publié comme artefact : chaque
question ouverte reçoit son propre champ de réponse, son propre échange et un
statut, le tout rangé par sujet et non par ordre d'arrivée.

### Comment ça marche

- Claude regroupe par sujet les décisions qui dépendent les unes des autres.
- Chaque ligne porte un statut : *acté*, *à trancher* (votre décision, avec la
  recommandation de Claude), *ouvert* (personne n'a encore la réponse),
  *contradiction* (deux sources se contredisent).
- Vous répondez dans le navigateur, puis vous recollez les réponses compilées
  dans la conversation. Claude les intègre au même artefact : une ligne
  tranchée ne garde que sa décision, une ligne encore ouverte garde un court
  historique de l'échange.
- À la fin, la page s'exporte en PDF : une trace écrite de chaque décision et
  de ses raisons.

### Comment l'utiliser

- **Sur claude.ai :** collez le contenu de `decision-worksheet.md` au début
  d'une conversation, puis demandez une fiche de décision sur votre problème.
- **Dans Claude Code :** copiez `decision-worksheet.md` dans votre dossier de
  mémoire (`~/.claude/projects/<projet>/memory/`) et ajoutez une ligne qui le
  pointe dans `MEMORY.md`. Claude l'applique dès qu'une discussion s'étale sur
  trop de questions ouvertes.

Les artefacts doivent être activés pour que la page soit publiée.

### Une limite à connaître

La qualité du résultat dépend de la compréhension que le modèle a de votre
problème, car c'est lui qui fait le découpage, et ce découpage est déjà un
premier arbitrage. Vous pouvez découper vous-même : plus long, mais plus sûr.

### Origine

Né pendant le cadrage du MVP de [Merion](https://github.com/sunnywlad/Merion),
un DEX de bitcoins enveloppés sans oracle : quarante décisions tranchées en
cinq passes.

## English

A linear conversation is a poor fit for a complex problem whose choices depend
on one another. This instruction file makes Claude turn such a problem into a
decision document published as an artifact: every open question gets its own
answer field, its own back-and-forth and a status, grouped by subject rather
than by order of arrival.

### How it works

- Claude groups the decisions that depend on one another by subject.
- Each line carries a status: *acté* (settled), *à trancher* (yours to decide,
  with Claude's recommendation), *ouvert* (nobody has an answer yet),
  *contradiction* (two sources disagree).
- You answer in the browser, then paste the compiled answers back into the
  conversation. Claude folds each ruling into the same artifact: settled lines
  keep only their ruling, open ones keep a short history of the exchange.
- At the end, the page exports to PDF as a written record of every decision
  and its reasons.

### How to use it

- **On claude.ai:** paste the content of `decision-worksheet.md` at the start
  of a conversation, then ask for a decision worksheet on your problem.
- **In Claude Code:** copy `decision-worksheet.md` into your memory folder
  (`~/.claude/projects/<project>/memory/`) and add a line pointing to it in
  `MEMORY.md`. Claude applies it when a discussion sprawls across too many
  open questions.

Artifacts must be enabled for the page to be published.

### A limit worth knowing

The quality of the result depends on how well the model understands your
problem, because the model does the splitting, and the split is already a
first judgement call. You can do the split yourself: slower, but safer.

### Origin

Built while scoping the MVP of [Merion](https://github.com/sunnywlad/Merion),
an oracle-free wrapped-BTC DEX: forty decisions closed in five passes.
