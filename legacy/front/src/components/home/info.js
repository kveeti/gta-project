import { Typography } from "@material-ui/core";
import { Fade } from "react-awesome-reveal";
import { colors } from "../../styles/colors.js";

const Info = ({ msg }) => {
  return (
    <Fade duration={500}>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="button"
          style={{
            color: colors.text.secondary,
            fontSize: "0.8em",
          }}
        >
          {msg}
        </Typography>
      </div>
    </Fade>
  );
};

export default Info;
