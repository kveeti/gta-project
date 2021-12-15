import { gray } from "@radix-ui/colors";
import { useISelector } from "../../state/hooks";
import { styled } from "../../stitches.config";
import { CarGrid } from "../Cars/Grid";

const StyledSidebar = styled("div", {
  maxWidth: "430px",
  width: "100%",
  margin: "0.8rem",
  overflow: "auto",

  boxShadow: "0 1px 3px 0 rgb(0 0 0 / 20%)",
});

const SidebarBtn = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 3,
  fontSize: 15,
  lineHeight: 1,
  height: 35,
  cursor: "pointer",
  width: "100%",
  transition: "0.2s",

  variants: {
    gray: {
      true: {
        backgroundColor: gray.gray4,
        color: gray.gray12,

        "@media (hover: hover)": {
          "&:hover": { backgroundColor: gray.gray6 },
          "&:focus": { boxShadow: `0 0 0 2px ${gray.gray7}` },
        },
      },
    },
  },
});

const Buttons = styled("div", {
  display: "flex",
  width: "100%",
  gap: "0.5rem",
  padding: "0.5rem",

  borderBottom: `1px solid ${gray.gray6}`,
});

const Text = styled("p", {
  fontSize: 15,
  lineHeight: 1,
  padding: "0.5rem",
  opacity: 0.5,
});

const LowerContainer = styled("div", {
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

const Sidebar = () => {
  const checkedCars = useISelector((state) => state.checked.cars);

  const showCheckedCars = checkedCars.length > 0;

  return (
    <StyledSidebar>
      <Buttons>
        <SidebarBtn gray>New car</SidebarBtn>
        <SidebarBtn gray>New garage</SidebarBtn>
      </Buttons>

      <LowerContainer text={!showCheckedCars}>
        {showCheckedCars ? (
          <CarGrid cars={checkedCars} single />
        ) : (
          <Text>Selected cars will appear here</Text>
        )}
      </LowerContainer>
    </StyledSidebar>
  );
};

export default Sidebar;
