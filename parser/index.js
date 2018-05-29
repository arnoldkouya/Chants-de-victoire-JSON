/**
 * Main entry point of the application
 */
var save = require('save-file');
var data = "hello man";
var https = require('https');
var root_url = "https://cantiques.yapper.fr/CV/index.html";






fetchContentFromUrl(root_url);

// Save text to disk file
// saveData(data, './data/data.json')

function fetchContentFromUrl(url){
	https.get(url, (resp) => {
	  var data = '';

		// Build dataset one data after another
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // If data was returned, print the result
	  resp.on('end', () => {
	    console.log(data);
	  });
		// An error occured
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
