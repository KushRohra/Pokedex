const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

async function getMoveData(id) {
	let url = "https://pokeapi.co/api/v2/move/";
	url += id.toString();
	const response = await fetch(url);
	data = await response.json();
	show(data);
}

async function show(data) {
	let moveData = `
					  <h3 class="display-3">${data.id}. ${await Capitalize(data.name)}</h2>
					  <div id="innerContent">
					  		<p><strong>Accuracy:</strong> ${data.accuracy==null ? 0 : data.accuracy}</p>
					  		<p><strong>Power:</strong> ${data.power==null ? 0 : data.power}</p>
					  		<p><strong>PP:</strong> ${data.pp}</p>
					  		<p><strong>Priority:</strong> ${data.priority}</p>
					  		<p><strong>Move Damage Class:</strong> ${await Capitalize(data.damage_class.name)}</p>
					  		<p><strong>Type of Move:</strong> ${await Capitalize(data.type.name)}</p>
					  </div>
				   `;

	document.getElementById("moveContent").innerHTML = moveData;
}

async function Capitalize(name) {
	return name[0].toUpperCase() + name.slice(1);
}

getMoveData(id);