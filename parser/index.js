/**
 * Main entry point of the application
 */ 
var save = require('save-file');
var data = "hello man";
var root_url = "https://cantiques.yapper.fr/CV/index.html";


save(data, '/data/test.json', (err, data) => {
    if (err) throw err;
 	
})



