import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import walletService from './walletService'

const initialState ={
    walletAddress: "",
    checkAllow: "",
    getAllow:"",
    message: ''
}

export const connectWallet = createAsyncThunk(
    'wallet/connectWallet',
    async (_, thunkAPI) => {
        try {
            // let w = walletService.connectWallet() 
            // console.log(`${w}`)
            return walletService.connectWallet()
        } catch (error) {
            const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

export const checkAllowance = createAsyncThunk(
    'wallet/checkAllowance',
    async(checkData, thunkAPI) =>{
        try {
            return await walletService.checkAllowance(checkData.fromTokenAddress, checkData.walletAddress)
        } catch (error) {
            const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getAllowance = createAsyncThunk(
    'wallet/getAllowance',
    async(checkData, thunkAPI) =>{
        try {
            return await walletService.getAllowance(checkData.fromTokenAddress,checkData.walletAddress)
        } catch (error) {
            const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)

export const swap = createAsyncThunk(
    'wallet/swap',
    async(swapData, thunkAPI) =>{
        try {
            return await walletService.swapParameters(swapData.fromTokenAddress, 
                                                      swapData.toTokenAddress, 
                                                      swapData.big, 
                                                      swapData.protocolSelected, 
                                                      swapData.walletAddress)
        } catch (error) {
            const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
        }
    }
)


export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers:{
        resetWallet: (state) => ({
            walletAddress:"",
            checkAllow: "",
            getAllow:"",
            message: ''}),
    },
    extraReducers: (builder) => {
        builder
            .addCase(connectWallet.fulfilled, (state,action) => {
                state.walletAddress = action.payload
            })
            .addCase(connectWallet.rejected, (state,action) => {
                state.message = action.payload
            })
            .addCase(checkAllowance.fulfilled, (state,action) => {
                state.checkAllow = action.payload
            })
            .addCase(checkAllowance.rejected, (state,action) => {
                state.message = action.payload
            })
            .addCase(getAllowance.fulfilled, (state,action) => {
                state.getAllow = action.payload
            })
            .addCase(getAllowance.rejected, (state,action) => {
                state.message = action.payload
            })
            .addCase(swap.fulfilled, (state,action) => {
                console.log(`Swapped!`)
            })
            .addCase(swap.rejected, (state,action) => {
                state.message = action.payload
            })
    }
})

export const {resetWallet} = walletSlice.actions;

export default walletSlice.reducer