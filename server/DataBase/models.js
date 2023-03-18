const { Sequelize } = require ('sequelize')
const { DataTypes } = require ('sequelize')
import pg from 'pg'
const url = process.env.URL_DB

const sequelize = new Sequelize(url, {
    dialect: 'postgres',
    dialectModule: pg
})

const Product = sequelize.define('Products', {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    desc_full: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const UserInfo = sequelize.define('UserInfo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Product.hasMany(Cart, { foreignKey: 'productId' });
Cart.belongsTo(Product, { foreignKey: 'productId' });

Cart.belongsTo(UserInfo, { foreignKey: 'user_order' });

module.exports = {
    Product,
    Cart,
    UserInfo,
    sequelize
};