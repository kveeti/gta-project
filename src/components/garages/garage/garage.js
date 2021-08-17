import { CardContent, Grid, Paper, Typography } from "@material-ui/core";

const Garage = ({ garage }) => {
  return (
    <Paper style={{ backgroundColor: "#212121" }} elevation={5}>
      <CardContent>
        <Grid container justifyContent="flex-start">
          <Typography
            style={{ color: "white", fontSize: "15px" }}
            variant="button"
          >
            {garage.name}
            {garage.desc.length ? ` - ${garage.desc} - ` : " - "}
            {garage.cars.length > 0
              ? garage.cars.length > 1
                ? `${garage.cars.length} cars`
                : `${garage.cars.length} car`
              : `${garage.cars.length} cars`}
          </Typography>
        </Grid>
      </CardContent>
    </Paper>
  );
};

export default Garage;
