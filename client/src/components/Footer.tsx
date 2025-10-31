import { motion } from 'framer-motion'
import { Brain, Github, Twitter, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12 dark:bg-gray-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="h-8 w-8 text-primary-400" />
              <span className="text-xl font-bold">Interactive Tutor Bot</span>
            </div>
            <p className="text-gray-300 dark:text-gray-300 mb-4 max-w-md">
              AI-powered educational platform that transforms static images into 
              engaging animated explanations for better learning outcomes.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/your-username/interactive-tutor-bot" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/tutorbot_ai" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hello@tutorbot.ai" 
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#examples" className="text-gray-300 hover:text-white transition-colors">
                  Examples
                </a>
              </li>
              <li>
                <a href="https://github.com/your-username/interactive-tutor-bot" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="mailto:support@tutorbot.ai" className="text-gray-300 hover:text-white transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-300 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="mailto:contact@tutorbot.ai" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © 2025 Interactive Tutor Bot. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer