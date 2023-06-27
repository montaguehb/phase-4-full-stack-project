import './App.css';
import {React, useEffect, useState, useContext} from 'react';
import Cards from "./ConcertCard";
import Footer from "./Footer";
import Navbar from "./Navbar";  
import Nav from "./Nav";
import Header from './Header.js'
import Footer from './Footer.js'
import {Route, Switch} from 'react-router-dom';


function App() {
  return (

    <div>
      <Header />
      <Switch>
        
      </Switch>
      <Switch>
      <Footer/>
      </Switch>

    </div>
  );
}

export default App;
