var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views/group-chat'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("uploads",express.static(path.join(__dirname, '../uploads')));

app.use('/group-chat', indexRouter);
app.use('/users', usersRouter);

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

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket)=>{
  socket.on("joinRoom",({username,room})=>{
    socket.room=room;
    socket.username=username;
    socket.join(room);
    socket.broadcast.to(socket.room).emit("notification",`${socket.username} has joined the room`);
  });
  socket.on("message", (message)=>{
    const Message={
      text:message,
      username:socket.username,
      time:new Date(Date.now()).toISOString(),
      id:message.id
    };

    // TODO: Store in Database before broadcasting the message

    socket.broadcast.to(socket.room).emit("group-message",Message);
  });
  socket.on("disconnect",(details)=>{
    socket.broadcast.to(socket.room).emit("notification",`${socket.username} has left the room`);
  })
});


module.exports = {
  app, 
  server
};
