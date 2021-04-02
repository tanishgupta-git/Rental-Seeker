import React from 'react';
import { Route } from 'react-router-dom';
import HostSignup from '../../components/hostSignin/hostSignup';
import HostLogin from '../../components/hostSignin/hostSignin';
import './hostSignin.css';

const HostSignin = () => {
    return (
      <div className='centerForm'>
      <Route path='/host/signup' component={HostSignup}/>
      <Route path='/host/login' component={HostLogin} />
      </div>
    )
}

export default HostSignin;