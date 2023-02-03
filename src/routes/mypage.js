const express = require("express")
const router = express.Router();

const mysql = require('mysql2');  // mysql 모듈 로드
const conn = {  // mysql 접속 설정
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '0000',
    database: 'mylovemeat'
};




router.get("/",(req,res)=> {
  res.send("첫페이지 ")
});

router.get("/user/mypage", (req,res)=> { 
  

  let connection = mysql.createConnection(conn); // DB 커넥션 생성
    connection.connect();   // DB 접속

    let testQuery = "SELECT * FROM users";
 
connection.query(testQuery, function (err, results, fields) { // testQuery 실행
    if (err) {
        console.log(err);
    }
    console.log(results);
    res.send(results)

  
  });
  // res.send("마이페이지입니다.")
});

module.exports = router;
