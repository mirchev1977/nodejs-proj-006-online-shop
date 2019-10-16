"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../utils/database');
const Product = sequelize.define('product', {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true,
        primaryKey: true, allowNull: false },
    title: { type: sequelize_1.default.STRING, allowNull: false },
    price: { type: sequelize_1.default.DECIMAL, allowNull: false },
    prodDate: { type: sequelize_1.default.INTEGER, allowNull: false },
    description: { type: sequelize_1.default.STRING, allowNull: false },
    image: { type: sequelize_1.default.STRING, allowNull: false }
});
exports.default = Product;
//# sourceMappingURL=repositories-product.js.map