const express = require('express');
const router = express.Router();
const {Product} = require('../db/models');

router.get("/products", async(req,res)=>{
    
    try{
        const product = await Product.findAll({where : Product.id});
        res.json({product});
    }catch(error){
        console.log(error)
        return res.status(400).send({ errorMessage: "해당 상품이 존재하지 않습니다." });
    }
})

router.get("/products/:productId", async(req,res)=>{
    try{
        const {productId} = req.params;

        const product = await Product.findOne({where : {id: productId}});
        if(!product){
            return res.status(400).send({ errorMessage: "해당 상품이 존재하지 않습니다." });
        }
        res.json({product});

    }catch(error){
        console.log(error)
        return res.status(400).send({ errorMessage: "해당 상품이 존재하지 않습니다." });
    }
})

router.post("/products",async(req,res)=>{
    try{
        const {price,name,description,img,quantity} = req.body;
        
        const product = await Product.create({price,name,description,img,adminId:1,quantity});
        res.status(200).send(product)
    }catch(error){
        console.log(error)
        return res.status(400).send({ errorMessage: "해당 상품이 존재하지 않습니다." });
    }
})


module.exports = router;