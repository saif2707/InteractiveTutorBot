import { createClient } from 'redis';

let redisClient: any = null;

export const connectRedis = async (): Promise<void> => {
  try {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redisClient = createClient({
      url: redisUrl,
      socket: {
        reconnectStrategy: (retries: number) => {
          if (retries > 50) {
            return new Error('Retry time exhausted');
          }
          return Math.min(retries * 100, 3000);
        }
      }
    });
    
    redisClient.on('error', (err: Error) => {
      console.error('Redis Client Error:', err);
    });
    
    redisClient.on('connect', () => {
      console.log('✅ Connected to Redis');
    });
    
    await redisClient.connect();
    
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    // Don't exit process for Redis connection failure
    console.log('Continuing without Redis cache...');
  }
};

export const getRedisClient = () => redisClient;