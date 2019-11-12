const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/config');
const tokenAbi = require('./config/erc20ABI')
const request = require('request');


/*
// init web3
const Web3 = require('web3');
const web3 = new Web3(config.getConfig().httpEndpoint);
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
//app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());


let token_list = []
let address
let privateKey

// login
app.use('/login', function(req, res) {
  const method = req.method;

  if (method == 'GET') {
    res.render('login');
  } else {
    privateKey = req.param('private_key');
    address = req.param('address');
    const globalConfig = config.getConfig();
    globalConfig.privateKey = privateKey;
    globalConfig.address = address;

    res.redirect('/');
  }
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
