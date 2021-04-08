import React,{useState,useEffect, useCallback} from 'react';
import { Switch,Route, Redirect,withRouter } from 'react-router-dom';
import './App.css';
import Header from './components/header/header';
import AddProperty from './pages/addProperty/addProperty';
import UserAuth from './pages/userAuth/userAuth';
import HomePage from './pages/homePage/homePage';
import PropertyDetail from './pages/propertyDetail/propertyDetail.jsx';
import HostAuth from './pages/hostAuth/hostAuth.jsx';
import MyProperties from './pages/myProperties/myProperties';
import ProfileUser from './pages/profileUser/profileUser';
import ProfileHost from './pages/profileHost/profileHost';


function App({history}){ 
 const [user,Setuser] = useState({token:"",userId:"",typeOfuser:""});
 const [loading,Setloading] = useState(true);
 const logoutHandler = useCallback(() => {
  Setuser({token: null});
  localStorage.removeItem('token');
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('userId');
  localStorage.removeItem('typeOfuser');
  history.push('/')
},[history])

useEffect(()=> {
  const token =     localStorage.getItem('token');
  const expiryDate =localStorage.getItem('expiryDate');
  Setloading(true);
  if (!token || !expiryDate) {
    Setloading(false);
    return;
  }
  if (new Date(expiryDate) <= new Date()) {
    logoutHandler();
    Setloading(false);
    return;
  }
  const userId = localStorage.getItem('userId');
  const typeOfuser = localStorage.getItem('typeOfuser');
  Setuser({userId : userId,token : token,typeOfuser:typeOfuser}); 
  Setloading(false);
},[logoutHandler])
  return (
    <div className="App">
    { loading ? <span>Loading</span>:
    <>
    <Header user={user} logoutHandler={logoutHandler}/>
    <Switch>
     <Route exact path='/user/profile/:userId' render={ (props) => (<ProfileUser {...props} user={user}/> ) } />
     <Route path='/user' render={() => (user.token ? (<Redirect to='/' />) : (<UserAuth Setuser={Setuser}/>))}  />
     <Route exact path='/host/profile/:hostId' render={ (props) => (<ProfileHost {...props} user={user}/> ) } />
     <Route path='/host' render={() => ( user.token ? (<Redirect to='/' />) : (<HostAuth Setuser={Setuser}/>))}/>
     <Route exact path='/add-property'  render={(props) => (<AddProperty {...props} user={user}/>)}/>
     <Route exact path='/myproperties'  render={(props) => (<MyProperties {...props} user={user}/>)}/>
     <Route exact path='/properties/:propertyId' render={(props) => (<PropertyDetail {...props} user={user}/>)}/>
     <Route path='/' render={(props) => (<HomePage {...props} user={user}/>)}/>
    </Switch>
    </>
    }
    </div>

  );
}

export default withRouter(App);