"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const entities_user_1 = __importDefault(require("../entities/entities-user"));
function getUsrRegister(req, res, next) {
    res.render('user/register');
}
exports.getUsrRegister = getUsrRegister;
function postUsrRegister(req, res, next) {
    const usr = new entities_user_1.default(req.body['names'], req.body['email'], req.body['password'], req.body['password_repeat']);
    console.log('success: ', usr);
    res.render('user/registered');
}
exports.postUsrRegister = postUsrRegister;
//# sourceMappingURL=controllers-user.js.map