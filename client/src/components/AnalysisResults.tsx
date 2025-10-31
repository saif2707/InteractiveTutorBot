import { motion } from 'framer-motion'
import { Brain, Target, BookOpen, TrendingUp } from 'lucide-react'

interface AnalysisResultsProps {
  analysis: {
    description: string
    explanation: string
    keyPoints: string[]
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    subject: string
  }
}

const AnalysisResults = ({ analysis }: AnalysisResultsProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '🟢'
      case 'intermediate':
        return '🟡'
      case 'advanced':
        return '🔴'
      default:
        return '⚪'
    }
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900 dark:text-gray-100">
        <Brain className="h-6 w-6 mr-2 text-primary-600" />
        AI Analysis Results
      </h2>

      {/* Subject and Difficulty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-5 w-5 text-primary-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Subject</p>
            <p className="font-medium text-gray-900 dark:text-gray-100">{analysis.subject}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <TrendingUp className="h-5 w-5 text-primary-600" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Difficulty</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(analysis.difficulty)}`}>
              {getDifficultyIcon(analysis.difficulty)} {analysis.difficulty.charAt(0).toUpperCase() + analysis.difficulty.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-900 dark:text-gray-100">
          <Target className="h-5 w-5 mr-2 text-primary-600" />
          Description
        </h3>
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
          {analysis.description}
        </p>
      </div>

      {/* Key Points */}
      {analysis.keyPoints.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Key Learning Points</h3>
          <ul className="space-y-2">
            {analysis.keyPoints.map((point, index) => (
              <motion.li
                key={index}
                className="flex items-start space-x-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                  {index + 1}
                </div>
                <p className="text-gray-800 dark:text-gray-200">{point}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Full Explanation */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Detailed Explanation</h3>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
            {analysis.explanation}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default AnalysisResults