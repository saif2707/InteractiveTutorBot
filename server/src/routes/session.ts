import express from 'express';
import { getRedisClient } from '../config/redis';
import { createError } from '../middleware/errorHandler';

const router = express.Router();

/**
 * POST /api/session/save
 * Save a learning session
 */
router.post('/save', async (req, res, next) => {
  try {
    const { sessionId, data } = req.body;
    
    if (!sessionId || !data) {
      throw createError('Session ID and data are required', 400);
    }

    const redis = getRedisClient();
    
    if (redis) {
      await redis.setEx(
        `session:${sessionId}`,
        86400, // 24 hours
        JSON.stringify(data)
      );
    }
    
    res.json({
      success: true,
      message: 'Session saved successfully'
    });
    
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/session/:sessionId
 * Retrieve a learning session
 */
router.get('/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    const redis = getRedisClient();
    
    if (!redis) {
      throw createError('Session storage not available', 503);
    }
    
    const sessionData = await redis.get(`session:${sessionId}`);
    
    if (!sessionData) {
      throw createError('Session not found', 404);
    }
    
    res.json({
      success: true,
      data: JSON.parse(sessionData)
    });
    
  } catch (error) {
    next(error);
  }
});

/**
 * DELETE /api/session/:sessionId
 * Delete a learning session
 */
router.delete('/:sessionId', async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    
    const redis = getRedisClient();
    
    if (redis) {
      await redis.del(`session:${sessionId}`);
    }
    
    res.json({
      success: true,
      message: 'Session deleted successfully'
    });
    
  } catch (error) {
    next(error);
  }
});

export { router as sessionRoutes };