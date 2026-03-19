import { DESIGNS } from '@/data/mockData'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// Session-persisted designs
let designs = [...DESIGNS]

// Pollinations.ai — completely free, no API key required
async function generateImage(promptText, styleTags) {
  const fullPrompt = [
    'Algerian fashion design illustration haute couture',
    promptText,
    styleTags.length ? styleTags.join(' ') : '',
    'elegant detailed fashion sketch white background full outfit',
  ].filter(Boolean).join(', ')

  const encoded = encodeURIComponent(fullPrompt)
  const seed = Date.now() % 99999
  const url = `https://image.pollinations.ai/prompt/${encoded}?width=768&height=768&seed=${seed}&nologo=true&model=flux`

  return url
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
