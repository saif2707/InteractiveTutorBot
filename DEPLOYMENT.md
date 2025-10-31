# Deployment Guide

## Prerequisites

Before deploying the Interactive Tutor Bot, ensure you have:

1. **API Keys** (Required):
   - OpenAI API key (for GPT-4 Vision)
   - ElevenLabs API key (for text-to-speech)
   - Luma AI API key (for video generation)
   - Cloudinary account (for media storage)

2. **Infrastructure**:
   - MongoDB database
   - Redis cache
   - Docker and Docker Compose (for containerized deployment)

## Quick Start with Docker

1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd interactive-tutor-bot
   ```

2. **Configure environment variables**:
   ```bash
   cp server/env.example server/.env
   cp client/env.example client/.env
   ```
   
   Edit the `.env` files with your API keys and configuration.

3. **Start with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/health

## Manual Deployment

### Backend Deployment

1. **Install dependencies**:
   ```bash
   cd server
   npm install
   ```

2. **Build the application**:
   ```bash
   npm run build
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

### Frontend Deployment

1. **Install dependencies**:
   ```bash
   cd client
   npm install
   ```

2. **Build for production**:
   ```bash
   npm run build
   ```

3. **Serve the built files**:
   ```bash
   npm run preview
   ```

## Production Deployment

### Using Vercel (Frontend) + Railway (Backend)

1. **Deploy Frontend to Vercel**:
   ```bash
   cd client
   vercel --prod
   ```

2. **Deploy Backend to Railway**:
   ```bash
   cd server
   railway login
   railway init
   railway up
   ```

### Using AWS/GCP/Azure

1. **Set up infrastructure**:
   - MongoDB Atlas for database
   - Redis Cloud for caching
   - CloudFront/CloudFlare for CDN

2. **Deploy using container services**:
   - AWS ECS/Fargate
   - Google Cloud Run
   - Azure Container Instances

## Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# ElevenLabs Configuration
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
ELEVENLABS_VOICE_ID=your_voice_id_here

# Luma AI Configuration
LUMA_API_KEY=your_luma_api_key_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/tutor-bot
REDIS_URL=redis://localhost:6379

# Security
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## Monitoring and Maintenance

1. **Health Checks**:
   - Backend: `GET /health`
   - Monitor logs for errors

2. **Database Maintenance**:
   - Regular backups
   - Monitor connection pools

3. **Performance Monitoring**:
   - API response times
   - Video generation queue
   - Error rates

## Troubleshooting

### Common Issues

1. **Video Generation Fails**:
   - Check Luma AI API key and quota
   - Verify prompt length and content

2. **Image Analysis Errors**:
   - Verify OpenAI API key and credits
   - Check image format and size

3. **Audio Generation Issues**:
   - Confirm ElevenLabs API key
   - Check text length limits

### Logs

```bash
# View Docker logs
docker-compose logs -f backend
docker-compose logs -f frontend

# View specific service logs
docker logs tutor-bot-backend
docker logs tutor-bot-frontend
```

## Scaling Considerations

1. **Horizontal Scaling**:
   - Multiple backend instances
   - Load balancer configuration
   - Database connection pooling

2. **Caching Strategy**:
   - Redis for session storage
   - CDN for static assets
   - API response caching

3. **Queue Management**:
   - Video generation queue
   - Rate limiting
   - Background job processing

## Security Best Practices

1. **API Security**:
   - Rate limiting
   - Input validation
   - CORS configuration

2. **Data Protection**:
   - Encrypt sensitive data
   - Secure API keys
   - Regular security updates

3. **Monitoring**:
   - Error tracking
   - Performance monitoring
   - Security alerts