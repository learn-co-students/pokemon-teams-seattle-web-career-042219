const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

document.addEventListener("DOMContentLoaded", () => {
  getTrainers();
});

function getTrainers() {
  fetch(TRAINERS_URL)
    .then(res => res.json())
    // .then(trainers => console.log(trainers))
    .then(trainers => showTrainers(trainers))

    .catch(err => console.log(err));
}

function showTrainers(trainers) {
  trainers.forEach(trainer => showTrainer(trainer));
}

function showTrainer(trainer) {
  let main = document.getElementById("pokemon-teams");

  let div = document.createElement("div");
  div.setAttribute("class", "card");
  div.setAttribute("data-id", `${trainer.id}`);

  let pName = document.createElement("p");
  pName.innerText = trainer.name;

  let button = document.createElement("button");
  button.setAttribute("data-trainer-id", `${trainer.id}`);
  button.innerText = "Add Pokemon";

  let ul = document.createElement("ul");
  ul.id = `ul-trainer-${trainer.id}`;

  for (let i = 0; i < trainer.pokemons.length; i++) {
    let li = document.createElement("li");
    li.innerText = `${trainer.pokemons[i].nickname} (${
      trainer.pokemons[i].species
    })`;

    let removeButton = document.createElement("button");
    // removeButton.setAttribute("id", `remove-pokemon-${trainer.id}`);
    removeButton.setAttribute("id", `remove-pokemon-${trainer.pokemons[i].id}`);
    removeButton.setAttribute("class", "release");
    removeButton.setAttribute("data-pokemon-id", `${trainer.pokemons[i].id}`);
    removeButton.innerText = "Release";
    removeButton.addEventListener("click", e => {
      e.preventDefault();
      releasePokemon(trainer.pokemons[i].id, li);
    });

    li.appendChild(removeButton);
    ul.appendChild(li);
  }

  div.appendChild(pName);
  div.appendChild(button);
  div.appendChild(ul);

  //   main.appendChild(div);
  main.appendChild(div);

  button.addEventListener("click", e => {
    e.preventDefault();
    addPokemon(trainer);
  });
}

function addPokemon(trainer) {
  let ul = document.getElementById(`ul-trainer-${trainer.id}`);
  if (ul.children.length < 6) {
    fetch(POKEMONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pokemon: { trainer_id: trainer.id }
      })
    })
      .then(res => res.json())
      .then(res => appendPokemon(res, trainer.id))
      .catch(err => console.log(err));
  } else {
    alert("You can only have 6 pokemon");
  }
}

function appendPokemon(res, trainerId) {
  let ul = document.getElementById(`ul-trainer-${trainerId}`);
  let li = document.createElement("li");
  li.innerText = `${res.nickname} (${res.species})`;

  let removeButton = document.createElement("button");
  removeButton.setAttribute("id", `remove-pokemon-${trainerId}`);
  removeButton.setAttribute("class", "release");
  removeButton.setAttribute("data-pokemon-id", `${res.id}`);
  removeButton.innerText = "Release";
  li.appendChild(removeButton);
  ul.appendChild(li);

  removeButton.addEventListener("click", e => {
    e.preventDefault();
    releasePokemon(res.id, li);
  });
}

function releasePokemon(id, li) {
  fetch(POKEMONS_URL + "/" + id, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(li.remove())
    .catch(err => console.log(err));
}
