const Sequelize = require('sequelize');
const sequelize = new Sequelize('online-shop', 'onlineshop', 'Online@Shop!1', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;
//# sourceMappingURL=database.js.map