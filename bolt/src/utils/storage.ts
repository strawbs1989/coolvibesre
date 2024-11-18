import { ChatState, Message, AssistantMode } from '../types';

const STORAGE_KEY = 'ai_assistant_chat_state';

export function saveState(state: ChatState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving chat state:', error);
  }
}

export function loadState(): ChatState | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error loading chat state:', error);
    return null;
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing chat state:', error);
  }
}