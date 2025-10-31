import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, X, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface ImageUploadProps {
  onImageUpload: (file: File, query?: string) => void
  isLoading: boolean
  uploadedImage?: string | null
}

const ImageUpload = ({ onImageUpload, isLoading, uploadedImage }: ImageUploadProps) => {
  const [query, setQuery] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)
      onImageUpload(file, query || undefined)
    }
  }, [onImageUpload, query])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    onDropRejected: (fileRejections) => {
      const error = fileRejections[0]?.errors[0]
      if (error?.code === 'file-too-large') {
        toast.error('File size must be less than 10MB')
      } else if (error?.code === 'file-invalid-type') {
        toast.error('Please upload a valid image file')
      } else {
        toast.error('Failed to upload image')
      }
    }
  })

  const clearImage = () => {
    setPreview(null)
    setQuery('')
    if (preview) {
      URL.revokeObjectURL(preview)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-900 dark:text-gray-100">
          <ImageIcon className="h-6 w-6 mr-2 text-primary-600" />
          Upload Educational Image
        </h2>

        {/* Query Input */}
        <div className="mb-4">
          <label htmlFor="query" className="block text-sm font-medium text-gray-800 dark:text-gray-200 mb-2">
            What would you like to know about this image? (Optional)
          </label>
          <input
            id="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., Explain the anatomy of the brain..."
            className="input-field placeholder:text-gray-400 dark:placeholder:text-gray-400"
            disabled={isLoading}
          />
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50' 
              : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} disabled={isLoading} />
          
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-primary-600 animate-spin mb-4" />
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">Analyzing your image...</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">This may take a few moments</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">or click to browse</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supports: JPG, PNG, GIF, WebP (max 10MB)
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Preview */}
      {preview && (
        <motion.div
          className="card"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Uploaded Image</h3>
            <button
              onClick={clearImage}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors dark:text-gray-400"
              disabled={isLoading}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="relative">
            <img
              src={preview}
              alt="Uploaded"
              className="w-full h-64 object-contain bg-gray-50 dark:bg-gray-900 rounded-lg"
            />
            {isLoading && (
              <div className="absolute inset-0 bg-white dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-70 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 text-primary-600 animate-spin mx-auto mb-2" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">Processing...</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ImageUpload