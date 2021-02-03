var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "top_songs_db"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("connection complete")
});


function search() {
    inquirer.prompt({
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Search by artist", "Search by song", "Find artists with top song and album", "Search Artists that appear more than once", "Find data within a specific range"],
        name: "input"
    }).then(function(response) {
        switch (response.input) {
            case "Search by artist":
            artistSearch();
            break;

            case "Search by song":
            songSearch();
            break;

            case "Find artists with top song and album":
            songAndAlbumSearch();
            break;

            case "Search Artists that appear more than once":
            multipleSearch();
            break;

            case "Find data within a specific range":
            rangeSearch();
            break;
        }
    })
}

