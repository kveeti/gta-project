import { HamburgerMenuIcon, PlusIcon } from "@radix-ui/react-icons";
import { useISelector } from "../../../state/hooks";
import { FloatingButton } from "../Styles";

export const MainButton = ({ onClick }) => {
  const showSidebar = useISelector((state) => state.checked.show);

  return (
    <FloatingButton onClick={() => onClick()}>
      {showSidebar ? <HamburgerMenuIcon /> : <PlusIcon />}
    </FloatingButton>
  );
};
