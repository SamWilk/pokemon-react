import { useState } from "react";
import PokemonCell from "../RowComp/PokemonCell";
import "./PokemonList.css";

export const PokemonList = ({ List, SelectedList }) => {
  const [search, setSearch] = useState("");

  return (
    <div className='ListContainer'>
      <input
        className='SearchBar'
        placeholder='Find your pokemon'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='container'>
        {List.filter((element) =>
          element.name.toLowerCase().includes(search.toLowerCase())
        ).map((poke, idx) => {
          return <PokemonCell pokemon={poke} key={idx} />;
        })}
      </div>
    </div>
  );
};
