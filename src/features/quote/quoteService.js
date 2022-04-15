import axios from 'axios'

const quoteApi = 'https://api.1inch.io/v4.0/56/quote';
var quote = 0

const getQuote = async(fromToken, toToken, value) =>{     
    await axios.get(quoteApi,
    {
        params: {
            fromTokenAddress: fromToken,
            toTokenAddress: toToken,
            amount: value,
        }
    }).then(function (response) {
        quote = response.data.toTokenAmount
        console.log(JSON.stringify(response.data,null,4))
        if(value==="0"){
            quote = 0;
        }
    }).catch( function(error){
        console.log(error)
        if(value==="0"){
            quote = 0;
        }
    })

    return quote
}

const quoteService = {
    getQuote,
}

export default quoteService