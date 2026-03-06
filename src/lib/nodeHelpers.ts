// Evenly distribute handle positions along a node edge (0–100%)
// e.g. 3 handles → ['25%', '50%', '75%']
export const distributeHandles = (count: number): string[] => {
  if (count <= 0) return []

  return Array.from({ length: count }, (_, i) => `${((i + 1) / (count + 1)) * 100}%`)
}
