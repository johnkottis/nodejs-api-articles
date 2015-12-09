/**
 * Title:       App.js
 * Description: Module dependencies
 * Version:     0.0.1
 * Author:      John Kottis
 */

// Dependencies
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    articles = require('./routes/articles'),
    mongoose = require('mongoose');

// MongoDB Connection 
mongoose.connect('mongodb://localhost/articles');
var app = express();

// App configuration
app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler());
});

// Roouting
app.get('/', routes.index);
app.get('/articles', articles.index);
app.get('/articles/:id', articles.show);
app.get('/articles/channel/:channel', articles.showChannel);
app.get('/articles/status/:statuss', articles.showStatus);

app.post('/articles', articles.create);
app.put('/articles', articles.update);
app.del('/articles', articles.delete);

// Create server
http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port %s in %s mode.", app.get('port'), app.settings.env);
});