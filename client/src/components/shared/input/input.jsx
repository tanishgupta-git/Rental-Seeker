import React from 'react'
import './input.css';

function Input({label,type,name,value,handleChange}) {
    return (
        <div className='Input'>
         <p>{label}</p>
         <input type={type} name={name} onChange={handleChange} value={value}/>
       </div>
    )
}

export default Input
