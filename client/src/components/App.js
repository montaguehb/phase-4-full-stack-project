import { React, useEffect, useState, useContext } from "react";
import ConcertCard from "./ConcertCard";
import Footer from "./Footer";
import { Route, Switch } from "react-router-dom";
import Clear from "./Clear";
import ConcertPage from "./ConcertPage";
import ConcertList from "./ConcertList";

import SignUp from "./SignUp";
import Login from "./Login";
import Nav from "./Nav";
import Profile from "./Profile";

function App() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [concerts, setConcerts] = useState([]);

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

  const handleSearchChange = (e) => {
    // todo add yup validations to search
    setSearch(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.textContent);
  };
  return (
    <div>
      <Nav search={search} handleSearchChange={handleSearchChange} handleSortBy={handleSortBy}/>
      <Switch>
        <Route path="/">
          <ConcertList
            concerts={concerts}
            search={search}
            sortBy={sortBy}
          />
        </Route>
        <Route path="/profile">
          <Profile sortBy={sortBy} search={search} />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/concerts">
          <ConcertList
            concerts={concerts}
            search={search}
            sortBy={sortBy}
          />
        </Route>
        <Route path="/concerts/:id">
          <ConcertPage />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
