"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_user_1 = __importDefault(require("../models/models-user"));
const userLogin = (req, res, next) => {
    if ((req['session']
        && req['session']['loginToken'])) {
        models_user_1.default.findByToken(req['session']['loginToken']).then(user => {
            req['userLogged'] = user;
            next();
        }).catch(str => {
            req['session'].destroy();
            next();
        });
    }
    else {
        next();
    }
};
const settings = {
    userLogin: userLogin
};
exports.default = settings;
//# sourceMappingURL=settings.js.map