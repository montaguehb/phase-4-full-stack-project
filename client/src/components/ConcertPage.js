import React, {useEffect, useState} from "react"; // # remove if unecessary
import ConcertList from "./ConcertList";
import { Card, Grid, Image } from "semantic-ui-react";

function ConcertPage() {
  const [concert, setConcerts] = useState()

  useEffect (() => {
    (async () => {
      const resp = await fetch("/concerts/1")
      if (resp.ok) {
        setConcerts(await resp.json())
      }
      else {
        console.error("Unable to set concerts")
      }
    })()
  }, [])

  return (
    <Card>
      <Image src={concert?.tour?.img_url} alt={concert?.tour?.name} />
      <Card.Content>
        <Card.Header>{concert?.name}</Card.Header>
        <Card.Meta>
          <p>Venue: {concert?.venue?.name}</p>
        </Card.Meta>
        <Card.Description>
          Artist: {concert?.tour?.artist?.name}
        </Card.Description>
      </Card.Content>
    </Card>
  )
}
  
export default ConcertPage

