import {useState} from 'react'
// import onClickOutside from 'react-onclickoutside';
import './Dropdown.css'

function Dropdown({items, passAddress}) {
    const [isActive,setIsActive] = useState(false);
    const [selected, setSelected] = useState(null);
    
    const functionHandler = (add) => {
      if(add!==""){
        // console.log(add)
        passAddress(add);
      }
    }
    // Dropdown.handleClickOutside= () => setIsActive(false);

  return (
    <div className='dropdown-container'>
      <div className="selection" onClick={(e) => {setIsActive(!isActive);}}>
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
              functionHandler(items[index].address);
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

// const clickOutsideConfig ={
//   handleClickOutside: () => Dropdown.handleClickOutside, 
// };

// export default onClickOutside(Dropdown, clickOutsideConfig)
export default Dropdown
