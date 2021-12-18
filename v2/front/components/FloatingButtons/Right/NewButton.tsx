import { PlusIcon } from "@radix-ui/react-icons";
import { FloatingButton } from "../Styles";

export const NewButton = ({ onClick }) => {
  return (
    <FloatingButton right onClick={() => onClick()} style={{ marginTop: "1rem" }}>
      <PlusIcon />
    </FloatingButton>
  );
};
