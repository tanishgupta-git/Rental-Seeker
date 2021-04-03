import React from 'react';
import { Route } from 'react-router-dom';
import UserSignup from '../../components/userAuth/userSignup';
import UserSignin from '../../components/userAuth/userSignin';
import './userAuth.css';

const UserAuth = ({Setuser}) => {
    return (
    <div className='centerForm'> 
          <Route path='/user/signup' render={(props) => (<UserSignup {...props} />)}/>
          <Route path='/user/login' render={(props) => (<UserSignin {...props} Setuser={Setuser}/>)} />
    </div>
    )
}

export default UserAuth;