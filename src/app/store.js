import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "../features/quote/quoteSlice";
import tokenReducer from "../features/token/tokenSlice"

export const store = configureStore({
    reducer: {
        quote: quoteReducer,
        tokens: tokenReducer,
    }
})