import React,{useState} from 'react';
import { withRouter } from 'react-router-dom';
import './addproperty.css';

const AddProperty = ({history}) => {
const [title,Settitle] = useState('');
const [image,Setimage] = useState('');
const [price,Setprice] = useState('');
const [description,Setdescription] = useState('');
const [error,Seterror] = useState('');
const types = ['image/png','image/jpeg','image/jpg'];
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
  if(!title && !image && !price && !description) {
      Seterror('All Fileds Are Required')
      return;
  }
  console.log(image)
  if(title.length < 5){
    Seterror('Title Should Be Between 5 and 50 Characters');
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
  formData.append('description',description)
  formData.append('image', image);
  fetch('http://localhost:5000/properties/add-property',{
    method : 'POST',
    body : formData
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
     <div className='add-property'>
     <h1>Add Property</h1>
      <p className='error-form'>{error}</p>
       <form onSubmit={handleForm}>
         <div className='formInput'>
           <p>Title</p>
           <input type="text" name='title' value={title} onChange={(e) => Settitle(e.target.value)}/>
         </div>
         <div className='formInput'>
          <p>ImageUrl</p>
           <input type="file" name='imageUrl' onChange={handleChange}/>
         </div>
         <div className='formInput'>
         <p>Price</p>
           <input type="number" name='price' value={price} onChange={(e) => Setprice(e.target.value)}/>
         </div>
         <div className='formInput'>
           <p>Description</p>
           <textarea rows="5" name='description' value={description} onChange={(e) => Setdescription(e.target.value)}>
           </textarea>
         </div>
        <input type='submit' value='Submit' />
       </form>
     </div>
 )
}

export default withRouter(AddProperty);