var express = require('express');
var app = express();

var port = 8000;

app.set('view engine', 'html');
app.use(express.static(__dirname + '/Public'));

app.listen(port, function() {
    console.log("Listening on port " + port);
})

app.get('/', function(req, res) {
    res.sendFile('index.html');
})

module.exports = app;