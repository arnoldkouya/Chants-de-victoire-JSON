/**
 * Main entry point of the application
 */
var save = require('save-file');
var data = "hello man";
var https = require('https');
var root_url = "https://cantiques.yapper.fr/CV/index.html";






//
// Save text to disk file
// saveData(data, './data/data.json')

function fetchContentFromUrl(url){
	https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {
	    console.log(JSON.parse(data).explanation);
	  });

	}).on("error", (err) => {
	  console.log("Error: " + err.message);
	});

}

/**
 * Standalone function for
 * writting text to disk
 */
function saveData(data, path){
	save(data, path, (err, data) => {
	    if (err) throw err;

	})
}
