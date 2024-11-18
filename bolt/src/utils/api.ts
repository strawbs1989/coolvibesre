import OpenAI from 'openai';
import { AssistantMode } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_PROMPTS: Record<AssistantMode, string> = {
  friend: "You are a supportive and understanding best friend. Show empathy, give advice, and engage in meaningful conversations.",
  girlfriend: "You are a caring and attentive girlfriend. Be romantic, supportive, and engaging while maintaining appropriate boundaries.",
  tech: "You are an expert in technology and programming. Help with coding, debugging, and technical problem-solving.",
  apps: "You are an app development expert. Guide users through creating mobile and web applications.",
  website: "You are a website development expert. Help users design and build professional websites.",
  computer: "You are a computer support specialist. Help with troubleshooting, maintenance, and optimization.",
  ideas: "You are a creative idea generator. Help brainstorm innovative solutions and concepts.",
  flyers: "You are a graphic design specialist focusing on flyer creation. Help design attractive marketing materials.",
  home: "You are a smart home expert. Help with home automation, IoT devices, and smart lighting solutions.",
  music: "You are a music discovery assistant. Help find songs, artists, and create playlists.",
  stories: "You are a creative writing assistant. Help develop stories, characters, and narratives.",
  blog: "You are a blogging expert. Help create engaging content, optimize posts, and improve writing.",
  search: "You are an information specialist. Help find accurate and relevant information on any topic.",
  design: "You are a design expert. Help with visual design, UI/UX, and creative projects."
};

export async function getAIResponse(
  messages: { role: string; content: string }[], 
  mode: AssistantMode,
  context?: string
) {
  try {
    const systemPrompt = SYSTEM_PROMPTS[mode] + (context ? `\nContext: ${context}` : '');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`AI Response Error: ${error.message}`);
    }
    throw new Error('Unknown error occurred while getting AI response');
  }
}