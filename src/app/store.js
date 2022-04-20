import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "../features/quote/quoteSlice";
import tokenReducer from "../features/token/tokenSlice"
import protocolSlice from "../features/protocol/protocolSlice";
import walletSlice from "../features/wallet/walletSlice";

export const store = configureStore({
    reducer: {
        quote: quoteReducer,
        tokens: tokenReducer,
        protocols: protocolSlice,
        wallet: walletSlice,
    }
})