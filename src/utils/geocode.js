const request = require('request');


const geocode = (address, callback) => {
	const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZGtyZWpjYXJlayIsImEiOiJjazl5N2R5OWgwczdlM2RudGpranRyd2U0In0.LT75LRFRT2bPEKAYlEI8uw&limit=1'
	
	request({url, json: true}, (error, {body}) => {

		if(error){
			callback('Unable to connect to location services', undefined);
		} else if(body.features.length === 0 ){
			callback('Unable to find location, try again.', undefined);
		} else {
			callback(undefined, {
				latitude: body.features[0].center[1],
				longitude: body.features[0].center[0],
				location: body.features[0].place_name
			})
		}
	})
	
}

module.exports = geocode;



// // **** Geocoding API to tunr location into lat and long **** //
// const coordUrl = 'http://api.mapbox.com/geocoding/v5/mapbox.places/mukwonago.json?access_token=pk.eyJ1IjoiZGtyZWpjYXJlayIsImEiOiJjazl5N2R5OWgwczdlM2RudGpranRyd2U0In0.LT75LRFRT2bPEKAYlEI8uw&limit=1';

// request({ url: coordUrl, json: true}, (error, response) => {
// 	if (error) {
// 		console.log("Unable to connect to Geocoding app");
// 	} else if (response.body.features.length === 0 ){
// 		console.log("Location not found");
// 	} else {
	
// 		const latitude = response.body.features[0].center[1];
// 		const longitude = response.body.features[0].center[0];
// 		console.log(response.body.features[0].place_name)
// 		console.log(latitude + " Latitude");
// 		console.log(longitude + " Longitude");
// 	}

	
// });