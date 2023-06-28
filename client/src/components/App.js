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
import Profile from './Profile';

function App() {
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [concerts, setConcerts] = useState();

  useEffect(() => {
    (async () => {
      const resp = await fetch("/concerts");
      if (resp.ok) {
        setConcerts(await resp.json());
      } else {
        console.error("Unable to set concerts");
      }
    })();
  }, []);

  const handleSearchChange = e => {
    // todo add yup validations to search
    setSearch(e.target.value)
  }

  return (
    <div>

      <Nav search={search} handleSearchChange={handleSearchChange}/>
      {/* <ConcertList search={search} sortBy={sortBy}/> */}
      <Profile sortBy={sortBy} search={search}/>
      <Login />
      <Footer/>
      {/* <Switch>
        <Route path='/'/>
        <Signup></Signup>
        <Login></Login>
      </Switch> */}

    </div>
  );
}

export default App;
