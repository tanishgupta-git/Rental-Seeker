import React from 'react';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Line,RiEditLine } from "react-icons/ri";
import './myProperty.css';

const MyProperty = ({Setproperties,user,_id,title}) => {
    
    const handleDelete = () => {
      fetch(`http://localhost:5000/properties/property/${_id}`,{
          method : 'DELETE',
          headers : 
          {
              Authorization : 'Bearer ' + user.token         
          } 
      }).then( res => {
        Setproperties( prevState => prevState.filter( property => property._id !== _id) )
      }).catch( err => {
          console.log(err);
      })
    }
    return (
        <div className='myProperty'>
        <p className='myProperty__title'><Link to={`/properties/${_id}`}>{title}</Link></p>
        <span><Link to={`/add-property/edit/${_id}`}><RiEditLine /></Link></span>
        <span onClick={handleDelete}><RiDeleteBin5Line /></span>
        </div> 
    )
}

export default MyProperty;