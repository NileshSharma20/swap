import {createSlice, createAsyncThunk} from 'react-redux'
import tokenService from './tokenService'

const initialState = {
    tokens: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

const getTokens = createAsyncThunk(
    'token/gettokens',
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
            isError: false,
            isSuccess: false,
            isLoading: false,
            message: ''})
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTokens.pending , (state) => {
                state.isLoading= true
            })
            .addCase(getTokens.fulfilled, (state,action)=> {
                state.isLoading = false
                state.isSuccess = true
                state.tokens = action.payload
            })
            .addCase(getTokens.rejected, (state, action)=>{
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = tokenSlice.actions;

export default tokenSlice.reducer