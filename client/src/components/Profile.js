import React, { useState } from "react";
import ConcertList from "./ConcertList";
import SignUp from "./SignUp";
import { Button, Container, Icon,Divider } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';

const Profile = ({ sortBy, search, user, updateUser }) => {
  const [edit, setEdit] = useState(false);
  const user_concerts = [...user.user_concerts];
  const history = useHistory()

  const deleteUser = async () => {
    const resp = await fetch("/profile", { method: "DELETE" });
    if (resp.ok) {
      alert("Account Deletion Successful!");
      history.push('/concerts')
      updateUser(null)
    } else {
      alert("Account Deletion Unsuccessful!");
    }
  };

  return (
    <div>
      <Container textAlign="center">
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
        <Button class='negative ui red button' onClick={deleteUser} >
    
          <Icon name='trash alternate outline icon'/>Delete Account
          
        </Button>
      </Container>
      <Divider></Divider>
      <h2 style={{ textAlign: 'center' }}>Your Concerts</h2>
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
