import { fetchPokemonList, fetchPokemonDetails, searchPokemon } from "./api.js"
import { createPokemonCard, createPaginationButtons, createPokemonDetailsPage } from "./utils.js"

const pokemonList = document.getElementById("pokemon-list")
const pagination = document.getElementById("pagination")
const searchInput = document.getElementById("search")

const currentPage = 1
const itemsPerPage = 12

async function displayPokemonList(page = 1) {
  const offset = (page - 1) * itemsPerPage
  const { results, count } = await fetchPokemonList(offset, itemsPerPage)

  pokemonList.innerHTML = ""
  results.forEach((pokemon) => {
    const card = createPokemonCard(pokemon)
    pokemonList.appendChild(card)
  })

  createPaginationButtons(pagination, page, Math.ceil(count / itemsPerPage), displayPokemonList)
}

searchInput.addEventListener("input", async (e) => {
  const searchTerm = e.target.value.toLowerCase()
  if (searchTerm.length > 2) {
    const results = await searchPokemon(searchTerm)
    pokemonList.innerHTML = ""
    results.forEach((pokemon) => {
      const card = createPokemonCard(pokemon)
      pokemonList.appendChild(card)
    })
    pagination.innerHTML = ""
  } else if (searchTerm.length === 0) {
    displayPokemonList(currentPage)
  }
})

window.addEventListener("popstate", (event) => {
  if (event.state && event.state.pokemonName) {
    showPokemonDetails(event.state.pokemonName)
  } else {
    displayPokemonList(currentPage)
  }
})

export async function showPokemonDetails(pokemonName) {
  const pokemonDetails = await fetchPokemonDetails(pokemonName)
  const detailsPage = createPokemonDetailsPage(pokemonDetails)
  document.getElementById("app").innerHTML = detailsPage
}

displayPokemonList()

