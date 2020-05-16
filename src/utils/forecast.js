const request = require('request');

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
	const url = 'http://api.weatherstack.com/current?access_key=49ce90c20320534e4865f0ae95ce305a&query=' + latitude + ',' + longitude + '&units=f';
	
	request({ url, json: true}, (error, { body }) => {
		if(error){
			callback("Unable to connect to weather service", undefined);
		} else if(body.error){
			callback("Unable to find location", undefined);
		} else {
		callback(undefined, {
				current: body.current.temperature,
				 feelsLike: body.current.feelslike 
			});
		}
	});


}



module.exports = forecast;





// const url = 'http://api.weatherstack.com/current?access_key=49ce90c20320534e4865f0ae95ce305a&query=37.8267,-122.4233&units=f';

// request({ url: url, json: true}, (error, response) => {
	
// 	if(error){
// 		console.log("Unable to connect to weather service");
// 	} else if(response.body.error){
// 		console.log("Unable to find location");
// 	} else {
// 		const current = response.body.current;
// 	console.log("It is currently " + current.temperature + " degrees out.  It feels like " +  current.feelslike + " degrees out.");
// 	}
	
// });