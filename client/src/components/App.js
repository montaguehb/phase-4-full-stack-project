import {React, useEffect, useState, useContext} from 'react';
import ConcertCard  from "./ConcertCard";
import Footer from "./Footer"; 
import {Route, Switch} from 'react-router-dom';
import Clear from './Clear'
import ConcertPage from './ConcertPage';
import ConcertList from './ConcertList';

import Signup from "./SignUp"
import Login from "./Login"
import Nav from './Nav';

function App() {

  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("name")

  const handleSearchChange = e => {
    // todo add yup validations to search
    setSearch(e.target.value)
  }

  return (
    <div>

      <Nav search={search} handleSearchChange={handleSearchChange}/>
      {/* <ConcertList search={search} sortBy={sortBy}/> */}
      <ConcertPage />
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
