import React,{useState} from 'react'
import Input from '../shared/input/input';
import Button from '../shared/button/button';
import { Link } from 'react-router-dom';

function HostSignin() {
    const [username,Setusername] = useState("");
    const [password,Setpassword] = useState("");
    const [error,Seterror] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!username && !password) {
            Seterror("All fields are required");
        }
        fetch('http://localhost:5000/auth/host/login',{
            method :'POST',
            body :JSON.stringify({
               username:username,
               password:password
            }),
            headers : {
                'Content-Type':'application/json'
            }
        }).then((res) => {
          return res.json()
        }).then((resData) => {
           console.log(resData);
        }).catch( err => {
            console.log(err);
        })
    }
    return (
        <div>
           <h1>Host Signin</h1>
           <form onSubmit={handleSubmit}>
           <p>{error}</p>
            <Input label='Username' type='text' name='username' value={username} handleChange={(e) => {Setusername(e.target.value)}}/>
            <Input label='Password' type='password' name='password' value={password} handleChange={(e) => {Setpassword(e.target.value)}}/>
            <Button />
            </form>
            Don't Have an account? <Link to='/host/signup' >Sign up!</Link>
        </div>
    )
}

export default HostSignin
