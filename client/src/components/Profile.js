import React, { useState } from "react";
import ConcertList from "./ConcertList";
import SignUp from "./SignUp";
import { Button, Container } from "semantic-ui-react";

const Profile = ({ sortBy, search, user }) => {
  const [edit, setEdit] = useState(false);
  const user_concerts = [...user.user_concerts];

  const deleteUser = async () => {
    const resp = await fetch("/profile", { method: "DELETE" });
    if (resp.ok) {
      alert("Delete Successful!");
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
      <i class="trash alternate outline icon" onClick={deleteUser}></i>
    </div>
  );
};

export default Profile;
