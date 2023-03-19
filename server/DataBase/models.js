const { Sequelize } = require ('sequelize')
const { DataTypes } = require ('sequelize')
const url = process.env.URL_DB

const sequelize = new Sequelize(url, {
    dialect: 'postgres',
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

const Orders = sequelize.define('Orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    products: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false
    }
});

const UserInfo = sequelize.define('UserInfos', {
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
        allowNull: false ,
        validate: {
            is: /^\+7\d{10}$/
        }
    },
    user_order: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Orders.belongsTo(UserInfo);

module.exports = {
    Product,
    Orders,
    UserInfo,
    sequelize
};