import React, {useState, useEffect} from 'react'
import Dropdown from './Dropdown'
import Checkbox from './Checkbox'
import './Swapbox.css'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getQuote, resetQuote } from '../features/quote/quoteSlice'
import { getTokens} from '../features/token/tokenSlice'
import { getProtocols} from '../features/protocol/protocolSlice'

function Swapbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quoteLoad, setQuoteLoad] = useState(false);

  const [inputNum, setInputNum] = useState(0);
  let strInputNum = `${inputNum}`

  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [toTokenAddress, setToTokenAddress] = useState("");

  const [protocolSelected, setProtocolSelected] = useState("");

  //get quote from store
  const {quote} = useSelector((state) => state.quote)

  //get tokens list from store
  const {tokens} = useSelector((state) => state.tokens)

  //get protocols list from store
  const {protocols} = useSelector((state) => state.protocols)

  //Lifting selected addresses from Dropdown component
  function getFromAddress(address){
    setFromTokenAddress(address)
  }

  function getToAddress(address){
    setToTokenAddress(address)
  }

  function getProtocolSelected(selectedProtocls){
    setProtocolSelected(selectedProtocls)
    // console.log(`Selected Protocols:${selectedProtocls}`)
  }

  //Initializing arrays
  useEffect(()=>{
    //Landing Page
    if(!tokens || !protocols){
      navigate('/loading')
    }

    dispatch(getTokens())
    dispatch(getProtocols())
  },[dispatch, navigate, tokens, protocols])

  
  //Deploying APIs
  useEffect(()=>{
    //Sending 0 as input leads to server error
    // let strInputNum = `${inputNum}`
    if(strInputNum==="0"){
      strInputNum = ""
    }

    //Getting quote
    if( (fromTokenAddress!=="")&&(toTokenAddress!=="")&&(strInputNum) ){
      const quoteData = {fromTokenAddress, toTokenAddress, strInputNum}
      dispatch(getQuote(quoteData))
    }

    //Restting quote value
    return () => {
      dispatch(resetQuote())
    }
  },[fromTokenAddress, toTokenAddress, strInputNum, dispatch])

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
          
          <div className='allow-btn'>Check Allowance</div>
          <div className='allow-btn'>Get Allowance</div>
          <div className='swap-btn'>Swap</div> 
        </div>
    </div>
  )
}

export default Swapbox