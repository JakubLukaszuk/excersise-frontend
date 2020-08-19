import axios from 'axios';

const api = axios.create({
    baseURL: 'https://images.pexels.com',
    responseType: 'blob',
    timeout: 5000
  });


const responseBody = (response) => response.data;

const request = {
    get: async (url) => api.get(url).then(responseBody)
}

export default request;