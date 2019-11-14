
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/config');
const tokenAbi = require('./config/erc20ABI')
const request = require('request');



var url = require('url');
var qs = require('querystring');
var mysql = require('mysql');
var app = express();
var bcrypt = require('bcrypt');

var session = require('express-session');
var jalert = require('js-alert');   // 로컬에 팝업창 띄워주는 모듈
var alert = require('alert-node');   //콘솔에 팝업창 띄워주는 모듈

var db = mysql.createConnection({
    host:'localhost', //접속할 데이터베이스 시스템 링크
    //port:3306, //링크 포트번호. MySQL 디폴트 포트가 3306
    user:'root', //사용자명
    password:'password', //비밀번호
    database:'bass', //사용할 데이터베이스명
});

db.connect();




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
          console.log(account, password);
               db.query('select * from members where account=?', account, function(err, result){
          if(err){ 
            console.log('err: ' +err);
          }
          else {
            if (result.length === 0){
              jalert.alert('회원정보 오류');
              alert('회원정보가 없습니다. 다시 로그인 해주세요. 회원가입을 원하시면 Join을 눌러주세요');
              res.render('login')
              //res.json({sucess: false, msg : 'no user'})
            }
            else {
              //console.log(result[0].password);
              if(password===result[0].password){
                jalert.alert('회원 입장');
              alert('회원님 환영합니다 :)');
                //res.json({success : true})
                res.render('index')
              }else{
                jalert.alert('비밀번호 오류');
                alert('비밀번호가 다릅니다');
                res.render('login')
                //res.json({sucess: false, msg : '비밀번호가 다릅니다'})
            }
            }
          }
        })//query
        })
  };
});


app.use('/join', function(req, res) {
  const method = req.method;

  if (method == 'GET') {
    var _url = req.url;
    var pathname = url.parse(_url, true).pathname;
    var queryData = url.parse(_url, true).query;

    db.query('select * from members', function(error, members){
      if(error){
      throw error;
      }
      console.log(members);   //console.log(members[0].account);
      res.render('join', {result: members});  
    })
  } else if (method == 'POST'){
    var body = '';
    req.on('data', function(data){
        body = body + data;
    });     // 매우 중요한! 데이터를 추가하는 기능
    req.on('end', function(){
        var post = qs.parse(body);
        
        db.query('insert into members (account, password) values(?, ?)',
          [post.account, post.password],
          function(error, result){
            if(error){
              throw error;
            }
            res.writeHead(302, {Location: `/login`});
            res.end();
            //console.log(member);
          }
        )

        db.query('select * from members', function(error, members){
          if(error){
          throw error;
          }
        console.log(members); 
        })

    });
  }
});


/*
app.get('/login', function(req, res) {
  var _url = req.url;
  var pathname = url.parse(_url, true).pathname;
  var queryData = url.parse(_url, true).query;

  if(pathname === '/'){
  db.query('select * from members', function(error, members){
    if(error){
      throw error;
    }
    console.log(members);
    console.log(members[0].account);
    var id = members[0].id;     //제목 
    var account = members[0].account;
    var password = members[0].pw;     //본문
    
    //res.writeHead(200);
    res.render('login', {result: members});  
  })
  }
  /*else if(pathname === '/create_process'){
    req.on('end', function(){
        var post = qs.parse(body);

        db.query('insert into members (account, password) values(?, ?)',
            [post.id, post.pw],
            function(error, result){
              if(error){
                throw error;
              }
              res.writeHead(302, {Location: `/?id=${result.insertId}`});
          res.end();
          console.log(result);
            }
            )
    });
  }

});
*/

/*
app.post('/create_process', function(res, req){
  req.on('end', function(){
    //var post = qs.parse(body);
    var post = req.body;
    //var id = post[0].id;     //제목 
    //var account = post[0].account;
    //var password = post[0].password;     //본문

    db.query('insert into members (account, password) values(?, ?)',
        [post.account, post.password],
        function(error, result){
          if(error){
            throw error;
          }
          //res.writeHead(302, {Location: `/?id=${result.insertId}`});
      res.end();
      res.redirect("/create_process")
      //res.render('index');
      //console.log(result);
        }
        )
});
})
*/

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

app.get('/complete', function(req, res) {
res.render('complete');
});

// 업로드 - 파일 업로드 폼
app.get('/upload', function(req, res){
  res.render('upload');
});

/*
app.post("/upload", upload.array(), (req, res, next) => {
  res.send("uploaded");
});
*/


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
