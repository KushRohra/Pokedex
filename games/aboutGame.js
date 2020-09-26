let url = "https://pokeapi.co/api/v2/generation/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

async function getGameData(id) {
	url += id.toString();
	const response = await fetch(url);
	data = await response.json();
	await show(data);
}

async function show(data) {
	let gameData = `<h3 id="heading" class="display-3">${data.id}. ${await capitalizeName(data.name)}</h3>`;
	gameData += `
					<div id="details"> 
						<p><b>Region:</b> ${await capitalizeName(data.main_region.name)}</p>
				`;
	gameData += await getPokemonTypes(data) + `<br><br>`;
	gameData += await getPokemonSpecies(data) + `<br><br>`;
	gameData += await getMoves(data) + `<br><br>`;
	gameData += `</div>`;

	document.getElementById("gameData").innerHTML = gameData;
}

async function getPokemonTypes(data) {
	if(data.types.length == 0)
		return ``;
	let pokemonTypeTable = `
								<br>
								<h5 class="display-5">New types of Pokemon added in this generation</h5>
								<div id="table">
									<table class="table table-hover table-bordered">
										<thead class="thead-dark">
											<td scope="col">Type No</td>
											<td scope="col">Type of Pokemon</td>
											<td scope="col">Link</td>
										</thead>
							`;
	for(var i=0;i<data.types.length;i++) {
		if(data.types[i].name == "unknown")
			continue;
		pokemonTypeTable += `
								<tbody>
									<td scope="row">${i+1}</td>
									<td>${await capitalizeName(data.types[i].name)}</td>
									<td><a class="badge badge-primary" href="../types/aboutTypes.html?id=${await getId(data.types[i].url)}"><button class="btn btn-primary">See about the type of Pokemon in Detail</button></a></td>
								</tbody>
							`;
	}
	pokemonTypeTable += `</table></div>`;
	return pokemonTypeTable;
}

async function getPokemonSpecies(data) {
	let pokemonSpeciesTable = `
								<h5 class="display-5">Different Pokemon of this generation</h5>
								<div id="table">
									<table class="table table-hover table-bordered">
										<thead class="thead-dark">
											<td scope="col">Pokemon No</td>
											<td scope="col">Name of Pokemon</td>
											<td scope="col">Link</td>
										</thead>
							`;
	for(var i=0;i<data.pokemon_species.length;i++) {
		pokemonSpeciesTable += `
								<tbody>
									<td scope="row">${i+1}</td>
									<td>${await capitalizeName(data.pokemon_species[i].name)}</td>
									<td><a class="badge badge-primary" href="../seePokemon/seePokemon.html?id=${await getId(data.pokemon_species[i].url)}"><button class="btn btn-primary">See about pokemon in Detail</button></a></td>
								</tbody>
							`;
	}
	pokemonSpeciesTable += `</table></div>`;
	return pokemonSpeciesTable;
}

async function getMoves(data) {
	let moveTable = `
						<h5 class="display-5">Moves of different Pokemon in this generation</h5>
						<div id="table">
						<table class="table table-bordered table-hover">
							<thead class="thead-dark">
								<td scope="col">Move Number</td>
								<td scope="col">Name of Move</td>
								<td scope="col">Link</td>
							</thead>
					`;
	for(var i=0;i<data.moves.length;i++) {
		moveTable += `
						<tbody>
							<td scope="row">${i+1}</td>
							<td>${await capitalizeName(data.moves[i].name)}</td>
							<td><a class="badge badge-primary" href="../moves/aboutMove.html?id=${await getId(data.moves[i].url)}"><button class="btn btn-primary">See about move in Detail</button></a></td>
						</tbody>
					 `;
	}
	moveTable += `</table></div>`;
	return moveTable;
}

async function capitalizeName(name) {
	return name[0].toUpperCase() + name.slice(1);
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

getGameData(id);