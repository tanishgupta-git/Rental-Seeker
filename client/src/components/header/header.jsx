import React from 'react';
import  {Link } from 'react-router-dom';

import './header.css';

const Header = () => {
    return (
        <nav className="header">
         <Link to='/' className='logo'>Rental Seeker</Link>
         <Link to='/add-property'>Add Property</Link>
         <Link to='/host/login'>Become a host</Link>
         <Link to='/user/login'>Login</Link>
        </nav>
    )
}

export default Header;