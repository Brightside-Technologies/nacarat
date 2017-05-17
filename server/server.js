var express = require('express');
//var mongoose = require('mongoose'); // mongoose for mongodb
//var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var path = require('path');
var app = express();

/********************/
// configuration
/*******************/
// var options = {
//     server: {
//         socketOptions: {
//             keepAlive: 300000,
//             connectTimeoutMS: 30000
//         }
//     },
//     replset: {
//         socketOptions: {
//             keepAlive: 300000,
//             connectTimeoutMS: 30000
//         }
//     }
// }
// mongoose.connect('mongodb://admin:Icarus627591!DB@ds019756.mlab.com:19756/icarus', options); // connect to mongoDB database on modulus.io
// var conn = mongoose.connection;
// conn.on('error', console.error.bind(console, 'connection error:'));
// conn.once('open', function() {
//     console.log("connection open")
//         // Wait for the database connection to establish, then start the app.
// });

process.env.PWD = process.cwd();
var PUBLIC_PATH = path.resolve(process.env.PWD + '/public');
app.set('port', (process.env.PORT || 8001));
app.use('/public', express.static(PUBLIC_PATH));

var router = express.Router(); // get an instance of the express Router

app.get('/', function(req, res) {
    res.sendFile(PUBLIC_PATH + '/index.html');
});

app.get('/daily-deals', function(req, res) {
    var dailyDeals = require("./data-store/daily-deals.data.js"); // temp data store
    res.json(dailyDeals);
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
