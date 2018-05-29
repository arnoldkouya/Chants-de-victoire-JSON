/**
 * Main entry point of the application
 */
var save = require('save-file');
var jsdom = require("jsdom");
var https = require('https');
var root_url = "https://cantiques.yapper.fr/";

// Fetch home nodes
urlToString(root_url + "CV/index.html");
console.log(homeData);



/**
 * Parse Homepage content
 * and return list of url to crawl
 */
function parseHomeUrl(html){
	let {JSDOM} = jsdom;
  let dom = new JSDOM(html);
  let $ = (require('jquery'))(dom.window);

  var items = $('ul.hymnlist li');
  for(var i = 0; i < items.length; i++){
    var innerUrl = $(items[i]).children('a').attr('href');
    console.log(innerUrl);
  }
}

// saveData(data, './data/data.json')


/**
 * Fetching text from url
 * and returning it as a string
 */
function urlToString(url){
	return new Promise((resolve, reject) => {
		https.get(url, (resp) => {
		  var data = '';

		  // A chunk of data has been recieved.
		  resp.on('data', (chunk) => {
		    data += chunk;
		  });

		  // The whole response has been received. Print out the result.
		  resp.on('end', () => {
				resolve(data();

		  });

			resp.on("error", (err) => {
		  console.log("Error: " + err.message);
			reject();
		});
		});
	}
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
