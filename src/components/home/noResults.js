import { Grid, Paper, Typography } from "@material-ui/core";
import { useCardStyles } from "../../styles/cardStyles";
import { colors } from "../../styles/colors";

import { Fade } from "react-awesome-reveal";

const NoResults = () => {
  const cardClasses = useCardStyles();

  return (
    <Fade duration={500}>
      <Paper
        style={{ marginTop: "8px", padding: "20px" }}
        className={cardClasses.errorCards}
        elevation={4}
      >
        <Grid container justifyContent="center" alignContent="center">
          <Typography style={{ color: colors.text.primary }} variant="button">
            No results
          </Typography>
        </Grid>
      </Paper>
    </Fade>
  );
};

export default NoResults;
