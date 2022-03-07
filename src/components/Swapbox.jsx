import React, {useState} from 'react'
import './Swapbox.css'
import Dropdown from './Dropdown'

function Swapbox() {
  const [inputNum, setInputNum] = useState(0);
  const items= [{  
            symbol:"BNB",
            name: "BNB",
            decimals: 18,
            address:	"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
            logoURI: 	"https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png"
        },
        {   
          symbol:"WBNB",
          name: "Wrapped BNB",
          decimals: 18,
          address:	"0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c",
          logoURI: 	"https://tokens.1inch.io/…bf2de08d9173bc095c_1.png"
        },
        {   
          symbol:"CHI",
          name: "Chi Gastoken by 1inch",
          decimals: 0,
          address:	"0x0000000000004946c0e9f43f4dee607b0ef1fa1c",
          logoURI: "https://tokens.1inch.io/…f43f4dee607b0ef1fa1c.png"
        }]

  return (
    <div className='swapbox-container'>
        <div className='from-container'>
          <div className='header'>From</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={items} />
            </div>
            <input className='number-input' value={inputNum} onChange={(e) =>setInputNum(e.target.value)} onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
            
          </div>
        </div>
        <div className='from-container'>
          <div className='header'>To (estimated)</div>
          <div className='field-container'>
            {/* <div className='currency'>Some</div> */}
            <div className="currency">
              <Dropdown items={items} />
            </div>
            <input className='number-input' value={inputNum*2} onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
          </div>
        </div>
        {/* {inputNum} */}
    </div>
  )
}

export default Swapbox