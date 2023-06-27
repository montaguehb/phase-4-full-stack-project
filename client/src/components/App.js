import './App.css';
import {React, useEffect, useState, useContext} from 'react';
import Cards from "./ConcertCard";
import Footer from "./Footer";
import Navbar from "./Navbar";  
import Nav from "./Nav";
import Header from './Header.js'
import {Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
