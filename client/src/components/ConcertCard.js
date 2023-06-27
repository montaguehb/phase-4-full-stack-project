import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Button } from "semantic-ui-react";
import { useLocation, matchPath } from 'react-router';

function ConcertCard(concert) {
  const location = useLocation();
  const isProfilePath = location.pathname === '/profile';

  const temp_handle_click = () =>{
    return alert('This button Doesnt Work Right Now :-(')
  }

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
        
        {isProfilePath && (
          <Card.Content extra>
            <Button className="red ui button" circular icon='delete' onClick={()=>temp_handle_click()}/>
            Remove Ticket
          </Card.Content>
        )}
      </Card>
    </Link>
  );
}

export default ConcertCard;