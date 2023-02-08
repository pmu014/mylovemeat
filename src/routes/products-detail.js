const express = require('express');
const router = express.Router();
const {Product} = require('../db/models');

router.get("/products/:productId", async(req,res)=>{
    try{
        const {productId} = req.params;
        // const productId = req.query.id;

        const products = await Product.findOne({where : {id: productId}});
        if(!products){
            return res.status(400).send({ errorMessage: "해당 상품이 존재하지 않습니다." });
        }
        res.json({products});

    }catch(error){
        console.log(error)
        return res.status(400).send({ errorMessage: "해당 상품이 존재하지 않습니다." });
    }
})

module.exports = router;