import React,{useState} from 'react'
import Input from '../shared/input/input';
import Button from '../shared/button/button';

function SignIn({Setsignup}) {
    const [username,Setusername] = useState("");
    const [password,Setpassword] = useState("");
    return (
        <div>
        <h1>Login</h1>
        <form>
         <Input label='Username' type='text' name='username' value={username} handleChange={(e) => {Setusername(e.target.value)}}/>
         <Input label='Password' type='password' name='password' value={password} handleChange={(e) => {Setpassword(e.target.value)}}/>
         <Button /> 
         </form>
         Dont't have an account? <button onClick={() => {Setsignup(true)}}>Sign up!</button>
     </div>
    )
}

export default SignIn
