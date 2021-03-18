import React from 'react';
import './card.css';
import Star from '../../static/star.png';

const Card = ({imageUrl,title,price,rating}) => {
    return (
    <div className='card'>
    <img src={imageUrl} alt=""/>
    <h2>{title}</h2>
    <div className="card-footer">
       <p>Rs. {price}</p>
       <p className="rating"><img className="star" src={Star} alt="" /> {rating}</p>
    </div>
    </div>
    )
}

export default Card;