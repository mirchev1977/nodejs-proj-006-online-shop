"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_product_1 = __importDefault(require("../models/models-product"));
function getAllProducts(req, res, next) {
    models_product_1.default.getAll().then(arrProducts => {
        res.render('products/all', {
            userLogged: req['userLogged'],
            arrProducts: arrProducts
        });
    }).catch(errMess => {
        res.render('products/all', { userLogged: req['userLogged'] });
    });
}
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=controllers-products.js.map