import React from 'react'
import Web3 from 'web3';
import './Navbar.css'

function Navbar() {
  //Connecting to MetaMask Wallet
  const connectWallet = async () =>{
      if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable();
          console.log("Connected");
        } else {
          alert("Metamask not found");
        }
  }

  return (
    <div className='nav_container'>
      <div className="nav_text">
        
        <div className='name'>
          <img src='images/swapLogo.png' alt='logo' className='logoImage'/>
          <div className="logo-text">
            <h1>sWasps</h1>
          </div>
        </div>
        <div className="btn" onClick={(e)=>connectWallet()}>Connect Wallet</div>
      </div> 
    </div>
  )
}

export default Navbar