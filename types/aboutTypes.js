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

	typeContent += `
					  <div id="damageRelations">
					  	  <h5 class="display-5">Damage from</h5>
					`
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
	typeContent += `</div>`;

	document.getElementById("typeContent").innerHTML = typeContent;
}

async function getDamageFromData(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.double_damage_from.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.double_damage_from[i].url)}" class="badge badge-primary"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.double_damage_from[i].name)}</li></a>`;
	for(var i=0;i<data.damage_relations.half_damage_from.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.half_damage_from[i].url)}" class="badge badge-primary"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.half_damage_from[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
}

async function getDamageToData(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.double_damage_to.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.double_damage_to[i].url)}" class="badge badge-primary"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.double_damage_to[i].name)}</li></a>`;
	for(var i=0;i<data.damage_relations.half_damage_to.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.half_damage_to[i].url)}" class="badge badge-primary"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.half_damage_to[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
}

async function getNoDamageFrom(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.no_damage_from.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.no_damage_from[i].url)}" class="badge badge-primary"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.no_damage_from[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
}

async function getNoDamageTo(data) {
	let returnData = `<ul class="list-group">`;
	for(var i=0;i<data.damage_relations.no_damage_to.length;i++) 
		returnData += `<a href="aboutTypes.html?id=${await getId(data.damage_relations.no_damage_to[i].url)}" class="badge badge-primary"><li class="list-group-item list-group-item-action">${await Capitalize(data.damage_relations.no_damage_to[i].name)}</li></a>`;
	returnData += `</ul>`;
	return returnData;
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