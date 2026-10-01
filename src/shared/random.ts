function hashString(value: string): number {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** Stable 0..1 value for a seed, so previews don't reshuffle on every render. */
export function seededUnit(seed: string): number {
  return hashString(seed) / 4294967295;
}

export function seededInt(seed: string, min: number, max: number): number {
  return Math.floor(seededUnit(seed) * (max - min + 1)) + min;
}

export function seededPercent(seed: string, min = 65, max = 99): number {
  return seededInt(seed, min, max);
}