"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_user_1 = __importDefault(require("../models/models-user"));
function getUsrRegister(req, res, next) {
    res.render('user/register', { usr: {} });
}
exports.getUsrRegister = getUsrRegister;
function postUsrRegister(req, res, next) {
    try {
        new models_user_1.default(req.body['names'], req.body['email'], req.body['password'], req.body['password_repeat']).create().then(usr => {
            res.render('user/registered');
        }).catch(errMessage => {
            res.render('user/register', { usr: req.body, ERR: errMessage });
        });
    }
    catch (errMsg) {
        res.render('user/register', { usr: req.body, ERR: errMsg });
    }
}
exports.postUsrRegister = postUsrRegister;
//# sourceMappingURL=controllers-user.js.map