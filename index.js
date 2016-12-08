var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  var connected = "A user joined the room";
  var disconnected = "A user left the room";
  // Sends the message to everyone but the socket that caused this
  socket.broadcast.emit("chat message", connected);
  // console.log("a user connected");
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
    console.log("message: " + msg);
  });
  socket.on('disconnect', function() {
    socket.broadcast.emit("chat message", disconnected);
  });
});



// io.on("connection", function(socket) {
//   io.emit("")
// });




http.listen(3000, function() {
  console.log("Listening on *:3000");
});
