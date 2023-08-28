import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";



const  getProducts = async() => {
    try {
        const response = await axios.get(`${base_url}product`);
        return response.data;
        
    } catch (error) {
        throw new Error(`Netwrok Error : ${error.message}`);
    } 
};

const  getSingleProduct = async(id) => {
    try {
        const response = await axios.get(`${base_url}product/${id}`);
        return response.data;
        
    } catch (error) {
        throw new Error(`Netwrok Error : ${error.message}`);
    } 
};

const  addToWishlist = async(prodId) => {
    try {
        const response = await axios.put(
            `${base_url}product/wishlist`,
            {prodId},
            config
            );   
        return response.data;
    } catch (error) {
        return Promise.reject(`Netwrok Error : ${error.message}`);
    } 
};
const  rateProduct = async(data) => {
    try {
        const response = await axios.put(
            `${base_url}product/rating`,
            data,
            config
            );   
        return response.data;
    } catch (error) {
        return Promise.reject(`Netwrok Error : ${error.message}`);
    } 
};

export const productService ={
    getProducts,
    addToWishlist,
    getSingleProduct,
    rateProduct,
};