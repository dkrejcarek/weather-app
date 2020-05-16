const express = require('express'),
	  app = express(),
	  path = require('path'),
	  hbs = require('hbs');

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, "../templates/partials");

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

app.use(express.static(publicDirectoryPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);



app.get("/", (req, res) => {
	res.render('index', {title: 'Weather App', name: 'David Krejcarek'});
})

app.get("/about", (req, res) => {
	res.render('about', {
		title: 'About Me',
		name: 'David Krejcarek'
	});
});

app.get("/help", (req, res) => {
	res.render('help', {
		title: "Help Page",
		message: "Here is a list of common issues",
		name: 'David Krejcarek'
	})
})
app.get("/weather", (req, res) => {
	if(!req.query.address){
		return res.send({
			error: 'You need to submit an address'
		})
	}
	
	geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
		if(error){
			return res.send({
			error: 'Address not found.  Please try again.'
			})
		}			
	
		forecast(latitude, longitude, (error, forecastData) => {
			if(error){
				return res.send({
					error: "Couldn't locate weather data. Please try again"
					});
			}

			res.send({
					title: 'Weather',
					location,
					forecast: forecastData,
					address: req.query.address,
					name: 'David Krejcarek'
		
					});
		});
		
	});	
	
});

app.get("/help/*", (req, res) => {
	res.render('404',{
		title: '404 Help',
		message: "Help article not found",
		name: 'David Krejcarek'
	});
});

app.get("*", (req, res) => {
	res.render('404',{
		title: '404',
		message: "Page not found",
		name: 'David Krejcarek'
	});
});


app.listen(3000, () => {
	console.log("App has Started");
});