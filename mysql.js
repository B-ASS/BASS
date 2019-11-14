const mysql = require('mysql');

let connection = mysql.createConnection({
    host:'localhost', //접속할 데이터베이스 시스템 링크
    port:3306, //링크 포트번호. MySQL 디폴트 포트가 3306
    user:'root', //사용자명
    password:'password', //비밀번호
    database:'bass', //사용할 데이터베이스명
});


connection.query('select * from members',function (error, result, fields) 
    {
        if(error)
        {
            console.log("에러 발생: "+error);
            
        }
        //console.log(rows);
        console.log(result);
    }
)

connection.end();