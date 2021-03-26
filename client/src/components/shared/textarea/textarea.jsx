import React from 'react';
import './textarea.css';

const Textarea = ({label,name,value,handleChange}) => {
    return (
         <div className='Textarea'>
           <p>{label}</p>
           <textarea rows="5" name={name} value={value} onChange={handleChange}>
           </textarea>
         </div>
    )
}

export default Textarea; 