import { useState, useCallback } from 'react';
import { chatService } from '../services/chatService';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (prompt) => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    // Optimistically add the user message with a loading state for solutions
    const tempId = Date.now().toString();
    setMessages(prev => [...prev, { id: tempId, user: prompt, isPending: true }]);

    try {
      const battleResult = await chatService.generateBattle(prompt);
      
      setMessages(prev => 
        prev.map(msg => msg.id === tempId ? { ...battleResult, isPending: false } : msg)
      );
    } catch (err) {
      setError('Failed to generate results. Please try again.');
      setMessages(prev => prev.filter(msg => msg.id !== tempId));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};
