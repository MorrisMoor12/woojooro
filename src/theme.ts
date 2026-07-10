/**
 * Single source of truth for every hex in the project.
 * Components never hardcode colors — they read `tokens.*` only.
 * Values come straight from the Claude design system (design.md / CLAUDE.md):
 * warm off-black + cream neutrals, muted earthy accents, Clay reserved for Claude.
 */

// Layer 1 — brand palette (fixed hex, from the brand table)
export const palette = {
  dark: "#141413", // warm off-black
  light: "#faf9f5", // cream / ivory
  midGray: "#b0aea5",
  lightGray: "#e8e6dc",
  clay: "#d97757", // brand — Claude only (spark mark)
  blue: "#6a9bcc", // accent — user actions / neutral data
  green: "#788c5d", // success — the solution
  red: "#c0554b", // danger — muted, earthy, distinct from Clay
  yellow: "#c9a94e", // warning
} as const;

/**
 * Layer 4 — purpose tokens, resolved for the render mode.
 * Shorts render in dark mode, so these are the dark-mode values.
 * (Structured so a light variant could be swapped in wholesale.)
 */
export const tokens = {
  bgCanvas: palette.dark,
  surface1: "#1d1c1a",
  surface2: "#262523",
  border: "#33322f",

  textPrimary: palette.light,
  textSecondary: palette.midGray,
  textMuted: "#807e76",

  // semantic roles → hue
  danger: palette.red,
  accent: palette.blue,
  success: palette.green,
  warning: palette.yellow,
  brand: palette.clay,

  // subtle role tints for banners/pills (bg-{role}) on dark canvas
  dangerTint: "#2c1a18",
  accentTint: "#182530",
  successTint: "#1e2318",
} as const;

// Layer 6 — motion tokens (durations in seconds, springs used inline)
export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  countSpring: {damping: 200, mass: 0.9} as const,
  popSpring: {damping: 14, stiffness: 140, mass: 0.7} as const,
};
