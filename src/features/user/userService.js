import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const register = async (userData) => {
    try {
        const response = await axios.post(`${base_url}user/register`,userData);
        if(response.data){
            localStorage.setItem("customer", JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        throw new Error("Netwrok Error");
    } 
};

const login = async (userData) => {
    try {
        const response = await axios.post(`${base_url}user/login`,userData);
        if(response.data){
            localStorage.setItem("customer", JSON.stringify(response.data));
        }
        if(response.data){
            return response.data;
        }
       
    } catch (error) {
        throw new Error("Netwrok Error");
    } 
};

const getUserWishlist = async () =>{
    const response = await axios.get(`${base_url}user/wishlist`,config);
    if(response.data){
        return response.data;
    }
};


const addToCart = async (cartData)=>{
    const response = await axios.post(`${base_url}user/cart`,cartData,config);
    if(response.data){
        return response.data;
    }
};

const getCart = async ()=>{
    const response = await axios.get(`${base_url}user/cart`,config);
    if(response.data){
        return response.data;
    }
}; 

const removeProdcutFromCart = async (cartItemId)=>{
    const response = await axios.delete(`${base_url}user/delete-product-cart/${cartItemId}`,config);
    if(response.data){
        return response.data;
    }
}; 

const updateProdcutFromCart = async (cartDetail)=>{
    const response = await axios.delete(`${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,config);
    if(response.data){
        return response.data;
    }
};

const clearCart = async(userId) =>{
    try {
        const response = await axios.delete(`${base_url}user/empty-cart`,config,{userId});
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;  
    }
}
const createOrder = async (orderData)=>{
    try {
        console.log(orderData);
        const response = await axios.post(`${base_url}user/cart/create-order`,orderData,config);
        console.log(response.data);
        return response.data;
    
    } catch (error) {
        throw error.response.data.message;
    }
};

// const applyCoupon = async (coupon)=>{
//     try {
//         const response = await axios.post(`${base_url}user/cart/applycoupon`,{coupon},config);
//         console.log(response.data);
//         return response.data;
    
//     } catch (error) {
//         throw error.response.data.message;
//     }
// };   

export const authService ={
    register,
    login,
    getUserWishlist,
    addToCart,
    getCart,
    removeProdcutFromCart,
    updateProdcutFromCart,
    createOrder,
    clearCart,
    // applyCoupon,
};