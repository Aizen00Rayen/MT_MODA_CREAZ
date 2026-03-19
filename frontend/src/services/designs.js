import { DESIGNS } from '@/data/mockData'

const delay = (ms = 300) => new Promise((r) => setTimeout(r, ms))

// Session-persisted designs
let designs = [...DESIGNS]

async function generateWithGemini(promptText, styleTags) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if (!apiKey) throw new Error('Clé API Gemini manquante (VITE_GEMINI_API_KEY).')

  const fullPrompt = [
    'Professional Algerian fashion design illustration, haute couture.',
    `Description: ${promptText}.`,
    styleTags.length ? `Style: ${styleTags.join(', ')}.` : '',
    'Elegant, detailed, fashion sketch style, white background, full outfit visible.',
  ].filter(Boolean).join(' ')

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-preview-image-generation:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { responseModalities: ['IMAGE'] },
      }),
    }
  )

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || `Erreur Gemini (${res.status})`)
  }

  const data = await res.json()
  const imagePart = data.candidates?.[0]?.content?.parts?.find((p) => p.inlineData)
  if (!imagePart) throw new Error('Aucune image retournée par Gemini.')

  return `data:${imagePart.inlineData.mimeType};base64,${imagePart.inlineData.data}`
}

export const designsService = {
  list: async (params = {}) => {
    await delay()
    const saved = params.saved !== false ? designs.filter((d) => d.saved) : designs
    return { results: saved, count: saved.length }
  },

  generate: async ({ prompt_text, style_tags = [] }) => {
    const imageUrl = await generateWithGemini(prompt_text, style_tags)
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
