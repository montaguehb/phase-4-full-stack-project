import React, { useState } from "react";
import ConcertList from "./ConcertList";
import SignUp from "./SignUp";
import { Button, Container, Icon } from "semantic-ui-react";
import { Redirect } from "react-router-dom/cjs/react-router-dom";

const Profile = ({ sortBy, search, user, setUser }) => {
  const [edit, setEdit] = useState(false);
  const user_concerts = [...user.user_concerts];

  const deleteUser = async () => {
    const resp = await fetch("/profile", { method: "DELETE" });
    if (resp.ok) {
      alert("Delete Successful!");
      setUser(null)
      return (<Redirect to="/" />)
    } else {
      alert("Delete Unsuccessful!");
    }
  };

  return (
    <div>
      <Container>
        <h2 style={{ alignItems: "center" }}>
          Welcome: {user.first_name} to your Concert Page!
        </h2>
        <Button primary onClick={() => setEdit(!edit)}>
          edit
        </Button>
        {edit ? (
          <div>
            <SignUp method={"PATCH"} user={user}/>
            <p>Current Username:{user.username}</p>
            <p>Current email:{user.email} </p>
          </div>
        ) : (
          <></>
        )}
        <Button class='negative ui button' onClick={deleteUser} >
          
          <Icon name='trash alternate outline icon'/>Delete Account
        </Button>
      </Container>
      
      {user_concerts.length ? (
        <ConcertList
          concerts={user_concerts.map((concert) => concert.concert)}
          sortBy={sortBy}
          search={search}
        />
      ) : (
        <h1>You Don't Have Any Tickets Yet!</h1>
      )}

    </div>
  );
};

export default Profile;
