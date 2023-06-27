import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Image, Header, Button, Grid } from "semantic-ui-react";

function ConcertPage({ user, login }) {
  const [concert, setConcert] = useState();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/concerts/${id}`);
      if (resp.ok) {
        const data = await resp.json()
        setConcert(data);
      } else {
        console.error("Unable to set concerts");
      }
    })();
  }, [id]);

  const handleClick = async (user) => {
    const resp = await fetch("/profile", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ user_id: user.id, concert_id: id, venue_id: concert.venue_id}),
    });
    if (resp.ok) {
      const data = await resp.json()
      setConcert(data)
    }
    else {
      alert("You already have that ticket")
    }
  };

  return (
    <Grid centered>
      <Grid.Row>
        <Header as="h2">{concert?.name}</Header>
      </Grid.Row>

      <Grid.Row>
        <Image
          src={"https://picsum.photos/500"}
          alt={concert?.tour?.name}
          size="large"
          centered
          bordered
        />
      </Grid.Row>

      <Grid.Row>
        <p>Venue: {concert?.venue?.name}</p>
      </Grid.Row>

      <Grid.Row>
        <p>Artist: {concert?.tour?.artist?.name}</p>
      </Grid.Row>

      <Grid.Row>
        <p>Artist Description: {concert?.tour?.artist?.description}</p>
      </Grid.Row>

      {user && concert?.venue?.capacity? (
        <Grid.Row>
          <Button secondary onClick={handleClick}>Get ticket</Button>
        </Grid.Row>
      ) : (
        <></>
      )}

      <Grid.Row>
        {concert?.venue?.capacity?<p>Available Tickets: {concert?.venue?.capacity}</p>:<p>sold out</p>}
      </Grid.Row>
    </Grid>
  );
}

export default ConcertPage;
