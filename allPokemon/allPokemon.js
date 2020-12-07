var data;

async function getapi() {
	var url = "https://pokeapi.co/api/v2/pokemon/";
	var response = await fetch(url);
	data = await response.json();
	var page = parseInt(sessionStorage.getItem("page"));
	while(page>0) {
		url = data.next;
		response = await fetch(url);
		data = await response.json();
		page -= 1;
	}
	show(data);
}

async function show(data) {
	let content = ``;
	for(var i=0;i<20;i=i+4) {
		content += `<div class="row">`;
		content += await getContent(i,data.results);
		content += `</div>`;
	}
	document.getElementById("content").innerHTML = content;
}

async function getContent(index, urls) {
	let innerContent = ``;
	for(var i=0;i<4;i++) {
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
	if(data.next!=null) {
		var pageCount = parseInt(sessionStorage.getItem("page")) + 1;
		sessionStorage.setItem("page", pageCount);
		getapi(data.next);
	}
}

function prevPage() {
	if(data.previous!=null) {
		var pageCount = parseInt(sessionStorage.getItem("page")) - 1;
		sessionStorage.setItem("page", pageCount);
		getapi(data.previous);
	}
}

getapi();
