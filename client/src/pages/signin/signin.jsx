import React,{useState} from 'react';
import Signup from '../../components/Signin/signup';
import Login from '../../components/Signin/signin';
import './signin.css';

const Signin = () => {
    const [signup,Setsignup] = useState(false);
    return (
    <div className='centerForm'>
        { signup ? 
          <Signup Setsignup={Setsignup} />
          : <Login Setsignup={Setsignup} />
        }
 
    </div>
    )
}

export default Signin;