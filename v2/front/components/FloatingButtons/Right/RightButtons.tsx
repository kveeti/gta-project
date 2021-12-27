import { useState } from "react";
import { FloatingButtons } from "../Styles";
import { HomeButton } from "./HomeButton";
import { NewButton } from "./NewButton";
import { FloatingNewCarButton } from "./NewCarButton";
import { FloatingNewGarageButton } from "./NewGarageButton";

export const RightFloatingButtons = () => {
  const [showBtns, setShowBtns] = useState(false);
  const route = window.location.pathname;

  const garage = route.includes("garage");
  const car = route.includes("car");

  return (
    <FloatingButtons right>
      {showBtns && (
        <div style={{ marginBottom: "1rem" }}>
          {car ? <HomeButton /> : <FloatingNewCarButton />}
          {garage ? <HomeButton /> : <FloatingNewGarageButton />}
        </div>
      )}
      <NewButton onClick={() => setShowBtns(!showBtns)} />
    </FloatingButtons>
  );
};
