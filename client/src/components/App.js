import './App.css';
import {React, useEffect, useState, useContext} from 'react';
import ConcertCard  from "./ConcertCard";
import Footer from "./Footer"; 
import AppHeader from './AppHeader'
import {Route, Switch} from 'react-router-dom';
import Clear from './Clear'
import ConcertPage from './ConcertPage';
import ConcertList from './ConcertList';
import SignUp from "./SignUp";
import Login from "./Login"

function App() {
  return (
    <div>

      <AppHeader/>
      <ConcertCard/>
      <Footer/>
      <Switch>
        <Route path='/'></Route>
        <Route path='/profile'>
          
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/concerts'>
          <ConcertList />
        </Route>
        <Route path='/concerts/:id'>
          <ConcertList />
        </Route>
      </Switch>

    </div>
  );
}

export default App;
