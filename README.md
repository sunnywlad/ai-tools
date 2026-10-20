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
- [worksheet-mod](worksheet-mod/) : un volet de décision à côté du chat, avec
  un champ de réponse par question ouverte, que Claude relit d'un seul appel.
- [claude-tokens_in_sessions](claude-tokens_in_sessions/) : un plafond de
  consommation par session Claude Code sur la fenêtre de 5 h (`count:25` en
  début de prompt), avec rappels, segment de status line, avertissement avant
  la limite de contexte et une barre de boutons (mod `count-bar`, installable
  par marketplace). Dépôt séparé, inclus en submodule.
- [codex-claude-bridge](codex-claude-bridge/) : les sessions Claude Code et
  Codex CLI en cours dialoguent entre elles, chaque conversation nommée restant
  séparée. Dépôt séparé, inclus en submodule.

## English

Small, reusable tools for working with Claude on real projects. Each folder
holds one tool and its own README.

- [decision-worksheet](decision-worksheet/): break a complex problem into
  atomic decisions, each with its own conversation, instead of one linear chat.
- [whisper-writer](whisper-writer/): local French voice dictation, streaming,
  on a laptop with no GPU (Parakeet engine, favoured vocabulary). Separate
  repository, included as a submodule.
- [worksheet-mod](worksheet-mod/): a decision pane beside the chat, one answer
  field per open question, read back by Claude in a single call.
- [claude-tokens_in_sessions](claude-tokens_in_sessions/): a per-session
  consumption cap on the Claude Code 5-hour window (`count:25` at the start of
  a prompt), with reminders, a status line segment, a warning before the
  context limit and a button bar (the `count-bar` mod, installable from a
  marketplace). Separate repository, included as a submodule.
- [codex-claude-bridge](codex-claude-bridge/): your live Claude Code and Codex
  CLI sessions talk to each other, each named conversation kept separate.
  Separate repository, included as a submodule.
