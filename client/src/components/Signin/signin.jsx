import React,{useState} from 'react'
import Input from '../shared/input/input';
import Button from '../shared/button/button';
import { Link } from 'react-router-dom';

function SignIn() {
    const [username,Setusername] = useState("");
    const [password,Setpassword] = useState("");
    const [error,Seterror] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username && !password) {
            Seterror("All fields are required");
        }
        fetch('http://localhost:5000/auth/user/login',{
            method :'POST',
            body :JSON.stringify({
               username:username,
               password:password
            }),
            headers : {
                'Content-Type':'application/json'
            }
        }).then((res) => {
          console.log(res);
        }).catch( err => {
            console.log(err);
        })

    }
    
    return (
        <div>
        <h1>Login</h1>
        <p>{error}</p>
        <form onSubmit={handleSubmit}>
         <Input label='Username' type='text' name='username' value={username} handleChange={(e) => {Setusername(e.target.value)}}/>
         <Input label='Password' type='password' name='password' value={password} handleChange={(e) => {Setpassword(e.target.value)}}/>
         <Button /> 
         </form>
         Dont't have an account? <Link to='/user/signup'>Sign up!</Link>
     </div>
    )
}

export default SignIn
