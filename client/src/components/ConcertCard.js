import React from "react"; // # remove if unecessary
import { Card, Image } from "semantic-ui-react";

// insert concert info on HTML and render concerts
function ConcertCard(concert) {
  return (
    <Card>
      <Image src={concert?.tour?.img_url} alt={concert?.tour?.name}/>
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
  );
}

export default ConcertCard;
