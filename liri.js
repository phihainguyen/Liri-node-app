const chalk = require('chalk');
const fs = require('fs');
//=============spotify search==================//
function searchSong() {
    var song = readArgs();
    var requireVar = require("dotenv").config();
    var keys = require("./keys.js");
    // var Spotify = require('node-spotify-api');

    if (song === "") {
        song = "hotel california"
    }

    var Spotify = require('node-spotify-api');

    var spotify = new Spotify(keys.spotify);
    //=======gets artists name for song======//
    var getArtistsName = function (artist) {
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
                
                console.log(chalk.blue("Title: ") + chalk.red(songs[i].name));
                console.log(chalk.blue("Artists: ") + chalk.red(songs[i].artists.map(getArtistsName)));
                console.log(chalk.blue("Preview of Song: ") + chalk.red(songs[i].preview_url));
                console.log(chalk.blue("Album Name: ") + chalk.red(songs[i].album.name));
                console.log('\n')

            }
        })
        .catch(function (err) {
            console.log(err);
        });
}
//===================Do-whatever it says====================//
function doItSong() {

    var requireVar = require("dotenv").config();
    var keys = require("./keys.js");
    // var Spotify = require('node-spotify-api');

    if (nodeArgs[2] === "do-what-it-says") {
        fs.readFile("random.txt", "utf8", function (err, data) {
            if (err) {
                return console.log(err);
            }

            console.log(data);
            var doIt = data.split(",")
            for (let i = 0; i < doIt.length; i++) {

                console.log(doIt[i])
                var itSong = doIt[i];
            };


            var Spotify = require('node-spotify-api');

            var spotify = new Spotify(keys.spotify);
            //=======gets artists name for song======//
            var getArtistsName = function (artist) {
                return artist.name
            }
            spotify
                .search({ type: 'track', query: itSong })
                .then(function (response) {
                    // console.log(response.tracks)
                    //   console.log( response.tracks.item)
                    var songs = response.tracks.items
                    for (let i = 0; i < songs.length; i++) {
                        //   const element = info[i];
                        console.log(chalk.blue("Title: ") + chalk.red(songs[i].name));
                        console.log(chalk.blue("Artists: ") + chalk.red(songs[i].artists.map(getArtistsName)));
                        console.log(chalk.blue("Preview of Song: ") + chalk.red(songs[i].preview_url));
                        console.log(chalk.blue("Album Name: ") + chalk.red(songs[i].album.name));
                        console.log('\n')

                    }
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
        )
    }
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
} else if (nodeArgs[2] === "do-what-it-says") {
    doItSong();
}

// Create an empty variable for holding the movie name
function searchMovie() {
    var movieName = readArgs();
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s


    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    // console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            //console.log(response.data)

            console.log('\n')
            console.log(chalk.blue("Movie title: ") + chalk.red(response.data.Title));
            console.log(chalk.blue("Release Year: ") + chalk.red(response.data.Year));
            console.log(chalk.blue("IMDB Rating of the movie is: ") + chalk.red(response.data.imdbRating));
            console.log(chalk.blue("Movie was produced in: ") + chalk.red(response.data.Country));
            console.log(chalk.blue("Language of the movie is in: ") + chalk.red(response.data.Language));
            console.log(chalk.blue("Plot of the movie is about: ") + chalk.red(response.data.Plot));
            console.log(chalk.blue("Actors in the movie: ") + chalk.red(response.data.Actors));

            for (const i in response.data.Ratings) {
                if (response.data.Ratings.hasOwnProperty(i)) {
                    console.log(chalk.blue("Rotten Tomatoes Rating of the movie is: ") + chalk.red(response.data.Ratings[1].Value))
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
                console.log(chalk.blue("Venue: ") + chalk.red(concert.venue.name));
                console.log(chalk.blue("Concert Date and Time: ") + chalk.red(concert.datetime));
                console.log(chalk.blue("Country: ") + chalk.red(concert.venue.country));
                console.log(chalk.blue("City: ") + chalk.red(concert.venue.city));
                console.log('\n')

            }
        }
    );

}

