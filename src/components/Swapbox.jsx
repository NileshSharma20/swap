import React, { useState, useEffect, useRef } from 'react'
import Web3 from 'web3'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import './Swapbox.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuote, resetQuote } from '../features/quote/quoteSlice'
import { getTokens} from '../features/token/tokenSlice'
import { getProtocols} from '../features/protocol/protocolSlice'
import { connectWallet, checkAllowance, getAllowance, swap } from '../features/wallet/walletSlice'

function Swapbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quoteLoad, setQuoteLoad] = useState(false);

  const [inputNum, setInputNum] = useState(0);
  let strInputNum = `${inputNum}`

  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [toTokenAddress, setToTokenAddress] = useState("");

  const prevFromAddress = useRef("");
  const prevToAddress = useRef("");

  const [fromTokenIndex, setFromTokenIndex] = useState(null);
  const [toTokenIndex, setToTokenIndex] = useState(null);

  const prevFromIndex = useRef(null);
  const prevToIndex = useRef(null);

  const [protocolSelected, setProtocolSelected] = useState("");

  const [isConnected, setIsConnected] = useState(false)
  const [hasAllowance, setHasAllowance] = useState(false)



  //get quote from store
  const {quote} = useSelector((state) => state.quote)

  //get tokens list from store
  const {tokens} = useSelector((state) => state.tokens)

  //get protocols list from store
  const {protocols} = useSelector((state) => state.protocols)

  //get wallet address
  const {walletAddress, checkAllow} = useSelector((state)=> state.wallet)



  //Lifting selected addresses from Dropdown component
  function getFromAddress(address){
    // console.log(`From: ${JSON.stringify(address,null,4)}`)
    prevFromAddress.current = fromTokenAddress
    prevFromIndex.current = fromTokenIndex
    setFromTokenAddress(address.addressPass)
    setFromTokenIndex(address.indexPass)
  }

  function getToAddress(address){
    // console.log(`To: ${JSON.stringify(address,null,4)}`)
    prevToAddress.current = toTokenAddress
    prevToIndex.current = toTokenIndex
    setToTokenAddress(address.addressPass)
    setToTokenIndex(address.indexPass)
  }

  //Lifting selected protocols from Checkbox
  function getProtocolSelected(selectedProtocls){
    setProtocolSelected(selectedProtocls)
  }


  //OnClick events
  function handleConnect(){
    dispatch(connectWallet())
  }

  function handleGet(){
    let checkData = {fromTokenAddress,walletAddress}
    dispatch(getAllowance(checkData))
  }

  function handleSwap(){
    if(strInputNum && fromTokenAddress && toTokenAddress && protocolSelected && walletAddress){
    
    let big = Web3.utils.toWei(strInputNum)
    let swapData = {fromTokenAddress, toTokenAddress, big, protocolSelected, walletAddress}
    dispatch(swap(swapData))
    }
    else{
      alert("Enter valid data")
    }
  }

  function interchangeAdd(){
    let tempAdd = fromTokenAddress
    let tempIndex = fromTokenIndex
    console.log(`temp: ${tempIndex} from: ${fromTokenAddress} to:${toTokenAddress}`)
    setFromTokenAddress(toTokenAddress)
    setFromTokenIndex(toTokenIndex)
    setToTokenAddress(tempAdd)
    setToTokenIndex(tempIndex)
  }

  // function equalInterchange(){
  //   let tempAdd = 
  //   let tempIndex = 
  //   setToTokenAddress()
  //   setToTokenIndex()
  //   setFromTokenAddress()
  //   setFromTokenIndex()
  // }



  //Initializing arrays
  useEffect(()=>{
    //Loading 
    if(!tokens || !protocols){
      navigate('/loading')
    }

    dispatch(getTokens())
    dispatch(getProtocols())
  },[])

  //Quote Loading
  useEffect(()=>{
    if(quote){
      setQuoteLoad(false)
    }
  },[quote])


  //Deploying APIs
  useEffect(()=>{
    console.log(`fromTokenAdd: ${fromTokenAddress} prev: ${prevFromAddress.current}`)
    console.log(`toTokenAdd: ${toTokenAddress} prev: ${prevToAddress.current}`)

    let strInputNum = `${inputNum}`
    if(strInputNum){
      var big = Web3.utils.toWei(strInputNum)
    }
    
    //If connected to a wallet
    if(walletAddress){
      setIsConnected(true)
    }else{
      setIsConnected(false)
    }

    //Checking Allowance
    if(fromTokenAddress && walletAddress){
      let checkData = {fromTokenAddress,walletAddress}
      dispatch(checkAllowance(checkData))
    }

    //Checking if account has sufficient balance
    if(checkAllow>0 && checkAllow>big){
      setHasAllowance(true)
    }
    else{
      setHasAllowance(false)
    }

    //Sending 0 as input leads to server error
    if(strInputNum==="0"){
      strInputNum = ""
    }

    //If same from and to
    // if(fromTokenAddress && toTokenAddress && fromTokenAddress === toTokenAddress){
    //   if(fromTokenAddress !== prevFromAddress && prevFromAddress){
    //     setFromTokenAddress(toTokenAddress)
    //     setFromTokenIndex(toTokenIndex)
    //     setToTokenAddress(prevFromAddress)
    //     setToTokenIndex(prevFromIndex)
    //   }else if(toTokenAddress !== prevToAddress && prevToAddress){
    //     setToTokenAddress(fromTokenAddress)
    //     setToTokenIndex(fromTokenIndex)
    //     setFromTokenAddress(prevToAddress)
    //     setFromTokenIndex(prevToIndex)
    //   }
    // }

    //Getting quote
    if( (fromTokenAddress!=="")&&(toTokenAddress!=="")&&(strInputNum) ){
      const quoteData = {fromTokenAddress, toTokenAddress, big}
      dispatch(getQuote(quoteData))
      setQuoteLoad(true)
    }

    //Restting quote value
    return () => {
      setQuoteLoad(false)
      dispatch(resetQuote())
    }
  },[fromTokenAddress, toTokenAddress, strInputNum, walletAddress, checkAllow, dispatch])

  return (
    <div className='swapbox-container'>
        <div className='from-container'>
          <div className='header'>From</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={tokens} selIndex={fromTokenIndex} passAddress={getFromAddress}  />
            </div>
            <input className='number-input' 
              value={inputNum} 
              onChange={(e) =>setInputNum(e.target.value)  } 
              onKeyPress={(e) => !/[0-9,.]/.test(e.key) && e.preventDefault()} />
          </div>
        </div>

        <div className="interchange">
          <div className="interchange-btn" onClick={(e)=>interchangeAdd()}>
          <i className="fa fa-arrow-down" />
          </div>
        </div>

        <div className='from-container'>
          <div className='header'>To (estimated)</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={tokens} selIndex={toTokenIndex} passAddress={getToAddress} />
            </div>
            {quoteLoad ?
              <div className='load'></div> :
              <input className='number-input'  
                value={quote} 
                readOnly />}
          </div>
        </div>  
        <div className="protocol-container">
          <h1><Checkbox protocolsList={protocols} passSelectedProtocols={getProtocolSelected}/></h1>
        </div>
        <div className="button-container">
          {isConnected?
          <>
            {hasAllowance?
              <div className='swap-btn' onClick={(e)=>handleSwap()}>Swap</div>:
              <div className='swap-btn' onClick={(e)=>handleGet()}>Get Allowance</div>}
          </>
          :
          <div className="swap-btn" onClick={(e)=>handleConnect()}>Connect Wallet</div>
          }
        </div>
    </div>
  )
}

export default Swapbox