require("dotenv").config();

var axios = require("axios");

var keys = require("./keys.js");

var fs = require("fs")

var Spotify = require('node-spotify-api');


// Figure out which function to call. Couldhave use if statements as well

var action = process.argv[2];

var otherAction = process.argv.slice(3).join(" ");



switch (action) {
    case 'spotify-this-song':
        spotifyAPI();
        break;
    case 'movie-this':
        movieAPI()
        break;
    case 'concert-this':
        concertAPI()
        break;
    case 'do-what-it-says':
        allOther()
        break;
    default:
        console.log("Please put in a valid value")

}




// use the bands api
function concertAPI() {
    if (!otherAction) { return console.log('Please put in a valid Band Name to Search')  }

    axios.get("https://rest.bandsintown.com/artists/" + otherAction + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(response.data[0]);
    }
    ).catch(function (error) {
        console.log(error)
    });
}


// movie api

function movieAPI() {
    if(!otherAction){
        otherAction = 'Mr.Nobody'
    }
    console.log(otherAction)
    axios.get("http://www.omdbapi.com/?t=" + otherAction + "&y=&plot=short&apikey=trilogy").then(function (response) {
        console.log(response.data.Title);
        console.log(response.data.Year);
        console.log(response.data.Rated);
        console.log(response.data.Ratings[0].Value);
        console.log(response.data.Ratings[1].Value);
        console.log(response.data.Country);
        console.log(response.data.Language);
        console.log(response.data.Plot);
        console.log(response.data.Actors);
        console.log(response.data)
    }).catch(function (error) {
        console.log(error)
    })
}


// spotify api
function spotifyAPI() {
    if (!otherAction){ otherAction = 'The Sign' }
    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: otherAction }, function (err, data) {
        if (err) {
            return console.log('Error occured:' + err);
        }
        console.log(data.tracks.items[0].artists[0].name)
        console.log(data.tracks.items[0].name)
        console.log(data.tracks.items[0].href)
        console.log(data.tracks.items[0].album.name)
    });
}

function allOther() {
    fs.readFile("./random.txt", "utf-8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var parsed = data.split(",")
        action = parsed[0]
        otherAction = parsed[1]

        switch (action) {
            case 'spotify-this-song':
                spotifyAPI();
                break;
            case 'movie-this':
                movieAPI()
                break;
            case 'concert-this':
                concertAPI()
                break;
            case 'do-what-it-says':
                allOther()
                break;
            default:
                console.log("Please put in a valid value")
        }
    })
}