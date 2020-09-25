const url = "https://pokeapi.co/api/v2/pokemon/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

async function getPokemonData(id) {
	let url = "https://pokeapi.co/api/v2/pokemon/";
	url += id.toString();
	const response = await fetch(url);
	data = await response.json();
	await show(data);
}

function show(data) {
	let content = `	<h1 syle="font-size:65px"><b>${data.id}. ${data.name[0].toUpperCase()+data.name.slice(1)}</b></h1>
					<img src="${data.sprites.front_default}" alt="${data.name[0].toUpperCase()+data.name.slice(1)}" class="img-thumbnail"><br>`
	content += concatenateTypes(data);
	content+=`<p>Height: ${data.height}</p>
			  <p>Weight: ${data.weight}</p>
			  <p>Base Experience: ${data.base_experience}</p>
			 `;
	content += getAbilities(data);
	content += getMoves(data);
	document.getElementById("pokemon").innerHTML = content;
}

function concatenateTypes(data) {
	let types="";
	for(var i=0;i<data.types.length;i++) {
		var name = data.types[i].type.name;
		var Name = name[0].toUpperCase() + name.slice(1);
		types += `<div class="type" style="background-color: ${getFontColor(name)}">${Name}</div>`
	}
	return types;
}

function getAbilities(data) {
	let abilties="";
	abilties += `<h4 class="display-4">Abilities</h3>`
	abilties += `<div id="ability" class="list-group">`
	for(var i=0;i<data.abilities.length;i++) {
		ability = data.abilities[i].ability.name;
		ability = ability[0].toUpperCase() + ability.slice(1);
		abilties += `<li class="list-group-item list-group-item-action">${ability}</li>`
	}
	abilties += `</div>`
	return abilties;
}

function getMoves(data) {
	let moves="";
	moves += `<h4 class="display-4">Moves</h3>`
	moves += `<div id="moves" class="list-group">`
	for(var i=0;i<data.moves.length;i++) {
		move = data.moves[i].move.name;
		move = move[0].toUpperCase() + move.slice(1);
		moves += `<li class="list-group-item list-group-item-action">${move}</li>`
	}
	moves += `</div>`
	return moves;
}

function getFontColor(color) {
	switch(color) {
		case "bug": return ('#729f3f');
	    case "dragon": return ('#53a4cf');
	    case "fairy": return ('#fdb9e9');
	    case "fire": return('#fd7d24');
	    case "ghost": return('#7b62a3');
	    case "ground": return('#f7de3f');
	    case "normal": return( '#a4acaf');
	    case "pyschic": return( '#f366b9');
	    case "steel": return( '#9eb7b');
	    case "dark": return( '#707070');
	    case "electric": return( '#eed535');
	    case "fighting": return( '#d56723');
	    case "flying": return( '#3dc7ef');
	    case "grass": return( '#9bcc50');
	    case "ice": return( '#51c4e7');
	    case "poison": return( '#b97fc9');
	    case "rock": return( '#a38c21');
	    case "water": return( '#4592c4');
	}
}

getPokemonData(id);
