import React,{useEffect,useState} from 'react';
import './myProperties.css';

const MyProperties = ({user}) => {
    const [properties,Setproperties] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/properties/myproperties',{
            method : 'GET',
            headers : 
            {
                Authorization : 'Bearer ' + user.token         
              } 
          }).then(
            res => res.json()
        ).then( resData => {
            Setproperties(resData.properties    )
        })
    },[user])
   return (
       <div className='myProperties'>
         {
             properties.map( property => {
              return (<span key={property._id}>{property.title}</span>)   
             })
         }
       </div>
   )
}

export default MyProperties;