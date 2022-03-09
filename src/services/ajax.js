import axios from "axios";
import { API } from '../utils/constants';

const ajax = axios.create({
    baseURL: API(),
    paramsSerializer: (params) => {
        return queryString.stringify(params, {
            skipEmptyString: true,
            skipNull: true,
        });
    },
});

ajax.interceptors.request.use(
    (config) => {
        //const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME);
        const token = '';

        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

ajax.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return Promise.reject(error.response.data);
        }
        if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            return Promise.reject({
                message: "The request was made but no response was received",
            });
        }
        // Something happened in setting up the request that triggered an Error
        return Promise.reject({
            message: "Something went wrong, Please try again.",
        });
    }
);

export default ajax;