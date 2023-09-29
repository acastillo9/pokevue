export const getPokemonInfo = async (pokemonName: string) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response) =>
    response.json()
  )
}

export const getMoveInformation = async (id: number) => {
  return fetch(`https://pokeapi.co/api/v2/move/${id}`).then((response) => response.json())
}

type typesInformationResponse = {
  name: string,
  damage_relations: {
    [prop: string]: {
      name: string,
    }[],
  },
}
export const getTypesInformation = async (name: string): Promise<typesInformationResponse> => {
  return fetch(`https://pokeapi.co/api/v2/type/${name}`).then((response) => response.json())
}

type pokemonSpeciesResponse = {
  gender_rate: number,
}
export const getPokemonSpecies = async (name: string): Promise<pokemonSpeciesResponse> => {
  return fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then((response) => response.json())
}
