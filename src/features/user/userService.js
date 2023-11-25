import axios from "axios";

import { base_url, config } from "../../utils/axiosConfig";
import { auth, googleProvider, signInWithGoogle } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const register = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/register`, userData);
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw new Error("Netwrok Error");
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${base_url}user/login`, userData);
    if (response.data) {
      localStorage.setItem("customer", JSON.stringify(response.data));
    }
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    throw new Error("Netwrok Error");
  }
};

const logout = async () => {
  const request = config();
  try {
    const response = await axios.get(`${base_url}user/logout`, null, request);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

const getUserWishlist = async () => {
  const request = config();
  const response = await axios.get(`${base_url}user/wishlist`, request);
  if (response.data) {
    return response.data;
  }
};

const addToCart = async (cartData) => {
  const request = config();
  const response = await axios.post(`${base_url}user/cart`, cartData, request);
  if (response.data) {
    return response.data;
  }
};

const getCart = async () => {
  const request = config();
  const response = await axios.get(`${base_url}user/cart`, request);
  if (response.data) {
    return response.data;
  }
};

const removeProdcutFromCart = async (cartItemId) => {
  const request = config();
  const response = await axios.delete(
    `${base_url}user/delete-product-cart/${cartItemId}`,
    request
  );
  if (response.data) {
    return response.data;
  }
};

const updateProdcutFromCart = async (cartDetail) => {
  const request = config();
  const response = await axios.delete(
    `${base_url}user/update-product-cart/${cartDetail.cartItemId}/${cartDetail.quantity}`,
    request
  );
  if (response.data) {
    return response.data;
  }
};

const clearCart = async (userId) => {
  const request = config();
  try {
    const response = await axios.delete(`${base_url}user/empty-cart`, request, {
      userId,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
const createOrder = async (orderData) => {
  const request = config();
  try {
    console.log(orderData);
    const response = await axios.post(
      `${base_url}user/cart/create-order`,
      orderData,
      request
    );
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

const signinGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const displayNameParts = result.user.displayName.split(" ");
    const firstName = displayNameParts[0];

    const response = await axios.post(`${base_url}user/google-login`, {
      email: result.user.email,
      firstname: firstName,
      mobile: result.user.phoneNumber || "",
    });
    console.log(response);
    if (response.data) {
      await new Promise((resolve) => {
        localStorage.setItem("customer", JSON.stringify(response.data));
        resolve();
      });
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

const getUserOrders = async () => {
  const request = config();
  try {
    const response = await axios.get(`${base_url}user/getmyorders`, request);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
const cancleOrder = async (orderId, status) => {
  const request = config();
  try {
    const response = await axios.put(
      `${base_url}user/order/cancle-order/${orderId}`,
      { status },
      request
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

const cancleOrderItem = async (orderData) => {
  const request = config();
  const response = await axios.delete(
    `${base_url}user/remove-order/${orderData.orderId}/${orderData.itemId}`,
    request
  );
  if (response.data) {
    return response.data;
  }
};
export const authService = {
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
  logout,
  signinGoogle,
  getUserOrders,
  cancleOrder,
  cancleOrderItem,
};
