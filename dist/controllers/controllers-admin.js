"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_product_1 = __importDefault(require("../models/models-product"));
const access_controller_1 = __importDefault(require("../utils/access_controller"));
function getAdminAddProduct(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    res.render('admin/product-add', {
        usr: {},
        userLogged: req['userLogged'],
        prod: req.product || {},
        ERR: req.err || ""
    });
}
exports.getAdminAddProduct = getAdminAddProduct;
function postAdminAddProduct(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    let product;
    try {
        product = new models_product_1.default(req.body.title, req.body.price, req.body.prodDate, req.body.description, req.body.image);
    }
    catch (err) {
        req.product = req.body;
        req.err = err;
        getAdminAddProduct(req, res, next);
    }
    product.create(req.userLogged.repo).then(product => {
        res.redirect('/products/all');
    }).catch(err => {
        console.log('Error: ', err);
        req.product = product;
        req.err = 'There are some problems. Product cannot be created...';
        getAdminAddProduct(req, res, next);
    });
}
exports.postAdminAddProduct = postAdminAddProduct;
function getAdminEditProduct(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    models_product_1.default.getOneByPk((req.params.id * 1)).then(_product => {
        res.render('admin/product-edit', {
            usr: {},
            userLogged: req['userLogged'],
            prod: _product || {},
            ERR: req.err || ""
        });
    }).catch(_err => {
        res.redirect('/products/mine' + `?cont=1&err=${_err}`);
    });
}
exports.getAdminEditProduct = getAdminEditProduct;
function postAdminEditProduct(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    try {
        models_product_1.default.edit(new models_product_1.default(req.body.title, req.body.price, req.body.prodDate, req.body.description, req.body.image, req.body.id * 1)).then(prod => {
            res.redirect('/products/mine?prodId=container-product-' + prod.id);
        }).catch(err => {
            res.render('admin/product-edit', {
                usr: {},
                userLogged: req['userLogged'],
                prod: req.body || {},
                ERR: err || ""
            });
        });
    }
    catch (err) {
        res.render('admin/product-edit', {
            usr: {},
            userLogged: req['userLogged'],
            prod: req.body || {},
            ERR: err.message || ""
        });
    }
}
exports.postAdminEditProduct = postAdminEditProduct;
function getAdminDeleteProduct(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    models_product_1.default.delete(req.params.id)
        .then(_product => {
        res.redirect('/products/mine');
    }).catch(_err => {
        res.redirect('/products/mine' + `?cont=1&err=${_err}`);
    });
}
exports.getAdminDeleteProduct = getAdminDeleteProduct;
//# sourceMappingURL=controllers-admin.js.map