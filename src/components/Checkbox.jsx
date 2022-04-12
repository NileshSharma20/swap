import React,{useState, useEffect} from 'react'
import './Checkbox.css'

function Checkbox() {
  const staticProtocols = [{name:"P1"},{name:"P2"},{name:"P3"}]

  const [protocols, setProtocols] = useState([]);

  useEffect(()=>{
    setProtocols(staticProtocols)
  },[])

  const handleChange= (e) => {
    const {name, checked} = e.target
    if(name==="selectAll"){
      let tempProtocols = protocols.map((protocol) => {
        return{...protocol, isChecked:checked}
      })
      setProtocols(tempProtocols)
    }
    else {
      let tempProtocols = protocols.map(protocol => protocol.name===name ? {...protocol, isChecked: checked}:protocol)
      setProtocols(tempProtocols)
    }
    // console.log(`updating with flag ${protocols}`)
  }

  return (
    <div className='checkbox-container' >
      <form className='form'>
        <h1>Protocols</h1>
        <div className="checkoption-container">
          <input 
            type="checkbox" 
            className='checkbox-option'
            name="selectAll"
            checked = {protocols.filter((protocol)=> protocol?.isChecked!==true).length<1}
            onChange={handleChange}/>
          <label className="form-check-label">
              Select All
          </label>
        </div>

        {protocols.map((protocol)=>(
          <div className="checkoption-container">
            <input type="checkbox" 
              className='checkbox-option'
              key={protocol.name}
              name={protocol.name}
              checked ={protocol?.isChecked ||false}
              onChange={handleChange} />
            <label className="form-check-label">{protocol.name}</label>
        </div>
        ))}

        
      </form>
    </div>
  )
}

export default Checkbox