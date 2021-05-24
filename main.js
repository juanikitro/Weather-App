const api = {
	key: '267515d1262ed584824fc0f0b5e1e26b',
	url: 'https://api.openweathermap.org/data/2.5/weather',
};

const undraw = document.getElementById('undraw');
const card = document.getElementById('card');
const city = document.getElementById('city');
const date = document.getElementById('date');
const tempImg = document.getElementById('temp-img');
const weather = document.getElementById('weather');
const range = document.getElementById('range');

function updateImage(data) {
	const temp = toCelsius(data.main.temp);
	let src = './img/021-cloudy-1.png';
	if (temp > 25) {
		src = './img/021-summer.png';
	} else if (temp < 20) {
		src = './img/021-winter.png';
	}
	tempImg.src = src;
}

async function search(query) {
	try {
		const response = await fetch(
			`${api.url}?q=${query}&appid=${api.key}&lang=es`
		);
		const data = await response.json();
		undraw.style.display = 'none';
		card.style.display = 'block';

		city.innerHTML = `${data.name}, ${data.sys.country}`;
		data.innerHTML = new Date().toLocaleDateString();
		temp.innerHTML = toCelsius(data.main.temp);
		weather.innerHTML = data.weather[0].description;
		range.innerHTML = `${toCelsius(data.main.temp_min)}ºC / ${toCelsius(
			data.main.temp_max
		)}ºC`;
		updateImage(data);
	} catch (err) {
		console.log(err);
		alert('Hubo un error!');
	}
}

function toCelsius(kelvin) {
	return Math.round(kelvin - 273.15);
}

function onSubmit(event) {
	event.preventDefault();
	search(searchbox.value);
}

const searchform = document.getElementById('search-form');
const searchbox = document.getElementById('searchbox');
searchform.addEventListener('submit', onSubmit, true);
