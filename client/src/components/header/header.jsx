import React from 'react';
import  {Link } from 'react-router-dom';

import './header.css';

const Header = () => {
    return (
        <nav className="header">
         <h1>Rental Seeker</h1>
         <Link to='/add-property'>Add Property</Link>
        </nav>
    )
}

export default Header;