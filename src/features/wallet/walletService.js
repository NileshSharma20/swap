import axios from 'axios'
// import {useState} from 'react'
import Web3 from 'web3'

const checkAllowanceApi = 'https://api.1inch.io/v4.0/56/approve/allowance';
const giveAllowanceApi = 'https://api.1inch.io/v4.0/56/approve/transaction';
const swapApi = 'https://api.1inch.io/v4.0/56/swap';

var allow = "";
// var allowance = {};
var accAddress = ""

const connectWallet = async() => {
    
    let provider = window.ethereum;
    
    if(typeof provider !== 'undefined'){
      provider.request({method: 'eth_requestAccounts'})
      .then((accounts) =>{
        console.log(`Account: ${accounts[0]}`);
        
      }).catch((error)=>{
        console.log(error);
      })
    
      window.ethereum.on('accountsChanged', function(accounts){
        console.log(`Account changed to: ${accounts[0]}`)
      })
    }

    const web3 = new Web3(provider)
    const accounts = await web3.eth.getAccounts();
    accAddress = accounts[0]
    return accAddress
}

const checkAllowance = async(fromTokenAdd, walletAdd)=> {
    await axios.get(checkAllowanceApi,
        {
            params: {
                tokenAddress: fromTokenAdd,
                walletAddress: walletAdd
            }
        }).then(function (response){
            // console.log(`response: ${JSON.stringify(response,null,4)}`)
            allow = response.data
        }).catch( function(error){
            console.log(error)
        })

        return allow
}

const getAllowance = async(fromTokenAdd, walletAddress) => {
    const response = await axios.get(giveAllowanceApi,
    {
        params:{
            tokenAddress: fromTokenAdd
        }
    })
    // .then(function(response){
    //     allowance = response.data


    // }).catch(function(error){
    //     console.log(error)
    // })

    const web3 = new Web3(window.ethereum)
    const sign = await web3.eth.sendTransaction({
        from: walletAddress,
        data: response.data.data,
        gasPrice: response.data.gasPrice,
        to: response.data.to,
        value: response.data.value
    })

    return response.data
}

const swapParameters = async(fromToken, toToken, value, protocolsList, userAddress) => {
    const response = await axios.get(swapApi, {
        params:{
            fromTokenAddress: fromToken,
            toTokenAddress: toToken,
            amount: value,
            fromAddress: userAddress,
            slippage: 1,
            disableEstimate: false,
            allowPartialFill: false,
            protocols:protocolsList
        }
    })

    const swapData = response.data.tx

    const web3 = new Web3(window.ethereum)
    await web3.eth.sendTransaction(swapData)
}

const walletService = {
    connectWallet,
    checkAllowance,
    getAllowance,
    swapParameters,
}

export default walletService