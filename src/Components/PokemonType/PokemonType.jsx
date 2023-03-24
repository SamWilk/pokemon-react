import { useState, useEffect } from "react";
import "../../logic/CheckTyping.css";

export const PokemonType = ({ PokemonType }) => {
  const [colorStyle, setColorStyle] = useState("");

  useEffect(() => {
    SetColor(PokemonType);
  }, []);

  const SetColor = (typing) => {
    const lowerType = typing.toLowerCase();
    switch (lowerType) {
      case "fire":
        setColorStyle("fire");
        break;
      case "flying":
        setColorStyle("flying");
        break;
      case "electric":
        setColorStyle("electric");
        break;
      case "normal":
        setColorStyle("normal");
        break;
      case "fighting":
        setColorStyle("fighting");
        break;
      case "grass":
        setColorStyle("grass");
        break;
      case "poison":
        setColorStyle("poison");
        break;
      case "rock":
        setColorStyle("rock");
        break;
      case "ground":
        setColorStyle("ground");
        break;
      case "bug":
        setColorStyle("bug");
        break;
      case "fairy":
        setColorStyle("fairy");
        break;
      case "water":
        setColorStyle("water");
        break;
      case "psychic":
        setColorStyle("psychic");
        break;
      case "dragon":
        setColorStyle("dragon");
        break;
      case "steel":
        setColorStyle("steel");
        break;
      case "ice":
        setColorStyle("ice");
        break;
      case "ghost":
        setColorStyle("ghost");
        break;
      case "dark":
        setColorStyle("dark");
        break;
      default:
        break;
    }
  };

  return <div className={colorStyle}>{PokemonType}</div>;
};
