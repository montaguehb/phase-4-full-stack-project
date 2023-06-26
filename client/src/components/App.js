import './App.css';
import {React, useEffect, useState, useContext} from 'react';
import ConcertCard  from "./ConcertCard";
import Footer from "./Footer"; 
import AppHeader from './AppHeader'
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';


function App() {
  return (
    <div>
      <AppHeader/>
      <ConcertCard/>
      <Footer/>
      <Switch>
        <Route path='/'/>
        <Signup></Signup>
        <Login></Login>
      </Switch>
    </div>
  );
}

export default App;
