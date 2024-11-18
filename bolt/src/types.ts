export type AssistantMode = 
  | 'friend' 
  | 'girlfriend' 
  | 'tech' 
  | 'design' 
  | 'website' 
  | 'apps' 
  | 'ideas' 
  | 'computer' 
  | 'flyers' 
  | 'home' 
  | 'music' 
  | 'stories' 
  | 'blog'
  | 'search';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  mode: AssistantMode;
  context: string;
}