import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 300000, // 5 minutes for video generation
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const apiService = {
  // Image analysis
  analyzeImage: (formData: FormData) => {
    return apiClient.post('/upload/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // AI services
  analyzeImageUrl: (imageUrl: string, query?: string) => {
    return apiClient.post('/ai/analyze', { imageUrl, query })
  },

  generateSpeech: (text: string, voiceId?: string) => {
    return apiClient.post('/ai/speech', { text, voiceId }, {
      responseType: 'blob',
    })
  },

  generateVideo: (prompt: string, duration?: number, style?: string) => {
    return apiClient.post('/ai/video', { prompt, duration, style })
  },

  getVideoStatus: (generationId: string) => {
    return apiClient.get(`/ai/video/${generationId}`)
  },

  // Session management
  saveSession: (sessionId: string, data: any) => {
    return apiClient.post('/session/save', { sessionId, data })
  },

  getSession: (sessionId: string) => {
    return apiClient.get(`/session/${sessionId}`)
  },

  deleteSession: (sessionId: string) => {
    return apiClient.delete(`/session/${sessionId}`)
  },

  // Health check
  healthCheck: () => {
    return apiClient.get('/health')
  },
}

export default apiService