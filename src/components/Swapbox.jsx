import React, {useState, useEffect} from 'react'
import getTokens from './getTokens'
// import getQuote from './getQuote'
import Dropdown from './Dropdown'
import './Swapbox.css'
// import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {getQuote, reset} from '../features/quote/quoteSlice'

function Swapbox() {
  const disptach = useDispatch();
  // const navigate = useNavigate();

  const [items, setItems] = useState([])

  const [inputNum, setInputNum] = useState(0);
  let strInputNum = `${inputNum}`

  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [toTokenAddress, setToTokenAddress] = useState("");

  // const [quoteVal,setQuoteVal] = useState('0')

  //get quote from store
  const {quote,isError, isSuccess, isLoading, message} = useSelector((state) => state.quote)

  function getFromAddress(address){
    setFromTokenAddress(address)
  }

  function getToAddress(address){
    setToTokenAddress(address)
  }

  // const showQuote = () => {console.log({quoteVal})}

  useEffect(()=>{
    setItems(getTokens())
  },[])

  useEffect(()=>{
    if( (fromTokenAddress!=="")&&(toTokenAddress!=="") ){
      // console.log(`${fromTokenAddress} ${toTokenAddress},${strInputNum}`)
      const quoteData = {fromTokenAddress, toTokenAddress, strInputNum}
      disptach(getQuote(quoteData))
    }

    if(isError){
      console.log(message)
    }

    return () => {
      disptach(reset())
    }
  },[fromTokenAddress, toTokenAddress, strInputNum, isError, disptach, message])

  return (
    <div className='swapbox-container'>
        <div className='from-container'>
          <div className='header'>From</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={items} passAddress={getFromAddress}/>
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
              <Dropdown items={items} passAddress={getToAddress}/>
            </div>
            <input className='number-input'  
              value={quote} 
              readOnly />
          </div>
        </div>  
        <div className='swap-btn'>Swap</div>     
        {/* {fromTokenAddress}  */}
    </div>
  )
}

export default Swapbox