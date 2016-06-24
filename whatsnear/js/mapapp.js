$(document).ready(function () {

	var map,
		infowindow,
		myLocation,
		map, 
		marker,
		mapBlock = $('#map')[0],
		input = document.getElementById("pac-input");
	
	var url = window.location.hash;
	var hash = url.substring(url.indexOf("#")+1);
	
	//Check for Browser support
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function (position) {			
			myLocation = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			embedMap(myLocation);
		});
	} else {
		mapBlock.text('Your browser is out of fashion, there\'s no geolocation!');
	};
	
	$(window).hashchange( function(){
		hash = location.hash;
		embedMap(latlng);
	});
	
	//Embed map
	function embedMap(latlng) {
		console.log(latlng);

		map = new google.maps.Map(mapBlock, {
			center: latlng,
			zoom: 15
		});

		infowindow = new google.maps.InfoWindow();
		var marker = new google.maps.Marker({
		    map: map,
		    anchorPoint: new google.maps.Point(0, -29)
		  });

		var service = new google.maps.places.PlacesService(map);
		service.nearbySearch({
			location: latlng,
			radius: 500,
			types: [hash]
		}, callback);
	};
	
	function callback(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
			}
		}
	}

	function createMarker(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location,
			animation: google.maps.Animation.DROP
		});

		google.maps.event.addListener(marker, 'click', function () {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});
	}
	
	
});
