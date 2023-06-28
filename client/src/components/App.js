import {React, useEffect, useState, useContext} from 'react';
import ConcertCard  from "./ConcertCard";
import Footer from "./Footer"; 
import AppHeader from './AppHeader'
import {Route, Switch} from 'react-router-dom';
import Clear from './Clear'
import ConcertPage from './ConcertPage';
import ConcertList from './ConcertList';
import Signup from "./SignUp"
import Login from "./Login"
import Nav from './Nav';

function App() {
  
  return (
    <div>

      <Nav/>
      <ConcertList/>
      <Footer/>
      {/* <Switch>
        <Route path='/'/>
        <Signup></Signup>
        <Login></Login>
      </Switch> */}

    </div>
  );
}

export default App;
