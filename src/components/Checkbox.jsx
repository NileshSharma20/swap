import React,{useState, useEffect} from 'react'
import './Checkbox.css'

import { useSelector, useDispatch } from 'react-redux'
import { getProtocols} from '../features/protocol/protocolSlice'

function Checkbox() {

  const dispatch = useDispatch();
  const {protocolList, isError, isSuccess, isLoading, message} = useSelector((state) => state.protocols)
  const staticProtocols = [{id:"a",title:"P1",isChecked:true},{id:"b",title:"P2",isChecked:true},{id:"c",title:"P3",isChecked:true}]

  const [protocols, setProtocols] = useState([]);
  const [checkedAll,setCheckedAll] = useState(true);

  useEffect(()=>{
    dispatch(getProtocols())
  },[dispatch])

  useEffect(()=>{
    setProtocols(staticProtocols)
  },[])

  const handleChange= (e) => {
    const {title, checked} = e.target
    if(title==="selectAll"){
      let tempProtocols = protocols.map((protocol) => {
        setCheckedAll(checked)
        return{...protocol, isChecked:checked}
      })
      setProtocols(tempProtocols)
      
    }
    else {
      let tempProtocols = protocols.map(protocol => protocol.title===title ? {...protocol, isChecked: checked}:protocol)
      setProtocols(tempProtocols)
    }
  }

  return (
    <div className='checkbox-container' >
      <form className='form'>
        <h1>Protocols</h1>
        <div className="checkoption-container">
          <input 
            type="checkbox" 
            className='checkbox-option'
            title="selectAll"
            checked = {(protocols.filter((protocol)=> protocol?.isChecked!==true).length<1) || checkedAll}
            onChange={handleChange}/>
          <label className="form-check-label">
              {checkedAll? "Clear All":"Select All"}
          </label>
        </div>

        {protocols.map((protocol)=>(
          <div className="checkoption-container" key={protocol.id}>
            <input type="checkbox" 
              className='checkbox-option'
              title={protocol.title}
              checked ={protocol?.isChecked ||false}
              onChange={handleChange} />
            <label className="form-check-label">{protocol.title}</label>
        </div>
        ))}

      </form>
    </div>
  )
}

export default Checkbox