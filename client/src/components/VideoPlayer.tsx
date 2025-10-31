import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Loader2, AlertCircle } from 'lucide-react'
import { useVideoStatus } from '../hooks/useVideoStatus'

interface VideoPlayerProps {
  generationId: string
  audioUrl: string
}

const VideoPlayer = ({ generationId, audioUrl }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null)
  
  const { videoStatus, isLoading, error } = useVideoStatus(generationId)

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl)
      setAudioElement(audio)
      
      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(audio.duration)
      })
      
      audio.addEventListener('timeupdate', () => {
        setAudioProgress(audio.currentTime)
      })
      
      audio.addEventListener('ended', () => {
        setIsPlaying(false)
        setAudioProgress(0)
      })
      
      return () => {
        audio.removeEventListener('loadedmetadata', () => {})
        audio.removeEventListener('timeupdate', () => {})
        audio.removeEventListener('ended', () => {})
      }
    }
  }, [audioUrl])

  const togglePlayPause = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause()
      } else {
        audioElement.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioElement) {
      audioElement.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioElement && audioDuration) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * audioDuration
      audioElement.currentTime = newTime
      setAudioProgress(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-gray-100">
        <Play className="h-6 w-6 mr-2 text-primary-600" />
        Animated Explanation
      </h2>

      {/* Video Area */}
      <div className="mb-6">
        {isLoading ? (
          <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Generating Video...</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This may take 2-3 minutes</p>
            </div>
          </div>
        ) : error ? (
          <div className="aspect-video bg-red-50 dark:bg-red-950/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-lg font-medium text-red-700">Video Generation Failed</p>
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">Please try again later</p>
            </div>
          </div>
        ) : videoStatus?.status === 'completed' && videoStatus?.video_url ? (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={videoStatus.video_url}
              controls
              className="w-full h-full"
              poster={videoStatus.thumbnail_url}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 dark:bg-gray-900 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Video Processing...</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Status: {videoStatus?.status || 'pending'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Audio Player */}
      {audioUrl && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Audio Explanation</h3>
          
          {/* Audio Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={togglePlayPause}
              className="p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            
            <button
              onClick={toggleMute}
              className="p-2 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </button>
            
            <div className="flex-1">
              <div
                className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-primary-600 rounded-full transition-all duration-100"
                  style={{ width: `${audioDuration ? (audioProgress / audioDuration) * 100 : 0}%` }}
                />
              </div>
            </div>
            
            <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[80px]">
              {formatTime(audioProgress)} / {formatTime(audioDuration)}
            </span>
          </div>
        </div>
      )}

      {/* Video Status Info */}
      {videoStatus && (
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Generation Status</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Status:</span>
              <span className={`ml-2 font-medium ${
                videoStatus.status === 'completed' ? 'text-green-600' :
                videoStatus.status === 'failed' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {videoStatus.status}
              </span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Duration:</span>
              <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{videoStatus.duration || 'N/A'}s</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default VideoPlayer