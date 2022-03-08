import React, {useState} from 'react'
import getTokens from './getTokens'
import Dropdown from './Dropdown'
import './Swapbox.css'

function Swapbox() {
  const [inputNum, setInputNum] = useState(0);
  const items = getTokens()
  // const showItems = (()=> {console.log(items)})

  return (
    <div className='swapbox-container'>
        <div className='from-container'>
          <div className='header'>From</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={items} />
              {/* {showItems()} */}
            </div>
            <input className='number-input' value={inputNum} onChange={(e) =>setInputNum(e.target.value)} onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
          </div>
        </div>
        <div className='from-container'>
          <div className='header'>To (estimated)</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={items} />
            </div>
            <input className='number-input' value={inputNum*2} readOnly onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
          </div>
        </div>
        <div className="form-container">
          {items}
        </div>
        
    </div>
  )
}

export default Swapbox