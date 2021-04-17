import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './profileHost.css';

const ProfileHost = ({match,user}) => {
    const [hostData,SethostData] = useState();
    const [loading,Setloading] = useState(true);
    useEffect(() => {
      fetch(`http://localhost:5000/auth/host/profile/${match.params.hostId}`,{
        method : 'GET',
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          } 
      }).then(res => res.json())
      .then(resData => {
          SethostData(resData);
          Setloading(false);
      }).catch(err => {
          console.log(err)
      })
    },[match.params.hostId,user])
    return (
        <div className='profile'>
         {
             loading ? <span>Loading ...</span> : 
             <div>
              <h1>{hostData.username}</h1>
              <p>{hostData.fullname}</p>
   
              {user.userId === match.params.hostId && <Link to='/host/profile/edit'>Edit Profile</Link> }
             </div> 
         }
        </div>
    )
}

export default ProfileHost;