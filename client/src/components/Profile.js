import React, { useEffect, useState } from "react";
import ConcertList from "./ConcertList";
import SignUp from "./SignUp";
import { Button, Container } from "semantic-ui-react";
const Profile = ({ sortBy, search, user }) => {
  // const [profile, setProfile] = useState("");
  const [edit, setEdit] = useState(false)
  

  const deleteUser = async () => {
    const resp = await fetch("/profile", {method: "DELETE"})
    if (resp.ok) {
      console.log("user deleted")
    }
  } 
  return (
    <div>

      {user ? (
        <Container centered>
          <h2>Welcome: {user.name} to your Concert Page!</h2>
          <ConcertList
            concerts={user.user_concerts.map((concert) => concert.concert)}
            sortBy={sortBy}
            search={search}
          />
        </Container>
        
      ) : (
        <div>loading...</div>
      )}
      <Button primary onClick={() => setEdit(!edit)}>edit</Button>

      {edit?<SignUp method={"PATCH"}/>:<></>}
      
      <i class="trash alternate outline icon" onClick={deleteUser}></i>
    </div>
  );
};

export default Profile;
