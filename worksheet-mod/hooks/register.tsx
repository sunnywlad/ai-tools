import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Answers, Item } from '../types'

const PANE = 'worksheet'
const TOOL = 'mcp__worksheet__show'
const answers = atom({ plugin: 'worksheet', key: 'answers' } as const, {} as Answers)
const items = atom({ plugin: 'worksheet', key: 'items' } as const, [] as Item[])
// one revision per field: a fresh Input key after each submit escapes the engine's post-submit blank
const revs = atom({ plugin: 'worksheet', key: 'revs' } as const, {} as Record<string, number>)

const RULE = {
  id: 'worksheet:rule',
  scope: 'session',
  text: [
    'Decision worksheet: when a reply would ask the user to decide on 5 or more items, or when the user asks for the worksheet,',
    `call ${TOOL} with the items instead of listing them in the text. Keep ids stable across calls (a1, a2, ...).`,
    'Each item: id, group (subject), status (à trancher, ouvert, contradiction), title, body (stakes, causes, consequences, and your recommendation). Never send settled items (acté): the user wants only open questions. Give a line a new id when its question changes.',
    'The user answers in the pane. Read the answers back with the same tool and no items. For sprawling or complex decision sets, publish the artifact worksheet instead.',
  ].join(' '),
} as const

const hasField = (item: Item) => item.status !== 'acté'

async function clear($: Parameters<typeof update>[0]) {
  await update($, items, () => [])
  await update($, answers, () => ({}))
  await $.store.set('items', [])
  await $.store.set('answers', {})
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'worksheet', description: 'Open the decision worksheet pane' })
    await $.tool.register({
      name: 'show',
      isDeferred: false,
      description:
        'Show a decision worksheet in a pane beside the chat, one answer field per open item. Call it with items to publish them (same ids replace, others stay). Call it with no items to read the user\'s answers back.',
      inputSchema: {
        type: 'object',
        properties: {
          replace: { type: 'boolean', description: 'true: drop every earlier item and answer before publishing these items' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                group: { type: 'string' },
                status: { type: 'string', enum: ['acté', 'à trancher', 'ouvert', 'contradiction'] },
                title: { type: 'string' },
                body: { type: 'string' },
              },
              required: ['id', 'group', 'status', 'title', 'body'],
            },
          },
        },
      },
    })
    const saved = await $.store.get('answers')
    const kept = await $.store.get('items')
    await update($, answers, () => (saved ?? {}) as Answers)
    await update($, items, () => (kept ?? []) as Item[])

    return next(e)
  })

  on('prompt.compose', async ($, e, next) => {
    const out = await next(e)

    return { sections: [...out.sections, RULE] }
  })

  on('command.run', { command: 'worksheet' }, async ($, e) => {
    if (e.args.trim() === 'clear') {
      await clear($)

      return { text: 'Worksheet cleared.' }
    }
    await $.ui.open({ id: PANE, title: 'Worksheet', focus: true, closeOnEscape: true, rows: 24 })

    return { text: 'Worksheet pane opened.' }
  })

  on('tool.call', { tool: TOOL }, async ($, e) => {
    const { items: given = [], replace = false } = e as unknown as { items?: Item[]; replace?: boolean }
    if (given.length > 0) {
      if (replace) await clear($)
      const before = await read($, items)
      // a line republished with another title is another question: its old answer is stale
      const changed = given.filter(g => before.some(b => b.id === g.id && b.title !== g.title)).map(g => g.id)
      if (changed.length > 0) {
        await update($, answers, all => Object.fromEntries(Object.entries(all).filter(([id]) => !changed.includes(id))))
        const kept = Object.fromEntries(Object.entries(((await $.store.get('answers')) ?? {}) as Answers).filter(([id]) => !changed.includes(id)))
        await $.store.set('answers', kept)
      }
      const ids = new Set(given.map(i => i.id))
      const merged = [...before.filter(i => !ids.has(i.id)), ...given]
      await update($, items, () => merged)
      await $.store.set('items', merged)
      await $.ui.open({ id: PANE, title: 'Worksheet', focus: true, closeOnEscape: true, rows: 24 })

      return { result: `Pane shows ${merged.length} items. Read the answers by calling this tool with no items.` }
    }
    const saved = ((await $.store.get('answers')) ?? {}) as Answers
    // answers are delivered once: the worksheet starts empty for the next round
    await clear($)

    return { result: JSON.stringify(saved) }
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Input, Button } = $.ui.resolve(e)
    // typing only writes the store: updating the atom redraws the pane and the redraw overwrites keystrokes in flight (fast dictation)
    const keep = async (id: string, text: string) => {
      if (text === '') return
      const all = { ...((await $.store.get('answers')) ?? {}), [id]: text }
      await $.store.set('answers', all)
    }
    const save = async (id: string, text: string) => {
      if (text === '') return
      const all = { ...((await $.store.get('answers')) ?? {}), [id]: text } as Answers
      await $.store.set('answers', all)
      await update($, answers, () => all)
      await update($, revs, r => ({ ...r, [id]: (r[id] ?? 0) + 1 }))
    }
    const saved = await read($, answers)
    const list = await read($, items)
    if (list.length === 0) return <Text dimColor>No items yet.</Text>
    const rev = await read($, revs)
    const groups = [...new Set(list.map(i => i.group))]
    const first = list.find(i => hasField(i) && !saved[i.id])?.id

    return (
      <Box flexDirection="column">
        <Text dimColor>Tab = champ suivant · ↑↓ = défiler · Entrée = valider le champ · Échap = rendre les touches</Text>
        {groups.map(group => (
          <Box flexDirection="column" marginTop={1}>
            <Text bold>{group}</Text>
            {list.filter(i => i.group === group).map(item => (
              <Box flexDirection="column">
                <Text>
                  {item.title} [{item.status}]
                </Text>
                <Text dimColor>{item.body}</Text>
                {hasField(item) && (
                  <Input
                    key={`ans:${item.id}:${rev[item.id] ?? 0}`}
                    placeholder="answer"
                    value={saved[item.id] ?? ''}
                    rows={2}
                    autoFocus={item.id === first ? true : undefined}
                    submitLabel="save"
                    onInput={text => keep(item.id, text)}
                    onSubmit={text => save(item.id, text)}
                  />
                )}
              </Box>
            ))}
          </Box>
        ))}
        <Box marginTop={1}>
          <Button
            key="done"
            variant="primary"
            onPress={async () => {
              await $.ui.close({ id: PANE })
              void $.prompt.submit({ text: 'Worksheet terminé, lis mes réponses.' })
            }}
          >
            Terminer et envoyer à Claude
          </Button>
        </Box>
      </Box>
    )
  })
}
