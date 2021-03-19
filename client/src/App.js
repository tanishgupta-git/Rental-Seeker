import React from 'react';
import { Switch,Route } from 'react-router';
import './App.css';
import Header from './components/header/header';
import HomePage from './pages/homepage/homepage';
import PropertyDetail from './pages/propertydetail/PropertyDetail.jsx';
function App() {
  return (
    <div className="App">
    <Header />
    <Switch>
     <Route path='/properties/:propertyId' component={PropertyDetail}/>
     <Route path='/' component={HomePage}/>
    </Switch>
    </div>
  );
}

export default App;
