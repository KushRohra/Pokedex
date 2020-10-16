let url = "https://pokeapi.co/api/v2/type/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

url += id.toString();

async function getTypeData(url) {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	show(data);
}

async function show(data) {
	let typeContent = `
						<div id="content">
							<h3 class="display-3">${data.id}. ${await Capitalize(data.name)}</h3>
					  `;

	typeContent += await getDamageRelations(data);
	typeContent += await getPokemon(data);
	typeContent += await getMoves(data);
	typeContent += `</div>`;

	document.getElementById("typeContent").innerHTML = typeContent;
}

async function getDamageRelations(data) {
	let typeContent = `
					  <div id="damageRelations">
					  	  <h5 class="display-5">Damage from</h5>
					`;
	typeContent += await getDamageFromData(data) + `<br>`;
	typeContent +=	`<h5 class="display-5">Damage to</h5>`
	typeContent += await getDamageToData(data) + `<br>`;
	if(data.damage_relations.no_damage_from.length!=0) {
		typeContent += `<h5 class="display-5">No Damage From</h5>`;
		typeContent += await getNoDamageFrom(data) + `<br>`;
	}
	if(data.damage_relations.no_damage_to.length!=0) {
		typeContent += `<h5 class="display-5">No Damage To</h5>`;
		typeContent += await getNoDamageTo(data) + `<br></div>`;
	}
	return typeContent;
}

async function getDamageFromData(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.double_damage_from.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.double_damage_from[i].url)}" class="btn"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.double_damage_from[i].name)}</li></a>`;
	for(var i=0;i<data.damage_relations.half_damage_from.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.half_damage_from[i].url)}" class="btn"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.half_damage_from[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
}

async function getDamageToData(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.double_damage_to.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.double_damage_to[i].url)}" class="btn"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.double_damage_to[i].name)}</li></a>`;
	for(var i=0;i<data.damage_relations.half_damage_to.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.half_damage_to[i].url)}" class="btn"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.half_damage_to[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
}

async function getNoDamageFrom(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.no_damage_from.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.no_damage_from[i].url)}" class="btn"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.no_damage_from[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
}

async function getNoDamageTo(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.no_damage_to.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.no_damage_to[i].url)}" class="btn"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.no_damage_to[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
}

async function getPokemon(data) {
	let pokemonList = `
					   	  <div>
					   	  	<h3><strong>Pokemon that fall under this category<strong></h5>
					   	  	<ul class="list-group">
					   `;

	for(var i=0;i<data.pokemon.length;i=i+3) {
		pokemonList += `	
							<div class="row">
								<div class="col">
									<a class="btn button" href="../seePokemon/seePokemon.html?id=${await getId(data.pokemon[i].pokemon.url)}">
										<li class="list-group-item list-group-item-action">${await Capitalize(data.pokemon[i].pokemon.name)}</li>
									</a>
								</div>
						`;
		if(i+1<data.pokemon.length) {
			pokemonList += `	
							<div class="col">
								<a class="btn button" href="../seePokemon/seePokemon.html?id=${await getId(data.pokemon[i+1].pokemon.url)}">
									<li class="list-group-item list-group-item-action">${await Capitalize(data.pokemon[i+1].pokemon.name)}</li>
								</a>
							</div>
						`;
		}
		if(i+2<data.pokemon.length) {
			pokemonList += `	
							<div class="col">
								<a class="btn button" href="../seePokemon/seePokemon.html?id=${await getId(data.pokemon[i+2].pokemon.url)}">
									<li class="list-group-item list-group-item-action">${await Capitalize(data.pokemon[i+2].pokemon.name)}</li>
								</a>
							</div>
						`;
		}
		pokemonList += `</div>`
	}

	pokemonList += `</ul></div>`;
	return pokemonList;
}

async function getMoves(data) {
	let moves = `
					   	  <div>
					   	  	<h3><strong>Moves of different Pokemons that fall under this category<strong></h5>
					   	  	<ul class="list-group">
					   `;

	for(var i=0;i<data.moves.length;i=i+3) {
		moves += `
					<div class="row">
						<div class="col">
							<a class="btn button" href="../moves/aboutMove.html?id=${await getId(data.moves[i].url)}">
								<li class="list-group-item list-group-item-action">${await Capitalize(data.moves[i].name)}</li>
							</a>
						</div>
				`;
		if(i+1<data.moves.length) {
			moves += `
						<div class="col">
							<a class="btn button" href="../moves/aboutMove.html?id=${await getId(data.moves[i+1].url)}">
								<li class="list-group-item list-group-item-action">${await Capitalize(data.moves[i+1].name)}</li>
							</a>
						</div>
					 `
		}
		if(i+2<data.moves.length) {
			moves += `
						<div class="col">
							<a class="btn button" href="../moves/aboutMove.html?id=${await getId(data.moves[i+2].url)}">
								<li class="list-group-item list-group-item-action">${await Capitalize(data.moves[i+2].name)}</li>
							</a>
						</div>
					 `
		}
		moves += `</div>`
	}

	moves += `</ul></div>`;
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

async function Capitalize(name) {
	return name[0].toUpperCase() + name.slice(1);
}

getTypeData(url);