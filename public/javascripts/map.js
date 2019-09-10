var map;

function startMap() {
	console.log('ici');
	const plant = {
		lat: 48.852633,
		lng: 2.388308
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
		.get('http://localhost:3000/map/api')
		.then((response) => {
			console.log(response);
			placeGardenCenter(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
}

var markers = [];
// markers.forEach((marker) => {
// 	marker.onclick = () => {
// 		console.log('clicked');
// 		infowindow.open(map, pin);
// 	};
// });

function placeGardenCenter(gardenCenter) {
	gardenCenter.forEach(function(center) {
		const centerMap = {
			lat: center.lat,
			lng: center.long
		};
		var content = `<div id="content">
    <h4 id="firstHeading" class="firstHeading">${center.name}</h4><br>+
    <p><b>Adresse: </b>${center.adresse}</p>+
    </div>`;
		var infowindow = new google.maps.InfoWindow({
			content: content
		});
		const pin = new google.maps.Marker({
			position: centerMap,
			map: map,
			title: center.name
		});
		markers.push(pin);
		markers.forEach((marker) => {
			marker.onclick = function() {
				console.log('clicked');
				infowindow.open(map, markers);
			};
		});
	});
}

document.addEventListener('DOMContentLoaded', () => {
	startMap();
	// getGardenCenter();
});
