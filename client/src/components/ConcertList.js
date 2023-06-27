import React from "react";
import ConcertCard from "./ConcertCard";

function ConcertList({concerts}) {
  return (
    <ul className="cards">{concerts.map((concert) => {
      return <ConcertCard key={c.id} concert={concert}/> // pass individual concert to concertcard as prop
        }
      )}
    </ul>
  );
}

export default ConcertList;
