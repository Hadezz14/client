import axios from "axios";
import { base_url } from "../../utils/axiosConfig";

const register = async (userData) => {
    try {
        const response = await axios.post(`${base_url}user/register`,userData);
        return response.data;
    } catch (error) {
        throw new Error("Netwrok Error");
    } 
};

const login = async (userData) => {
    try {
        const response = await axios.post(`${base_url}user/login`,userData);
        return response.data;
    } catch (error) {
        throw new Error("Netwrok Error");
    } 
};

export const authService ={
    register,
    login,
};