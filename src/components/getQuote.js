// import { useState } from "react";
const axios = require("axios")

const quoteApi = 'https://api.1inch.io/v4.0/56/quote';
var quote = 0

const getQuote = (fromToken, toToken, value) =>{ 
    axios.get(quoteApi,
    {
        params: {
            fromTokenAddress: fromToken,
            toTokenAddress: toToken,
            amount: value,
        }
    }).then(function (response) {
        console.log(`data: ${typeof response.data.toTokenAmount}`)
        quote = response.data.toTokenAmount
        console.log(`quote: ${quote}`)
    }).catch( function(error){
        console.log(error)
    })
    return quote
}

export default getQuote