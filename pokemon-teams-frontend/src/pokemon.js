class Pokemon {
    constructor(id, species, nickname, trainer_id) {
        this.id = id
        this.species = species
        this.nickname = nickname
        this.trainer_id = trainer_id
    }

    attach() {
        let parent = document.getElementById(this.trainer_id)
        let li = document.createElement('li')
        let button = document.createElement('button')

        li.textContent = `${this.nickname} (${this.species})`
        button.textContent = "Release"
        button.className = "release"

        button.addEventListener('click', () => {
            fetch(`http://localhost:3000/pokemons/${this.id}`, {
                method: 'DELETE'
            })
            .then(resp => {
                    return resp.json()
            })
            .then(json => {
                li.remove()
            })
        })

        li.appendChild(button)

        parent.appendChild(li)
    }
}