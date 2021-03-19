import React from 'react';
import './card.css';
import Star from '../../static/star.png';
import { Link } from 'react-router-dom';

const Card = ({id,imageUrl,title,price,rating}) => {
    return (
    <Link to={`/properties/${id}`} className='card'>
    <img src={imageUrl} alt=""/>
    <h2>{title}</h2>
    <div className="card-footer">
       <p>Rs. {price}</p>
       <p className="rating"><img className="star" src={Star} alt="" /> {rating}</p>
    </div>
    </Link>
    )
}

export default Card;