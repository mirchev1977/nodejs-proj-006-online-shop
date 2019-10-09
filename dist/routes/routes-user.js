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
const controllersUser = __importStar(require("../controllers/controllers-user"));
const router = express_1.default.Router();
router.get('/register', controllersUser.getUsrRegister);
router.post('/register', controllersUser.postUsrRegister);
router.get('/login', controllersUser.getUsrLogin);
router.post('/login', controllersUser.postUsrLogin);
router.get('/logout', controllersUser.getUsrLogout);
exports.default = router;
//# sourceMappingURL=routes-user.js.map