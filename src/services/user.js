import axios from "axios";
import { API } from '../utils/constants';
import { getToken } from '../utils/token';

export const signIn = ({ username, password }) => {
    const formData = new FormData();
    formData.append("user", username);
    formData.append("pass", password);
    return axios.post(API('login'), formData);
};

export const checkToken = () => {
    return axios.request({
        url: API(`checkToken`),
        headers: { Authorization: getToken() }
    });
};