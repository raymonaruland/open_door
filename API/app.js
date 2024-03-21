const express = require('express');
const session = require('express-session');
const path = require('path');
const favicon = require('serve-favicon');
//const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors');

//Python shell 
const app = express();
const http = require('http');

const server = http.createServer(app);

var socketio = require('socket.io');  
//var io = socketio.listen(server);	

//require('./routes/datapush')(io);


process.env.SECRET_KEY="atssecretkey";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.use(cors()); 
//app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cookieParser());
app.use(fileUpload());


var date = new Date();
date.setTime(date.getTime() + (60 * 1000));

// Require user routes
const ItemsRoutes = require('./src/routes/items.routes');
const ProductRoutes = require('./src/routes/product.routes');
const ProjectsRoutes = require("./src/routes/projects.routes");

// using as middleware
app.use('/api/v1/items',ItemsRoutes);
app.use('/api/v1/product',ProductRoutes);
app.use('/api/v1/projects',ProjectsRoutes);


// error handlers
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found');
	res.status(404);
	next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res) {
		res.status(err.status || 500);
		res.render('error', {
		message: err.message,
		error: err
		});
	});
}		
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

const debug = require('debug')('nodejs-microsoft-graph-connect:server');
// never change port to 10009
// PORT 10009 is configured for NGINX
// duplicate this file(app.js) multiple times
// change port number in all the duplicated files
// configure all the ports in nginx for load balancing
const port = normalizePort(process.env.PORT || '10008'); //  never change port to 10009. it is configured for NGINX
server.listen(port); 
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind); 
  console.log('\r\nListening on ' + bind);
}

module.exports = app;
