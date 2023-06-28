import React, { useEffect, useState } from "react";
import { Image, Container, Header, Button } from "semantic-ui-react";

function ConcertPage() {
  const [concert, setConcerts] = useState();

  useEffect(() => {
    (async () => {
      const resp = await fetch("/concerts/1");
      if (resp.ok) {
        setConcerts(await resp.json());
      } else {
        console.error("Unable to set concerts");
      }
    })();
  }, []);

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
      <Button secondary>Get ticket</Button>
      <p>Insert remaining tickets here</p>
    </Container>
  );
}

export default ConcertPage;
