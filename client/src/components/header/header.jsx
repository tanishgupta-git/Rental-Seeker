import React,{useState} from 'react';
import  {Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import './header.css';

const Header = ({user,logoutHandler}) => {
    const [popUp,SetpopUp] = useState(false);

    return (
        <nav className="header">
         <Link to='/' className='logo'>Rental Seeker</Link>
         <ul className='header__items'>
          { user.typeOfuser==='Host' && 
          <>
          <li className='header__item'><Link to='/add-property'>Add Property</Link></li> 
          <li className='header__item'><Link to='/myproperties'>Your Properties</Link></li>
          </>
          }
         { 
        user.token ?
        <> 
        <li className='header__item--icon' onClick={() => SetpopUp(prev => !prev)}><FaUserCircle /></li>
         { 
        popUp &&  
         <ul className='header__popup'>
         <li className='header__popupItem'>{user.typeOfuser==="Host" ? <Link to={`/host/profile/${user.userId}`} >My Profile</Link>:
         <Link to={`/user/profile/${user.userId}`} >My Profile</Link> }</li>
         <li className='header__popupItem'><button onClick={logoutHandler}>Logout</button></li>
         </ul> 
         }
        </>
         :
         (
        <>
        <li className='header__item'><Link to='/host/login'>Become a host</Link></li>
        <li className='header__item'><Link to='/user/login'>Login</Link></li>
         </> 
         ) 
         }
         </ul>
        </nav>
    )
}

export default Header;