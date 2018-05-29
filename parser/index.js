/**
 * Main entry point of the application
 */
var save = require('save-file');
var DomParser = require('dom-parser');
var parser = new DomParser();

var data = "hello man";
var https = require('https');
var root_url = "https://cantiques.yapper.fr/CV/index.html";
var songs;

urlToString(root_url).then(function(htmlContent){
	songs = stringToDom(htmlContent).getElementsByClassName('hymnlist li');
	for (var i = 0; i < songs.length; i++){
		console.log(songs[i]);
	};
});

//songs = stringToDom(htmlContent).getElementById('top_header').innerHTML;


// saveData(data, './data/data.json')

/**
 * Convert an HTML string string
 * into a Dom tree
 */
function stringToDom(htmlString){
	return parser
		.parseFromString(htmlString);
}
/**
 * Fetching text from url
 * and returning it as a string
 */
function urlToString(url){
	return new Promise(function(resolve, reject) {
		https.get(url, (resp) => {
		  var data = '';

			// Build dataset one data after another
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  // If data was returned, print the result
		  resp.on('end', () => {
				resolve(data);
		  });
			// An error occured
		}).on("error", (err) => {
		  reject(false);
		});
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
