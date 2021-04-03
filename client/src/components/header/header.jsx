import React from 'react';
import  {Link } from 'react-router-dom';

import './header.css';

const Header = ({user,logoutHandler}) => {
    return (
        <nav className="header">
         <Link to='/' className='logo'>Rental Seeker</Link>
          { user.typeOfuser==='Host' && <Link to='/add-property'>Add Property</Link>}
         { 
        user.token ? 
         <button onClick={logoutHandler}>logout</button>:(
            <span><Link to='/host/login'>Become a host</Link>
         <Link to='/user/login'>Login</Link></span> 
         ) 
         }
        </nav>
    )
}

export default Header;