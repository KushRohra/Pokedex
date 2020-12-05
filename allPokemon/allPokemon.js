const url = "https://pokeapi.co/api/v2/pokemon/";
var data;
async function getapi(url) {
	const response = await fetch(url);
	data = await response.json();
	show(data);
}

async function show(data) {
	console.log(data)
	let content = `<div class="row">`;
	for(var i=0;i<data.results.length;i++) {
		let dataForOne = await getDataforCurrentSet(data.results[i].url);
		//console.log(dataForOne);
		if(i!=0 & i%4==0) {
			content += `</div><div class="row">`;
		}
		content += `
			<div class="col s3">
				<div class="card addMargin">
					<img src="${dataForOne.sprites.front_default}" alt="${dataForOne.name}">
					<div class="middleAlign">
						<h4><b>${dataForOne.id}. ${dataForOne.name[0].toUpperCase()+dataForOne.name.slice(1)}</b></h4>
						<a href="../seePokemon/seePokemon.html?id=${dataForOne.id}" class="btn">See in Detail</a>
					</div>
				</div>
			</div>
		`;
	}
	console.log(content);
	document.getElementById("content").innerHTML = content;
}

async function getDataforCurrentSet(url) {
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
