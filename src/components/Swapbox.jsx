import React, {useState} from 'react'
// const axios = require("axios")
import getTokens from './getTokens'
import './Swapbox.css'
import Dropdown from './Dropdown'

function Swapbox() {
  const [inputNum, setInputNum] = useState(0);
  const items = getTokens()
  const itemss= [{  
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
          logoURI: "https://tokens.1inch.io/0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c_1.png"
        },
        {   
          symbol:"CHI",
          name: "Chi Gastoken by 1inch",
          decimals: 0,
          address:	"0x0000000000004946c0e9f43f4dee607b0ef1fa1c",
          logoURI: 	"https://tokens.1inch.io/0x0000000000004946c0e9f43f4dee607b0ef1fa1c.png"
        },
        {   
          symbol:"USDT",
          name: "Tether USD",
          decimals: 18,
          address:	"0x55d398326f99059ff775485246999027b3197955",
          logoURI: 	"https://tokens.1inch.io/0xdac17f958d2ee523a2206206994597c13d831ec7.png"
        },
        {   
          symbol:	"BUSD",
          name: 	"BUSD Token",
          decimals: 18,
          address:	"0xe9e7cea3dedca5984780bafc599bd69add087d56",
          logoURI: 		"https://tokens.1inch.io/0x4fabb145d64652a948d72533023f6e7a623c7c53.png"
        },
        {   
          symbol:	"ETH",
          name: 	"Ethereum Token",
          decimals: 18,
          address:	"0x2170ed0880ac9a755fd29b2688956bd959f933f8",
          logoURI: 	"https://tokens.1inch.io/0x2170ed0880ac9a755fd29b2688956bd959f933f8.png"
        },
        {   
          symbol:	"BTCB",
          name: 	"BTCB Token",
          decimals: 18,
          address:	"0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c",
          logoURI:	"https://tokens.1inch.io/0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c.png"
        },
        {   
          symbol:	"AUTO",
          name:	"AUTOv2",
          decimals: 18,
          address:	"0xa184088a740c695e156f91f5cc086a06bb78b827",
          logoURI:		"https://tokens.1inch.io/0xa184088a740c695e156f91f5cc086a06bb78b827.png"
        }]
  const showItems = (()=> {console.log(items)})

  return (
    <div className='swapbox-container'>
        <div className='from-container'>
          <div className='header'>From</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={items} />
              {showItems()}
            </div>
            <input className='number-input' value={inputNum} onChange={(e) =>setInputNum(e.target.value)} onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()} />
          </div>
        </div>
        <div className='from-container'>
          <div className='header'>To (estimated)</div>
          <div className='field-container'>
            <div className="currency">
              <Dropdown items={itemss} />
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