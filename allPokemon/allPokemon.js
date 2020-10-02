const url = "https://pokeapi.co/api/v2/pokemon/";
var data;
async function getapi(url) {
	const response = await fetch(url);
	data = await response.json();
	show(data);
}

async function show(data) {
	let tab=`<thead class="thead-dark">
				<th scope="col">Pokemon ID</th>
				<th scope="col">Name</th>
				<th scope="col">Image</th>
				<th scope="col">Height</th>
				<th scope="col">Base Experience</th>
				<th scope="col">See in Detail<th>
			</thead>`;
	for(let r of data.results) {
		let dataForOne = await getDataforCurrentSet(r.url);
		tab += dataForOne;
	}
	document.getElementById("table").innerHTML = tab;
}

async function getDataforCurrentSet(url) {
	const response = await fetch(url);
	var data = await response.json();
	//console.log(data);
	return `<tr>
				<th scope="row">${data.id}</th>
				<td>${data.name[0].toUpperCase()+data.name.slice(1)}</td>
				<td><img src="${data.sprites.front_default}" alt="${data.name}" class="img-thumbnail"></td>
				<td>${data.height}</td>
				<td>${data.base_experience}</td>
				<td><a href="../seePokemon/seePokemon.html?id=${data.id}" class="btn">See in Detail</a></td>
			</tr>`
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