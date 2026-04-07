import { useState, useCallback } from 'react';
import { chatAi } from '../services/chat.api';
export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async ({ prompt }) => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    // Create a temporary ID for the pending message
    const pendingId = Date.now();

    // Add user message immediately with pending status
    setMessages(prev => [...prev, {
      id: pendingId,
      user: prompt,
      isPending: true,
      solution1: "", // Placeholder for Model A
      solution2: "", // Placeholder for Model B
      judge: null    // Placeholder for Judge
    }]);

    try {
      const serverResponse = await chatAi({ prompt });

      // Map server's snake_case data to frontend's camelCase structure
      const mappedData = {
        user: serverResponse.data.problem || prompt,
        solution1: serverResponse.data.solution_1,
        solution2: serverResponse.data.solution_2,
        judge: serverResponse.data.judge ? {
          score1: serverResponse.data.judge.solution_1_score,
          score2: serverResponse.data.judge.solution_2_score,
          reasoning1: serverResponse.data.judge.solution_1_reasoning,
          reasoning2: serverResponse.data.judge.solution_2_reasoning,
          verdict: serverResponse.data.judge.verdict || (serverResponse.data.judge.solution_1_score > serverResponse.data.judge.solution_2_score ? "Model A provides a more comprehensive answer." : "Model B delivers superior results.")
        } : null,
        isPending: false
      };

      console.log("Mapa:", mappedData);

      // Replace the pending message with mapped actual data
      setMessages(prev => prev.map(msg =>
        msg.id === pendingId ? { ...mappedData, id: pendingId } : msg
      ));
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to connect to the arena.");
      // Optionally remove the failed message
      setMessages(prev => prev.filter(msg => msg.id !== pendingId));
    } finally {
      setIsLoading(false);
    }
  };


  return {
    messages,
    isLoading,
    error,
    sendMessage
  };
};
