function App() {
  return (
    
import Nav from "./Nav";
import {React, useEffect, useState, useContext} from 'react';
import Header from './Header.js'
import {Route, Switch} from 'react-router-dom';

import './App.css';

function App() {
  return (

    <div className="App">
      <Nav></Nav>
      <Header />
      <Switch>
      </Switch>
    </div>
  );
}

export default App;
