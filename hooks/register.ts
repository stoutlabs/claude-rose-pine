import type { EngineInterface, Register } from 'claude-code'

import { makeColors } from './make-colors.js'
import { type DarkVariant, PALETTES } from './palettes'

// Light mode is Rosé Pine Dawn; dark mode is Rosé Pine (main) or Moon.
// `/rose-pine moon` or `/rose-pine main` picks the dark variant, kept across sessions.

const VARIANT_KEY = 'darkVariant'

export function build(variant: DarkVariant) {
  const dark = PALETTES[variant]
  const { dawn } = PALETTES

  return makeColors({
    label: variant === 'moon' ? 'Rosé Pine Moon' : 'Rosé Pine',
    light: { roles: dawn.roles, gray: dawn.gray, git: dawn.git },
    dark: { roles: dark.roles, gray: dark.gray, git: dark.git },
  })
}

function isVariant(value: unknown): value is DarkVariant {
  return value === 'main' || value === 'moon'
}

async function apply($: EngineInterface, variant: DarkVariant) {
  const { theme, problems } = build(variant)
  const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

  if (unpainted !== undefined) {
    $.ui.toast(unpainted)
  }
  const set = await $.theme.set({ colors: theme })

  if (!set.isDrawn) {
    $.ui.status(set.reason)
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'rose-pine',
      description: 'Switch the Rosé Pine dark variant: main or moon',
      argumentHint: '[main|moon]',
    })
    const stored = await $.store.get(VARIANT_KEY)
    await apply($, isVariant(stored) ? stored : 'main')

    return next(e)
  })

  on('command.run', { command: 'rose-pine' }, async ($, e) => {
    const wanted = e.args.trim().toLowerCase()
    const current = await $.store.get(VARIANT_KEY)
    const now: DarkVariant = isVariant(current) ? current : 'main'

    if (wanted === '') {
      return { text: `Rosé Pine dark variant: ${now}. Use /rose-pine main or /rose-pine moon.` }
    }
    if (!isVariant(wanted)) {
      return { text: `Unknown variant "${wanted}". Use main or moon.` }
    }
    await $.store.set(VARIANT_KEY, wanted)
    await apply($, wanted)

    return { text: `Rosé Pine dark variant set to ${wanted}.` }
  })
}
