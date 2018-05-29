/**
 * Main entry point of the application
 */
var save = require('save-file');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var $ = require("jquery");


var data = "hello man";
var https = require('https');
var root_url = "https://cantiques.yapper.fr/CV/index.html";
var songs;

urlToString(root_url).then(function(htmlContent){
	songs = stringToDom(htmlContent).querySelector(".hymnlist li");
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
	return htmlString.serialize().window.document;
}
/**
 * Fetching text from url
 * and returning it as a string
 */
function urlToString(url){
	return JSDOM.fromURL(url);
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
