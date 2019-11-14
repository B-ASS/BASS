//import multiparty from 'multiparty'; // 또는 var multipart = require('multiparty');

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer"); // v1.0.5
var upload = multer(); // multipart/form-data 형식을 파싱할때 사용.
var fs = require("fs");

//middleware part
app.use("/static", express.static(__dirname + "/public"));
app.use(bodyParser.json()); //application/json 형식을 파싱하기 위해서 사용
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/media", express.static(__dirname + "/uploads"));


app.set("view engine", "ejs");
app.set("views", "./uploadViews");

app.get("/", (req, res) => {
  res.send("this is upload file");
});

app.listen(8081, () => {
  console.log("upload server running at port:8081");
});

/*
app.post("/upload", upload.array(), (req, res, next) => {
  res.send("uploaded");
});
*/

app.post("/upload", upload.single("file"), (req, res, next) => {
  console.log(req.file);
  res.send("uploaded");
});

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var type = file.mimetype.substr(0, 5);

    if (type === "image") {
      cb(null, "uploads/");
    } else return;
  },
  filename: (req, file, cb) => {
    var extension = file.mimetype.substr(6);
    cb(null, file.fieldname + "-" + Date.now() +"."+extension);
  }
});


//module.exports = router;
