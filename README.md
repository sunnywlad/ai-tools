# ai-tools

[Français](#français) · [English](#english)

## Français

Des petits outils réutilisables pour travailler avec Claude sur de vrais
projets. Chaque dossier contient un outil et son propre README.

- [decision-worksheet](decision-worksheet/) : découper un problème complexe en
  décisions atomiques, chacune avec sa propre conversation, au lieu d'une seule
  conversation linéaire.
- [whisper-writer](whisper-writer/) : dictée vocale locale en français, en
  streaming, sur un portable sans GPU (moteur Parakeet, vocabulaire favorisé).
  Dépôt séparé, inclus en submodule.
- [claude-session-budget](claude-session-budget/) : un plafond de consommation
  par session Claude Code sur la fenêtre de 5 h (`budget:25` en début de
  prompt), avec rappels et segment de status line. Dépôt séparé, inclus en
  submodule.

## English

Small, reusable tools for working with Claude on real projects. Each folder
holds one tool and its own README.

- [decision-worksheet](decision-worksheet/): break a complex problem into
  atomic decisions, each with its own conversation, instead of one linear chat.
- [whisper-writer](whisper-writer/): local French voice dictation, streaming,
  on a laptop with no GPU (Parakeet engine, favoured vocabulary). Separate
  repository, included as a submodule.
- [claude-session-budget](claude-session-budget/): a per-session consumption
  cap on the Claude Code 5-hour window (`budget:25` at the start of a prompt),
  with reminders and a status line segment. Separate repository, included as a
  submodule.
