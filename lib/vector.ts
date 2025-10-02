export function cosineSimilarity(a: number[], b: number[]): number {
  const length = Math.min(a.length, b.length)
  if (length === 0) return 0

  let dot = 0
  let normA = 0
  let normB = 0

  for (let i = 0; i < length; i++) {
    const ai = a[i]
    const bi = b[i]
    dot += ai * bi
    normA += ai * ai
    normB += bi * bi
  }

  if (normA === 0 || normB === 0) return 0

  return dot / Math.sqrt(normA * normB)
}

