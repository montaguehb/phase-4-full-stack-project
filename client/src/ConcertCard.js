import React, {useEffect, useState} from "react"; // # remove if unecessary
import './Cards.css';

// insert concert info on HTML and render concerts
function ConcertCard({concert}) {
  return (
    <li className="card">'
      <img src="https://picsum.photos/" alt={concert} />
      <h4>Concert Name Placeholder?</h4>
      <p>Artist: Artist Name Placeholder?</p>
      <p>Venue: Venue Name Placeholder?</p>
    </li>
  )
}

export default ConcertCard