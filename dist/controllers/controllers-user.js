"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_user_1 = __importDefault(require("../models/models-user"));
const access_controller_1 = __importDefault(require("../utils/access_controller"));
function getUsrRegister(req, res, next) {
    access_controller_1.default(req, res, next, { isLogged: true,
        roles: { admin: 1 } });
    res.render('user/register', { usr: {}, userLogged: req['userLogged'] });
}
exports.getUsrRegister = getUsrRegister;
function postUsrRegister(req, res, next) {
    try {
        new models_user_1.default(req.body['names'], req.body['email'], req.body['password'], req.body['password_repeat']).create().then(usr => {
            res.render('user/registered', { loginToken: usr.loginToken });
        }).catch(errMessage => {
            res.render('user/register', { usr: req.body, ERR: errMessage });
        });
    }
    catch (errMsg) {
        res.render('user/register', { usr: req.body, ERR: errMsg });
    }
}
exports.postUsrRegister = postUsrRegister;
function getUsrLogin(req, res, next) {
    res.render('user/login', { usr: {}, userLogged: req['userLogged'] });
}
exports.getUsrLogin = getUsrLogin;
function postUsrLogin(req, res, next) {
    models_user_1.default.findByEmailPassword(req.body['email'], req.body['password']).then(user => {
        req.session['loginToken'] = user.loginToken;
        res.render('user/loggedIn', { loginToken: user.loginToken,
            path: req.body['path'] });
    }).catch(errMessage => {
        errMessage = 'Wrong Username or Password...';
        res.render('user/login', { usr: req.body, ERR: errMessage });
    });
}
exports.postUsrLogin = postUsrLogin;
//# sourceMappingURL=controllers-user.js.map