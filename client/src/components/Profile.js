import React, { useEffect, useState } from "react";
import ConcertList from "./ConcertList";
import SignUp from "./SignUp";
import { Button, Container } from "semantic-ui-react";
const Profile = ({ sortBy, search, user}) => {
  // const [profile, setProfile] = useState("");
  const [edit, setEdit] = useState(false)
  // useEffect(() => {
  //   (async () => {
  //     const resp = await fetch("/profile");
  //     if (resp.ok) {
  //       updateUser(await resp.json());
  //     } else {
  //       console.error("Unable to set user");
  //     }
  //   })();
  // }, []);

  const deleteUser = async () => {
    const resp = await fetch("/profile", {method: "DELETE"})
    if (resp.ok) {
      console.log("user deleted")
    }
  } 

  return (
    <div>
      <Container centered>
        <h2>Welcome: {user.name} to your Concert Page!</h2>
        <Button primary onClick={() => setEdit(!edit)}>edit</Button>
        {edit?<div><SignUp method={"PATCH"}/><p>Current Username:{user.username}</p>
        <p>Current email:{user.email} </p></div>:<></>}

      <i class="trash alternate outline icon" onClick={deleteUser}></i>
      </Container>
        <ConcertList
            concerts={user.user_concerts.map((concert) => concert.concert)}
            sortBy={sortBy}
            search={search}
          />

      
    </div>
  );
};

export default Profile;
