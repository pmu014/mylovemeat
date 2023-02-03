const express = require("express")
const app = express()
const port = 3000
const mypageRouter = require("./src/routes/mypage.js")


// const mysql = require('mysql2');  // mysql 모듈 로드
// const conn = {  // mysql 접속 설정
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: '0000',
//     database: 'mylovemeat'
// };

app.use("/api", mypageRouter);


// app.get("/", (req,res)=> {

//     let connection = mysql.createConnection(conn); // DB 커넥션 생성
//     connection.connect();   // DB 접속


//     let testQuery = "SELECT * FROM users";
 
// connection.query(testQuery, function (err, results, fields) { // testQuery 실행
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
//     res.send(results)
// });

    
//   res.send(results)
// })

// var connection = mysql.createConnection(conn); // DB 커넥션 생성
// connection.connect();   // DB 접속
 
// var testQuery = "INSERT INTO `users` (`username`,`password`) VALUES ('test','test');";
 
// connection.query(testQuery, function (err, results, fields) { // testQuery 실행
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
// });
 
// const testQuery = "SELECT * FROM users";
 
// connection.query(testQuery, function (err, results, fields) { // testQuery 실행
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
// });
 
 
// connection.end(); // DB 접속 종료


app.listen(port, ()=> {
  console.log(port, "서버 정상 작동중")
})
