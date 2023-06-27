import React, {useEffect, useState} from "react"; // # remove if unecessary
import ConcertCard from "./ConcertCard";
import ConcertList from "./ConcertList";
import Signup from "./Signup"; // for new concert

// fetch concert data within useEffect b/c we want data fetched once
function ConcertPage() {
  const [concerts, setConcerts] = useState([]);

  useEffect(() => {
    fetch(URL)
    .then(r => r.json())
    .then((concertsArr) => {
      setConcerts(concertsArr)
    });
  }, []);

  return (
    <main>
      <ConcertList concerts={concerts} />
    </main>
  )
}
  
export default ConcertPage

