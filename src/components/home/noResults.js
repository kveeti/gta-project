import { Grid, Paper, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useCardStyles } from "../../styles/cardStyles";
import { colors } from "../../styles/colors";

import { Fade } from "react-awesome-reveal";

const NoResults = () => {
  const cardClasses = useCardStyles();

  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 500);
  }, []);

  return hidden ? null : (
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
