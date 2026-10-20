# worksheet-mod

[Français](#français) · [English](#english)

## Français

Un mod Claude Code : un volet de décision à côté du chat. Claude y publie les
questions ouvertes (titre, statut, contexte) ; tu réponds dans un champ par
ligne, puis Claude relit tes réponses d'un seul appel.

- Outil `worksheet` (`mcp__worksheet__show`) : avec des `items`, il publie ; sans
  `items`, il rend les réponses puis vide le volet.
- `replace: true` vide tout avant de publier ; `/worksheet clear` fait de même.
- Les réponses sont écrites dans le store à chaque saisie : rien n'est perdu si
  le volet se redessine.

### Installation

```sh
CLAUDE_CODE_PLUGIN_DIRS=/chemin/vers/worksheet-mod claude
```

Pour le rendre global, ajoute dans `~/.claude/settings.json` :

```json
{ "env": { "CLAUDE_CODE_PLUGIN_DIRS": "/chemin/vers/worksheet-mod" } }
```

### Raccourci

Dans `~/.claude/keybindings.json`, lie une touche à `abovePrompt:focus` :

```json
{ "bindings": [{ "context": "Chat", "bindings": { "ctrl+up": "abovePrompt:focus" } }] }
```

La même touche entre dans le volet et en sort. `focus` n'est qu'une requête :
elle est refusée si le composeur contient du texte.

### Limites

- API de plugins en accès anticipé : elle peut changer sans préavis.
- Le mod est enregistré au démarrage de la session : un changement de code
  demande de relancer `claude`, `/reload-plugins` ne suffit pas.
- Claude ne voit pas ta frappe, seulement les réponses lues par l'outil.

## English

A Claude Code mod: a decision pane beside the chat. Claude publishes open
questions (title, status, context); you answer in one field per line, then
Claude reads all your answers in a single call.

- `worksheet` tool (`mcp__worksheet__show`): with `items` it publishes; with no
  `items` it returns the answers, then empties the pane.
- `replace: true` wipes everything before publishing; `/worksheet clear` does
  the same.
- Answers are written to the store as you type, so nothing is lost if the pane
  redraws.

### Install

```sh
CLAUDE_CODE_PLUGIN_DIRS=/path/to/worksheet-mod claude
```

To make it global, add to `~/.claude/settings.json`:

```json
{ "env": { "CLAUDE_CODE_PLUGIN_DIRS": "/path/to/worksheet-mod" } }
```

### Shortcut

In `~/.claude/keybindings.json`, bind a key to `abovePrompt:focus`:

```json
{ "bindings": [{ "context": "Chat", "bindings": { "ctrl+up": "abovePrompt:focus" } }] }
```

The same key enters and leaves the pane. `focus` is only a request: it is
refused while the composer holds text.

### Limits

- The plugin API is early access and may change without notice.
- The mod registers at session start: a code change needs a relaunch of
  `claude`; `/reload-plugins` is not enough.
- Claude does not see your keystrokes, only the answers the tool reads.
