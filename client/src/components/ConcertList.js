import React, { useEffect, useState } from "react";
import ConcertCard from "./ConcertCard";

function ConcertList({concerts}) {
  const [concerts, setConcerts] = useState()
  useEffect (() => {
    (async () => {
      const resp = await fetch("/concerts")
      if (resp.ok) {
        setConcerts(resp.json())
      }
      else {
        console.error("Unable to set concerts")
      }
    })()
  }, [])

  concert_list = concerts.map(concert => <ConcertCard key={concert.id} {...concert}/>)
  return (
    <div className="cards">{concert_list}</div>
  );
}

export default ConcertList;
