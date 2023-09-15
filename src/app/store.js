import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from '../features/user/userSlice';
import productReducer from '../features/products/productSlice';
import contactReducer from '../features/contact/contactSlice';
import couponReducer from "../features/coupon/couponSlice";
import currencyReducer from "../features/currency/currencySlice"

export const store=configureStore({
    reducer:{
        auth: authReducer,
        product: productReducer,
        contact: contactReducer,
        currency: currencyReducer,
        // coupon: couponReducer,
       
    }
});

