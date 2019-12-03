"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../utils/database');
const OrderItem = sequelize.define('order_item', {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true,
        primaryKey: true, allowNull: false },
    quantity: sequelize_1.default.INTEGER
});
exports.default = OrderItem;
//# sourceMappingURL=repositories-order-item.js.map