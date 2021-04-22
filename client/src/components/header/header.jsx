import React,{useState} from 'react';
import  {Link } from 'react-router-dom';
import { FaUserCircle,FaSearch } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

import './header.css';

const Header = ({user,logoutHandler}) => {
    const [searchText,SetsearchText] = useState("");
    const [openav,Setopennav] = useState(false);
    return (
        <nav className={openav ?  "header header--open" : "header"}>
        <div className='header__logoparent'>
          <Link to='/' className='header__logo'>Rental Seeker</Link>
          <button onClick={() => Setopennav(prev => !prev)}><HiOutlineMenuAlt3 /></button>
         </div>
         <form className="header__search" action={`/search`} method="GET">
           <input className="header__input" type='text' name="location" value={searchText} onChange={(e) => SetsearchText(e.target.value)} placeholder='Search by Location'/>
           <button className="header__button" type="submit"><FaSearch /></button>
        </form>
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
         <li className='header__item'>{user.typeOfuser==="Host" ? <Link to={`/host/profile/${user.userId}`} >My Profile</Link>:
         <Link to={`/user/profile/${user.userId}`} >My Profile</Link> }</li>
         <li className='header__item'><button onClick={logoutHandler}>Logout</button></li>
        </>
         :
         (
        <>
        <li className='header__item'><Link to='/host/login'><FaUserCircle /> Become a host</Link></li>
        <li className='header__item'><Link to='/user/login'>Login</Link></li>
         </> 
         ) 
         }
         </ul>
        </nav>
    )
}

export default Header;