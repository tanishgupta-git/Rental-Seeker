import React from 'react';
import { Route } from 'react-router-dom';
import Signup from '../../components/Signin/signup';
import Login from '../../components/Signin/signin';
import './signin.css';

const Signin = () => {
    return (
    <div className='centerForm'> 
          <Route path='/user/signup' component={Signup}/>
          <Route path='/user/login' component={Login} />
    </div>
    )
}

export default Signin;