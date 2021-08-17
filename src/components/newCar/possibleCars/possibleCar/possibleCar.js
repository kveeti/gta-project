import { Card, CardContent, Typography } from "@material-ui/core/";

const PossibleCar = ({ car }) => {
  return (
    <Card style={{ backgroundColor: "#212121" }} variant="outlined">
      <CardContent>
        <Typography variant="body1" style={{ color: "white" }}>
          {car.manufacturer} - {car.name}
        </Typography>
        <Typography variant="caption" style={{ color: "white" }}>
          {car.class}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PossibleCar;
