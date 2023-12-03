import axios from 'axios';
const baseURL = process.env.REACT_APP_BASEURL;

export const instance = axios.create({
    baseURL,
    // timeout : 5000
})


instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    config.headers['Authorization'] = 'Bearer ' + token;
    config.headers['Access-Control-Allow-Origin'] = "*";
    return config;
});

instance.interceptors.response.use((response) => {
    return response;
}, ({ response: { data: { auth } } }) => {
    if (!auth) return Promise.reject(localStorage.clear())
})