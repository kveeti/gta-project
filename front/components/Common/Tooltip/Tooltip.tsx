import Tooltip, { TooltipPrimitive } from "@atlaskit/tooltip";
import { styled } from "../../../stitches.config";

const Styled = styled(TooltipPrimitive, {
  background: "black",
  color: "white",
  padding: "0.3rem",
  fontSize: "14px",
  borderRadius: 4,
});

export const StyledTooltip = ({ children, content, ...rest }) => {
  return (
    <Tooltip component={Styled} content={content} {...rest}>
      {children}
    </Tooltip>
  );
};
