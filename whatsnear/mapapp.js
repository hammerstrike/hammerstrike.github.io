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
	
	//Embed map
	function embedMap(latlng) {
		console.log(latlng);

		map = new google.maps.Map(mapBlock, {
			center: latlng,
			zoom: 20
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

		//map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
		var autocomplete = new google.maps.places.Autocomplete(input);
  		autocomplete.bindTo('bounds', map);


  		autocomplete.addListener('place_changed', function() {
  			infowindow.close();
  			marker.setVisible(false);

  			var place = autocomplete.getPlace();
		    if (!place.geometry) {
		      window.alert("Autocomplete's returned place contains no geometry");
		      return;
		    }

		    // If the place has a geometry, then present it on a map.
		    if (place.geometry.viewport) {
		      map.fitBounds(place.geometry.viewport);
		    } else {
		      map.setCenter(place.geometry.location);
		      map.setZoom(17);  // Why 17? Because it looks good.
		    }
		    marker.setIcon(/** @type {google.maps.Icon} */({
		      url: place.icon,
		      size: new google.maps.Size(71, 71),
		      origin: new google.maps.Point(0, 0),
		      anchor: new google.maps.Point(17, 34),
		      scaledSize: new google.maps.Size(35, 35)
		    }));
		    marker.setPosition(place.geometry.location);
		    marker.setVisible(true);

		    var address = '';
		    if (place.address_components) {
		      address = [
		        (place.address_components[0] && place.address_components[0].short_name || ''),
		        (place.address_components[1] && place.address_components[1].short_name || ''),
		        (place.address_components[2] && place.address_components[2].short_name || '')
		      ].join(' ');
		    }

		    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
		    infowindow.open(map, marker);
  		})

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
