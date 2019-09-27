"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize = require('../utils/database');
const User = sequelize.define('user', {
    id: { type: sequelize_1.default.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    names: sequelize_1.default.STRING,
    email: { type: sequelize_1.default.STRING, allowNull: false },
    password: { type: sequelize_1.default.STRING, allowNull: false }
});
exports.default = User;
//# sourceMappingURL=repositories-user.js.map