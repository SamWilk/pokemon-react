export class Pokemon {
  constructor(species) {
    console.log("Logging", species);
    if (species == undefined) {
      this.species = undefined;
    } else {
      this.species = new species(species.name, species.url);
    }
  }
}

export class species {
  constructor(name, url) {
    this.name = name;
    this.url = url;
  }
}
