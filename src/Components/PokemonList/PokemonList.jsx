import { useState } from "react";
import PokemonCell from "../RowComp/PokemonCell";
import "./PokemonList.css";

export const PokemonList = ({ List, Generation }) => {
  const [search, setSearch] = useState("");
  let searchPlaceHolder = "Find your pokemon";

  if (Generation != 0) {
    searchPlaceHolder = `Search all of Gen ${Generation}`;
  }

  return (
    <div className='ListContainer'>
      <input
        className='SearchBar'
        placeholder={searchPlaceHolder}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className='container'>
        {List.filter((element) =>
          element.name.toLowerCase().includes(search.toLowerCase())
        ).map((poke, idx) => {
          return <PokemonCell pokemon={poke} key={idx} search={search} />;
        })}
      </div>
    </div>
  );
};
