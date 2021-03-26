import React,{useState} from 'react'
import Input from '../shared/input/input';
import Button from '../shared/button/button';

function SignUp({Setsignup}) {
    const [username,Setusername] = useState("");
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    const [confirmPassword,SetconfirmPassword] = useState("");
    return (
        <div>
         <h1>Create Your Account</h1>
           <form>
            <Input label='Username' type='text' name='username' value={username} handleChange={(e) => {Setusername(e.target.value)}}/>
            <Input label='Email' type='email' name='email' value={email} handleChange={(e) => {Setemail(e.target.value)}}/>
            <Input label='Password' type='password' name='password' value={password} handleChange={(e) => {Setpassword(e.target.value)}}/>
            <Input label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} handleChange={(e) => {SetconfirmPassword(e.target.value)}}/>
            <Button />
            </form>
            Already have an account? <button onClick={() => {Setsignup(false)}}>Sign In!</button>
        </div>
    )
}

export default SignUp
