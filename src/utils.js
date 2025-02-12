import { showPokemonDetails } from "./main.js"

export function createPokemonCard(pokemon) {
  const card = document.createElement("div")
  card.className = "pokemon-card"
  card.innerHTML = `
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png" alt="${pokemon.name}" class="pokemon-image">
    <h2 class="pokemon-name">${pokemon.name}</h2>
  `
  card.addEventListener("click", () => {
    history.pushState({ pokemonName: pokemon.name }, "", `?pokemon=${pokemon.name}`)
    showPokemonDetails(pokemon.name)
  })
  return card
}

export function createPaginationButtons(container, currentPage, totalPages, callback) {
  container.innerHTML = ""

  if (currentPage > 1) {
    const prevButton = createButton("Previous", () => callback(currentPage - 1))
    container.appendChild(prevButton)
  }

  const pageInfo = document.createElement("span")
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`
  pageInfo.className = "page-info"
  container.appendChild(pageInfo)

  if (currentPage < totalPages) {
    const nextButton = createButton("Next", () => callback(currentPage + 1))
    container.appendChild(nextButton)
  }
}

function createButton(text, onClick) {
  const button = document.createElement("button")
  button.textContent = text
  button.className = "pagination-button"
  button.addEventListener("click", onClick)
  return button
}

function getPokemonId(url) {
  const parts = url.split("/")
  return parts[parts.length - 2]
}

export function createPokemonDetailsPage(pokemon) {
  const types = pokemon.types.map((type) => `<span class="type-badge">${type.type.name}</span>`).join("")

  const stats = pokemon.stats
    .map(
      (stat) => `
    <div class="stat-item">
      <div class="stat-info">
        <span class="stat-name">${stat.stat.name}</span>
        <span class="stat-value">${stat.base_stat}</span>
      </div>
      <div class="stat-bar-container">
        <div class="stat-bar" style="width: ${(stat.base_stat / 255) * 100}%"></div>
      </div>
    </div>
  `,
    )
    .join("")

  return `
    <div class="pokemon-details">
      <button onclick="history.back()" class="back-button">Back</button>
      <div class="pokemon-info">
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="pokemon-image large">
        <div class="pokemon-data">
          <h2 class="pokemon-name large">${pokemon.name}</h2>
          <div class="type-container">${types}</div>
          <p class="pokemon-measurements">Height: ${pokemon.height / 10}m | Weight: ${pokemon.weight / 10}kg</p>
        </div>
      </div>
      <h3 class="stats-title">Base Stats</h3>
      <div class="stats-container">
        ${stats}
      </div>
    </div>
  `
}

