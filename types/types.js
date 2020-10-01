const url = "https://pokeapi.co/api/v2/type/";

async function getTypes(url) {
	const resposne = await fetch(url);
	const data = await resposne.json();
	show(data);
}

async function show(data) {
	let typesContent = `
							<table class="table table-hover table-bordered">
								<thead class="thead-dark">
									<th scope="col">Types ID</th>
									<th scope="col">Name of Types</th>
									<th scope="col">Link</th>
								</thead>
						`;
	for(var i=0;i<data.results.length;i++) {
		typesContent += `
							<tbody>
								<th scope="row">${i+1}</th>
								<td>${await Capitalize(data.results[i].name)}</td>
								<td><a href="aboutTypes.html?id=${await getId(data.results[i].url)}" class="btn">See in Detail</a></td>
							</tbody>
						`
	}
	typesContent += `</table>`;

	document.getElementById("typesContent").innerHTML = typesContent;
}

async function Capitalize(name) {
	return name[0].toUpperCase() + name.slice(1);
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

getTypes(url);