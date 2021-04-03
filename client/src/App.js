import React from 'react';
import { Switch,Route } from 'react-router';
import './App.css';
import Header from './components/header/header';
import AddProperty from './pages/addProperty/addProperty';
import Signin from './pages/signin/signin';
import HomePage from './pages/homePage/homePage';
import PropertyDetail from './pages/propertyDetail/propertyDetail.jsx';
import HostSignin from './pages/hostSignin/hostSignin.jsx';

function App(){ 

  return (
    <div className="App">
    <Header />
    <Switch>
     <Route path='/host' component={HostSignin} />
     <Route path='/user' component={Signin} />
     <Route path='/add-property' component={AddProperty}/>
     <Route path='/properties/:propertyId' component={PropertyDetail}/>
     <Route path='/' component={HomePage}/>
    </Switch>
    </div>
  );
}

export default App;