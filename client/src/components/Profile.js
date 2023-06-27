import React, { useState } from "react";
import ConcertList from "./ConcertList";
import SignUp from "./SignUp";
import { Button, Container, Icon, Divider } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Profile = ({ sortBy, search, user, updateUser }) => {
  const [edit, setEdit] = useState(false);
  const [userConcerts, setUserConcerts] = useState([...user.user_concerts]);
  const history = useHistory();

  const deleteUser = async () => {
    const resp = await fetch("/profile", { method: "DELETE" });
    if (resp.ok) {
      alert("Account Deletion Successful!");
      history.push("/concerts");
      updateUser(null);
    } else {
      alert("Account Deletion Unsuccessful!");
    }
  };

  const handleDeleteConcert = async (concertId) => {
    try {
      const resp = await fetch(`/profile/concerts/${concertId}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        const updatedConcerts = userConcerts.filter(
          (concert) => concert.concert.id !== concertId
        );
        setUserConcerts(updatedConcerts);
        alert("Concert Deletion Successful!");
      } else {
        alert("Concert Deletion Unsuccessful!");
      }
    } catch (error) {
      console.error("Error deleting concert:", error);
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
            <SignUp method={"PATCH"} user={user} />
            <p>Current Username: {user.username}</p>
            <p>Current email: {user.email}</p>
          </div>
        ) : (
          <></>
        )}
        <Button class="negative ui red button" onClick={deleteUser}>
          <Icon name="trash alternate outline icon" />
          Delete Account
        </Button>
      </Container>
      <Divider></Divider>
      <h2 style={{ textAlign: "center" }}>Your Concerts</h2>
      {userConcerts.length ? (
        <ConcertList
        concerts={userConcerts.map((concert) => concert.concert)}
        sortBy={sortBy}
        search={search}
        onDeleteConcert={handleDeleteConcert}
      />
      ) : (
        <h1>You Don't Have Any Tickets Yet!</h1>
      )}
    </div>
  );
};

export default Profile;