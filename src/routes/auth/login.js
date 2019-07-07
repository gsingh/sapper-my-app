// import * as api from 'api.js';
const fetch =require('node-fetch');

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
	  return response
	} else {
	  var error = new Error(response.statusText)
	  error.response = response
	  throw error
	}
  }
  
  function parseJSON(response) {
	return response.json()
  }

// export function post(req, res) {
// 	const user = req.body;

	fetch('/authenticate', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		  		},
		body: JSON.stringify({
			"password": "admin",
			"rememberMe": true,
			"username": "admin" 
		})
	  })
	  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
	// api.post('authenticate',  {
	// 	"password": "user",
	// 	"rememberMe": true,
	// 	"username": "user" })
// 		.then(response) => {
// 		if (response.user) req.session.user = response.user;
// 		res.setHeader('Content-Type', 'application/json');

// 		res.end(JSON.stringify(response));
// 	};
// }