import React, {useState, useEffect} from 'react'
import getTokens from './getTokens'
import getQuote from './getQuote'
import Dropdown from './Dropdown'
import './Swapbox.css'

function Swapbox() {
  
  const [inputNum, setInputNum] = useState(0);
  let strInputNum = `${inputNum}`

  const [fromTokenAddress, setFromTokenAddress] = useState("");
  const [toTokenAddress, setToTokenAddress] = useState("");
  
  const items = getTokens()

  const [quoteVal,setQuoteVal] = useState('0')

  function getFromAddress(address){
    setFromTokenAddress(address)
  }

  function getToAddress(address){
    setToTokenAddress(address)
  }

  const showQuote = () => {console.log({quoteVal})}

  useEffect(()=>{
    if( (fromTokenAddress!=="")&&(toTokenAddress!=="") ){
      let q = getQuote(fromTokenAddress, toTokenAddress, strInputNum)
      console.log(`q: ${q}`)
      setQuoteVal(q)
     
    }
  },[fromTokenAddress, toTokenAddress, strInputNum])

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
              value={quoteVal} 
              readOnly />
          </div>
        </div>  
        <div className='swap-btn' onClick={(e) => showQuote()}>Swap</div>     
        {/* {fromTokenAddress}  */}
    </div>
  )
}

export default Swapbox