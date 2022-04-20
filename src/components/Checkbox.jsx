import React,{useState, useEffect} from 'react'
import './Checkbox.css'

function Checkbox({protocolsList, passSelectedProtocols}) {

  const [protocols, setProtocols] = useState([]);
  const [checkedProtocols, setCheckedProtocols] = useState([]);
  const [checkedAll,setCheckedAll] = useState(true);

  const functionHandler=(proStringList)=>{
    passSelectedProtocols(proStringList)
  }

  useEffect(()=>{
    functionHandler(checkedProtocols.toString())
  },[checkedProtocols])

  useEffect(()=>{
    setProtocols(protocolsList)
    setCheckedProtocols(protocolsList.map(protocol => (protocol.isChecked === true)? protocol.id:""))
    // console.log(`set protocols ${JSON.stringify(protocolsList,null,4)}`)
  },[protocolsList])

  const handleChange= (e) => {
    const {title, checked} = e.target
    if(title==="selectAll"){
      let tempProtocols = protocols.map((protocol) => {
        setCheckedAll(checked)
        return{...protocol, isChecked:checked}
      })
      setProtocols(tempProtocols)
      
      let returnProtocols = tempProtocols.filter( protocol => protocol.isChecked === true)
      setCheckedProtocols(returnProtocols.map(protocol => protocol.id))
      // console.log(`checked protocols (selectAll) ${JSON.stringify(checkedProtocols,null,4)}`)
    }
    else {
      let tempProtocols = protocols.map(protocol => protocol.title===title ? {...protocol, isChecked: checked}:protocol)
      setProtocols(tempProtocols)

      let returnProtocols = tempProtocols?.filter( protocol => protocol.isChecked === true)
      setCheckedProtocols(returnProtocols.map(protocol => protocol.id))
    }
  }

  return (
    <div className='checkbox-container' >
      <div className='form'>
        <div className='header'>
          <h1>Protocols</h1>
        </div>
        <div className="checkoption-container">
          <input 
            type="checkbox" 
            className='checkbox-option'
            title="selectAll"
            checked = {(protocols.filter((protocol)=> protocol?.isChecked!==true).length<1) && checkedAll}
            onChange={handleChange}/>
          <label className="form-check-label">
              Select All
          </label>
        </div>
        <div className='checkbox-scroll'>
        {protocols?.map((protocol)=>(
            <div className="checkoption-container" key={protocol.id}>
              <input type="checkbox" 
                
                className='checkbox-option'
                title={protocol.title}
                checked ={protocol?.isChecked ||false}
                onChange={handleChange} />
              <label className="form-check-label">{protocol.title}</label>
          </div>
        ))}
        </div>
          {/* <div className="checkoption-container">{checkedProtocols.toString()}</div> */}
      </div>
    </div>
  )
}

export default Checkbox