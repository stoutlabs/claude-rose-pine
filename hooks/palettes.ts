// Rosé Pine palettes (rosepinetheme.com), mapped onto the design system's anchors.
// Grays come from each variant's own base/surface/overlay; muted text is lifted
// from the palette's `subtle` where the original is too faint to read.

export type DarkVariant = 'main' | 'moon'

const roles = {
  accent: '#c4a7e7', // iris
  danger: '#eb6f92', // love
  success: '#3e8fb0', // pine (Moon's, a little brighter for text)
  warning: '#f6c177', // gold
  pro: '#ebbcba', // rose
}

const dawn = {
  roles: {
    accent: '#907aa9',
    danger: '#b4637a',
    success: '#286983',
    warning: '#ea9d34',
    pro: '#d7827e',
  },
  gray: {
    anchors: {
      'surface-0': '#f2e9e1', // overlay
      'surface-1': '#faf4ed', // base
      'surface-2': '#fffaf3', // surface
      'text-primary': '#464261',
      'text-secondary': '#575279', // text
      'text-muted': '#6e6a86',
    },
  },
  git: {
    added: '#286983',
    removed: '#b4637a',
    modified: '#b06f12', // gold, deepened to read on Dawn
    merged: '#7e6898',
    closed: '#b4637a',
    conflicting: '#b8615d', // rose, deepened
    draft: '#6e6a86',
  },
}

const main = {
  roles,
  gray: {
    anchors: {
      'surface-0': '#191724', // base
      'surface-1': '#1f1d2e', // surface
      'surface-2': '#26233a', // overlay
      'surface-3': '#2a2740',
      'text-primary': '#e0def4', // text
      'text-secondary': '#c3c0dc',
      'text-muted': '#908caa', // subtle
    },
  },
  git: {
    added: '#9ccfd8',
    removed: '#eb6f92',
    modified: '#f6c177',
    merged: '#c4a7e7',
    closed: '#eb6f92',
    conflicting: '#ebbcba',
    draft: '#908caa',
  },
}

const moon = {
  roles: { ...roles, success: '#9ccfd8', pro: '#ea9a97' }, // foam reads better than pine on Moon
  gray: {
    anchors: {
      'surface-0': '#232136', // base
      'surface-1': '#2a273f', // surface
      'surface-2': '#312e49',
      'surface-3': '#35314c', // a touch under overlay, so muted text holds
      'text-primary': '#e0def4',
      'text-secondary': '#c3c0dc',
      'text-muted': '#a09cbc',
    },
  },
  git: { ...main.git, conflicting: '#ea9a97' },
}

export const PALETTES = { dawn, main, moon }
