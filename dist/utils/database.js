const Sequelize = require('sequelize');
const sequelize = new Sequelize('online-shop', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost'
});
module.exports = sequelize;
//# sourceMappingURL=database.js.map