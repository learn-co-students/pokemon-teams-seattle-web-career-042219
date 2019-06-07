const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function main() {
  fetchTeams()
}

main()

function fetchTeams() {
  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => displayTeams(json))
}

function displayTeams(json) {
  json.forEach((trainer) => {
    displayTeam(trainer)
  })
}

function displayTeam(trainer) {
  let parent = document.getElementById('pokemon-teams')
  let div = document.createElement('div')
  let p = document.createElement('p')
  let button = document.createElement('button')
  let ul = document.createElement('ul')

  div.className = "card"
  p.textContent = trainer.name
  button.textContent = "Add Pokemon"


  parent.appendChild(div)
  div.appendChild(p)
  div.appendChild(button)
  div.appendChild(ul)


  div.id = `test-trainer-id-${trainer.id}`
  let d = document.getElementById(`test-trainer-id-${trainer.id}`)
  d.setAttribute('data-id' , trainer.id)

  button.id = `test-button-id-${trainer.id}`
  let b = document.getElementById(`test-button-id-${trainer.id}`)
  b.setAttribute('data-trainer-id', trainer.id)

  ul.id = `ul-trainer-${trainer.id}`

  button.addEventListener('click', handleAddPokemon)

//==============================================
// ITERATE THRHOUGH POKEMON LIST

  trainer.pokemons.forEach((pokemon) => {
    let li = document.createElement('li')
    let delbtn = document.createElement('button')

    delbtn.className = "release"
    delbtn.id = `test-del-id-${pokemon.id}`
    delbtn.textContent = "Release"

    delbtn.addEventListener('click', () => {
      handleDeletePokemon(pokemon, li)
    })

    li.textContent = `${pokemon.nickname} (${pokemon.species})`

    li.appendChild(delbtn)
    ul.appendChild(li)

    let del = document.getElementById(`test-del-id-${pokemon.id}`)
    del.setAttribute('data-pokemon-id', pokemon.id)
  })
}

function handleAddPokemon(ev) {
  // ev.preventDefault()
  let trainer_id = ev.target.attributes[1].value

  let payload = {trainer_id: trainer_id}
  let config = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  }

  fetch(POKEMONS_URL, config)
  .then(res => res.json())
  .then (json => {
    addPokemon(json, trainer_id)
  })
}

function addPokemon(json, trainer_id) {
  let ul = document.getElementById(`ul-trainer-${trainer_id}`)
  let li = document.createElement('li')
  let delbtn = document.createElement('button')

  delbtn.className = "release"
  delbtn.id = `test-del-id-${json.id}`
  delbtn.textContent = "Release"

  delbtn.addEventListener('click', () => {
    handleDeletePokemon(json.id, li)
  })


  li.textContent = `${json.nickname} (${json.species})`

  li.appendChild(delbtn)
  ul.appendChild(li)

  let del = document.getElementById(`test-del-id-${json.id}`)
  del.setAttribute('data-pokemon-id', json.id)
}

function handleDeletePokemon(pokemon, li) {

  let config = {
    method: 'DELETE',
  }

  fetch(POKEMONS_URL + '/' + pokemon.id, config)
  .then(res => res.json())
  .then (json => {
    li.remove()
  })
}
