const express = require('express');
const router = express.Router();
const { Orders, UserInfo } = require('../DataBase/models');

router.get('/order', async (req, res) => {
    const { name, phone, items } = req.query;

    try {
        const userInfo = await UserInfo.create({ user_name: name, user_phone: phone });
        const order = await Orders.create({ userId: userInfo.id, products: items });
        res.status(201).json({ message: 'Order placed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

module.exports = router;
