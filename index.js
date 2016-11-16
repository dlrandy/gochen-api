var express = require('express'),
	http = require('http'),
	config = require('./config'),
	dotenv = require('dotenv');

var app = module.exports = express();

dotenv.load();

app.set('showStackError', true);

app.locals.pretty = true;

config.log(app);

config.parsers(app);

config.db(app);

config.authentication(app);


app.use('/api/posts', require('./features/posts'));
app.use('/api/categories', require('./features/categories'));
app.use('/api/authors', require('./features/authors'));

var port = process.env.PORT || 4000;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

































