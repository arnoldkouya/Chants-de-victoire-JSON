/**
 * Author: Samuel Guebo (@samuelguebo)
 * Description: Main entry point of the application
 * License: MIT
 */

var save = require('save-file');
var jsdom = require("jsdom");
var https = require('https');
var root_url = "https://cantiques.yapper.fr";
var dataset = [];

// Fetch HTML nodes in homepage
fetchContent(root_url + "/CV/index.html")
	.then((html) => parseHomeContent(html))

	// Process sublinks
	.then(
		links => {
			Promise.all(links.map(link =>
				fetchContent(root_url + link)
					.then(html=> parseDetailContent(html))
					.then(song => dataset.push(song))
				)
			)
			// Save dataset to file
			.then(
				data => {

					saveData(JSON.stringify(dataset), "./data/data.json")
				}
			);
		}
	);

/**
 * Parse Homepage content
 * and return list of url to crawl
 *
 * @var html, url to fetch as String
 * @return a Promise containing Javascript array (links)
 */
function parseHomeContent(html){
	let {JSDOM} = jsdom;
  let dom = new JSDOM(html);
  let $ = (require('jquery'))(dom.window);

	var items = [];
  items = $('ul.hymnlist li a').each((i) => items.push($(items[i]).attr("href")));
	items = $.makeArray(items); // converting into Javascript array
	items = items.slice(1,20);
	return new Promise((resolve, reject) => resolve(items));
}

/**
 * Parse single page content
 *
 * @var html, a raw Html text
 * @return a Promise containing a JsonObject
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

	// Build Song object
	var song = {
		id : id,
		title : title,
		content : content,
	}
	return new Promise((resolve, reject) => resolve(song));
}

/**
 * Fetching text from url
 *
 * @var html, url to fetch as String
 * @return a Promise containing HTML text
 *
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
 * Write text to disk
 * at a specifc location
 *
 * @var data, arbitrary String
 * @var path, location of file
 * @return void
 */
function saveData(data, path){
	save(data, path, (err, data) => {
	    if (err) throw err;

	})
}

/**
 * Sort array by Id
 *
 * @var array, original array
 * @var key, sorting criteria
 * @return Javascript array
 */
function sortArrayBy(arra, key){
	return data.sort(function (a, b) {
			return a.id.localeCompare(b.id);
	});

}
