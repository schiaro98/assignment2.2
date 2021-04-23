var express = require('express')
var app = express()
var https = require('https');
const port = 3000

app.use(express.static('public'))

app.get('/form', (req, res) => {
    /*
        Non faccio la validazione per lo stesso motivo per cui le API di Trenitalia mi inviano una immagine
     */

    var departure = req.query.departure
    var arrival = req.query.arrival
    var date = req.query.date
    var time = 10

    const url = "https://www.lefrecce.it" + "/msite/api/solutions?origin=" + departure + "&destination" + arrival + "&arflag=A" +
        "&adate=" + date + "&atime" + time + "&adultno=1&childno=0&direction=A&frecce=false&onlyRegional=false"

    var request = https.get(url,function (response) {
        // Buffer the body entirely for processing as a whole.
        var bodyChunks = [];
        response.on('data', function(chunk) {
            // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function() {
            var body = Buffer.concat(bodyChunks);
            console.log('BODY: ' + body);
            // ...and/or process the entire body here.
        })
    });

    request.on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });

    res.send(departure + " " + arrival + " " + date + " " + time)
})

app.listen(port)
