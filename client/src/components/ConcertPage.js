import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { Image, Container, Header, Button } from "semantic-ui-react";

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
    <Container className="middle aligned">
      <Header as="h2">{concert?.name}</Header>
      <Image
        src={"https://picsum.photos/500"}
        alt={concert?.tour?.name}
        size="large"
        centered
        bordered
      />
      {/* todo add descriptions for concerts */}

      <p>Venue: {concert?.venue?.name}</p>
      <p>Artist: {concert?.tour?.artist?.name}</p>
      <Button secondary>Get ticket</Button>
      <p>Available Tickets: {concert?.venue?.capacity}</p>
    </Container>
  );
}

export default ConcertPage;
