const url = "https://pokeapi.co/api/v2/generation";

async function getGames(url) {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
	show(data);
}

async function show(data) {
	let gameData = `
						<table class="table table-bordered table-hover">
						<thead class="thead-dark">
							<th scope="col">Game ID</th>
							<th scope="col">Name</th>
							<th scope="col">Link</th>
						</thead>
					`;
	for(var i=0;i<data.results.length;i++) {
		name = data.results[i].name;
		name = name[0].toUpperCase() + name.slice(1);
		gameData += `
						<tbody>
							<th scope="row">${i+1}</th>
							<td>${name}</td>
							<td><a class="badge badge-primary" href="aboutGame.html?id=${i+1}"><button class="btn btn-primary">See more details about the Game</button></a></td>
						</tbody>
					`
	}
	gameData += `</table>`;
	document.getElementById("gameTable").innerHTML = gameData;
}

getGames(url);