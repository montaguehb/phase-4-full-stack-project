import { React, useEffect, useState } from "react";
import Footer from "./Footer";
import { Route, Switch } from "react-router-dom";
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
  const [user, setUser] = useState(null)


  useEffect(() => {
    (async () => {
      const [concert_resp, auth_resp] = await Promise.all([fetch("/concerts"), fetch("/login")]);
      if (concert_resp.ok) {
        setConcerts(await concert_resp.json());
      } else {
        console.error("Unable to set concerts");
      }

      if (auth_resp.ok) {
        setUser(await auth_resp.json())
      }
    })();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSortBy = (e) => {
    setSortBy(e.target.textContent);
  };

  const updateUser =(user)=>{
    setUser(user)
  }

  return (
    <div>
      <Nav
        search={search}
        updateUser={updateUser}
        handleSearchChange={handleSearchChange}
        handleSortBy={handleSortBy}
        user={user}
      />

      <Switch>

        <Route exact path="/">
          <ConcertList concerts={concerts} search={search} sortBy={sortBy} />
        </Route>

        <Route path="/profile">
          <Profile sortBy={sortBy} search={search} user={user} setUser={setUser}/>
        </Route>

        <Route path="/signup">
          <SignUp user={user} updateUser={updateUser} method={"POST"}/>
        </Route>

        <Route path="/login">
          <Login user={user} updateUser={updateUser}/>
        </Route>

        <Route exact path="/concerts">
          <ConcertList concerts={concerts} search={search} sortBy={sortBy} />
        </Route>

        <Route path="/concerts/:id">
          <ConcertPage user={user}/>
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
