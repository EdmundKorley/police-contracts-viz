// A simple Node server for static files
// Edmund Korley 9/15/16
var path = require('path');
var express = require('express');
var app = express();

// Listen on Heroku determined port, otherwise 3000
app.set('port', process.env.PORT || 3000);

// Pull from a public/ directory for static files and assets
app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('SERVER listening on port ' + port);
});

