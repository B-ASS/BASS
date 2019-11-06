var express = require('express');
var path = require('path');
var app = express();
var mongoose = require("mongoose");

// DB setting
mongoose.set('useNewUrlParser', true);    // 1
mongoose.set('useFindAndModify', false);  // 1
mongoose.set('useCreateIndex', true);     // 1
mongoose.connect("mongodb+srv://pets:qmffhrcpdls@cluster0-b7hly.mongodb.net/test?retryWrites=true&w=majority"); // 2
var db = mongoose.connection; // 3
// 4
db.once("open", function(){
  console.log("DB connected");
});
// 5
db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname + '/public')));

app.get('/', function (req,res){
  res.render('index');
});

app.get('/portfolio-4-col', function (req, res){
  res.render('petlist');
});

app.get('/portfolio-item', function (req, res){
  res.render('detail');
});

var port = 3000;
app.listen(3000, function(){
  console.log("Server On! http://localhost:"+port);
});
