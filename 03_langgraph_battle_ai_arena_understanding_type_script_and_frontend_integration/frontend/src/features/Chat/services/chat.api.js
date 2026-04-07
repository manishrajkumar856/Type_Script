import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export const chatAi = async ({ prompt }) => {
    try {
        const response = await api.post('/chat', { prompt });
        return response.data;
    } catch (error) {
        throw error;
    }
}