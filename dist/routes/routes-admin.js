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
const controllersUser = __importStar(require("../controllers/controllers-admin"));
const router = express_1.default.Router();
router.get('/product/new', controllersUser.getAdminAddProduct);
router.post('/product/new', controllersUser.postAdminAddProduct);
router.get('/product/edit/:id', controllersUser.getAdminEditProduct);
exports.default = router;
//# sourceMappingURL=routes-admin.js.map