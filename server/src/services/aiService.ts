import OpenAI from 'openai';
import axios from 'axios';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ImageAnalysisResult {
  description: string;
  explanation: string;
  keyPoints: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  subject: string;
}

export interface VideoGenerationRequest {
  prompt: string;
  duration?: number;
  style?: string;
}

export class AIService {
  /**
   * Analyze uploaded image using GPT-4 Vision
   */
  static async analyzeImage(imageUrl: string, userQuery?: string): Promise<ImageAnalysisResult> {
    try {
      const systemPrompt = `You are an expert educational tutor. Analyze the uploaded image and provide a comprehensive educational explanation. 
      
      Focus on:
      1. Clear, accurate description of what's shown
      2. Educational explanation suitable for learning
      3. Key learning points
      4. Appropriate difficulty level
      5. Subject classification
      
      Be engaging, accurate, and educational.`;

      const userPrompt = userQuery 
        ? `Please analyze this image and explain: "${userQuery}"`
        : 'Please analyze this image and provide an educational explanation.';

      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: userPrompt
              },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high"
                }
              }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      });

      const content = response.choices[0]?.message?.content || '';
      
      // Parse the response to extract structured data
      return this.parseAnalysisResponse(content);
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      throw new Error('Failed to analyze image');
    }
  }

  /**
   * Generate text-to-speech audio using ElevenLabs
   */
  static async generateSpeech(text: string, voiceId?: string): Promise<Buffer> {
    try {
      const voice = voiceId || process.env.ELEVENLABS_VOICE_ID || 'default';
      
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${voice}`,
        {
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.0,
            use_speaker_boost: true
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': process.env.ELEVENLABS_API_KEY
          },
          responseType: 'arraybuffer'
        }
      );

      return Buffer.from(response.data);
      
    } catch (error) {
      console.error('Error generating speech:', error);
      throw new Error('Failed to generate speech');
    }
  }

  /**
   * Generate animated video using Luma AI
   */
  static async generateVideo(request: VideoGenerationRequest): Promise<string> {
    try {
      const response = await axios.post(
        'https://api.lumalabs.ai/dream-machine/v1/generations',
        {
          prompt: request.prompt,
          duration: request.duration || 5,
          style: request.style || 'realistic',
          aspect_ratio: '16:9'
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.LUMA_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.id; // Return generation ID
      
    } catch (error) {
      console.error('Error generating video:', error);
      throw new Error('Failed to generate video');
    }
  }

  /**
   * Check video generation status
   */
  static async getVideoStatus(generationId: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://api.lumalabs.ai/dream-machine/v1/generations/${generationId}`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.LUMA_API_KEY}`
          }
        }
      );

      return response.data;
      
    } catch (error) {
      console.error('Error checking video status:', error);
      throw new Error('Failed to check video status');
    }
  }

  /**
   * Parse AI response into structured format
   */
  private static parseAnalysisResponse(content: string): ImageAnalysisResult {
    // Extract key information from the AI response
    const lines = content.split('\n').filter(line => line.trim());
    
    // Simple parsing - in production, you might want more sophisticated parsing
    const description = lines.find(line => line.toLowerCase().includes('description')) || lines[0] || '';
    const explanation = content;
    
    // Extract key points (look for bullet points or numbered lists)
    const keyPoints = lines
      .filter(line => line.match(/^[\-\*\d+\.]/))
      .map(line => line.replace(/^[\-\*\d+\.]\s*/, ''))
      .slice(0, 5); // Limit to 5 key points
    
    // Determine difficulty based on content complexity
    const difficulty = this.determineDifficulty(content);
    
    // Determine subject based on content
    const subject = this.determineSubject(content);
    
    return {
      description: description.replace(/^.*description[:\-]\s*/i, ''),
      explanation,
      keyPoints: keyPoints.length > 0 ? keyPoints : ['Key concepts will be explained in the video'],
      difficulty,
      subject
    };
  }

  private static determineDifficulty(content: string): 'beginner' | 'intermediate' | 'advanced' {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('basic') || lowerContent.includes('simple') || lowerContent.includes('introduction')) {
      return 'beginner';
    }
    
    if (lowerContent.includes('complex') || lowerContent.includes('advanced') || lowerContent.includes('detailed')) {
      return 'advanced';
    }
    
    return 'intermediate';
  }

  private static determineSubject(content: string): string {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('brain') || lowerContent.includes('skull') || lowerContent.includes('anatomy')) {
      return 'Anatomy';
    }
    
    if (lowerContent.includes('math') || lowerContent.includes('equation') || lowerContent.includes('formula')) {
      return 'Mathematics';
    }
    
    if (lowerContent.includes('chemistry') || lowerContent.includes('molecule') || lowerContent.includes('reaction')) {
      return 'Chemistry';
    }
    
    if (lowerContent.includes('physics') || lowerContent.includes('force') || lowerContent.includes('energy')) {
      return 'Physics';
    }
    
    return 'General';
  }
}