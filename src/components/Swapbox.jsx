import React, {useState, useEffect} from 'react'
import Web3 from 'web3'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import './Swapbox.css'
// import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuote, resetQuote } from '../features/quote/quoteSlice'
import { getTokens} from '../features/token/tokenSlice'
import { getProtocols} from '../features/protocol/protocolSlice'
import { connectWallet, checkAllowance, getAllowance, swap } from '../features/wallet/walletSlice'

function Swapbox() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [quoteLoad, setQuoteLoad] = useState(false);

  const [inputNum, setInputNum] = useState(0);
  let strInputNum = `${inputNum}`

  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [toTokenAddress, setToTokenAddress] = useState("");

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
    setFromTokenAddress(address)
  }

  function getToAddress(address){
    setToTokenAddress(address)
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



  //Initializing arrays
  useEffect(()=>{
    //Loading 
    // if(!tokens || !protocols){
    //   navigate('/loading')
    // }

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
              <Dropdown items={tokens} passAddress={getFromAddress}/>
            </div>
            <input className='number-input' 
              value={inputNum} 
              onChange={(e) =>setInputNum(e.target.value)  } 
              onKeyPress={(e) => !/[0-9,.]/.test(e.key) && e.preventDefault()} />
          </div>
        </div>
        <div className='from-container'>
          <div className='header'>To (estimated)</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={tokens} passAddress={getToAddress}/>
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
          { isConnected?
          <>
          {hasAllowance?<div className='swap-btn' onClick={(e)=>handleSwap()}>Swap</div>:
          <div className='swap-btn' onClick={(e)=>handleGet()}>Get Allowance</div>}</>
          :
          <div className="swap-btn" onClick={(e)=>handleConnect()}>Connect Wallet</div>
          }
        </div>
    </div>
  )
}

export default Swapbox