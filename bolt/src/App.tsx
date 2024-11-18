import React, { useState, useCallback, useEffect } from 'react';
import { Chat } from './components/Chat';
import { ModeSelector } from './components/ModeSelector';
import { ErrorBoundary } from './components/ErrorBoundary';
import { AssistantMode, ChatState, Message } from './types';
import { getAIResponse } from './utils/api';
import { saveState, loadState } from './utils/storage';

function App() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    mode: 'friend',
    context: ''
  });

  useEffect(() => {
    const savedState = loadState();
    if (savedState) {
      setState(savedState);
    }
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleSendMessage = useCallback(async (content: string) => {
    const newMessage: Message = { 
      role: 'user', 
      content,
      timestamp: Date.now()
    };
    
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage]
    }));

    try {
      const aiResponse = await getAIResponse(
        prev.messages.map(({ role, content }) => ({ role, content })),
        prev.mode,
        prev.context
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: aiResponse || 'I apologize, but I was unable to generate a response.',
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage]
      }));
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but an error occurred. Please try again.',
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, errorMessage]
      }));
    }
  }, [state.mode, state.context]);

  const handleModeChange = useCallback((mode: AssistantMode) => {
    setState(prev => ({ ...prev, mode }));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
          <p className="text-gray-500 mt-1">Your personal AI companion for everything</p>
        </div>
      </header>
      
      <ErrorBoundary>
        <ModeSelector currentMode={state.mode} onModeChange={handleModeChange} />
        <main className="flex-1 overflow-hidden">
          <Chat messages={state.messages} onSendMessage={handleSendMessage} />
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;