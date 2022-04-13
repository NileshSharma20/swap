import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import protocolService from './protocolService'

const initialState = {
    protocols: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const getProtocols = createAsyncThunk(
    'protocol/getprotocols',
    async (_, thunkAPI) => {
        try {
            return await protocolService.getProtocols()
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

export const protocolSlice = createSlice({
    name: 'protocols',
    initialState,
    reducer:{
        reset: (state) => ({
            isError: false,
            isSuccess: false,
            isLoading: false,
            message: ''})
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProtocols.pending , (state) => {
                state.isLoading= true
            })
            .addCase(getProtocols.fulfilled, (state,action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.protocols = action.payload
            })
            .addCase(getProtocols.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = protocolSlice.actions;

export default protocolSlice.reducer