import axios from 'axios'

const quoteApi = 'https://api.1inch.io/v4.0/56/quote';
var quote = 0

const getQuote = async(fromToken, toToken, value) =>{ 
    console.log(`${fromToken}, ${toToken}, ${value}`)
    
    await axios.get(quoteApi,
    {
        params: {
            fromTokenAddress: fromToken,
            toTokenAddress: toToken,
            amount: value,
        }
    }).then(function (response) {
        // console.log(`data: ${typeof response.data.toTokenAmount}`)
        quote = response.data.toTokenAmount
        
        console.log(`quote: ${quote}`)
    }).catch( function(error){
        console.log(error)
    })

    
    
    return quote
}

const quoteService = {
    getQuote,
}

export default quoteService