import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

// instance.interceptors.request...

export default instance;