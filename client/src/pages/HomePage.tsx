import { useState } from 'react'
import { motion } from 'framer-motion'
import ImageUpload from '../components/ImageUpload'
import AnalysisResults from '../components/AnalysisResults'
import VideoPlayer from '../components/VideoPlayer'
import { useAnalysis } from '../hooks/useAnalysis'

const HomePage = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const { analysis, isLoading, error, analyzeImage } = useAnalysis()

  const handleImageUpload = async (imageFile: File, query?: string) => {
    setUploadedImage(URL.createObjectURL(imageFile))
    await analyzeImage(imageFile, query)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 floating-element"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 floating-element" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-pink-200 rounded-full opacity-20 floating-element" style={{animationDelay: '4s'}}></div>
        </div>
        
        <motion.div
          className="inline-block mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="hero-gradient bg-clip-text text-transparent text-6xl md:text-7xl font-black mb-4">
            Interactive Tutor Bot
          </div>
        </motion.div>
        
        <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8">
          🧠 Transform any educational image into an 
          <span className="font-semibold text-primary-600"> AI-powered animated explanation</span> 
          that makes learning engaging and effective
        </p>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-4 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="bg-white/60 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm text-gray-800 dark:text-gray-200">📚 Anatomy & Biology</span>
          <span className="bg-white/60 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm text-gray-800 dark:text-gray-200">🔬 Science Diagrams</span>
          <span className="bg-white/60 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm text-gray-800 dark:text-gray-200">📐 Math Concepts</span>
          <span className="bg-white/60 dark:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm text-gray-800 dark:text-gray-200">🎨 Visual Learning</span>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Upload & Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ImageUpload 
            onImageUpload={handleImageUpload}
            isLoading={isLoading}
            uploadedImage={uploadedImage}
          />
          
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              <AnalysisResults analysis={analysis} />
            </motion.div>
          )}
        </motion.div>

        {/* Right Column - Video Player */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {analysis?.videoGenerationId && (
            <VideoPlayer 
              generationId={analysis.videoGenerationId}
              audioUrl={analysis.audioUrl}
            />
          )}
          
          {!analysis && (
            <div className="card h-96 flex items-center justify-center">
              <div className="text-center text-gray-600 dark:text-gray-300">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-lg">Your animated explanation will appear here</p>
                <p className="text-sm mt-2">Upload an image to get started</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div 
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.div 
          className="glass-card text-center group hover:scale-105 transition-all duration-300"
          whileHover={{ y: -10 }}
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🧠</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">AI-Powered Analysis</h3>
          <p className="text-gray-700 dark:text-white/90 leading-relaxed">
            Advanced GPT-4 Vision analyzes your images and generates comprehensive explanations with incredible accuracy
          </p>
        </motion.div>
        
        <motion.div 
          className="glass-card text-center group hover:scale-105 transition-all duration-300"
          whileHover={{ y: -10 }}
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎥</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Animated Videos</h3>
          <p className="text-gray-700 dark:text-white/90 leading-relaxed">
            Get engaging animated explanations that make complex concepts easy to understand and remember
          </p>
        </motion.div>
        
        <motion.div 
          className="glass-card text-center group hover:scale-105 transition-all duration-300"
          whileHover={{ y: -10 }}
        >
          <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">🎵</div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Voice Narration</h3>
          <p className="text-gray-700 dark:text-white/90 leading-relaxed">
            High-quality text-to-speech provides natural audio explanations for enhanced learning experience
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HomePage