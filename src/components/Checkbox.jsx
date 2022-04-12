import React,{useState, useEffect} from 'react'
import './Checkbox.css'

function Checkbox() {
  const staticProtocols = [{name:"P1"},{name:"P2"},{name:"P3"}]

  const [protocols, setProtocols] = useState([]);

  useEffect(()=>{
    setProtocols(staticProtocols)
  },[])

  return (
    <div className='checkbox-container' >
      <form className='form'>
        <h1>Protocols</h1>
        <div className="checkoption-container">
          <input type="checkbox" className='checkbox-option'/>
          <label className="form-check-label">Select All</label>
        </div>

        {protocols.map((protocol)=>(
          <div className="checkoption-container">
            <input type="checkbox" className='checkbox-option'/>
            <label className="form-check-label">{protocol.name}</label>
        </div>
        ))}

        
      </form>
    </div>
  )
}

export default Checkbox