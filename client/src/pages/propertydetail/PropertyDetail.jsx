import React,{useEffect,useState} from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import './propertyDetail.css';

const PropertyDetail = ({user,match}) => {
const [detail,Setdetail] = useState({imageUrl:""});
useEffect(() => {
 fetch(`http://localhost:5000/properties/property/${match.params.propertyId}`).then(
     (res) => {
         return res.json()
     }
 ).then((resData) => {
    Setdetail(resData.property);
 })
},[match.params.propertyId])
 return (
     <div className="propertyDetail">
        <h1 className='propertyDetail__title'>{detail.title}</h1>
       {detail.imageUrl && <img className='propertyDetail__image' src={"http://localhost:5000/" + detail.imageUrl} alt=""/>}
        <h2>{detail.price}</h2>
        { user && (user.typeOfuser=== 'User' && <Link to={`/host/profile/${detail.host}`}>Contact Host</Link>)
        }
     </div>
 )
}

export default withRouter(PropertyDetail);