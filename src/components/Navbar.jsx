import React from 'react'
import Web3 from 'web3';
import './Navbar.css'

function Navbar() {
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
        <div className='name'>sWasps</div>
        <div className="btn" onClick={(e)=>connectWallet()}>Connect</div>
      </div> 
    </div>
  )
}

export default Navbar