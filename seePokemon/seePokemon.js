const url = "https://pokeapi.co/api/v2/pokemon/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

function getPokemonData(id) {
	return `<h1>${id}</h1>`;
}
 
getPokemonData(id);
