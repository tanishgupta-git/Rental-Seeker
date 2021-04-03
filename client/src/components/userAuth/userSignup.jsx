import React,{useState} from 'react'
import Input from '../shared/input/input';
import Button from '../shared/button/button';
import { Link } from 'react-router-dom';

const UserSignup = () => {
    const [username,Setusername] = useState("");
    const [email,Setemail] = useState("");
    const [password,Setpassword] = useState("");
    const [confirmPassword,SetconfirmPassword] = useState("");
    const [error,Seterror] = useState("");
    const handleSubmit = (e) => {
     e.preventDefault();
     if(!username && !email && !password && !confirmPassword ) {
         Seterror("All fileds are required");
     }
     if(username.length < 5) {
      Seterror('username should consists of atleast 5 characters');
     }
     if(password.length < 5){
         Seterror('password should consists of atleast 5 charaters');
     }
     if(password !== confirmPassword) {
         Seterror("Password and Confirm Password doesn't match");
     }
     fetch('http://localhost:5000/auth/user/signup',{
        method :'PUT',
        body : JSON.stringify({
           username:username,
           email:email,
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
         <h1>Create Your Account</h1>
           <form onSubmit={handleSubmit}>
            <p>{error}</p>
            <Input label='Username' type='text' name='username' value={username} handleChange={(e) => {Setusername(e.target.value)}}/>
            <Input label='Email' type='email' name='email' value={email} handleChange={(e) => {Setemail(e.target.value)}}/>
            <Input label='Password' type='password' name='password' value={password} handleChange={(e) => {Setpassword(e.target.value)}}/>
            <Input label='Confirm Password' type='password' name='confirmPassword' value={confirmPassword} handleChange={(e) => {SetconfirmPassword(e.target.value)}}/>
            <Button />
            </form>
            Already have an account? <Link to='/user/login' >Sign In!</Link>
        </div>
    )
}

export default UserSignup;
