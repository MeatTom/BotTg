const AdminBro = require('admin-bro');
const AdminBroSequelize = require('@admin-bro/sequelize');
const AdminBroExpress = require('@admin-bro/express');
const { Product, Orders, UserInfo, sequelize } = require('../DataBase/models');


AdminBro.registerAdapter(AdminBroSequelize);

const adminBro = new AdminBro({
    databases: [sequelize],
    resources: [
        { resource: Product },
        { resource: Orders },
        { resource: UserInfo },
    ],
});

const router = AdminBroExpress.buildRouter(adminBro);

module.exports = router;
