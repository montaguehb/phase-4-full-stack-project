import React, { useEffect, useState } from "react";
import ConcertCard from "./ConcertCard";
import { Grid, GridColumn} from "semantic-ui-react";

function ConcertList({search, sortBy}) {
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
        concerts.filter(concert => concert[`${sortBy}`].includes(search)).map((concert) => (
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
