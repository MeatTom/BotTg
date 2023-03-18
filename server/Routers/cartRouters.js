const express = require('express');
const { Product, Cart } = require('../DataBase/models');
const router = express.Router();

router.post('/cart/:productId', async (req, res) => {

    const { productId } = req.params;

    try {
        const cartItem = await Cart.create({ productId, quantity: 1 });
        res.status(201).json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.post('/cart/items', async (req, res) => {
    const { addedItems } = req.body;

    try {
        const cartItems = await Cart.findAll({
            where: { productId: addedItems.map(item => item.id) }
        });
        res.json(cartItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router
