var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret: 'codingdojorocks'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("index");
})
let number = 0;
io.sockets.on('connection', function (socket) {
  console.log("Client/socket is connected!");
  console.log("Client/socket id is: ", socket.id);
  // all the server socket code goes in here
  
  socket.on("click_btn", function(data){
    number ++;
    io.emit("update",{res:number});
  });

  socket.on("reset", function(data){
        number = 0;
        io.emit("update",{res:number});
      });


})