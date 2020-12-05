const url = "https://pokeapi.co/api/v2/pokemon/";
var data;
async function getapi(url) {
	const response = await fetch(url);
	data = await response.json();
	show(data);
}

async function show(data) {
	console.log(data);
	let content;
	for(var i=0;i<20;i=i+4) {
		content += `<div class="row">`;
		content += await getContent(i,data.results);
		content += `</div>`
	}
	document.getElementById("content").innerHTML = content;
}

async function getContent(index, urls) {
	let innerContent = ``;
	for(var i=0;i<4;i++) {
		console.log(urls[i+index]);
		let dataForOne = await getDataforCurrentPokemon(urls[i+index].url);
		innerContent += `
			<div class="col">
				<div class="card text-center">
					<img class="card-img-top" src="${dataForOne.sprites.front_default}" alt="${dataForOne.name}" />
					<div class="card-body">
						<h5 class="card-title">${dataForOne.id}. ${dataForOne.name[0].toUpperCase()+dataForOne.name.slice(1)}</h5>
						<a href="../seePokemon/seePokemon.html?id=${dataForOne.id}" class="button">See in Detail</a>
					</div>
				</div>
			</div>
		`;
	}
	return innerContent;
}

async function getDataforCurrentPokemon(url) {
	const response = await fetch(url);
	var data = await response.json();
	return data;
}


function nextPage() {
	if(data.next!=null)
		getapi(data.next);
}

function prevPage() {
	if(data.previous!=null)
		getapi(data.previous)
}

getapi(url);
