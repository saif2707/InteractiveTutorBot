import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';
import { AIService } from '../services/aiService';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

/**
 * POST /api/upload/analyze
 * Upload and analyze an image file
 */
router.post('/analyze', upload.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw createError('No image file provided', 400);
    }

    const { query } = req.body;
    const imageFile = req.file;

    // Process image with Sharp (resize, optimize)
    const processedImageBuffer = await sharp(imageFile.buffer)
      .resize(1024, 1024, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ quality: 85 })
      .toBuffer();

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'tutor-bot',
          public_id: `analysis_${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(processedImageBuffer);
    });

    const imageUrl = (uploadResult as any).secure_url;

    // Analyze image with AI
    const analysis = await AIService.analyzeImage(imageUrl, query);

    // Generate speech from explanation
    const speechBuffer = await AIService.generateSpeech(analysis.explanation);
    
    // Upload audio to Cloudinary
    const audioUploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'video',
          folder: 'tutor-bot/audio',
          public_id: `audio_${Date.now()}`,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(speechBuffer);
    });

    const audioUrl = (audioUploadResult as any).secure_url;

    // Generate video prompt from analysis
    const videoPrompt = `Educational animation explaining: ${analysis.description}. Key points: ${analysis.keyPoints.join(', ')}. Style: ${analysis.difficulty} level, ${analysis.subject} subject.`;

    // Start video generation
    const videoGenerationId = await AIService.generateVideo({
      prompt: videoPrompt,
      duration: 30,
      style: 'educational'
    });

    // Generate session ID
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    res.json({
      success: true,
      data: {
        imageUrl,
        analysis,
        audioUrl,
        videoGenerationId,
        sessionId
      }
    });

  } catch (error) {
    next(error);
  }
});

export { router as uploadRoutes };