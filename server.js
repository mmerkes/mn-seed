var express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    exphbs = require('express-handlebars');
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

var appRoutes = require('./routes/index'),
    apiRoutes = require('./api/routes/index');

var app = express();

var hbs = exphbs({
  defaultLayout: 'main',
  compilerOptions: undefined,
  partialsDir: [
    'views/partials/'
  ]
});

// view engine setup
app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public/'));

app.use('/', appRoutes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
