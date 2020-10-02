let url = "https://pokeapi.co/api/v2/move/";
var data;

async function getMoveData(url) {
	const response = await fetch(url);
	data = await response.json();
	show(data);
}

async function show(data) {
	let content = `
					<thead class="thead-dark">
						<th scope="row">Move Id</th>
						<th scope="row">Move Name</th>
						<th scope="row">Link  to detailed description</th>
					</thead>
				  `;

	for(var i=0;i<data.results.length;i++) {
		id = await getId(data.results[i].url);
		content += `
					 <tr>
					 	<th scope="row">${id}</th>
					 	<td>${await Capitalize(data.results[i].name)}</td>
					 	<td><a class="btn" href="./aboutMove.html?id=${id}">See in Detail</a></td>
					 </tr>
				   `;
	}
	hello = 0;
	document.getElementById("moveTable").innerHTML = content;
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

function nextPage() {
	if(data.next!=null)
		getMoveData(data.next);
}

function prevPage() {
	if(data.previous!=null)
		getMoveData(data.previous)
}

getMoveData(url);