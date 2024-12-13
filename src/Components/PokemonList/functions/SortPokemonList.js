export function sortList(pokemonList, sortListFlag, resetFlags) {
    if(sortListFlag && pokemonList.length != 0) {
        console.log("Trying to sort now")
        // Sort list via the checked flag
        var flaggedPokemonOnly = new Array();
        var unflaggedPokemonOnly = new Array();
        pokemonList.map((poke) => {
           if (poke["Selected"] == true){
            flaggedPokemonOnly.push(poke)
           }else if (poke["Selected"] == false){
            unflaggedPokemonOnly.push(poke);
           }
        });
        // Append unchecked list to checked list
        const sortedPokemon = flaggedPokemonOnly.concat(unflaggedPokemonOnly)
        return sortedPokemon
    }else{
        if(resetFlags == true && pokemonList.length != 0 ){
            var newPokeList = new Array()
            pokemonList.map((poke) => {
                poke["Selected"] = false;
                newPokeList.push(poke);
            });
            return newPokeList;
        }else{
            return pokemonList;
        }
    }
}