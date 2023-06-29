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

  let tickets_remaining = concert?.venue?.capacity
  const buy_ticket = () =>{
    tickets_remaining -= 1
  }

  // const add_to_user_concerts = (concert) =>{
  //   const resp = await fetch('/profile',{
  //     method:"POST",
  //     headers: {
  //       "content-type":
  //       'application/json',
  //     },
  //     body:
  //   })
  // }

  return (
    <Container className="middle aligned">
      <Header as="h2">{concert?.name}</Header>
      <Image
        src={"https://placeholder.co/500x500"}
        alt={concert?.tour?.name}
        size="large"
        centered
        bordered
      />
      {/* todo add descriptions for concerts */}
      <p>Venue: {concert?.venue?.name}</p>
      <p>Artist: {concert?.tour?.artist?.name}</p>
      <Button secondary onClick={buy_ticket()}>Get ticket</Button>
      <p>Remaining Tickets: {tickets_remaining}</p>
    </Container>
  );
}

export default ConcertPage;
