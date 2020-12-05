let url = "https://pokeapi.co/api/v2/pokemon/";

var allPokemon = new Map()

getAllPokemon(url);

async function getAllPokemon() {
	let response = await fetch(url);
	let data = await response.json();
	for(var i=0;i<data.results.length;i++) {
		allPokemon.set(await getId(data.results[i].url), data.results[i].url);
	}
	if(data.next) {
		url = data.next;
		getAllPokemon();
	}
}

async function searchPokemon() {
	var id = document.getElementById("name").value;
	if(id > 893) {
		document.getElementById("pokemonResult").innerHTML = "Enter a no upto 893";
		return ;
	}

	let url = "https://pokeapi.co/api/v2/pokemon/";
	url += id.toString();
	const response = await fetch(url);
	data = await response.json();

	var pokemonResult = document.getElementById("pokemonResult");
	let content = `	<h1 syle="font-size:65px"><b>${data.id}. ${data.name[0].toUpperCase()+data.name.slice(1)}</b></h1>
					<img src="${data.sprites.front_default}" alt="${data.name[0].toUpperCase()+data.name.slice(1)}" class="img-thumbnail"><br>`
	content += await concatenateTypes(data);
	content+=`<p>Height: ${data.height}</p>
			  <p>Weight: ${data.weight}</p>
			  <p>Base Experience: ${data.base_experience}</p>
			 `;
	content += await getAbilities(data);
	content += await getMoves(data);
	document.getElementById("pokemonResult").innerHTML = content;
	document.getElementById("form").reset();
}

async function concatenateTypes(data) {
 	let types="";
	for(var i=0;i<data.types.length;i++) {
		var name = data.types[i].type.name;
		var Name = name[0].toUpperCase() + name.slice(1);
		types += `<div class="type" style="background-color: ${getFontColor(name)}">${Name}</div>`
	}
	return types;
}

async function getAbilities(data) {
	let abilties="";
	abilties += `<h4 class="display-4">Abilities</h3>`
	abilties += `<div id="ability" class="list-group">`
	for(var i=0;i<data.abilities.length;i++) {
		ability = data.abilities[i].ability.name;
		ability = ability[0].toUpperCase() + ability.slice(1);
		abilties += `
			<div class="row">
				<div class="col s6">
					<a class="btn"><li class="list-group-item list-group-item-action">${ability}</li></a>
				</div>
			</div>
		`;
	}
	abilties += `</div>`
	return abilties;
}

async function getMoves(data) {
	let moves="";
	moves += `<h4 class="display-4">Moves</h3>`;
	moves += `<div id="moves" class="list-group">`;
	for(var i=0;i<data.moves.length;i=i+4) {
		move = data.moves[i].move.name;
		move = move[0].toUpperCase() + move.slice(1);
		moves += `	<div class="row">
						<div class="col s3">
							<a class="btn button" href="../moves/aboutMove.html?id=${await getId(data.moves[i].move.url)}">
								<li class="list-group-item list-group-item-action">${move}</li>
							</a>
						</div>
				`;
		if(i+1<data.moves.length) {
			move = data.moves[i+1].move.name;
			move = move[0].toUpperCase() + move.slice(1);
			moves += `
							<div class="col s3">
								<a class="btn button" href="../moves/aboutMove.html?id=${await getId(data.moves[i+1].move.url)}">
									<li class="list-group-item list-group-item-action">${move}</li>
								</a>
							</div>
					`;
		}
		if(i+2<data.moves.length) {
			move = data.moves[i+2].move.name;
			move = move[0].toUpperCase() + move.slice(1);
			moves += `
							<div class="col s3">
								<a class="btn button" href="../moves/aboutMove.html?id=${await getId(data.moves[i+2].move.url)}">
									<li class="list-group-item list-group-item-action">${move}</li>
								</a>
							</div>
					`;
		}
		if(i+3<data.moves.length) {
			move = data.moves[i+3].move.name;
			move = move[0].toUpperCase() + move.slice(1);
			moves += `
							<div class="col s3">
								<a class="btn button" href="../moves/aboutMove.html?id=${await getId(data.moves[i+3].move.url)}">
									<li class="list-group-item list-group-item-action">${move}</li>
								</a>
							</div>
					`;
			moves += `</div>`;
		}
	}
	moves += `</div>`;
	return moves;
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
