import React from "react"; // # remove if unecessary
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Card, Image } from "semantic-ui-react";

// insert concert info on HTML and render concerts
function ConcertCard(concert) {
  return (
    <Link to={`/concerts/${concert.id}`}>
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
    </Link>
  );
}

export default ConcertCard;
