import React,{useState,useEffect} from 'react';
import './homepage.css';
import Card from '../../components/card/card';
const HomePage = () => {
   const [properties,Setproperties] = useState([]);
    useEffect(() => {
     fetch('http://localhost:5000/properties').then((resData) => {
       return resData.json()
     }).then((res) => {
      Setproperties(res.properties)
     })
    },[])
    return (
        <div className="homepage">
        <h1>Welcome to the Rental Seeker</h1>
        <p>The platform where you find your best Rental deals</p>
        <div className="card-container">
        {
          properties.map( property => (
            <Card key={property.id} {...property}/>
          ))
        }
        </div>
        </div>
    )
}

export default HomePage;