require("dotenv").config();

var keys = require("./keys.js");
var moment = require("moment");
var axios = require("axios");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Spotify = new Spotify(keys.spotify);
var divider = "\n------------------------------------------------\n";

var search = process.argv[2];
var term = process.argv.slice(3).join(" ");

function liriBot() {
    switch (search) {
      case "concert-this":
        console.log("Searching for Your Concert \n----------------------");
        concertThis();
        break;
      case "spotify-this":
        console.log("Searching for Your Song \n----------------------");
        spotifyThis();
        break;
      case "movie-this":
      console.log("Searching for Your Movie \n----------------------");        
        movieThis();
        break;
      case "do-what-it-says":
      console.log("Searching for Your Stuff \n----------------------");
        fileInfo();
        break;
      default:
        console.log("invalid command please try again");
    }
  }


//   concert search

function concertThis() {
    var artist = term
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios
        .get(queryURL)
        .then(function(response){
            var concertInfo = response.data
            for (var i = 0; i < response.data.length; i++) {
                console.log("Venue name: " + concertInfo[i].venue.name)
                console.log("City: " + concertInfo[i].venue.city)
                console.log("Concert Date: " + moment(concertInfo[i].datetime).format("MM/DD/YYYY"))
        } })
        fs.appendFile("log.txt",+ this.concertInfo + divider , function(err) {
            if (err) throw err;
          });

        };

// Spotify search
function spotifyThis() {
    var tracks = term;

    if (tracks === "") { 
        tracks = "uproar";}

    Spotify
        .search({ type: 'track', query: tracks })
        .then(function(response) {
        console.log(("Artist: ") + response.tracks.items[0].artists[0].name);
        console.log(("Song: ") + response.tracks.items[0].name);
        console.log(("Album Title: ") + response.tracks.items[0].album.name);
        })
        .catch(function(err) {
            console.log(err);
        });

        fs.appendFile("log.txt", "\n" +  search + "\n" + tracks + divider, function(err) {
            if (err) throw err;
         });
        };

// Do whatever

function fileInfo(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
          var filedata = data.split(",")
          var  dataArr = filedata[1].replace(/"/g,'');
  

      if (filedata[0] === "spotify-this") {
        spotifyThis(song = grabName);

      } else if (filedata[0] === "movie-this") {
        movieThis(movie = grabName);

      } else if (filedata[0] === "concert-this") {
        concertThis(artist = grabName);
      }; 

      if (error) {
        return console.log(error);
      }; 

})};

liriBot();



