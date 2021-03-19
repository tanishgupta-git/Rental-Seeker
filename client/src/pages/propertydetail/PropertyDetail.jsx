import React,{useEffect,useState} from 'react';
import { withRouter } from 'react-router';

import './PropertyDetail.css';

const PropertyDetail = ({match}) => {
const [detail,Setdetail] = useState({});
useEffect(() => {
 fetch(`http://localhost:5000/properties/${match.params.propertyId}`).then(
     (res) => {
         return res.json()
     }
 ).then((resData) => {
    Setdetail(resData.property[0]);
 })
},[match.params.propertyId])
 return (
     <div className="property-detail">
        <h1>{detail.title}</h1>
        <img src={detail.imageUrl} alt=""/>
        <h2>{detail.price}</h2>
     </div>
 )
}

export default withRouter(PropertyDetail);