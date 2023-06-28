import React, {useEffect, useState} from "react"; // # remove if unecessary
import './ConcertCard.css';

// insert concert info on HTML and render concerts
function ConcertCard(concert) {
  return (
    <li className="card">'
      <img src={concert.tour.img_url} alt={concert.tour.name} />
      <h4>name: {concert?.name}</h4>
      <p>Artist: {concert?.tour?.artist?.name}</p>
      <p>Venue: {concert?.venue?.name}</p>
    </li>
  )
}

export default ConcertCard