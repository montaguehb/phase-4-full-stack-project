import './App.css';
import {React, useEffect, useState, useContext} from 'react';
import Cards from "./ConcertCard";
import Footer from "./Footer"; 
import Nav from "./Nav";
import Header from './Header.js'
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
