/**
 * Main entry point of the application
 */
var save = require('save-file');
var data = "hello man";
var root_url = "https://cantiques.yapper.fr/CV/index.html";


// Save text to disk file
saveData(data, './data/data.json')


/**
 * Standalone function for
 * writting text to disk
 */
function saveData(data, path){
	save(data, path, (err, data) => {
	    if (err) throw err;

	})
}
