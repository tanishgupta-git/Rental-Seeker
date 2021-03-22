import React,{useState} from 'react';
import './addproperty.css';

const AddProperty = () => {
const [title,Settitle] = useState('');
const [imageUrl,SetimageUrl] = useState('');
const [price,Setprice] = useState('');
const [description,Setdescription] = useState('');
const [error,Seterror] = useState('');
// function for handling the form
const handleForm = (e) => {
  e.preventDefault();
  if(!title && !imageUrl && !price && !description) {
      Seterror('All Fileds Are Required')
      return;
  }
  fetch('http://localhost:5000/properties/add-property',{
    method : 'POST',
    headers: {
        'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
       title : title,
       imageUrl : imageUrl,
       price : price,
       description : description 
    })
  }).then(res => res.json()).then(
    resData => {
        console.log(resData);
    }
  ).catch(err => {
      console.log(err);
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
           <input type="text" name='imageUrl' value={imageUrl} onChange={(e) => SetimageUrl(e.target.value)}/>
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

export default AddProperty;