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
    var sampleDailyDeals = [{
            product: {
                img: "https://static1.squarespace.com/static/575b815986db43c5eac2bac9/578db5b3ebbd1a6756fed9e9/578db957e4fcb563ab03d167/1468905839047/end+table+drawers+grp.jpg?format=1500w",
                name: "Reclaimed Wood 7 Drawer Storage Coffee Table",
                description: "Dark or whitewashed solid rosewood coffee table with a large interior storage compartment on one side and 7 drawers on the other.",
                price: "399.00"
            },
            vendor: {
                name: "The Alley",
                location: {
                    city: "Indio",
                    state: "CA",
                    zip: "92201",
                    streetNumber: "80250",
                    streetName: "CA-111"
                }
            }
        },
        {
            product: {
                img: "https://img0.etsystatic.com/103/0/7751778/il_570xN.904175684_t37s.jpg",
                name: "Reclaimed Wood 7 Drawer Storage Coffee Table",
                description: "Atomic 12 Arm Sputnik Flush-Mount Ceiling Light Mid Century.",
                price: "299.00"
            },
            vendor: {
                name: "Starlight Modern Lighting",
                location: {
                    city: "Indio",
                    state: "CA",
                    zip: "92201",
                    streetNumber: "81381",
                    streetName: "Francis Ave"
                }
            }
        },
        {
            product: {
                img: "http://www.tactics.com/a/8r56/2/vans-old-skool-pro-skate-shoes-black-white.jpg",
                name: "Vans Old Skool Skate Shoes",
                description: "Black and white. Sizes available: 7, 8, 9, 10.",
                price: "59.00"
            },
            vendor: {
                name: "Susan's Shoe Shop",
                location: {
                    city: "Indio",
                    state: "CA",
                    zip: "92201",
                    streetNumber: "83440",
                    streetName: "Tanner Ave"
                }
            }
        },
        {
            product: {
                img: "https://anf.scene7.com/is/image/anf/anf_152471_01_prod1?$product-anf-v1$&wid=800&hei=1000",
                name: "Abercrombie & Fitch Cargo Shorts",
                description: "Classic cargo shorts with above-the-knee design, oversized pocket details, drawcord at hems, 10\" inseam, Imported",
                price: "49.00"
            },
            vendor: {
                name: "Bobby's Boutique",
                location: {
                    city: "Indio",
                    state: "CA",
                    zip: "92201",
                    streetNumber: "12345",
                    streetName: "Adobe Ave"
                }
            }
        }
    ]
    res.json(sampleDailyDeals);
})

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
