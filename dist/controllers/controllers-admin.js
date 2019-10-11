"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const access_controller_1 = __importDefault(require("../utils/access_controller"));
function getAdminAddProduct(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    res.render('admin/product-add', { usr: {}, userLogged: req['userLogged'] });
}
exports.getAdminAddProduct = getAdminAddProduct;
function postAdminAddProduct(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    res.render('admin/product-add', { usr: {}, userLogged: req['userLogged'] });
}
exports.postAdminAddProduct = postAdminAddProduct;
//# sourceMappingURL=controllers-admin.js.map