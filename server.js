var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "top_songs_db",
});

connection.connect(function (err) {
  if (err) throw err;
  search();
});

function search() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Search by artist",
        "Search by song",
        "Find artists with top song and album",
        "Search Artists that appear more than once",
        "Find data within a specific range",
      ],
      name: "input",
    })
    .then(function (response) {
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
    });
}

function artistSearch() {
  inquirer
    .prompt({
      type: "input",
      message: "What aritist would you like to search?",
      name: "artist",
    })
    .then(function (response) {
      var query = "SELECT position, song, year FROM top_songs WHERE ?";
      connection.query(query, { artist: response.artist }, function (err, res) {
        for (let i = 0; i < res.length; i++) {
          console.log(
            "Position: " +
              res[i].position +
              " || Song: " +
              res[i].song +
              " || Year: " +
              res[i].year
          );
        }
        search();
      });
    });
}

function songSearch() {
  inquirer
    .prompt({
      type: "input",
      message: "What song would you like to search?",
      name: "song",
    })
    .then(function (response) {
      connection.query(
        "SELECT * FROM top_songs WHERE ?",
        { song: response.song },
        function (err, res) {
          if (err) throw err;
          if (!res[0]) {
            console.log("Nothing Found");
          } else {
            console.log(
              "Position: " +
                res[0].position +
                " || Song: " +
                res[0].song +
                " || Artist: " +
                res[0].artist +
                " || Year: " +
                res[0].year
            );
          }
          search();
        }
      );
    });
}

function songAndAlbumSearch() {
  inquirer
    .prompt({
      type: "input",
      message: "What artist would you like to search for?",
      name: "artist",
    })
    .then(function (response) {
      var query =
        "SELECT top_albums.year, top_albums.album, top_albums.position, top_songs.song, top_songs.artist FROM top_albums INNER JOIN top_songs ON (top_albums.artist = top_songs.artist AND top_albums.year = top_songs.year) WHERE (top_albums.artist = ? AND top_songs.artist = ?) ORDER BY top_albums.year, top_albums.position";
      connection.query(
        query,
        [response.artist, response.artist],
        function (err, res) {
          if (err) throw err;
          if (!res[0]) {
            console.log("Nothing Found");
          } else {
            for (let i = 0; i < res.length; i++) {
              console.log(
                i +
                  1 +
                  ".) " +
                  "Year: " +
                  res[i].year +
                  " Album Position: " +
                  res[i].position +
                  " || Artist: " +
                  res[i].artist +
                  " || Song: " +
                  res[i].song +
                  " || Album: " +
                  res[i].album
              );
            }
          }

          search();
        }
      );
    });
}


function multipleSearch() {
    connection.query("SELECT artist FROM top_songs GROUP BY artist HAVING count(*) > 1", function(err,res) {
        if(err) throw err;
        for (let i = 0; i < res.length; i++) {
            console.log(res[i].artist)
        }
        search();
    })
};


