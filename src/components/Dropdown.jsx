import {useState} from 'react'
// import onClickOutside from 'react-onclickoutside';
import './Dropdown.css'

function Dropdown({items}) {
    const [isActive,setIsActive] = useState(false);
    const [selected, setSelected] = useState(null);


    // Dropdown.handleClickOutside= () => setIsActive(false);

  return (
    <div className='dropdown-container'>
      <div className="selection" onClick={e => {setIsActive(!isActive);}}>
        {selected !== null ? (<div className='select-box'>
          <div className='logo'>{items[selected].logo}</div>
          <div className='currency-name'> {items[selected].symbol}</div>
          {isActive? <i className="fa fa-caret-up" />:<i className="fa fa-caret-down" /> }
      </div>): <div className='select-box'> currency {isActive? <i class="fa fa-caret-up" />:<i className="fa fa-caret-down" />} 
      </div>}
      </div>
      {isActive ? (
      <div className="items-container">
        {items.map((item,index) => (
          <div key={item.symbol} className="dropdown-item" onClick={e =>{
            setSelected(index);
            setIsActive(false);
          }}>
            <div className="logo">{item.logo}</div>
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
