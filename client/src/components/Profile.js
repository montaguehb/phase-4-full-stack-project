import React, { useEffect, useState } from "react";
import ConcertList from "./ConcertList";
import SignUp from "./SignUp";
import { Button } from "semantic-ui-react";
const Profile = ({ sortBy, search }) => {
  const [profile, setProfile] = useState("");
  const [edit, setEdit] = useState(false)
  
  useEffect(() => {
    (async () => {
      const resp = await fetch("/profile");
      if (resp.ok) {
        setProfile(await resp.json());
      } else {
        console.error("Unable to set concerts");
      }
    })();
  }, []);

  const deleteUser = async () => {
    const resp = await fetch("/profile", {method: "DELETE"})
    if (resp.ok) {
      console.log("user deleted")
    }
  } 
  return (
    <div>
      {profile ? (
        <ConcertList
          concerts={profile.user_concerts.map((concert) => concert.concert)}
          sortBy={sortBy}
          search={search}
        />
      ) : (
        <div>loading...</div>
      )}
      <Button primary onClick={() => setEdit(!edit)}>edit</Button>
      {edit?<SignUp method={"PATCH"} />:<></>}
      <i class="trash alternate outline icon" onClick={deleteUser}></i>
    </div>
  );
};

export default Profile;
