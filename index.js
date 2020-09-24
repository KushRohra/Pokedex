const url = "https://pokeapi.co/api/v2/pokemon/";
var data;
async function getapi(url) {
	const response = await fetch(url);
	data = await response.json();
	console.log(data);
	show(data);
}

async function show(data) {
	let tab = 
		`<tr>
			<th>Name</th>
			<th>Url</th>
		</tr>`;
	for(let r of data.results) {
		getPokemondata(r.url);
		tab += `<tr>
			<td>${r.name}</td>
			<td>${r.url}</td>
		</tr>`
	}
	document.getElementById("para").innerHTML = tab;
}

async function getPokemondata(url) {
	const response = await fetch(url);
	var data = await response.json();
	//console.log(data);
} 

getapi(url);

function nextPage() {
	getapi(data.next);
}

function prevPage() {
	if(data.previous!=null)
	getapi(data.previous)
}