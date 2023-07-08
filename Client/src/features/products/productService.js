import axios from "axios";
import { base_url } from "../../utils/axiosConfig";



const  getProducts = async() => {
    try {
        const response = await axios.get(`${base_url}product`);
        return response.data;
    } catch (error) {
        throw new Error("Netwrok Error");
    } 
};

export const productService ={
    getProducts,
};