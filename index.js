const url = "https://pokeapi.co/api/v2/pokemon/";
var data;
async function getapi(url) {
	const response = await fetch(url);
	data = await response.json();
	//console.log(data);
	show(data);
}

async function show(data) {
	let tab=`<tr>
				<th>Pokemon ID</th>
				<th>Name</th>
				<th>Image</th>
				<th>Height</th>
				<th>Base Experience</th>
				<th>See in Detail<th>
			</tr>`;
	for(let r of data.results) {
		let dataForOne = await getDataforCurrentSet(r.url);
		tab += dataForOne;
	}
	document.getElementById("para").innerHTML = tab;
}

async function getDataforCurrentSet(url) {
	const response = await fetch(url);
	var data = await response.json();
	//console.log(data);
	return `<tr>
				<td>${data.id}</td>
				<td>${data.name}</td>
				<td><img src="${data.sprites.front_default}"></td>
				<td>${data.height}</td>
				<td>${data.base_experience}</td>
				<td><a href="seePokemon.html?id=${data.id}"><button>See in Detail</button></a></td>
			</tr>`
} 

function nextPage() {
	getapi(data.next);
}

function prevPage() {
	if(data.previous!=null)
	getapi(data.previous)
}

getapi(url);