import axios from 'axios';

// ✅ Define your API Gateway endpoint here
const API_BASE_URL = 'https://ncp9ch0q4k.execute-api.us-east-1.amazonaws.com/dev'; // ← Replace with your actual endpoint

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 10000, // 10 seconds
});

export const uploadToS3 = async (formData) => {
  const response = await api.post('/signup', formData);
  return response.data;
};

export const compareWithRekognition = async (formData) => {
  const response = await api.post('/gym-access', formData);
  return response.data;
};
