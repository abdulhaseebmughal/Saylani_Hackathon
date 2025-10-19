import axios from 'axios';

class GeminiService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  async generatePitch(ideaDescription) {
    try {
      const prompt = `You are an expert startup pitch consultant. Based on the following idea, create a comprehensive and compelling pitch deck content.

Idea Description: ${ideaDescription}

Please provide a structured response in the following JSON format:
{
  "projectName": "An innovative and catchy name for the project",
  "tagline": "A short, memorable tagline (max 10 words)",
  "problemStatement": "Clearly describe the problem this idea solves (2-3 sentences)",
  "solution": "Explain how this idea solves the problem (3-4 sentences)",
  "uniqueValueProposition": "What makes this solution unique and better than alternatives (2-3 sentences)",
  "targetAudience": "Who will benefit from this solution (1-2 sentences)",
  "marketOpportunity": "Brief overview of market size and potential (2-3 sentences)",
  "pitchContent": "A complete elevator pitch (100-150 words) that can be presented to investors"
}

Make it professional, persuasive, and investor-ready. Use clear, engaging language.`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract the generated text from Gemini response
      const generatedText = response.data.candidates[0].content.parts[0].text;

      // Try to parse JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const pitchData = JSON.parse(jsonMatch[0]);
        return pitchData;
      }

      // Fallback: If JSON parsing fails, return a structured response
      throw new Error('Failed to parse AI response');
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);

      // Fallback response if API fails - return mock data for development
      console.log('Using fallback mock pitch data for development');

      return {
        projectName: "HydroTrack",
        tagline: "Stay Hydrated, Stay Healthy - Smart Water Tracking",
        problemStatement: "Many people struggle to maintain proper hydration throughout the day, leading to decreased energy, poor concentration, and health issues. Traditional water tracking methods are tedious and easy to forget.",
        solution: "HydroTrack is an intelligent mobile app that automatically tracks your water intake and sends personalized reminders based on your activity level, local weather conditions, and personal health goals. The app uses smart algorithms to optimize your hydration schedule.",
        uniqueValueProposition: "Unlike generic reminder apps, HydroTrack adapts to your lifestyle by considering multiple factors like exercise, climate, and health metrics. The gamification system with challenges and rewards makes staying hydrated fun and engaging, increasing long-term adherence.",
        targetAudience: "Health-conscious individuals, fitness enthusiasts, and anyone looking to improve their daily water intake habits. Primary target is adults aged 25-45 who use fitness trackers and health apps.",
        marketOpportunity: "The global digital health market is expected to reach $500B by 2025. With growing awareness about hydration's impact on health and productivity, HydroTrack taps into a massive market of health-conscious consumers seeking simple, effective wellness solutions.",
        pitchContent: "Imagine never feeling dehydrated again. HydroTrack is more than just a water reminder app - it's your personal hydration coach. By analyzing your activity levels, weather conditions, and health goals, we deliver smart, personalized reminders that actually work. Our gamification system transforms a daily necessity into an engaging challenge, with rewards that keep you motivated. We're targeting the $500B digital health market, starting with 100M+ fitness app users who already track their health metrics. With HydroTrack, proper hydration becomes effortless, leading to better energy, focus, and overall wellness. Join us in revolutionizing how people stay healthy, one glass at a time."
      };
    }
  }

  async improvePitch(currentPitch, improvements) {
    try {
      const prompt = `You are an expert pitch consultant. Improve the following pitch based on these specific requirements:

Current Pitch Content: ${currentPitch}

Improvements Needed: ${improvements}

Please provide an improved version that addresses these requirements while maintaining professionalism and persuasiveness. Return only the improved pitch content (no JSON, just the text).`;

      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const improvedPitch = response.data.candidates[0].content.parts[0].text;
      return improvedPitch.trim();
    } catch (error) {
      console.error('Gemini API Error:', error.response?.data || error.message);
      throw new Error('Failed to improve pitch. Please try again later.');
    }
  }
}

export default new GeminiService();
