let url = "https://pokeapi.co/api/v2/pokemon/";

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

async function searchPokemon() {
	var pokemonName = document.getElementById("name").value;
	var c = 0;
	var pokemonResult = document.getElementById("pokemonResult");
	var content = `<ul class="list-group">`;
	for (let [key, value] of allPokemon) {
		if(key.includes(pokemonName)) {
			c++;
			content += `<a class="btn" href="../../seePokemon/seePokemon.html?id=${await getId(value)}"><li>${key}</li></a>`;
		}
	}
	content += `</ul>`;
	if(c!=0) {
		pokemonResult.innerHTML = content;
	}
	else {
		pokemonResult.innerHTML = `No results found`;
	}
	document.getElementById("form").reset();
}

async function getId(url) {
	url = url.toString();
	var urlLength = url.length;
	let no="";
	for(var i=urlLength-2;i>=0;i--) {
		if(url[i]>='0' && url[i]<='9')
			no+=url[i];
		else break;
	}
	return no.split('').reverse().join('');
}