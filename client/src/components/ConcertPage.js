import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Image, Container, Header, Button, Grid } from "semantic-ui-react";

function ConcertPage({user,login}) {
  const [concert, setConcerts] = useState();
  const {id} = useParams()
  useEffect(() => {
    (async () => {
      const resp = await fetch(`/concerts/${id}`);
      if (resp.ok) {
        setConcerts(await resp.json());
      } else {
        console.error("Unable to set concerts");
      }
    })();
  }, [id]);
  
  const handleClick = async (user,concert) =>{
    const resp = await fetch('/profile',{
      method: "POST",
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({'user_id': user.id,'concert_id':concert.id}),
    })
  }

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

      <Grid.Row>
        <Button secondary>Get ticket</Button>
      </Grid.Row>

      <Grid.Row>
        <p>Available Tickets: {concert?.venue?.capacity}</p>
      </Grid.Row>

    </Grid>
  );
}

export default ConcertPage;
