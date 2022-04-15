import React, {useState, useEffect} from 'react'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import './Swapbox.css'
import { useSelector, useDispatch } from 'react-redux'
import {getQuote, resetQuote} from '../features/quote/quoteSlice'
import { getTokens} from '../features/token/tokenSlice'
import { getProtocols} from '../features/protocol/protocolSlice'

function Swapbox() {
  const dispatch = useDispatch();

  const [inputNum, setInputNum] = useState(0);
  let strInputNum = `${inputNum}`

  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [toTokenAddress, setToTokenAddress] = useState("");

  //get quote from store
  const {quote, isErrorQuote, isSuccessQuote, isLoadingQuote, messageQuote} = useSelector((state) => state.quote)

  //get tokens list from store
  const {tokens, isErrorToken, isSuccessToken, isLoadingToken, messageToken} = useSelector((state) => state.tokens)

  //get protocols list from store
  const {protocols, isErrorPro, isSuccessPro, isLoadingPro, messagePro} = useSelector((state) => state.protocols)

  //Lifting selected addresses from Dropdown component
  function getFromAddress(address){
    setFromTokenAddress(address)
  }

  function getToAddress(address){
    setToTokenAddress(address)
  }

  //Initializing arrays
  useEffect(()=>{
    dispatch(getTokens())
    dispatch(getProtocols())
  },[dispatch])

  
  //Deploying APIs
  useEffect(()=>{
    //Sending 0 as input leads to server error
    if(strInputNum==="0"){
      strInputNum = ""
    }

    //Getting quote
    if( (fromTokenAddress!=="")&&(toTokenAddress!=="")&&(strInputNum) ){
      const quoteData = {fromTokenAddress, toTokenAddress, strInputNum}
      dispatch(getQuote(quoteData))
    }

    //Loading prompts
    if(isLoadingQuote){
      console.log(`Loading Quote`)
    }

    //Error Prompts
    if(isErrorQuote){
      console.log(messageQuote)
    }

    if(isErrorToken){
      console.log(messageToken)
    }

    if(isErrorPro){
      console.log(messagePro)
    }
    
    //Restting quote value
    return () => {
      dispatch(resetQuote())
    }
  },[fromTokenAddress, toTokenAddress, strInputNum, isErrorQuote, isErrorPro, isErrorToken, messagePro, messageToken, dispatch, messageQuote])

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
              onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
          </div>
        </div>
        <div className='from-container'>
          <div className='header'>To (estimated)</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={tokens} passAddress={getToAddress}/>
            </div>
            {isLoadingQuote ?
              <div className='load'></div> :
              <input className='number-input'  
                value={quote} 
                readOnly />}
          </div>
        </div>  
        <div className="protocol-container">
          <h1><Checkbox protocolsList={protocols}/></h1>
        </div>
        <div className="button-container">
          
          <div className='allow-btn'>Check Allowance</div>
          <div className='allow-btn'>Get Allowance</div>
          <div className='swap-btn'>Swap</div> 
        </div>
    </div>
  )
}

export default Swapbox