/**
 * Main entry point of the application
 */
var save = require('save-file');
var jsdom = require("jsdom");
var https = require('https');
var root_url = "https://cantiques.yapper.fr/CV/";

/*
// Fetch home HTML nodes
fetchContent(root_url + "index.html")
	.then((html) => parseHomeContent(html))
	.catch((err) => console.log(err))
*/
// Fetch single HTML nodes
fetchContent(root_url + "CV_002.html")
	.then((html) => parseDetailContent(html))
	.catch((err) => console.log(err))

/**
 * Parse Homepage content
 * and return list of url to crawl
 */
function parseHomeContent(html){
	let {JSDOM} = jsdom;
  let dom = new JSDOM(html);
  let $ = (require('jquery'))(dom.window);

  var items = $('ul.hymnlist li');
  for(var i = 0; i < items.length; i++){
    var innerUrl = $(items[i]).children('a').attr('href');
    console.log(innerUrl);
  }
}

/**
 * Parse Signle content
 * a Javascript object
 * @return JsonObject
 */

function parseDetailContent(html){
	let {JSDOM} = jsdom;
	let dom = new JSDOM(html);
	let $ = (require('jquery'))(dom.window);

	// Handling text formatting and filtering: regex, trim, etc.
	var id, title, verses;
	var content = [];

	// Assign variables
	id 	= $('section#content h1 strong').text().replace(/\./, '').trim();
	title = $('section#content h1').text().replace(/[1-9]\./, '').trim();
	verses = $('section#content .lyrics .verse');
	for(var i = 0; i < verses.length; i++){

		// Get verse lines
		var lines = $(verses[i]).children('.indent0');

		var verse = '';
		for(j= 0; j < lines.length; j++){
			// Append lines
			verse = verse + $(lines[j]).text() + "\n";
		}

		// Add row to array
		content.push((i+1) + ". " +  verse);
  }


	var song = {
		id : id,
		title : title,
		content : content,
	}
	return song;
}

/**
 * Fetching text from url
 * and returning it as a string
 */
function fetchContent(url){
	return new Promise((resolve, reject) => {
		https.get(url, (resp) => {
		  var data = '';

		  // Data is received bit after bit
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  // Data is ready
		  resp.on('end', () => {
				resolve(data);
		  });

			resp.on("error", (err) => {
			  console.log("Error: " + err.message);
				reject();
			});
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
