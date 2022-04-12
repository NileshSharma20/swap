import axios from 'axios'

const checkAllowanceApi = 'https://api.1inch.io/v4.0/56/approve/allowance';
const giveAllowanceApi = 'https://api.1inch.io/v4.0/56/approve/transaction';
const swapApi = 'https://api.1inch.io/v4.0/56/swap';

const checkAllowance = async(tokenAdd, walletAdd)=> {
    await axios.get(checkAllowanceApi,
        {
            params: {
                tokenAddress: tokenAdd,
                walletAddress: walletAdd
            }
        }).then(function (response){
            allow = response
        }).catch( function(error){
            console.log(error)
        })

        return allow
}

const getAllowance = async(tokenAdd) => {
    await axios.get(giveAllowanceApi,
    {
        params:{
            tokenAddress: tokenAdd
        }
    }).then(function(response){
        allowance = response
    }).catch(function(error){
        console.log(error)
    })

    return allowance
}

const swapParameters = async(fromToken, toToken, value, protocols) => {
    await axios.get(swapApi, {
        params:{
            fromTokenAddress: map.get(t1data),
            toTokenAddress: map.get(t2data),
            amount: val.value,
            fromAddress: userAddress,
            slippage: 1,
            disableEstimate: false,
            allowPartialFill: false,
            protocols:finalList.toString()
        }
    }).then(function(response){
        console.log(`swapped`)
    }).catch(function(error){
        console.log(error)
    })
}

const walletService = {
    checkAllowance,
    getAllowance,
    swapParameters,
}

export default walletService