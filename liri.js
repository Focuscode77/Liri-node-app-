require("dotenv").config();
// read and set any environment variables with the dotenv package:

// Imported files /variables 
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var searchType = process.argv.splice(3).join();


// If else Statments
// ombd
 if (input === 'movie-this') {
  movieThis(searchType);
}
// Spotify
else if (input === 'spotify-this-song') {
  spotifyTrack(searchType);
}

// bands
else if (input === 'concert-this') {
  concertThis(searchType);

}

// Spotify Function

function spotifyTrack(track) {

  spotify.search({ type: 'track', query: track }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }


    var newData = data.tracks;
    console.log(newData);

    for (var i = 0; i < 5; i++) {
      //    Array of values for spotify
      var trackInfo = [
        "/nArtist:" + newData.items[i].artists[0].name,
        "/nTrack Name:" + newData.items[i].name,
        "/nAlbum Name:" + newData.items[i].album.name,
        "/nPreview Track:" + newData.items[i].preview_url,

      ]
      // test debug
      console.log(trackInfo);
      // fs and print to random text
      fs.writeFile("random.txt", trackInfo, function (err) {

        if (err) {
          return console.log(err);
        }
        // Test/debug
        console.log("Sucess");
        console.log(trackInfo);
      })

    }
  });

}

// OMBD FUNCTION
function movieThis(movie) {

  var movieQuery = movie || "Mr.Nobody"

  axios.get("http://www.omdbapi.com/?t=" + movieQuery + "&y=2019&apikey=fba168ed").then(function (response) {
    // handle success

    var jsonData = response.data;

    // conditional statement
    if (jsonData.title != undefined) {
      console.log("keep trying");
    }
    else {

    }

    var movieData = [

      'Title:' + jsonData.Title,
      'Year:' + jsonData.Year,
      'imbd Rating:' + jsonData.imdbRating,
      'Country' + jsonData.Country,
      'Language' + jsonData.Language,
      'Plot' + jsonData.Plot,
      'Cast' + jsonData.Actors,
    ]
    fs.writeFile("random.txt", movieData, function (err) {

      if (err) {
        return console.log(err);
      }
      // Test/debug
      console.log("Sucess");
      console.log(movieData);
    })
  });

};

// Bands Function
function  concertThis(concert) {

  var concertQuery = concert || "'The Sign' by Ace of Base."

  axios.get("https://rest.bandsintown.com/artists/" + concertQuery + "/events?app_id=codingbootcamp").then(function (response) {
    // handle success

    var jsonData = response.data;

    // conditional statement
    for (var i = 0; i < jsonData.length; i++) {

      var concertFind = [

        '/nVenua Name:' + jsonData[i].venue.name,
        '/nLocation:' + jsonData[i].venue.city,
        // 'Date of Concert:' + moment(jsonData[i].datetime).format("L"),

      ].join("/n/n")

      fs.appendFile("log.txt", concertFind, function (err) {

        if (err) {
          return console.log(err);
        }
        // Test/debug
        console.log("Sucess");
        console.log(concertFind);



      })




    };


  });


};