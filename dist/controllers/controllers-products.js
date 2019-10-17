"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllProducts(req, res, next) {
    res.render('products/all', { usr: {}, userLogged: req['userLogged'] });
}
exports.getAllProducts = getAllProducts;
//# sourceMappingURL=controllers-products.js.map