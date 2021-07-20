import React from "react";
import { Card, CardContent, Grid, Button } from "@material-ui/core/";

import { Link } from "react-router-dom";

import "./styles.css";

const Garage = ({ garage }) => {
  return (
    <Card style={{ backgroundColor: "#212121" }} variant="outlined">
      <CardContent>
        <Grid container justifyContent="flex-start">
          <Button
            style={{ color: "white", fontSize: "1.05rem" }}
            size="small"
            component={Link}
            to={`/garage/${garage.ID}`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {garage.name}
            {garage.desc.length ? ` - ${garage.desc}` : ""}
          </Button>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Garage;
