import React,{useEffect,useState} from 'react';
import MyProperty from '../../components/myProperty/myProperty';
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
       <h1>Your Properties</h1>
         {
             properties.map( property => {
              return (<MyProperty key={property._id} user={user} Setproperties={Setproperties} {...property}/>)   
             })
         }
       </div>
   )
}

export default MyProperties;