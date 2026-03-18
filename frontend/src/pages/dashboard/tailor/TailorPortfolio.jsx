import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Trash2, Upload } from 'lucide-react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tailorsService } from '@/services/tailors'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function TailorPortfolio() {
  const qc = useQueryClient()
  const [uploading, setUploading] = useState(false)
  const { data: portfolio = [], isLoading } = useQuery({
    queryKey: ['portfolio'],
    queryFn: tailorsService.getPortfolio,
  })
  const { mutate: deleteItem } = useMutation({
    mutationFn: tailorsService.deletePortfolioItem,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['portfolio'] }),
  })

  const onDrop = useCallback(async (files) => {
    setUploading(true)
    try {
      const sigData = await tailorsService.getUploadSignature()
      for (const file of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('signature', sigData.signature)
        formData.append('timestamp', sigData.timestamp)
        formData.append('api_key', sigData.api_key)
        formData.append('folder', sigData.folder)
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${sigData.cloud_name}/image/upload`,
          formData
        )
        await tailorsService.addPortfolioItem({ image_url: res.data.secure_url })
      }
      qc.invalidateQueries({ queryKey: ['portfolio'] })
      toast.success('Photos ajoutées !')
    } catch {
      toast.error('Erreur lors de l\'upload.')
    } finally {
      setUploading(false)
    }
  }, [qc])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': [] }, multiple: true, disabled: uploading,
  })

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-display text-3xl text-ivory mb-8">Mon portfolio</h1>

      {/* Upload zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-sm p-10 text-center mb-8 cursor-pointer transition-colors ${
          isDragActive ? 'border-gold bg-gold/5' : 'border-slate-dark hover:border-gold/40'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <LoadingSpinner />
            <p className="font-ui text-xs text-ivory/50">Téléchargement en cours...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload size={32} className="text-gold/50" />
            <p className="font-ui text-sm text-ivory/60">
              {isDragActive ? 'Déposez ici...' : 'Glissez vos photos ou cliquez pour parcourir'}
            </p>
            <p className="font-ui text-xs text-ivory/30">JPG, PNG, WebP</p>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {portfolio.map((item) => (
            <div key={item.id} className="relative group aspect-square rounded-sm overflow-hidden border border-slate-dark">
              <img src={item.image_url} alt={item.caption} className="w-full h-full object-cover" />
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 p-1.5 bg-red-900/80 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={14} className="text-red-300" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
