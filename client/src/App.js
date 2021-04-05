import React,{useState,useEffect} from 'react';
import { Switch,Route, Redirect } from 'react-router';
import './App.css';
import Header from './components/header/header';
import AddProperty from './pages/addProperty/addProperty';
import UserAuth from './pages/userAuth/userAuth';
import HomePage from './pages/homePage/homePage';
import PropertyDetail from './pages/propertyDetail/propertyDetail.jsx';
import HostAuth from './pages/hostAuth/hostAuth.jsx';
import MyProperties from './pages/myProperties/myProperties';

function App(){ 
 const [user,Setuser] = useState({token:"",userId:"",typeOfuser:""});
 const logoutHandler = () => {
  Setuser({token: null});
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('typeOfuser');
}

useEffect(()=> {
  const token =     localStorage.getItem('token');
  const expiryDate =localStorage.getItem('expiryDate');
  if (!token || !expiryDate) {
    return;
  }
  if (new Date(expiryDate) <= new Date()) {
    logoutHandler();
    return;
  }
  const userId = localStorage.getItem('userId');
  const typeOfuser = localStorage.getItem('typeOfuser');
  Setuser({userId : userId,token : token,typeOfuser:typeOfuser}); 

},[])
  return (
    <div className="App">
    <Header user={user} logoutHandler={logoutHandler}/>
    <Switch>
     <Route path='/host' render={() => ( user.token ? (<Redirect to='/' />) : (<HostAuth Setuser={Setuser}/>))}/>
     <Route path='/user' render={() => (user.token ? (<Redirect to='/' />) : (<UserAuth Setuser={Setuser}/>))}  />
     <Route path='/add-property'  render={(props) => (<AddProperty {...props} user={user}/>)}/>
     <Route path='/myproperties'  render={(props) => (<MyProperties {...props} user={user}/>)}/>
     <Route path='/properties/:propertyId' render={(props) => (<PropertyDetail {...props} user={user}/>)}/>
     <Route path='/' render={(props) => (<HomePage {...props} user={user}/>)}/>
    </Switch>
    </div>
  );
}

export default App;