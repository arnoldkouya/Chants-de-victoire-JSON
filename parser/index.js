/**
 * Main entry point of the application
 */
var save = require('save-file');
var DOMParser = require('xmldom').DOMParser;
var data = "hello man";
var https = require('https');
var root_url = "https://cantiques.yapper.fr/CV/index.html";


var songs = stringToDom(urlToString(root_url)).getElementsByClassName('hymnlist');
songs.forEach(function(song){
	console.log(song);
});

urlToString(root_url);

// saveData(data, './data/data.json')

/**
 * Convert an HTML string string
 * into a Dom tree
 */
function stringToDom(htmlString){
	return new DOMParser()
		.parseFromString(htmlString, 'text/html')
		.body.childNodes;
}
/**
 * Fetching text from url
 * and returning it as a string
 */
function urlToString(url){
	https.get(url, (resp) => {
	  var data = '';

		// Build dataset one data after another
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // If data was returned, print the result
	  resp.on('end', () => {
	    return data;
	  });
		// An error occured
	}).on("error", (err) => {
	  return false;
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
