let url = "https://pokeapi.co/api/v2/type/";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

url += id.toString();

async function getTypeData(url) {
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
}

getTypeData(url);