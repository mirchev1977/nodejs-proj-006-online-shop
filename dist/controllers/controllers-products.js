"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_product_1 = __importDefault(require("../models/models-product"));
const repositories_product_1 = __importDefault(require("../repositories/repositories-product"));
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
function getAddProductToCart(req, res, next) {
    const itemId = req.params.id * 1;
    req.userLogged.repo.getCart().then(basket => {
        basket.getItem({ where: { id: itemId } }).then(items => {
            const item = items[0];
            let quantity = 0;
            if (item) {
                quantity = item.cart_product.quantity || 0;
            }
            quantity++;
            return repositories_product_1.default.findByPk(itemId).then(prod => {
                return basket.addItem(prod, { through: { quantity: quantity } });
            });
        }).then(item => {
            debugger;
        })
            .catch(err => {
            debugger;
        });
    }).throw(err => {
        debugger;
    });
    console.log(req.params);
    next();
}
exports.getAddProductToCart = getAddProductToCart;
//# sourceMappingURL=controllers-products.js.map