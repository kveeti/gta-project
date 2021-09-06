import { Typography } from "@material-ui/core";
import { colors } from "../../styles/colors.js";

const Info = ({ msg }) => {
  return (
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
  );
};

export default Info;
