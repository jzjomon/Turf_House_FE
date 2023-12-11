import axios from 'axios';
import {BASEURL} from '../Constants/baseUrl'
import { Toast } from '../Constants/sweetAlert';

export const instance = axios.create({
    baseURL : BASEURL
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
}, ({response : {data}}) => {
    if (data?.blocked) {
        localStorage.clear()
        Toast("You have been blocked by the admin","warning")
    } else if (!data?.auth) {
        localStorage.clear()
        Toast("Auto Authentication faild please. sign in", "warning")
    }
}) 