const url = "https://pokeapi.co/api/v2/berry/";
var data;

async function getBerries(url) {
	const response = await fetch(url);
	data = await response.json();
	show(data);
}

async function show(data) {
	let i=0;
	let tab=`<thead class="thead-dark">
				<th scope="col">Berry ID</th>
				<th scope="col">Name of Berry</th>
				<th scope="col">See in Detail<th>
			</thead>`;
	for(let r of data.results) {
		let id = await getId(r.url);
		let row = `
				  	<tr>
					<th scope="row">${id}</th>
					<td>${r.name[0].toUpperCase()+r.name.slice(1)}</td>
					<td><a href="../seeBerry/seeBerry.html?id=${id}" class="badge badge-primary"><button class="btn btn-primary">See in Detail</button></a></td>
					</tr>
				  `;
		tab += row;
		i++;
	}
	document.getElementById("table").innerHTML = tab;
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

function nextPage() {
	if(data.next!=null)
		getBerries(data.next);
}

function prevPage() {
	if(data.previous!=null)
		getBerries(data.previous)
}

getBerries(url);