const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  main()
})
function main() {
  loadTrainers();
}

function loadTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => displayTrainers(json));
}

function displayTrainers(trainers) {
  trainers.forEach(displayTrainer)
}

function displayTrainer(trainer) {
  const card = document.createElement("div");
  card.className = "card";
  card.setAttribute('data-id', trainer.id)
  const addButton = document.createElement("button")
  const trainerInfo = document.createElement("p");
  trainerInfo.textContent = trainer.name;
  card.appendChild(trainerInfo);
  addButton.setAttribute("data-trainer-id", trainer.id);
  addButton.textContent = "Add Pokemon";
  addButton.addEventListener('click', addPokemon)
  card.appendChild(addButton);
  const ul = document.createElement("ul")
  trainer.pokemons.forEach((pokemon) => {
    addPokemonToCard(pokemon, ul)
  })
  card.appendChild(ul)
  document.querySelector("main").appendChild(card);
}

function addPokemon(ev) {
  ev.preventDefault();
  fetch(POKEMONS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({trainer_id: ev.target.attributes[0].value})
  })

  .then(res => {
    return res.json()
  })

  .then(json => {
    addPokemonToUl(json)
  })
}

function addPokemonToCard(pokemon, ul) {

  const li = document.createElement("li");
  const releaseButton = document.createElement("button");
  releaseButton.className = "release";
  releaseButton.setAttribute('data-pokemon-id', pokemon.id);
  releaseButton.textContent = "Release";
  releaseButton.addEventListener('click', releasePokemon)
  li.textContent = pokemon.nickname + ` (${pokemon.species})`;
  li.appendChild(releaseButton);
  ul.appendChild(li);
}

function addPokemonToUl(pokemon) {
  const pokemonCard = document.querySelector(`div[data-id = "${pokemon.trainer_id}"]`)
  const pokemonUl = pokemonCard.getElementsByTagName("ul")[0];
  addPokemonToCard(pokemon, pokemonUl);
}

function releasePokemon(ev) {
  const pokemonLi = ev.target.parentElement

  fetch(POKEMONS_URL + `/${ev.target.attributes[1].textContent}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(json => {
    pokemonLi.remove()
  })

}
