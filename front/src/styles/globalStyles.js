import styled from "styled-components";
import { motion } from "framer-motion";
import { colors } from "./colors.js";

import garageIcon from "../images/garage-icon.png";
import carIcon from "../images/car-icon.png";

export const Card = styled(motion.div)`
  background-color: ${colors.cards.primary};
  padding: 15px;
  border-radius: 3px;
  display: flex;

  // Elevation
  ${(props) =>
    props.elevation &&
    `
    box-shadow: var(--elevation${props.elevation});
  `}

  // Clickable card's styles
  ${(props) =>
    props.clickable &&
    `
      cursor: pointer;

      &:hover {
        cursor: pointer; 
        background-color: ${colors.cards.hover};
      }
    `}

  // Chosen card's styles
  ${(props) =>
    props.chosen &&
    `
    background-color: ${colors.cards.chosen.primary} !important;

    &:hover {
      background-color: ${colors.cards.chosen.hover} !important;
    }
    `}

  // Error card's styles
  ${(props) =>
    props.error &&
    `
    background-color: ${colors.red.primary};

    &:hover {
      background-color: ${colors.red.hover};
    }
  `}
`;

export const Text = styled.pre`
  font-family: "Helvetica", sans-serif;
  font-weight: 400;
  margin: 0;
  letter-spacing: 0.02857em;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "14px")};
  ${(props) => (props.uppercase ? `text-transform: uppercase;` : "")};
`;

export const CarIconStyle = styled.img`
  height: 20px;
  width: auto;
`;

export const GarageIconStyle = styled.img`
  height: 25px;
  width: auto;
`;

export const GarageIcon = () => {
  return <GarageIconStyle src={garageIcon} />;
};

export const CarIcon = () => {
  return <CarIconStyle src={carIcon} />;
};

const ButtonStyle = styled.button`
  background-color: ${(props) => (props.bg ? props.bg : colors.cards.primary)};
  border: 1px solid
    ${(props) => (props.borderColor ? props.borderColor : props.color)};
  border-radius: 3px;
  color: ${(props) => props.color};
  padding: 5px;
  cursor: pointer;
  text-transform: uppercase;
`;

export const Button = ({ color, bg, borderColor, text, onClick, disabled }) => {
  return (
    <ButtonStyle
      onClick={onClick}
      disabled={disabled}
      color={color}
      bg={bg}
      borderColor={borderColor}
    >
      {text}
    </ButtonStyle>
  );
};
