import { useState } from 'react'
import { useMutation } from 'react-query'
import { apiService } from '../services/api'
import toast from 'react-hot-toast'

interface AnalysisResult {
  imageUrl: string
  analysis: {
    description: string
    explanation: string
    keyPoints: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    subject: string
  }
  audioUrl: string
  videoGenerationId: string
  sessionId: string
}

export const useAnalysis = () => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)

  const mutation = useMutation(
    async ({ imageFile, query }: { imageFile: File; query?: string }) => {
      const formData = new FormData()
      formData.append('image', imageFile)
      if (query) {
        formData.append('query', query)
      }

      return apiService.analyzeImage(formData)
    },
    {
      onSuccess: (data) => {
        setAnalysis(data.data)
        toast.success('Image analyzed successfully!')
      },
      onError: (error: any) => {
        console.error('Analysis error:', error)
        toast.error(error.response?.data?.error?.message || 'Failed to analyze image')
      }
    }
  )

  const analyzeImage = async (imageFile: File, query?: string) => {
    return mutation.mutateAsync({ imageFile, query })
  }

  return {
    analysis,
    isLoading: mutation.isLoading,
    error: mutation.error,
    analyzeImage
  }
}