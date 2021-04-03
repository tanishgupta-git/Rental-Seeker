import React from 'react';
import { Route } from 'react-router-dom';
import HostSignup from '../../components/hostAuth/hostSignup';
import HostLogin from '../../components/hostAuth/hostSignin';
import './hostAuth.css';

const HostAuth = ({Setuser}) => {
    return (
      <div className='centerForm'>
      <Route path='/host/signup' render={(props) => (<HostSignup {...props} />)}/>
      <Route path='/host/login' render={(props) => (<HostLogin {...props} Setuser={Setuser}/>)}/>
      </div>
    )
}

export default HostAuth;