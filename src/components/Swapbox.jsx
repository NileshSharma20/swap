import React, {useState, useEffect} from 'react'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import './Swapbox.css'
import { useSelector, useDispatch } from 'react-redux'
import {getQuote, resetQuote} from '../features/quote/quoteSlice'
import { getTokens} from '../features/token/tokenSlice'

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

  //Lifting selected addresses from Dropdown component
  function getFromAddress(address){
    setFromTokenAddress(address)
  }

  function getToAddress(address){
    setToTokenAddress(address)
  }

  //Deploying apis
  useEffect(()=>{
    dispatch(getTokens())
  },[dispatch])

  useEffect(()=>{
    if( (fromTokenAddress!=="")&&(toTokenAddress!=="")&&(strInputNum!=="0") ){
      const quoteData = {fromTokenAddress, toTokenAddress, strInputNum}
      dispatch(getQuote(quoteData))
    }

    if(isErrorQuote){
      console.log(messageQuote)
    }

    return () => {
      dispatch(resetQuote())
    }
  },[fromTokenAddress, toTokenAddress, strInputNum, isErrorQuote, dispatch, messageQuote])

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
                value={isLoadingQuote ? "":quote} 
                readOnly />}
          </div>
        </div>  
        <div className="from-container">
          <h1><Checkbox/></h1>
        </div>
        <div className='swap-btn'>Swap</div> 
    </div>
  )
}

export default Swapbox