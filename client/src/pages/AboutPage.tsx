import { motion } from 'framer-motion'
import { Brain, Zap, Users, Target, ArrowRight } from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced GPT-4 Vision technology analyzes your images with incredible accuracy and detail.'
    },
    {
      icon: Zap,
      title: 'Instant Processing',
      description: 'Get comprehensive explanations and insights in seconds, not hours.'
    },
    {
      icon: Users,
      title: 'Personalized Learning',
      description: 'Adapts explanations to your learning level and specific questions.'
    },
    {
      icon: Target,
      title: 'Multi-Modal Output',
      description: 'Receive text, audio, and animated video explanations for comprehensive understanding.'
    }
  ]

  const stats = [
    { number: '10K+', label: 'Images Analyzed' },
    { number: '50+', label: 'Subjects Covered' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '24/7', label: 'Available' }
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
          About Interactive Tutor Bot
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
          We're revolutionizing education by combining cutting-edge AI technology 
          with engaging multimedia content to make learning more accessible, 
          interactive, and effective for everyone.
        </p>
      </motion.div>

      {/* Mission Section */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="card text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
            To democratize education by making complex concepts accessible through 
            AI-powered visual explanations. We believe that every learner deserves 
            personalized, engaging, and effective educational content that adapts 
            to their needs and learning style.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="card text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <feature.icon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-700 dark:text-gray-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="card">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
            Our Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Technology Stack */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="card">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-8">
            Powered by Advanced AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">OpenAI GPT-4 Vision</h3>
              <p className="text-gray-700 dark:text-gray-200">
                State-of-the-art image analysis and natural language processing
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">Luma AI Dream Machine</h3>
              <p className="text-gray-700 dark:text-gray-200">
                Advanced video generation for engaging animated explanations
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">ElevenLabs TTS</h3>
              <p className="text-gray-700 dark:text-gray-200">
                High-quality text-to-speech for natural audio narration
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
      >
        <div className="card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
          <p className="text-xl mb-8 opacity-95">
            Join thousands of learners who are already using AI to enhance their education
          </p>
          <motion.a
            href="/"
            className="inline-flex items-center bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutPage