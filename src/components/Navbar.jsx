import './Navbar.css'
import { useSelector } from 'react-redux'


function Navbar() {
  // const navigate = useNavigate()

  const {walletAddress} = useSelector((state)=> state.wallet)

  return (
    <div className='nav_container'>
      <div className="nav_text">
        
        <div className='name'>
          <img src='images/swapLogo.png' alt='logo' className='logoImage'/>
          <div className="logo-text">
            <h1>sWasps</h1>
          </div>
        </div>
        {walletAddress?
          <div className="btn"> {walletAddress}</div>:
          <></>
        }
        
      </div> 
    </div>
  )
}

export default Navbar