import { paths } from "../../../../../util/constants";
import { HomeIcon } from "../../../../Common/Icons/HomeIcon";
import { FloatingButton } from "../Styles";

export const FloatingHomeButton = () => (
  <FloatingButton link={paths.home()}>
    <HomeIcon />
  </FloatingButton>
);
