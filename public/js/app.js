const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');





weatherForm.addEventListener('submit', (event) => {
	event.preventDefault();
	const location = search.value;
	
	messageOne.textContent = 'Finding ...'
	messageTwo.textContent = ''
	
	fetch("https://wdb-mhirj.run-us-west2.goorm.io/weather?address=" + search.value).then((response) =>{ 
		response.json().then((data) => {
			if(data.error) {
				messageOne.textContent = data.error;
			} else {
				messageOne.textContent= data.location;
				messageTwo.textContent= "It is currently " + data.forecast.current + " degrees out, and feels like " + data.forecast.feelsLike + " degrees."
				
			}

		})

	});
})