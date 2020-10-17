let url = "https://pokeapi.co/api/v2/pokemon/"

var allPokemon = new Map()

getAllPokemon(url);

async function getAllPokemon() {
	let response = await fetch(url);
	let data = await response.json();
	for(var i=0;i<data.results.length;i++) {
		allPokemon.set(data.results[i].name, data.results[i].url);
	} 
	if(data.next) {
		url = data.next;
		getAllPokemon();
	}
}

function searchPokemon() {
	var pokemonName = document.getElementById("name").value;
	console.log(allPokemon.get(pokemonName.toLowerCase()))
}