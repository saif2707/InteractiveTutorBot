import { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { apiService } from '../services/api'

export const useVideoStatus = (generationId: string) => {
  const [shouldPoll, setShouldPoll] = useState(false)

  const { data: videoStatus, isLoading, error } = useQuery(
    ['videoStatus', generationId],
    () => apiService.getVideoStatus(generationId),
    {
      enabled: shouldPoll && !!generationId,
      refetchInterval: (data) => {
        // Stop polling if video is completed or failed
        if (data?.data?.status === 'completed' || data?.data?.status === 'failed') {
          setShouldPoll(false)
          return false
        }
        // Poll every 10 seconds while processing
        return 10000
      },
      refetchIntervalInBackground: true
    }
  )

  useEffect(() => {
    if (generationId) {
      setShouldPoll(true)
    }
  }, [generationId])

  return {
    videoStatus: videoStatus?.data,
    isLoading,
    error
  }
}