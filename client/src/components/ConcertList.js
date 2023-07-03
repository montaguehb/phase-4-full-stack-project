import React from "react";
import ConcertCard from "./ConcertCard";
import { Grid, GridColumn } from "semantic-ui-react";

function ConcertList({ search, sortBy, concerts, onDeleteConcert }) {

  const concert_list = concerts
    .filter((concert) => {
      switch (sortBy) {
        case "Name":
          return concert.name.includes(search);

        case "Venue":
          return concert.venue.name.includes(search);

        case "Artist":
          return concert.tour.artist.name.includes(search);

        default:
          return concert;
      }})
    .map((concert) => (
      <GridColumn key={concert.id}>
        <ConcertCard concert={concert} onDelete={onDeleteConcert}/>
      </GridColumn>
    ));

  return (
    <Grid id="concert-list" columns={4} centered padded>
      {concerts ? concert_list : <h2>loading...</h2>}
    </Grid>
  );
}

export default ConcertList;
