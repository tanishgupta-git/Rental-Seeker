import React,{useState,useEffect} from 'react';
import { Switch,Route, Redirect } from 'react-router';
import './App.css';
import Header from './components/header/header';
import AddProperty from './pages/addProperty/addProperty';
import UserAuth from './pages/userAuth/userAuth';
import HomePage from './pages/homePage/homePage';
import PropertyDetail from './pages/propertyDetail/propertyDetail.jsx';
import HostAuth from './pages/hostAuth/hostAuth.jsx';

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
  const username = localStorage.getItem('username');
  Setuser({userId : userId,token : token,username : username}); 

},[])
  return (
    <div className="App">
    <Header user={user} logoutHandler={logoutHandler}/>
    <Switch>
     <Route path='/host' render={() => ( user.token ? (<Redirect to='/' />) : (<HostAuth Setuser={Setuser}/>))}/>
     <Route path='/user' render={() => (user.token ? (<Redirect to='/' />) : (<UserAuth Setuser={Setuser}/>))}  />
     <Route path='/add-property'  render={(props) => (<AddProperty {...props} user={user}/>)}/>
     <Route path='/properties/:propertyId' render={(props) => (<PropertyDetail {...props} user={user}/>)}/>
     <Route path='/' component={HomePage}/>
    </Switch>
    </div>
  );
}

export default App;