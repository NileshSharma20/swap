import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import quoteService from './quoteService'

const initialState ={ 
    quote: 0,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Get Quote
export const getQuote = createAsyncThunk(
    'quote/getquote',
    async (quoteData, thunkAPI) => {
        // console.log(`${quoteData.fromTokenAddress}, ${quoteData.toTokenAddress}, ${quoteData.strInputNum}`)
        try {
            return await quoteService.getQuote(quoteData.fromTokenAddress, quoteData.toTokenAddress, quoteData.strInputNum)
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

export const quoteSlice = createSlice({
    name: 'quote',
    initialState,
    reducers:{
        resetQuote: (state) => ({
            quote:0,
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
                state.quote = action.payload
            })
            .addCase(getQuote.rejected, (state,action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {resetQuote} = quoteSlice.actions;

export default quoteSlice.reducer