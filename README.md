# Interactive Tutor Bot 🧠🎓

An AI-powered educational platform that provides animated explanations for uploaded images, making learning interactive and engaging.

## Features

- 📸 **Image Upload**: Upload any educational image (anatomy, diagrams, etc.)
- 🤖 **AI Analysis**: GPT-4 Vision analyzes the image and generates explanations
- 🎬 **Animated Videos**: AI-generated animated explanation videos
- 🎵 **Voice Narration**: High-quality text-to-speech for audio explanations
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 💾 **Session History**: Save and revisit previous learning sessions

## Technology Stack

### Frontend
- React.js with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Query for state management

### Backend
- Node.js with Express.js
- TypeScript for type safety
- OpenAI GPT-4 Vision API
- ElevenLabs for text-to-speech
- Luma AI for video generation

### Database & Storage
- MongoDB for data persistence
- Cloudinary for media storage
- Redis for caching

## Quick Start

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your API keys
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## API Keys Required

- OpenAI API key (for GPT-4 Vision)
- ElevenLabs API key (for text-to-speech)
- Luma AI API key (for video generation)
- Cloudinary credentials (for media storage)
- MongoDB connection string

## Project Structure

```
interactive-tutor-bot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service functions
│   │   └── utils/         # Utility functions
├── server/                # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
└── docs/                  # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details