import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import protocolService from './protocolService'

const initialState = {
    protocols: [],
    message: '',
}

export const getProtocols = createAsyncThunk(
    'protocol/getProtocols',
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
            protocols:[],
            message: ''})
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProtocols.fulfilled, (state,action)=> {
                state.protocols = action.payload
            })
            .addCase(getProtocols.rejected, (state, action)=>{
                state.message = action.payload
            })
    }
})

export const {reset} = protocolSlice.actions;

export default protocolSlice.reducer