// couponService.js
import axios from 'axios';
import { base_url } from '../../utils/axiosConfig';

const applyCouponAPI = async ({ promoCode, userId }) => {
  try {
    const response = await axios.post(`${base_url}user/cart/applycoupon`, { promoCode, userId });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const couponService = {
    applyCouponAPI
}
