import config from "../config/config";
import { ChatGoogle } from '@langchain/google';
import { ChatMistralAI } from '@langchain/mistralai';
import { ChatCohere } from '@langchain/cohere';

export const geminiModel = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: config.GOOGLE_API_KEY,
});

export const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: config.MISTRAL_API_KEY,
})

export const choereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: config.COHERE_API_KEY
});

