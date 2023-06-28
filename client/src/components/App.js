import './App.css';
import {React, useEffect, useState, useContext} from 'react';
import Cards from "./ConcertCard";
import Footer from "./Footer"; 
import Nav from "./Nav";
import Header from './Header.js'
import {Route, Switch} from 'react-router-dom';
import Clear from './Clear'
import ConcertPage from './ConcertPage';

function App() {
  
  return (
    <div>
      <Header/>
      <ConcertPage></ConcertPage>
      <Footer/>
      <Clear></Clear>
    </div>
  );
}

export default App;
