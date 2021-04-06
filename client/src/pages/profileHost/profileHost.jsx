import React,{useState,useEffect} from 'react';
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
      })
    },[match.params.hostId,user])
    return (
        <div className='profile'>
         {
             loading ? <span>Loading ...</span> : 
             <div>
              <h1>{hostData.username}</h1>
             </div> 
         }
        </div>
    )
}

export default ProfileHost;