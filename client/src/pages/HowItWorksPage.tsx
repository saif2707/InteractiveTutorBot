import { motion } from 'framer-motion'
import { Upload, Brain, Video, Volume2, ArrowRight, CheckCircle } from 'lucide-react'

const HowItWorksPage = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Image',
      description: 'Simply drag and drop or click to upload any educational image - anatomy diagrams, science illustrations, math problems, or any visual content you want to understand better.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced GPT-4 Vision AI analyzes your image, identifies key elements, and generates a comprehensive explanation tailored to your specific question or learning needs.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Video,
      title: 'Video Generation',
      description: 'Luma AI creates an engaging animated video that brings your image to life, making complex concepts easy to understand through visual storytelling.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: Volume2,
      title: 'Audio Narration',
      description: 'High-quality text-to-speech provides natural audio explanations, perfect for auditory learners and hands-free learning experiences.',
      color: 'from-green-500 to-green-600'
    }
  ]

  const features = [
    'Supports all major image formats (JPG, PNG, GIF, WebP)',
    'Works with anatomy, biology, chemistry, physics, and math',
    'Generates videos in 2-3 minutes',
    'High-quality audio narration',
    'Mobile-friendly interface',
    'No registration required'
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          How It Works
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
          Transform any educational image into an engaging learning experience in just 4 simple steps
        </p>
      </motion.div>

      {/* Steps */}
      <div className="space-y-12 mb-16">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col lg:flex-row items-center gap-8"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className={`flex-shrink-0 w-32 h-32 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-xl`}>
              <step.icon className="h-16 w-16 text-white" />
            </div>
            
            <div className="flex-1 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <span className="text-4xl font-bold text-primary-600">0{index + 1}</span>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{step.title}</h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                {step.description}
              </p>
            </div>
            
            {index < steps.length - 1 && (
              <div className="hidden lg:block">
                <ArrowRight className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Features */}
      <motion.div 
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
          What Makes Us Special
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 1 + index * 0.1 }}
            >
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
              <span className="text-gray-800 dark:text-gray-200">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-95">
            Upload your first image and experience the future of learning
          </p>
          <motion.a
            href="/"
            className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try It Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}

export default HowItWorksPage