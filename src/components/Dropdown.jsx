import {useState, useEffect, useRef} from 'react'
import './Dropdown.css'

function Dropdown({items, passAddress, selIndex}) {
    const [isActive,setIsActive] = useState(false);
    const [selected, setSelected] = useState(null);
    
    const functionHandler = (add) => {
      if(add.addressPass!==""){
        passAddress(add);
      }
    }

    let ddRef = useRef();

    useEffect(()=>{
      if(selIndex!==null && selIndex!==selected){
        setSelected(selIndex)
      }
    },[selIndex])

    useEffect(()=>{
      let handler = (event) => {
        if (!ddRef.current.contains(event.target)){
          setIsActive(false)
        }
      };
      document.addEventListener("mousedown", handler);

      return()=>{
        document.removeEventListener("mousedown",handler);
      }
    })

  return (
    <div className='dropdown-container' ref={ddRef}>
      <div className="selection"  onClick={(e) => {setIsActive(!isActive);}}>
        {selected !== null ? 
        (<div className='select-box'>
          <div className='token-info'>
            <div className='logo'>
              <img className='logo-img' src={items[selected].logoURI} alt='' />
            </div>
            <div className='currency-name'>
              {items[selected].symbol}
            </div>
            </div>
            {isActive? <i className="fa fa-caret-up" />:<i className="fa fa-caret-down" /> }
      </div>): 
      <div className='select-box'> token {isActive? <i className="fa fa-caret-up" />:<i className="fa fa-caret-down" />} 
      </div>}
    </div>
      {isActive ? (
        <div className="items-container">
          {items?.map((item,index) => (
            <div key={item.address} className="dropdown-item" onClick={e =>{
              setSelected(index);
              setIsActive(false);
              functionHandler({addressPass:items[index].address, indexPass:index});
            }}>
              <div className="logo"><img className='logo-img' src={item.logoURI} alt='' /></div>
              <div className="currency-name">{item.symbol}</div>
            </div>
          ))}
        </div>) : <></>
      }
    </div>
  )
}

export default Dropdown
