import express from 'express';
import { AIService } from '../services/aiService';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

/**
 * POST /api/ai/analyze
 * Analyze an image URL (for external images)
 */
router.post('/analyze', async (req, res, next) => {
  try {
    const { imageUrl, query } = req.body;
    
    if (!imageUrl) {
      throw createError('Image URL is required', 400);
    }

    const analysis = await AIService.analyzeImage(imageUrl, query);
    
    res.json({
      success: true,
      data: analysis
    });
    
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/ai/speech
 * Generate speech from text
 */
router.post('/speech', async (req, res, next) => {
  try {
    const { text, voiceId } = req.body;
    
    if (!text) {
      throw createError('Text is required', 400);
    }

    const speechBuffer = await AIService.generateSpeech(text, voiceId);
    
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': speechBuffer.length.toString()
    });
    
    res.send(speechBuffer);
    
  } catch (error) {
    next(error);
  }
});

/**
 * POST /api/ai/video
 * Generate video from prompt
 */
router.post('/video', async (req, res, next) => {
  try {
    const { prompt, duration, style } = req.body;
    
    if (!prompt) {
      throw createError('Prompt is required', 400);
    }

    const generationId = await AIService.generateVideo({
      prompt,
      duration: duration || 30,
      style: style || 'educational'
    });
    
    res.json({
      success: true,
      data: {
        generationId,
        status: 'processing'
      }
    });
    
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/ai/video/:generationId
 * Get video generation status and result
 */
router.get('/video/:generationId', async (req, res, next) => {
  try {
    const { generationId } = req.params;
    
    const status = await AIService.getVideoStatus(generationId);
    
    res.json({
      success: true,
      data: status
    });
    
  } catch (error) {
    next(error);
  }
});

export { router as aiRoutes };