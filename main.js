const pokeAPIBaseUrl = 'https://pokeapi.co/api/v2/pokemon/'
const game = document.getElementById('game')

const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};

const loadPokemon = async () => {
    const randomIds = new Set();
    while(randomIds.size < 8) {
        const randomNumber = Math.ceil(Math.random() * 150);
        randomIds.add(randomNumber)
    }

    const pokePromises = [...randomIds].map(id => fetch(pokeAPIBaseUrl + id));
    const responses = await Promise.all(pokePromises);
    return await Promise.all(responses.map(res => res.json()));
    
}

const displayPokemon = (pokemon) => {
    pokemon.sort( _ => Math.random() - 0.5);
    const pokemonHTML = pokemon.map(pokemon => {
        const type = pokemon.types[0].type.name || 'normal';
        const color = colors[type];
        return `
        <div class='card' style='background-color:${color}'>



            <div class='back rotated' style='background-color:${color}'>
                <h2> ${pokemon.name} </h2>
                <img src="${pokemon.sprites.front_default}" alt=${pokemon.name} />
            </div>

            
        </div>
        `
    }).join('');
    game.innerHTML = pokemonHTML;
}

const resetGame = async () => {
    const pokemon = await loadPokemon();
    displayPokemon([...pokemon, ...pokemon])
}


loadPokemon();