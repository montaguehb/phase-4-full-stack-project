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
  const [login, setLogin] = useState(false);

  useEffect(() => {
    (async () => {
      const [concert_resp, auth_resp] = await Promise.all([fetch("/concerts"), fetch("/login")]);
      if (concert_resp.ok) {
        setConcerts(await concert_resp.json());
      } else {
        console.error("Unable to set concerts");
      }
      setLogin(auth_resp.ok)
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
      <Nav
        search={search}
        handleSearchChange={handleSearchChange}
        handleSortBy={handleSortBy}
        login={login}
      />
      <Switch>
        <Route exact path="/">
          <ConcertList concerts={concerts} search={search} sortBy={sortBy} />
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
        <Route exact path="/concerts">
          <ConcertList concerts={concerts} search={search} sortBy={sortBy} />
        </Route>
        <Route path="/concerts/:id">
          <ConcertPage />
        </Route>
      </Switch>
      <Footer />
      <Clear />
    </div>
  );
}

export default App;
