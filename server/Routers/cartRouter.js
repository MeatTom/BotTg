const express = require('express');
const router = express.Router();
const { Cart, UserInfo } = require('../DataBase/models');

router.post('/order', async (req, res) => {
    const { name, phone, items } = req.body;

    try {
        const user = await UserInfo.create({ user_name: name, user_phone: phone });

        for (const item of items) {
            await Cart.create({ productId: item.id, quantity: item.quantity, user_order: user.id });
        }

        res.status(201).send('Order placed successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
