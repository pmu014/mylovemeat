const express = require("express");
const productRouter = require("./src/routes/product.main");
const app = express();


app.use(express.json()); // post, put에서 전달된 body 데이터를
require('dotenv').config(); // .env파일을 만들어 보안을 할수있게 하는 기능


app.use("/api", express.urlencoded({extended: false}), [
    productRouter
  ]);

app.get("/", (req,res)=>{
    res.send("hellow")
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`);
});