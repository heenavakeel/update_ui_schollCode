import axios from 'axios';

const API_BASE_URL = 'https://localhost:7269/';
const config = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

// const instance = axios.create({
//     baseURL: API_BASE_URL,
//     timeout: 10000, // Customize the timeout as needed
//     headers: {
//         'Content-Type': 'application/json',
//         'accept': 'application/json',
//         // Add any other default headers here
//     },
// });

export const apiService = {
  // A function to make a GET request
  get: async (url) => {
    try {
      const response = await axios.get(API_BASE_URL + url, config);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  // A function to make a POST request
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.post(API_BASE_URL + url, data, config);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  // A function to make a PUT request
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await axios.put(API_BASE_URL + url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // A function to make a DELETE request
  delete: async (url, config = {}) => {
    try {
      const response = await axios.delete(API_BASE_URL + url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
