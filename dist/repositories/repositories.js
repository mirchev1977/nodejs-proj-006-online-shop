"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_user_1 = __importDefault(require("./repositories-user"));
const repositories_login_1 = __importDefault(require("./repositories-login"));
const repositories_product_1 = __importDefault(require("./repositories-product"));
const repositories_cart_1 = __importDefault(require("./repositories-cart"));
const repositories_cart_product_1 = __importDefault(require("./repositories-cart-product"));
const repositories_order_1 = __importDefault(require("./repositories-order"));
const repositories_order_item_1 = __importDefault(require("./repositories-order-item"));
function createRelations() {
    repositories_login_1.default.belongsTo(repositories_user_1.default, { constraints: true, onDelete: "CASCADE" });
    repositories_user_1.default.hasMany(repositories_login_1.default);
    repositories_product_1.default.belongsTo(repositories_user_1.default, { constraints: true, onDelete: "CASCADE" });
    repositories_user_1.default.hasMany(repositories_product_1.default);
    repositories_cart_1.default.belongsTo(repositories_user_1.default, { constraints: true, onDelete: "CASCADE" });
    repositories_user_1.default.hasOne(repositories_cart_1.default);
    repositories_cart_1.default.belongsToMany(repositories_product_1.default, { as: 'Item', through: repositories_cart_product_1.default, foreignKey: 'cartId' });
    repositories_product_1.default.belongsToMany(repositories_cart_1.default, { as: 'Basket', through: repositories_cart_product_1.default, foreignKey: 'productId' });
    repositories_order_1.default.belongsTo(repositories_user_1.default);
    repositories_user_1.default.hasMany(repositories_order_1.default);
    repositories_order_1.default.belongsToMany(repositories_product_1.default, { through: repositories_order_item_1.default });
    repositories_product_1.default.belongsToMany(repositories_order_1.default, { through: repositories_order_item_1.default });
}
exports.default = createRelations;
//# sourceMappingURL=repositories.js.map