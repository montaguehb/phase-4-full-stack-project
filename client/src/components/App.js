
import {React, useEffect, useState, useContext} from 'react';
import Header from './Header.js'
import Footer from './Footer.js'
import {Route, Switch} from 'react-router-dom';

import './App.css';

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
