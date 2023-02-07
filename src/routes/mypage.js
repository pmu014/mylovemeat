const express = require("express")
const router = express.Router();
// const app = express()

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

router.get("/users", (req,res)=> { 
 //유저가 로그인 되어있는 상태를 가정한다.
 //토큰을 보냄 유저는 req할때 쿠키에 jwt을 담는다. header에 항상 쿠키가 담겨있다. 
 //보통 토큰안에 pk가 담겨있다 가정을 하고 user.id를 추출함. 
 // 
 
 const userId = 1
 //로그인 유저 pk =1 
 //pk =1 가 마이페이지 
 //mysql에서 findone 해서 where pk === 1 
 //

  let connection = mysql.createConnection(conn); // DB 커넥션 생성
    connection.connect();   // DB 접속

    let testQuery = "SELECT * FROM users where id = 1";
 
    connection.query(testQuery, function (err, results, fields) { // testQuery 실행
      
    console.log("results,", results)
    res.json({user:results[0]})
    //객체만 가져옴 
    //findall 유저목록, 다수를 가져올 때 쓴다. 배열에 묶여있음.
    //findone은 객체만 가져옴 {}만 가져옴 


    // res.render("mypage")

  
  });
  
});

router.get("/mypage", (req,res)=> {
  res.render("mypage")
})

module.exports = router;
