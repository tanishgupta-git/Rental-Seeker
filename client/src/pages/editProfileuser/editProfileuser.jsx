import React,{useEffect, useState} from 'react';
import './editProfileuser.css';

const EditProfileUser = ({history,user}) => {
    const [userData,SetuserData] = useState({});
    const [loading,Setloading] = useState(true);
    const [fullname,Setfullname] = useState("");
    const [image,Setimage] = useState('');
    const [error,Seterror] = useState('');
    const types = ['image/png','image/jpeg','image/jpg'];

    useEffect(() => {
        if (user.typeOfuser !== 'User') {
            history.push('/');
        }
        Setloading(true);
        fetch(`http://localhost:5000/auth/user/profile/${user.userId}`,{
            method : 'GET',
            headers : 
            {
                Authorization : 'Bearer ' + user.token         
              } 
          }).then(res => res.json())
          .then(resData => {
              SetuserData(resData);
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
        fetch(`http://localhost:5000/auth/user/profile/${user.userId}`,{
            method : 'POST',
            body:formData,
            headers : 
            {
                Authorization : 'Bearer ' + user.token         
              } 
        }).then( res => {
           history.push(`/user/profile/${user.userId}`)
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
        <div className='editProfile'>
         {
            loading ? "Loading..." : <>
            <form className='editProfile__form' onSubmit={handleSubmit}>
            <h1 className='editProfile__title'>Edit Profile</h1>
            <p className='editProfile__error'>{error}</p>
                <div className='editProfile__Readonlyinput'>
                <span>Username:</span>
                <p>{userData.username}</p> 
                </div>
                <div className='editProfile__Readonlyinput'>
                <span>Email:</span>
                <p>{userData.email}</p>
                </div>
                <div className='editProfile__input'>
                <span>Fullname:</span>
                <input type="text" name="fullname" value={fullname} onChange={(e) => Setfullname(e.target.value)}/>
                </div>
                <div className='editProfile__input'>
                <span>Image:</span>
                <input type="file"  name="image" onChange={handleChange}/>
                </div>
                <div className='editProfile__submit'>
                 <input type='submit' />
                </div>  
            </form>
            </>
         }
        </div>
    )
}

export default EditProfileUser;