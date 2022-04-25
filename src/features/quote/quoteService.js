import axios from 'axios'
import Web3 from 'web3'

const quoteApi = 'https://api.1inch.io/v4.0/56/quote';
var quote = 0
var quoteDec = ""
const getQuote = async(fromToken, toToken, value) =>{     
    await axios.get(quoteApi,
    {
        params: {
            fromTokenAddress: fromToken,
            toTokenAddress: toToken,
            amount: value,
        }
    }).then(function (response) {
        quoteDec = Web3.utils.fromWei(response.data.toTokenAmount);
        quote = parseFloat(quoteDec).toFixed(3);
        // quote = quote.toFixed(3)
        //|| quote==="0.000"
        // console.log(`quote type: ${typeof(quote)}`)
        // console.log(JSON.stringify(response.data,null,4))
        if(value==="0" ){
            quote = 0;
        }
    }).catch( function(error){
        console.log(error)
    })

    return quote
}

const quoteService = {
    getQuote,
}

export default quoteService