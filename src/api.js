const BASE_URL = "https://pokeapi.co/api/v2"

export async function fetchPokemonList(offset = 0, limit = 20) {
  const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)
  return await response.json()
}

export async function fetchPokemonDetails(nameOrId) {
  const response = await fetch(`${BASE_URL}/pokemon/${nameOrId}`)
  return await response.json()
}

export async function searchPokemon(searchTerm) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=1000`)
  const data = await response.json()
  return data.results.filter((pokemon) => pokemon.name.includes(searchTerm))
}

