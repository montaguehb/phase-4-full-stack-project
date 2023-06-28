import React, { useEffect, useState } from "react";
import ConcertCard from "./ConcertCard";
import { Card, Grid, GridColumn, Image } from "semantic-ui-react";

function ConcertList() {
  const [concerts, setConcerts] = useState();

  useEffect(() => {
    (async () => {
      const resp = await fetch("/concerts");
      if (resp.ok) {
        setConcerts(await resp.json());
      } else {
        console.error("Unable to set concerts");
      }
    })();
  }, []);

  return (
    <Grid id="concert-list" columns={4} centered padded>
      {concerts ? (
        concerts.map((concert) => (
          <GridColumn key={concert.id}>
            <ConcertCard {...concert} />
          </GridColumn>
        ))
      ) : (
        <h2>...loading</h2>
      )}
    </Grid>
  );
}

export default ConcertList;
