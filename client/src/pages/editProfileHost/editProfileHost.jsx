import React,{useEffect, useState} from 'react';
import './editProfileHost.css';

const EditProfileHost = ({history,user}) => {
    const [hostData,SethostData] = useState({});
    const [loading,Setloading] = useState(true);
    const [fullname,Setfullname] = useState("");
    const [image,Setimage] = useState('');
    const [error,Seterror] = useState('');
    const types = ['image/png','image/jpeg','image/jpg'];
    useEffect(() => {
      if (user.typeOfuser !== 'Host') {
          history.push('/');
      }
      Setloading(true);
      fetch(`http://localhost:5000/auth/host/profile/${user.userId}`,{
        method : 'GET',
        headers : 
        {
            Authorization : 'Bearer ' + user.token         
          } 
      }).then(res => res.json())
      .then(resData => {
          SethostData(resData);
          Setfullname(resData.fullname);
          Setloading(false);
      })
    },[history,user.typeOfuser,user.token,user.userId])
    const handleSubmit = (e) => {
     e.preventDefault();
     if(!fullname && !image) {
         Seterror("Can't leave empty to the fields");
         return; 
     }
     const formData = new FormData();
     console.log(image);
     formData.append('fullname',fullname);
     formData.append('image', image);
     fetch(`http://localhost:5000/auth/host/profile/${user.userId}`,{
         method : 'POST',
         body:formData,
         headers : 
         {
             Authorization : 'Bearer ' + user.token         
           } 
     }).then( res => {
        history.push(`/host/profile/${user.userId}`)
     }).catch((err) => {
         Seterror('Error from server');
     })
    }
// function for handling the changes in image
const  handleChange = (e) => {
    let selected = e.target.files[0];
    
    if(selected && types.includes(selected.type)){
         if((selected.size / 1000000) > 2) {
            Setimage(null);
            Seterror('Image file should be less than 2MB'); 
            return;  
        }
        Setimage(selected);
        Seterror('');
    }else{
        Setimage(null);
       Seterror('Please select an image of type png,jpeg,jpg'); 
    }

   }
    return (
        <div className='editProfilehost'>
        {
            loading ? "Loading..." : <>
            <h1>Edit Profile</h1>
            <p className='editProfilehost__error'>{error}</p>
            <form onSubmit={handleSubmit}>
                <p>{hostData.username} </p>
                <p>{hostData.email}</p>
                <p><input type="text" name="fullname" value={fullname} onChange={(e) => Setfullname(e.target.value)}/></p>
                <p><input type="file"  name="image" onChange={handleChange}/></p>
                <p><input type='submit' /></p>  
            </form>
            </>
        }

        </div>
    )
}

export default EditProfileHost;