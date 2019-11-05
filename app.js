var express = require('express');
var path = require('path');
var app = express();

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

app.listen(3000, function(){
  console.log('Server On!');
});
