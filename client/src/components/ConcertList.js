import React, { useEffect, useState } from "react";
import ConcertCard from "./ConcertCard";

function ConcertList({concerts}) {
  const concert_list = concerts.map(concert => <ConcertCard key={concert.id} {...concert}/>)
  return (
    <ul className="cards">{concert_list}</ul>
  );
}

export default ConcertList;
