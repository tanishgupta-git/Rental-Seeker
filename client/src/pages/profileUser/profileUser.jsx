import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './profileUser.css';

const ProfileUser = ({match,user}) => {
    const [userData,SetuserData] = useState();
    const [loading,Setloading] = useState(true);
    useEffect(() => {
      fetch(`http://localhost:5000/auth/user/profile/${match.params.userId}`,{
        method : 'GET',
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          } 
      }).then(res => res.json())
      .then(resData => {
          SetuserData(resData);
          Setloading(false);
      })
    },[match.params.userId,user])
    return (
        <div className='profile'>
         {
             loading ? <span>Loading ...</span> : 
             <div>
              <h1>{userData.username}</h1>
              <p>{userData.fullname}</p>
             {user.userId === match.params.userId && <Link to='/user/profile/edit'>Edit Profile</Link> }
             </div> 
         }
        </div>
    )
}

export default ProfileUser;