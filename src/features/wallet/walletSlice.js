import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import walletService from './walletService'

const initialState ={}


export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers:{
        resetQuote: (state) => ({
            something:0,
            isError: false,
            isSuccess: false,
            isLoading: false,
            message: ''}),
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuote.pending , (state)=>{
                state.isLoading = true
            })
            .addCase(getQuote.fulfilled, (state,action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.quote = action.payload
            })
            .addCase(getQuote.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetQuote} = walletSlice.actions;

export default walletSlice.reducer