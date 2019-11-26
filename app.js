const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const config = require('./config/config');
const tokenAbi = require('./config/erc20ABI');
const request = require('request');

var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
var bcrypt = require('bcrypt');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');     //로그인 된 범위를 나누기위해
var jalert = require('js-alert');   // 로컬에 팝업창 띄워주는 모듈
var alert = require('alert-node');   //콘솔에 팝업창 띄워주는 모듈
var fs = require('fs');

// 서버생성
var app = express();

// mysqlDB setup
var db = mysql.createConnection({
    host:'localhost', //접속할 데이터베이스 시스템 링크
    port:3306, 
    user:'root', //사용자명
    password:'password', //비밀번호
    database:'bass', //사용할 데이터베이스명
});
db.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// hetajs setup
"use strict";
exports.__esModule = true;
var client_1 = require("@herajs/client");
var aergo = new client_1["default"]();
aergo.blockchain().then(function (result) {
    console.log('Current state', result);
});

// login
app.use('/login', function(req, res) {
  const method = req.method;

  if (method == 'GET') {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    db.query('select * from members', function(error, members){
      if(error){
      throw error;
      }
    console.log(members);
    res.render('login', {result: members});  
    })
  } 
  else if (method == 'POST'){
    req.on('data', function(data){
      console.log(data.toString());
      var post = qs.parse(data.toString());
      var account = post.account;
      var password = post.password;
      //console.log(account, password);

      db.query('select * from members where account=?', account, function(err, result){
      if(err){ 
        console.log('err: ' +err);
      }
      else {
        if (result.length === 0){
          jalert.alert('회원정보 오류');
          alert('회원정보가 없습니다. 다시 로그인 해주세요. 회원가입을 원하시면 Join을 눌러주세요');
          res.render('login')
        } else {
          if(password===result[0].password){
            jalert.alert('회원 입장');
            alert('회원님 환영합니다 :)', account);
            res.render('index')
          }else{
            jalert.alert('비밀번호 오류');
            alert('아이디 및 비밀번호가 다릅니다');
            res.render('login')
            //res.json({sucess: false, msg : '비밀번호가 다릅니다'})
        }
        }
      }
    })//query
    })
  };
});

// join
app.use('/join', function(req, res) {
  const method = req.method;
  if (method == 'GET') {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;

    db.query('select * from members', function(error, members){
      if(error){
        console.log('err: ' +err);
      }
      console.log(members);   //console.log(members[0].account);
      res.render('join', {result: members});  
    })
  } else if (method == 'POST'){
    var body = '';
    req.on('data', function(data){
        body = body + data;
    });                         // 매우 중요한! 데이터를 추가하는 기능
    req.on('end', function(){
      var post = qs.parse(body);
      var account = post.account;
      var password = post.password;
      db.query('select * from members', function(error, memberss){
        if(error){
          console.log('err: ' +err);
        }
        else{
          db.query('select * from members where account=? ', [account, password], function(err, members){
            if(err){ 
              console.log('err: ' +err);
            }
            console.log(members);
            if(members.length === 0){
              db.query('insert into members (account, password) values(?, ?)',
              [post.account, post.password],
              function(error2, member){
                if(error2){
                  throw error2;
                }
                res.writeHead(302, {Location: `/login`});
                res.end();
              })
            }else{
              if (memberss.password != members.password){
              db.query('DELETE from members WHERE account=? and password=?', 
              [account, password], function(error2, mem){
                if(error2){
                  throw error2;
                }
                jalert.alert('이미 회원정보가 존재합니다');
                alert('이미 회원정보가 존재합니다');
                res.render('join');
              })
              } else {
                jalert.alert('이미 회원이십니다. 로그인해주세요 :)');
                alert('이미 회원이십니다. 로그인해주세요 :)');
                res.render('login');
              }
                  //console.log(members);
            }
            console.log(members);
          })
        }
      })
    })    
  }
});

// register
app.use('/register', function(req, res) {
  //res.render('register');
  const method = req.method;
  
  if(method=='GET'){
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;
    res.render('register', {result: {}});  
  } else if(method == 'POST'){
    var body = '';
    req.on('data', function(data){
        body = body + data;
    });  
    req.on('end', function(){
        var regi = qs.parse(body);
        console.log(regi);
        res.render('index');
        //res.end(JSON.stringify(regi));
    });
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

app.get('/complete', function(req, res) {
res.render('complete');
});

// 업로드 - 파일 업로드 폼
app.get('/upload', function(req, res){
  res.render('upload');
});


app.get('/api/get_info', async function(req, res) {
  let address = config.getConfig().address;
  let result = await web3.eth.getBalance(address);
  let ether = web3.utils.fromWei(result, 'ether');
  res.json( { balance: ether, address: address});
});

app.listen(5005, function(){
  console.log("Connected 5005 port!");
});


module.exports = app;