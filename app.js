var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config/config');
var tokenAbi = require('./config/erc20ABI');
var request = require('request');

/*
// init web3
const Web3 = require('web3');
const web3 = new Web3(config.getConfig().httpEndpoint);
*/

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var app = express();


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


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(bodyParser.json()); // 2
app.use(bodyParser.urlencoded({extended:true})); // 3

// DB schema // 4
var loginSchema = mongoose.Schema({
  account:{type:String, required:true, unique:true},
  password:{type:String, required:true}
});

var Login = mongoose.model("login", loginSchema);

let token_list = []
let address
let privateKey

// login
// app.use('/login', function(req, res) {
//   var method = req.method;
//
//   if (method == 'GET') {
//     res.render('login');
//   } else {
//     privateKey = req.param('private_key');
//     address = req.param('address');
//     var globalConfig = config.getConfig();
//     globalConfig.privateKey = privateKey;
//     globalConfig.address = address;
//
//     res.redirect('/');
//   }
// });

app.get('/login', function(req, res){
  res.render('login');
});
// Contacts - create // 9
app.post('/login', function(req, res){
  Login.create(req.body, function(err, signin){
    if(err) return res.json(err);
    res.redirect('login');
  });
});

app.get('/', function(req, res) {
   res.render('index');
 });

 app.get('/about', function(req, res) {
   res.render('about');
 });

 app.get('/petlist', function (req, res){
	res.render('petlist');
  });

  app.get('/detail', function (req, res){
	res.render('detail');
  });

 app.get('/register', function(req, res) {
   res.render('register');
 });


app.get('/api/get_info', async function(req, res) {
  let address = config.getConfig().address;
  let result = await web3.eth.getBalance(address);
  let ether = web3.utils.fromWei(result, 'ether');
  res.json( { balance: ether, address: address});
});

/*
app.get('/api/get_history', async function(req, res) {
  var my_address = config.getConfig().address;
  console.log(my_address)

  let options = {
    uri: "http://api-ropsten.etherscan.io/api",
    qs: {
      module: "account",
      action: "txlist",
      address: my_address,
      startblock: 0,
      endblock: 99999999,
      sort: "asc",
      apikey: config.getConfig().etherscan_api_key
    }
  }

  request(options, (error, response, result) => {
    if(error) {
      console.log(error);
    } else {
      res.json(JSON.parse(result))
    }
  })
})
*/

module.exports = app;
