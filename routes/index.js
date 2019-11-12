
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;


/*
//mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
	hostname: "localhost",
	user: "root",
	password: "rootroot",
	database: "bass",
  port : "3000"
});

//connection.connect(); 
connection.query('SELECT * FROM members AS solution', function(err, results, fields){
	if(err) 
	console.log('The solution is:' , err);
	else
	console.log('The solution is:' , rows);
});

//connection.end();

*/

/*
var express    = require('express');
var mysql      = require('mysql');
var dbconfig   = require('./config/database.js');
var connection = mysql.createConnection(dbconfig);

var app = express();

// configuration ===============================================================
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
  res.send('Root');
});

app.get('/members', function(req, res){

  connection.query('SELECT * from members', function(err, rows) {
    if(err) throw err;

    console.log('The solution is: ', rows);
    res.send(rows);
  });
});

app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
*/