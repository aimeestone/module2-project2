var map;

function startMap() {
	console.log('ici');
	const plant = {
		lat: 48.862058,
		lng: 2.347173
	};
	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 15,
		center: plant
	});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				const user_location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				map.setCenter(user_location);
			},
			function() {
				console.log('Error in the geolocation service.');
			}
		);
	} else {
		console.log('Browser does not support geolocation.');
	}
	getGardenCenter();
}

function getGardenCenter() {
	axios
		.get('/map/api')
		.then((response) => {
			console.log(response);
			placeGardenCenter(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
}

function placeGardenCenter(gardenCenter) {
	gardenCenter.forEach(function(center) {
		const centerMap = {
			lat: center.lat,
			lng: center.long
		};
		var content = `<div id="content">
    <h3 class="title_marker">${center.name}</h3><br>
    <p class="adresse"><b>Adresse: </b>${center.adresse}</p>
		</div>`;

		var infowindow = new google.maps.InfoWindow({
			content: content
		});
		const pin = new google.maps.Marker({
			position: centerMap,
			map: map,
			title: center.name
		});

		console.log('---------------------- oi');

		pin.addListener('click', function handleClick() {
			console.log('clicked');
			infowindow.open(map, pin);
		});

		console.log(pin, infowindow);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	startMap();
});
