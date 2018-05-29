/**
 * Main entry point of the application
 */
var save = require('save-file');
var jsdom = require("jsdom");
var https = require('https');
var root_url = "https://cantiques.yapper.fr/CV/index.html";

/**
 * Parse Homepage content
 * and return list of url to crawl
 */
function parseHomeUrl(html){
	let {JSDOM} = jsdom;
  let dom = new JSDOM(html);
  let $ = (require('jquery'))(dom.window);
	/*
	var parsedData = $.parseHTML(data);
	var songs = $(data).filter("li"); */
	//let's start extracting the data
  var items = $("ul.hymnlist li");
  for(var i = 0; i < items.length; i++){
    var innerUrl = $(items[i]).children('a').attr("href");
    console.log(innerUrl);
  }
}

// saveData(data, './data/data.json')


/**
 * Fetching text from url
 * and returning it as a string
 */
function urlToString(url){
	https.get(url, (resp) => {
	  let data = '';

	  // A chunk of data has been recieved.
	  resp.on('data', (chunk) => {
	    data += chunk;
	  });

	  // The whole response has been received. Print out the result.
	  resp.on('end', () => {

			return data;

	  });

		resp.on("error", (err) => {
	  console.log("Error: " + err.message);
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
