import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";
import { signInWithGoogle } from "../../firebase";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { TrendingUpOutlined } from "@mui/icons-material";

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const initialState = {
  user: getCustomerfromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  wishlist: [],
  orders: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await authService.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (thunkAPI) => {
    try {
      return await authService.signinGoogle();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserProductWishlist = createAsyncThunk(
  "user/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProdToCart = createAsyncThunk(
  "user/cart/add",
  async (cartData, thunkAPI) => {
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
  async (thunkAPI) => {
    try {
      return await authService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteCartProduct = createAsyncThunk(
  "user/cart/product/delete",
  async (id, thunkAPI) => {
    try {
      return await authService.removeProdcutFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCartProduct = createAsyncThunk(
  "user/cart/product/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await authService.updateProdcutFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createUserOrder = createAsyncThunk(
  "user/cart/create-order",
  async (orderData, thunkAPI) => {
    try {
      return await authService.createOrder(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearUserCart = createAsyncThunk(
  "user/cart/clear",
  async (userId, thunkAPI) => {
    try {
      return await authService.clearCart(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const applyDisCoupne = createAsyncThunk(
//     "user/cart/applycoupne",
//     async(coupon,thunkAPI) =>{
//         try{
//             return await authService.applyCoupon(coupon);
//         }
//         catch(error){
//             return thunkAPI.rejectWithValue(error);
//         }
//     }
// );

export const getOrders = createAsyncThunk(
  "user/order/get",
  async (thunkAPI) => {
    try {
      return await authService.getUserOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const canclemyOrder = createAsyncThunk(
  "order/cancle-order",
  async ({ orderId, status }, thunkAPI) => {
    try {
      return await authService.cancleOrder(orderId, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const canclemyOrderItem = createAsyncThunk(
  "order/cancle-order/item",
  async (orderData, thunkAPI) => {
    try {
      return await authService.cancleOrderItem(orderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        if (state.isSuccess === true) {
          toast.info("User Created sucessfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.toString();
        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;

        if (state.isSuccess === true) {
          localStorage.setItem("token", action.payload.token);
          toast.info("User logged In Successfully");
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.toString();

        if (state.isError === true) {
          toast.error(state.message);
        }
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        state.message = "added to wishlist";
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.cartProducts = action.payload;
        if (state.isSuccess) {
          toast.success("Added to cart");
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.deleteCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product Deleted From Cart Successfully");
        }
      })
      .addCase(deleteCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        if (state.isSuccess) {
          toast.success("Product Updated From Cart Successfully");
        }
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      })
      .addCase(createUserOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = true;
        state.order = action.payload;
        if (state.isSuccess) {
          toast.success("Order Created Successfully");
          state.cartProducts = [];
        }
      })
      .addCase(createUserOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Something went wrong");
        }
      })
      .addCase(clearUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = [];
      })
      .addCase(clearUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.toString();
      })
      // .addCase(applyDisCoupne.pending,(state) =>{
      //     state.isLoading = true;
      // })
      // .addCase(applyDisCoupne.fulfilled, (state,action) =>{
      //     state.isLoading = false;
      //     state.isError = false;
      //     state.isSuccess = true;
      //     state.totalAfterDiscount = action.payload;

      // })
      // .addCase(applyDisCoupne.rejected,(state,action) =>{
      //     state.isLoading = false;
      //     state.isError = false;
      //     state.isSuccess = true;
      //     state.message = action.payload.toString();
      // })
      .addCase(loginWithGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(canclemyOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(canclemyOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id
            ? { ...order, orderStatus: action.payload.orderStatus }
            : order
        );
        if (state.isSuccess) {
          toast.success("Order Cancled Successfully.");
        }
      })
      .addCase(canclemyOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.error;
      })
      .addCase(canclemyOrderItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(canclemyOrderItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.removeorderItem = action.payload;
        if (state.isSuccess) {
          toast.success("Product Removed from Order");
        }
      })
      .addCase(canclemyOrderItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
        if (state.isSuccess === false) {
          toast.error("Error Cancling order");
        }
      });
  },
});

export default authSlice.reducer;
