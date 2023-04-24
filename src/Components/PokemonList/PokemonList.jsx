import { useState } from "react";
import PokemonCell from "../RowComp/PokemonCell";
import "./PokemonList.css";

export const PokemonList = ({ List }) => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="container">
        {List.filter((element) =>
          element.name.toLowerCase().includes(search.toLowerCase())
        ).map((poke, idx) => {
          return <PokemonCell pokemon={poke} key={idx} />;
        })}
      </div>
    </div>
  );
};
