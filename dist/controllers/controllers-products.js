"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_product_1 = __importDefault(require("../models/models-product"));
const repositories_product_1 = __importDefault(require("../repositories/repositories-product"));
const access_controller_1 = __importDefault(require("../utils/access_controller"));
const date_1 = require("../utils/date");
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
    access_controller_1.default(req, res, next, {
        isLogged: true,
        roles: { admin: 1 }
    });
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
function getAddRemoveProductToCart(req, res, next) {
    const itemId = req.params.id * 1;
    const sortBy = req.query.sort || '';
    const action = req.query.action;
    let mainBasket = null;
    let quantity = 0;
    req.userLogged.repo.getCart().then(basket => {
        mainBasket = basket;
        return basket.getItem({ where: { id: itemId } }).then(items => {
            const item = items[0];
            if (item) {
                quantity = item.cart_product.quantity || 0;
            }
            if (action === 'add')
                quantity++;
            if (action === 'remove')
                quantity--;
            if (quantity < 1) {
                quantity = 0;
                item.cart_product.quantity = 0;
                return item.cart_product.destroy();
            }
            ;
            return repositories_product_1.default.findByPk(itemId);
        });
    })
        .then(prod => {
        if (prod.quantity <= 0) {
            return 1;
        }
        else {
            return mainBasket.addItem(prod, { through: { quantity: quantity } });
        }
    })
        .then(arrItemAdded => {
        if (sortBy) {
            res.redirect('/products/cart?sort=' + sortBy);
        }
        else {
            res.redirect('/products/cart');
        }
    })
        .catch(err => {
        debugger;
        next();
    });
}
exports.getAddRemoveProductToCart = getAddRemoveProductToCart;
function getCartProducts(req, res, next) {
    access_controller_1.default(req, res, next, {
        isLogged: true,
        roles: { user: 1, admin: 1 }
    });
    req.userLogged.repo.getCart().then(basket => {
        return basket.getItem();
    }).then(arrItems => {
        const _arrItems = arrItems.map(itm => {
            const product = new models_product_1.default(itm.title, itm.price, date_1.unixToDateHR(Number(itm.prodDate)), itm.description, itm.image, itm.id);
            product.quantity = itm.cart_product.quantity;
            return product;
        });
        models_product_1.default.sort(_arrItems, req.query.sort);
        res.render('products/added-cart', {
            userLogged: req['userLogged'],
            arrProducts: _arrItems,
            ERR: req.query.err || '',
            CONT: req.query.cont || '',
            prodId: req.query.prodId || '',
            sort: req.query.sort
        });
    })
        .catch(err => {
        debugger;
        next();
    });
}
exports.getCartProducts = getCartProducts;
function getBuy(req, res, next) {
    access_controller_1.default(req, res, next, {
        isLogged: true,
        roles: { user: 1, admin: 1 }
    });
    let arrCartItems;
    let arrOrderItems = [];
    let cart;
    req.userLogged.repo.getCart().then(_cart => {
        cart = _cart;
        return _cart.getItem();
    })
        .then(_arrItems => {
        arrCartItems = _arrItems;
        return req.userLogged.repo.createOrder();
    })
        .then(_order => {
        arrCartItems.forEach(_itm => {
            arrOrderItems.push(_order.addProduct(_itm, { through: { quantity: _itm.cart_product.quantity } }));
            cart.removeItem(_itm);
        });
        return Promise.all(arrOrderItems);
    })
        .then(_arrOrderItems => {
        debugger;
    })
        .catch(_err => {
        console.log('error');
    });
    next();
}
exports.getBuy = getBuy;
//# sourceMappingURL=controllers-products.js.map