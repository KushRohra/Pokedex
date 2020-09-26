const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')

async function getBerryData(id) {
	let url = "https://pokeapi.co/api/v2/berry/";
	url += id.toString();
	const response = await fetch(url);
	data = await response.json();
	await show(data);
}

async function show(data) {
	name = data.name[0].toUpperCase() + data.name.slice(1);
	let berryData = `
						<h3 class="display-3">${data.id}. ${name}</h2>
						<div id="berry-detail">
							<p><b>Growth-Time:</b> ${data.growth_time}</p>
							<p><b>Firmness:</b> ${data.firmness.name}</p>
							<p><b>Max-harvest:</b> ${data.max_harvest}</p>
							<p><b>Size:</b> ${data.size}</p>
							<p><b>Smoothness:</b> ${data.smoothness}</p>
							<p><b>Soil Dryness:</b> ${data.soil_dryness}</p>
							<p><b>Natural-Gift Power:</b> ${data.natural_gift_power}</p>
							<p><b>Natural-Gift Type:</b> ${data.natural_gift_type.name}</p>
							<br>
					`;
	berryData += await getFlavours(data);
	berryData += `<div>`;

	document.getElementById("berry").innerHTML = berryData;
}

async function getFlavours(data) {
	let flavours = `<h4 class="display-4">Flavors</h4><div class="list-group" id="flavor">`;
	for(var i=0;i<data.flavors.length;i++) {
		flavour = data.flavors[i].flavor.name;
		flavour = flavour[0].toUpperCase() + flavour.slice(1);
		flavours += `<li class="list-group-item list-group-item-action">${flavour} with potency: ${data.flavors[i].potency}</li>`;
	}
	flavours += `</div><br>`;
	return flavours;
}

getBerryData(id);
