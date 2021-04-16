import React,{useState,useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../components/shared/button/button';
import Input from '../../components/shared/input/input';
import Textarea from '../../components/shared/textarea/textarea';
import './addProperty.css';

const AddProperty = ({history,user}) => {
const [title,Settitle] = useState('');
const [image,Setimage] = useState('');
const [price,Setprice] = useState('');
const [location,Setlocation] = useState('');
const [description,Setdescription] = useState('');
const [error,Seterror] = useState('');
const types = ['image/png','image/jpeg','image/jpg'];

useEffect(() => {
 if(!user.token) {
   history.push('/')
 }
 if(user.typeOfuser !== 'Host'){
   history.push('/')
 }
},[user,history])
// function for handling the chnages in image
const handleChange = (e) => {
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
// function for handling the form
const handleForm = (e) => {
  e.preventDefault();
  if(!title && !image && !price && !location && !description) {
      Seterror('All Fileds Are Required')
      return;
  }
  console.log(image)
  // if(title.length < 5){
  //   Seterror('Title Should Be Between 5 and 50 Characters');
  //   return;
  // }
  if(location.length < 5){
    Seterror('Location Should Be Between 5 and 50 Characters');
    return;
  }
  if(Number(price) <= 0){
    Seterror('Price Should Be Greater Than 0 Rs');
    return;
  }
  if(description.length <= 20){
    Seterror('Description Should Be Greater Than 20 Characters');
    return;
  }
  const formData = new FormData();
  formData.append('title', title);
  formData.append('price', price);
  formData.append('location',location);
  formData.append('description',description);
  formData.append('image', image);
  fetch('http://localhost:5000/properties/add-property',{
    method : 'POST',
    body : formData,
    headers : 
    {
        Authorization : 'Bearer ' + user.token         
      } 
  }).then(res => {
    if (res.status !== 200) {
      throw new Error('Failed to add Property.');
    }
    return res.json()}).then(
    
    resData => {
      console.log(resData);
      history.push('/');
    }
  ).catch(err => {
    Seterror('Error From Server');
  })
}
 return (
     <div className='centerForm'>
     <h1>Add Property</h1>
      <p className='error-form'>{error}</p>
       <form onSubmit={handleForm}>
     
        <Input label="Title" type='text' name="title" value={title} handleChange={(e) => Settitle(e.target.value)}/>    
 
         <Input label="ImageUrl" type='file' name="imageUrl" handleChange={handleChange}/>
    
         <Input label="Price" type="text" name="price" value={price} handleChange={(e) => Setprice(e.target.value)}/>
         <Input label="Location" type='text' name="location" handleChange={(e) => Setlocation(e.target.value)}/>
         <Textarea label="Description" name='description' value={description} handleChange={(e) => Setdescription(e.target.value)}/>
    
         <Button />
       </form>
     </div>
 )
}

export default withRouter(AddProperty);