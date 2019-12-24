
class Trainer {
    
    constructor(id, name, pokemons) {
        this.id = id
        this.name = name
        this.pokemons = pokemons
    }

    attach(parent) {
        let div = document.createElement('div')
        let p = document.createElement('p')
        let button = document.createElement('button')
        let ul = document.createElement('ul')

        button.setAttribute('data-trainer-id', this.id)
        button.textContent = "Add Pokemon"

        button.addEventListener('click', () => {
            fetch("http://localhost:3000"+ "/pokemons", {
                method: 'POST',
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({trainer_id: this.id})
            })
            .then(resp => {
                return resp.json()
            })
            .then(json => {
                console.log(json)
                let poke = new Pokemon(json.id, json.species, json.nickname, json.trainer_id)
                poke.attach()
            })
        })

        p.textContent = this.name
        div.className = "card"
        div.setAttribute('data-id', this.id)
        ul.id = this.id

        div.appendChild(p)
        div.appendChild(button)
        div.appendChild(ul)
        parent.appendChild(div)
    }

    addPokemons() {

    }
}