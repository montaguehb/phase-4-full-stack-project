import React, {useEffect, useState} from "react"; // # remove if unecessary
import ConcertCard from "./ConcertCard";
import ConcertList from "./ConcertList";

// fetch concert data within useEffect b/c we want data fetched once
function ConcertPage() {
  const [concerts, setConcerts] = useState()

  useEffect (() => {
    (async () => {
      const resp = await fetch("/concerts")
      if (resp.ok) {
        setConcerts(await resp.json())
      }
      else {
        console.error("Unable to set concerts")
      }
    })()
  }, [])

  return (
    <main>
      {concerts ? <ConcertList concerts={concerts} /> : <h2>...loading</h2>}
    </main>
  )
}
  
export default ConcertPage

