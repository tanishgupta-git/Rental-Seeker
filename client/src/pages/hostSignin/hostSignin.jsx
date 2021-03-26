import React,{useState} from 'react';
import HostSignup from '../../components/hostSignin/hostSignup';
import HostLogin from '../../components/hostSignin/hostSignin';
import './hostSignin.css';

const HostSignin = () => {
   const [signup,Setsignup] = useState(false);
    return (
      <div className='centerForm'>
          { signup ? 
          <HostSignup Setsignup={Setsignup} /> 
          :
           <HostLogin Setsignup={Setsignup} />}
      </div>
    )
}

export default HostSignin;