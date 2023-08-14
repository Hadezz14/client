import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

  const initialState ={
    user:getCustomerfromLocalStorage,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
    wishlist: [],
    order: null,
}

export const registerUser=createAsyncThunk(
    "auth/register",
    async (userData,thunkAPI)=>{
    try {
        return await authService.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
});

export const loginUser=createAsyncThunk(
    "auth/login",
    async (userData,thunkAPI)=>{
    try {
        return await authService.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async(thunkAPI) =>{
        try {
            return await authService.getUserWishlist(); 
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const addProdToCart = createAsyncThunk(
    "user/cart/add",
    async(cartData,thunkAPI) =>{
        try {
            return await authService.addToCart(cartData);
        } catch (error) {
            console.error("Error adding product to cart:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const getUserCart = createAsyncThunk(
    "user/cart/get",
    async(thunkAPI) =>{
        try {
            return await authService.getCart();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const deleteCartProduct = createAsyncThunk(
    "user/cart/product/delete",
    async(id,thunkAPI) =>{
        try {
            return await authService.removeProdcutFromCart(id);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const updateCartProduct = createAsyncThunk(
    "user/cart/product/update",
    async(cartDetail,thunkAPI) =>{
        try {
            return await authService.updateProdcutFromCart(cartDetail);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);
export const createUserOrder = createAsyncThunk(
    "user/cart/create-order",
    async(orderData,thunkAPI) => {
        try {
            return await authService.createOrder(orderData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)


export const authSlice=createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled,(state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            if(state.isSuccess === true){
                toast.info("User Created sucessfully")
            }    
        })
        .addCase(registerUser.rejected, (state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.toString();
            if(state.isError === true){
                toast.error(state.message);
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled,(state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.user = action.payload;
            
            if(state.isSuccess === true){
                localStorage.setItem("token",action.payload.token);
                toast.info("User logged In Successfully")
            }    
        })
        .addCase(loginUser.rejected, (state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.toString();
            
            if(state.isError === true){
                toast.error(state.message);
            }
        })
        .addCase(getUserProductWishlist.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(getUserProductWishlist.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
            state.message = "added to wishlist";
        })
        .addCase (getUserProductWishlist.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addProdToCart.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(addProdToCart.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = true;
            state.cartProduct = action.payload;
            if (state.isSuccess){
                toast.success ("Added to cart")
            }
        })
        .addCase(addProdToCart.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getUserCart.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(getUserCart.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = true;
            state.cartProducts = action.payload;
            
        })
        .addCase(getUserCart.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(deleteCartProduct.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(deleteCartProduct.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = true;
            state.deleteCartProduct = action.payload;
            if (state.isSuccess) {
                toast.success("Product Deleted From Cart Successfully")
            }
            
        })
        .addCase(deleteCartProduct.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess === false) {
                toast.error("Something went wrong")
            }
        })
        .addCase(updateCartProduct.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(updateCartProduct.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = true;
            state.updatedCartProduct = action.payload;
            if (state.isSuccess) {
                toast.success("Product Updated From Cart Successfully")
            }
            
        })
        .addCase(updateCartProduct.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess === false) {
                toast.error("Something went wrong")
            }
        })
        .addCase(createUserOrder.pending,(state) =>{
            state.isLoading = true;
        })
        .addCase(createUserOrder.fulfilled, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = true;
            state.order = action.payload;
            if (state.isSuccess) {
                toast.success("Order Created Successfully")
            }
            
        })
        .addCase(createUserOrder.rejected, (state,action) =>{
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if (state.isSuccess === false) {
                toast.error("Something went wrong")
            }
        })
    },
});

export default authSlice.reducer;
