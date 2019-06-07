const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function loadTrainers() {
  fetch(TRAINERS_URL)
  .then(response => {
    return response.json()
  })
  .then(json => {
    console.log(json)
    addTrainers(json);
  })
}

function addTrainers(trainers) {
  console.log(trainers)
  trainers.forEach(trainer => addTrainer(trainer));
}

function addTrainer(trainer) {
  console.log('trainer' + trainer.pokemons)

  let div = document.createElement('div');
  div.classList.add('card');
  div.setAttribute('data-id', trainer.id);

  let pName = document.createElement('p');
  pName.textContent = trainer.name;

  let addPokemonButton = document.createElement('button');
  addPokemonButton.setAttribute('data-trainer-id', trainer.id)
  addPokemonButton.textContent = 'Add Pokemon';

  let pokemonUl = document.createElement('ul')
  pokemonUl.id = trainer.id

  div.appendChild(pName);
  div.appendChild(addPokemonButton);
  div.appendChild(pokemonUl);

  addPokemonButton.addEventListener('click', () => {

    fetch(POKEMONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({trainer_id: trainer.id})
    })
      .then(response => response.json())
      .then(json => addPokemon(json))
  });

  document.querySelector('main').appendChild(div);

  addPokemons(trainer.pokemons)
}

function addPokemons(pokemons) {
  pokemons.forEach(pokemon => addPokemon(pokemon));
}

function addPokemon(pokemon) {

  let li = document.createElement('li');
  li.textContent = pokemon.nickname + ' (' + pokemon.species + ')';

  let ul = document.getElementById(pokemon.trainer_id);
  ul.appendChild(li);

  let releaseButton = document.createElement('button');
  releaseButton.classList.add('release');
  releaseButton.setAttribute('data-pokemon-id', pokemon.id);
  releaseButton.textContent = 'Release'

  li.appendChild(releaseButton);

  releaseButton.addEventListener('click', () => {
    li.parentNode.removeChild(li);

    fetch(POKEMONS_URL + '/' + pokemon.id, {
      method: 'DELETE'})
      .then(response => response.json())
      .then(json => json)
  });
}



document.addEventListener('DOMContentLoaded', () => {
  loadTrainers();
})
