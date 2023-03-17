const express = require('express');
const {Product} = require("../DataBase/models");
const router = express.Router();


router.get('/products', async (req, res) => {
    const products = await Product.findAll();
    res.json(products);
});

router.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findOne({ where: { id: productId } });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send(product);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
