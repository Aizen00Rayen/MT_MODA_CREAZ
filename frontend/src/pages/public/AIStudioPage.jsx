import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Save, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { StyleTagPicker } from '@/components/design/StyleTagPicker'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { useStudioStore } from '@/store/studioStore'
import { designsService } from '@/services/designs'
import toast from 'react-hot-toast'

const LOADING_MESSAGES = [
  'Votre couturière virtuelle travaille...',
  'Sélection des tissus et couleurs...',
  'Application des broderies algériennes...',
  'Finalisation des détails haute couture...',
]

export default function AIStudioPage() {
  const navigate = useNavigate()
  const [msgIdx, setMsgIdx] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const {
    prompt, setPrompt, selectedStyles, toggleStyle,
    isGenerating, setGenerating, currentDesign, setDesign,
    generationHistory,
  } = useStudioStore()

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Décrivez votre design d'abord.")
      return
    }
    setGenerating(true)
    const interval = setInterval(() => setMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length), 2500)
    try {
      const data = await designsService.generate({ prompt_text: prompt, style_tags: selectedStyles })
      setImgLoaded(false)
      setImgError(false)
      setDesign(data)
      toast.success('Votre design a été créé !')
    } catch (err) {
      toast.error(err.message || 'Génération échouée. Réessayez.')
    } finally {
      clearInterval(interval)
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!currentDesign?.id) return
    try {
      await designsService.toggleSave(currentDesign.id)
      toast.success('Design sauvegardé !')
    } catch {
      toast.error('Erreur de sauvegarde')
    }
  }

  return (
    <div className="min-h-screen bg-obsidian pt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-ui text-xs tracking-[0.4em] uppercase text-gold/70 mb-3">Intelligence Artificielle</p>
          <h1 className="font-display text-5xl text-ivory mb-3">
            Studio <span className="text-gold-gradient">IA</span>
          </h1>
          <p className="font-editorial italic text-lg text-ivory/60">
            Visualisez votre création avec notre IA haute couture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left panel: Input */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-sm">
              <label className="font-ui text-xs tracking-widest uppercase text-gold/70 block mb-3">
                Décrivez votre design
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Robe de soirée kabyle avec des broderies dorées, tissu velours noir, manches larges fluides..."
                rows={6}
                className="w-full bg-obsidian border border-slate-dark rounded-sm px-4 py-3 text-ivory font-ui text-sm resize-none focus:border-gold focus:outline-none placeholder-ivory/20 leading-relaxed"
              />
            </div>

            <div className="glass-card p-6 rounded-sm">
              <label className="font-ui text-xs tracking-widest uppercase text-gold/70 block mb-3">
                Style
              </label>
              <StyleTagPicker selected={selectedStyles} onToggle={toggleStyle} />
            </div>

            <Button
              onClick={handleGenerate}
              loading={isGenerating}
              size="xl"
              className="w-full flex items-center justify-center gap-3"
            >
              <Sparkles size={18} />
              {isGenerating ? 'Génération en cours...' : 'Générer mon design'}
            </Button>

            <p className="text-center font-ui text-xs text-ivory/30">
              Propulsé par Gemini AI · Haute couture algérienne
            </p>
          </div>

          {/* Right panel: Output */}
          <div className="space-y-4">
            <div className="glass-card rounded-sm overflow-hidden">
              {isGenerating ? (
                <div className="aspect-square flex flex-col items-center justify-center bg-charcoal">
                  <LoadingSpinner size="xl" className="mb-6" />
                  <p className="font-editorial italic text-ivory/60 text-lg text-center px-8">
                    {LOADING_MESSAGES[msgIdx]}
                  </p>
                  <div className="mt-4 flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <div key={i} className="w-2 h-2 rounded-full bg-gold/40 animate-pulse"
                        style={{ animationDelay: `${i * 0.3}s` }} />
                    ))}
                  </div>
                </div>
              ) : currentDesign ? (
                <div>
                  <div className="relative aspect-square">
                    {!imgLoaded && !imgError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal">
                        <LoadingSpinner size="xl" className="mb-4" />
                        <p className="font-editorial italic text-ivory/60 text-sm">Chargement de l'image...</p>
                      </div>
                    )}
                    {imgError && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-charcoal">
                        <p className="font-editorial italic text-ivory/40 text-sm text-center px-8">
                          Impossible de charger l'image. Réessayez.
                        </p>
                      </div>
                    )}
                    <img
                      src={currentDesign.generated_image_url}
                      alt="Design généré"
                      className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImgLoaded(true)}
                      onError={() => setImgError(true)}
                    />
                  </div>
                  <div className="p-4">
                    {currentDesign.color_palette?.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {currentDesign.color_palette.map((color, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full border border-white/20"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    )}
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSave}
                        className="flex items-center gap-1.5"
                      >
                        <Save size={13} />
                        Sauvegarder
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate('/couturieres')}
                        className="flex items-center gap-1.5"
                      >
                        <ShoppingBag size={13} />
                        Commander avec ce design
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="aspect-square flex flex-col items-center justify-center bg-charcoal border-2 border-dashed border-gold/10">
                  <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-4">
                    <Sparkles size={32} className="text-gold/30" />
                  </div>
                  <p className="font-editorial italic text-ivory/30 text-center px-8">
                    Votre création apparaîtra ici
                  </p>
                </div>
              )}
            </div>

            {/* History */}
            {generationHistory.length > 1 && (
              <div>
                <p className="font-ui text-xs tracking-widest uppercase text-ivory/40 mb-3">Historique</p>
                <div className="grid grid-cols-5 gap-2">
                  {generationHistory.slice(1, 10).map((d, i) => (
                    <button
                      key={i}
                      onClick={() => useStudioStore.getState().setDesign(d)}
                      className="aspect-square rounded-sm overflow-hidden border border-slate-dark hover:border-gold/40 transition-colors"
                    >
                      <img src={d.generated_image_url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
