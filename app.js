var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//필요한 라우터 추가 필요
var userRouter = require('./routes/user');
var bookmarkRouter = require('./routes/bookmark');
var recommendRouter = require('./routes/recommend');
var relationRouter = require('./routes/relation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//필요한 라우터 추가 필요
app.use('/', userRouter);
app.use('/',bookmarkRouter);
app.use('/', recommendRouter);
app.use('/', relationRouter);

//mongodb connection
mongoose.connect(
  "mongodb://localhost:27017/board",
  {useNewUrlParser: true}
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected successfully');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//socket connection
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log("user connect");

  socket.on('connectReceive', (data) => {
  	console.log(data)
  });

  socket.on('disconnect', function() {
  console.log('user disconnected');
  });
});

server.listen(80, function(){
  console.log("server on 80");
});


module.exports = app;