const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    main()
})

function main() {
    loadTrainers()
}

function loadTrainers() {
    fetch(BASE_URL + '/trainers')
    .then(resp => resp.json())
    .then(json => {
        displayTrainers(json)
    })
    .catch(err => {
        let errorDiv = document.getElementById('error')
        let errorMessage = document.getElementById('error-message')

        errorDiv.classList.remove('hidden')
        errorMessage.textContent = err
    })
}

function displayTrainers(trainers) {
    let trainersContainer = document.querySelector('main')
    console.log(trainersContainer)
    trainers.forEach(trainer => {
        let trainerObj = new Trainer(trainer.id, trainer.name, trainer.pokemons)
        trainerObj.attach(trainersContainer)
        displayPokemons(trainer.pokemons)
    })
}

function displayPokemons(pokemons) {
    console.log(pokemons)
    pokemons.forEach(pokemon => {
        let pokemonObj = new Pokemon(pokemon.id, pokemon.species,   pokemon.nickname, pokemon.trainer_id)
        console.log(pokemonObj)
        pokemonObj.attach()
    })
}



