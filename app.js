const path = require("path")
const express = require("express")
const app = express()
const port = 3000
const mypageRouter = require("./src/routes/mypage.js")
const ejs = require("ejs")

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.json());
app.use("/api", mypageRouter);
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')))

app.engine("html", require("ejs").renderFile);

app.listen(port, ()=> {
  console.log(port, "서버 정상 작동중")
})
