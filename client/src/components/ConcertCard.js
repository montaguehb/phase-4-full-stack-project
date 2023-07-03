import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import { useLocation, matchPath } from 'react-router';


function ConcertCard({ concert, onDelete }) {
  const location = useLocation();
  const isProfilePath = location.pathname.includes("/profile");

  const handleDeleteConcert = () => {
    onDelete(concert.id);
  };

  const concertLink = isProfilePath
    ? `/profile/concerts/${concert.id}`
    : `/concerts/${concert.id}`;

  return (
    <Link to={concertLink}>
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
        
        {isProfilePath && (
          <Card.Content extra>
            <Button className="red ui button" circular icon='delete' onClick={handleDeleteConcert}/>
            Remove Ticket
          </Card.Content>
        )}
      </Card>
    </Link>
  );
}

export default ConcertCard;