export type Status = 'acté' | 'à trancher' | 'ouvert' | 'contradiction'
export type Item = { id: string; group: string; status: Status; title: string; body: string }
export type Answers = Record<string, string>

declare module 'claude-code' {
  interface PluginState {
    worksheet: { answers: Answers; items: Item[]; revs: Record<string, number> }
  }
}
