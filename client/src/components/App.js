import './App.css';
import {React, useEffect, useState, useContext} from 'react';
import Cards from "./ConcertCard";
import Footer from "./Footer"; 
import Nav from "./Nav";
import Header from './Header.js'
import {Route, Switch} from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import Clear from './Clear'

function App() {
  
  return (
    <div>
      <Header/>
      <Login></Login>
      <SignUp></SignUp>
      <Footer/>
      <Clear></Clear>
    </div>
  );
}

export default App;
