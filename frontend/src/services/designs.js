import { DESIGNS } from '@/data/mockData'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// Session-persisted designs
let designs = [...DESIGNS]

// Pollinations.ai — completely free, no API key required
async function generateImage(promptText, styleTags) {
  const fullPrompt = [
    'Algerian haute couture fashion illustration',
    promptText,
    styleTags.length ? styleTags.join(' ') : '',
    'elegant full outfit dark background',
  ].filter(Boolean).join(', ')

  const encoded = encodeURIComponent(fullPrompt)
  const seed = Math.floor(Math.random() * 99999)

  const urls = [
    `https://image.pollinations.ai/prompt/${encoded}?width=768&height=768&seed=${seed}&nologo=true`,
    `https://image.pollinations.ai/prompt/${encoded}?seed=${seed}&nologo=true`,
  ]

  for (const url of urls) {
    try {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 60000)
      const response = await fetch(url, { signal: controller.signal })
      clearTimeout(timeout)
      if (!response.ok) continue
      const blob = await response.blob()
      if (blob.size < 1000) continue // not a real image
      return URL.createObjectURL(blob)
    } catch {
      // try next URL
    }
  }

  throw new Error('Génération échouée. Réessayez.')
}

export const designsService = {
  list: async (params = {}) => {
    await delay()
    const saved = params.saved !== false ? designs.filter((d) => d.saved) : designs
    return { results: saved, count: saved.length }
  },

  generate: async ({ prompt_text, style_tags = [] }) => {
    const imageUrl = await generateImage(prompt_text, style_tags)
    const design = {
      id: `d-${Date.now()}`,
      prompt_text,
      style_tags,
      generated_image_url: imageUrl,
      color_palette: ['#1a1a2e', '#c9a84c', '#f5f0e8', '#8b6914'],
      saved: false,
      created_at: new Date().toISOString(),
    }
    designs = [design, ...designs]
    return design
  },

  toggleSave: async (id) => {
    await delay()
    designs = designs.map((d) => (d.id === id ? { ...d, saved: !d.saved } : d))
    return designs.find((d) => d.id === id)
  },
}
