import React, {useEffect, useState} from 'react'
import ConcertList from './ConcertList';

const Profile = ({sortBy, search}) => {
  const [profile, setProfile] = useState("");

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

  return (
    <div>
      {profile ? <ConcertList concerts={profile.user_concerts.map(concerct => concerct.concert)} sortBy={sortBy} search={search}/>:<div>loading...</div>}
    </div>
  )
}

export default Profile