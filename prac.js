// const path = require("path")
// const express = require("express")
// const app = express()
// const port = 3000
// const mypageRouter = require("./src/routes/mypage.js")
// const ejs = require("ejs")



// // const mysql = require('mysql2');  // mysql 모듈 로드
// // const conn = {  // mysql 접속 설정
// //     host: 'localhost',
// //     port: '3306',
// //     user: 'root',
// //     password: '0000',
// //     database: 'mylovemeat'
// // };

// // app.get("/mypage", (req, res) => { 
// //   res.render("mypage.ejs")
// // })

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src', 'views'));
// app.use(express.json());
// app.use("/api", mypageRouter);
// app.use(express.static(path.join(__dirname, 'src', 'public')));
// app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')))
// // app.use(express.static(path.join(__dirname, 'src', 'public')));
// // app.set("view engine", "ejs"); //nunjucks를 사용하기 위한 express 세팅
// // app.set("views", "./views"); //첫번째 인자값 폴더명, 두번째 인자값 변수명 = views라는 폴더에서 ejs 관리한다는 의미
// app.engine("html", require("ejs").renderFile);


// // app.get("/", (req,res)=> {

// //     let connection = mysql.createConnection(conn); // DB 커넥션 생성
// //     connection.connect();   // DB 접속


// //     let testQuery = "SELECT * FROM users";
 
// // connection.query(testQuery, function (err, results, fields) { // testQuery 실행
// //     if (err) {
// //         console.log(err);
// //     }
// //     console.log(results);
// //     res.send(results)
// // });

    
// //   res.send(results)
// // })

// // var connection = mysql.createConnection(conn); // DB 커넥션 생성
// // connection.connect();   // DB 접속
 
// // var testQuery = "INSERT INTO `users` (`username`,`password`) VALUES ('test','test');";
 
// // connection.query(testQuery, function (err, results, fields) { // testQuery 실행
// //     if (err) {
// //         console.log(err);
// //     }
// //     console.log(results);
// // });
 
// // const testQuery = "SELECT * FROM users";
 
// // connection.query(testQuery, function (err, results, fields) { // testQuery 실행
// //     if (err) {
// //         console.log(err);
// //     }
// //     console.log(results);
// // });
 
 
// // connection.end(); // DB 접속 종료


// app.listen(port, ()=> {
//   console.log(port, "서버 정상 작동중")
// })
