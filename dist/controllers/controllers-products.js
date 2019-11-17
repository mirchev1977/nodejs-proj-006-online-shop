"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_product_1 = __importDefault(require("../models/models-product"));
const access_controller_1 = __importDefault(require("../utils/access_controller"));
function getAllProducts(req, res, next) {
    models_product_1.default.getAll(req.query).then(arrProducts => {
        res.render('products/all', {
            userLogged: req['userLogged'],
            arrProducts: arrProducts,
            sort: req.query.sort
        });
    }).catch(errMess => {
        res.render('products/all', {
            userLogged: req['userLogged'],
            ERR: errMess.message,
            sort: req.query.sort
        });
    });
}
exports.getAllProducts = getAllProducts;
function getMyProducts(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    models_product_1.default.getMine(req.userLogged.id, req.query).then(arrProducts => {
        res.render('products/mine', {
            userLogged: req['userLogged'],
            arrProducts: arrProducts,
            ERR: req.query.err || '',
            CONT: req.query.cont || '',
            prodId: req.query.prodId || '',
            sort: req.query.sort
        });
    }).catch(errMess => {
        res.render('products/mine', {
            userLogged: req['userLogged'],
            ERR: errMess.message,
            sort: req.query.sort
        });
    });
}
exports.getMyProducts = getMyProducts;
//# sourceMappingURL=controllers-products.js.map