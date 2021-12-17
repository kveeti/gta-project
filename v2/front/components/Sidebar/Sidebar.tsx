import { useISelector } from "../../state/hooks";
import { DeleteBtn } from "./Buttons/DeleteBtn";
import { MoveBtn } from "./Buttons/MoveBtn";
import { gray } from "@radix-ui/colors";
import { styled } from "../../stitches.config";
import { CheckedCars } from "./CheckedCars/CheckedCars";
import { Text } from "../Styles/Text";

export const StyledSidebar = styled("div", {
  maxWidth: "430px",
  width: "100%",
  height: "calc(100vh - 7rem)",
  overflowX: "hidden",
  overflowY: "auto",
  margin: "1rem 1rem 1rem 0.5rem",

  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
});

export const Buttons = styled("div", {
  display: "flex",
  gap: "0.5rem",
  padding: "0.5rem",

  borderBottom: `1px solid ${gray.gray6}`,
});

export const LowerContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  height: "100%",
  padding: "0.5rem",

  variants: {
    text: {
      true: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
  },
});

export const Sidebar = () => {
  const checkedCars = useISelector((state) => state.checked.cars);

  const showCheckedCars = checkedCars.length > 0;

  return (
    <StyledSidebar>
      <Buttons>
        <DeleteBtn />
        <MoveBtn />
      </Buttons>
      <LowerContainer text={!showCheckedCars}>
        {showCheckedCars ? <CheckedCars /> : <Text lessOpaque>Selected cars will appear here</Text>}
      </LowerContainer>
    </StyledSidebar>
  );
};
