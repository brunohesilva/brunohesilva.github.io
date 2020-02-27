import axios from "axios";
import router from '../routes';

const api = axios.create({
    baseURL: "http://192.168.3.100:80/api"
});

api.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        console.log(error)
        if (error.response.status === 401) {
            router.push({
                path: '/login',
                name: 'login'
            })
        }

        return Promise.reject(error)
    },
    function (error) {
        console.log(error)
        if (error.response.status === 401) {
            router.push({
                path: '/studentslogin',
                name: 'studentslogin'
                
            })
        }

        return Promise.reject(error)
    }
)

export default api;