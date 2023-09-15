import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice ({
    name: "currency",
    initialState:{
        currency:"Rs",
    },
    reducers:{
        toggleCurrency: (state) =>{
            state.currency = state.currency === "Rs" ? "Pound" : "Rs";
        },
    },
})

export const {toggleCurrency} = currencySlice.actions;
export default currencySlice.reducer;