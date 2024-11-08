const selectedPokemon = JSON.parse(localStorage.getItem('selectedPokemon'));
const pokemonRival = JSON.parse(localStorage.getItem('pokemonRival'));

function agregarEstrella(pokemonDiv, pokemon) {
    if (pokemon.img.includes('shiny')) {
        const estrellitaShiny = document.createElement('span');
        estrellitaShiny.classList.add('shiny-star');
        estrellitaShiny.textContent = '⭐';
        pokemonDiv.appendChild(estrellitaShiny);
    }
}


let pokemonInfoDiv = document.getElementById('pokemon-jugador');
let img = document.createElement('img');
img.src = selectedPokemon.img;
pokemonInfoDiv.appendChild(img);

let name = document.createElement('h2');
name.textContent = selectedPokemon.name;
pokemonInfoDiv.appendChild(name);

let type = document.createElement('p');
type.textContent = ` ${selectedPokemon.types.join(',')}`;
pokemonInfoDiv.appendChild(type);
let hpJugador = document.createElement('p');
hpJugador.textContent = `HP: ${selectedPokemon.hp}`;
pokemonInfoDiv.appendChild(hpJugador);

agregarEstrella(pokemonInfoDiv, selectedPokemon);


let pokemonInfoDivRival = document.getElementById('pokemon-rival');
let imgRival = document.createElement('img');
imgRival.src = pokemonRival.img;
pokemonInfoDivRival.appendChild(imgRival);

let nameRival = document.createElement('h2');
nameRival.textContent = pokemonRival.name;
pokemonInfoDivRival.appendChild(nameRival);

let typeRival = document.createElement('p');
typeRival.textContent = `${pokemonRival.types.join(',')}`;
pokemonInfoDivRival.appendChild(typeRival);
let hpRival = document.createElement('p');

hpRival.textContent = `HP: ${pokemonRival.hp}`;
pokemonInfoDivRival.appendChild(hpRival);

agregarEstrella(pokemonInfoDivRival, pokemonRival);
