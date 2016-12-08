var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    console.log("message: " + msg);
  });
});





http.listen(3000, function() {
  console.log("Listening on *:3000");
});
