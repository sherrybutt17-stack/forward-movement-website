/**
 * One motion language for the whole site, so every animation feels related.
 * Expo-out easing for entrances; soft springs for anything that follows input.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const spring = {
  /** Default for UI movement: settles quickly with no visible bounce. */
  soft: { type: "spring", stiffness: 140, damping: 24, mass: 0.9 } as const,
  /** Pointer-following effects (magnetic, tilt, parallax). */
  follow: { stiffness: 150, damping: 18, mass: 0.6 },
  /** Small, quick UI (pills, toggles). */
  snappy: { type: "spring", stiffness: 380, damping: 32 } as const,
};

export const duration = {
  reveal: 0.8,
  page: 0.5,
};
