import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";



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
        return thunkAPI.rejectWithValue(error)
    }
});

const initialState ={
    user:"",
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}
export const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
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
            state.createdUser = action.payload;
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
            state.createdUser = action.payload;
            
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
            console.log(action.payload);
            if(state.isError === true){
                toast.error(state.message);
            }
        })
    }
})

export default authSlice.reducer;