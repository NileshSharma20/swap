import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import tokenService from './tokenService'

const initialState = {
    tokens: [],
    message: '',
}

export const getTokens = createAsyncThunk(
    'token/getTokens',
    async (_, thunkAPI) => {
        try {
            return await tokenService.getTokens()
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

export const tokenSlice = createSlice({
    name: 'tokens',
    initialState,
    reducer:{
        reset: (state) => ({
            tokens: [],
            message: ''})
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTokens.fulfilled, (state,action)=> {
                state.tokens = action.payload
            })
            .addCase(getTokens.rejected, (state, action)=>{
                state.message = action.payload
            })
    }
})

export const {reset} = tokenSlice.actions;

export default tokenSlice.reducer