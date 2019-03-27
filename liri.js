const fs = require('fs');
function searchSong() {
    var song = readArgs();
    var requireVar = require("dotenv").config();
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');




    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);
var getArtistsName = function(artist){
    return artist.name
}
    spotify
        .search({ type: 'track', query: song })
        .then(function (response) {
            // console.log(response.tracks)
        //   console.log( response.tracks.item)
          var songs = response.tracks.items
          for (let i = 0; i < songs.length; i++) {
            //   const element = info[i];
              console.log(songs[i].name);
              
              console.log(songs[i].artists.map(getArtistsName))
              console.log(songs[i].preview_url)
              console.log(songs[i].album.name)
          }
        })
      .catch(function(err) {
        console.log(err);
      });
}

// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");

// Store all of the arguments in an array
var nodeArgs = process.argv;

if (nodeArgs[2] === "movie-this") {
    searchMovie();
} else if (nodeArgs[2] === "concert-this") {
    searchConcerts();
} else if (nodeArgs[2] === "spotify-this-song") {
    searchSong();
} else if (nodeArgs[2]=== "do-what-it-says") {
    fs.readFile('./random.txt', function read(err, data) {
        if (err) {
            throw err;
        }
})

// Create an empty variable for holding the movie name
function searchMovie() {
    var movieName = readArgs();
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s


    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data)


            console.log("Movie title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating of the movie is: " + response.data.imdbRating);
            console.log("Movie was produced in: " + response.data.Country);
            console.log("Language of the movie is in: " + response.data.Language);
            console.log("Plot of the movie is about: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);

            for (const i in response.data.Ratings) {
                if (response.data.Ratings.hasOwnProperty(i)) {
                    console.log("Rotten Tomatoes Rating of the movie is: " + response.data.Ratings[1].Value)
                    break
                }
            }

        }
    );
}

function readArgs() {
    var liriSearch = "";

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3) {
            liriSearch = liriSearch + "+" + nodeArgs[i];
        }
        else {
            liriSearch += nodeArgs[i];
        }
    }
    return liriSearch
}


function searchConcerts() {
    var artist = readArgs();

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log(response.data);
            for (var concert of response.data) {
                console.log(concert.venue.name)
                console.log(concert.datetime)
                console.log(concert.venue.country)
                console.log(concert.venue.city)
            }
        }
    );

}

