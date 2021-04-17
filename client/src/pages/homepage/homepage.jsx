import React,{useState,useEffect} from 'react';
import './homePage.css';
import Card from '../../components/card/card';
import HomeImage from '../../static/homepage.jpg';

const HomePage = ({user}) => {
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
        <div className='homepage__info'>
        <div className='homepage__backinfo'>
           <img src={HomeImage} alt="" />
        </div>
        <div className='homepage___frontinfo'>
          <h1 className='homepage__title'>Welcome to the Rental Seeker</h1>
          <p className='homepage__text'>The platform where you find your best Rental deals</p>
        </div>
        </div>

        <div className="card-container">
        {
          properties.map( property => (
            <Card key={property._id} {...property}/>
          ))
        }
        </div>
        </div>
    )
}

export default HomePage;