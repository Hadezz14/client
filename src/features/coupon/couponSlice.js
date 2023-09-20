import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { couponService } from './couponService';

const initialState = {
  coupon: null,
  discount: 0,
  error: null,
  isLoading: false,
};

// export const applyCoupon = createAsyncThunk('coupon/apply', async ({ promoCode, userId }, thunkAPI) => {
//   try {
//     const response = await axios.post('/api/cart/applycoupon', { promoCode, userId });
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });


export const applyCoupon = createAsyncThunk(
    "cart/applycoupon",
    async({promoCode,userId},thunkAPI) =>{
        try {
            return await couponService.applyCouponAPI({promoCode,userId});
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyCoupon.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coupon = action.payload.message;
        state.discount = action.payload.discount;
        state.error = null;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.coupon = null;
        state.discount = 0;
        state.error = action.payload ? action.payload.error : 'An error occurred while applying the coupon.';
      });
  },
});

export default couponSlice.reducer;
