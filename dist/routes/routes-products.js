"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllersProducts = __importStar(require("../controllers/controllers-products"));
const router = express_1.default.Router();
router.get('/all', controllersProducts.getAllProducts);
router.get('/mine', controllersProducts.getMyProducts);
router.get('/add-remove/:id', controllersProducts.getAddRemoveProductToCart);
router.get('/cart', controllersProducts.getCartProducts);
router.get('/buy', controllersProducts.getBuy);
router.get('/ordered', controllersProducts.getOrderItems);
exports.default = router;
//# sourceMappingURL=routes-products.js.map