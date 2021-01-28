import axios from 'axios';

const api = axios.create({
    baseURL: "https://qiora.herokuapp.com/",
});

export default api;