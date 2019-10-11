"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(req, res, next, opt) {
    if (opt.isLogged) {
        if (!req['userLogged']) {
            res.render('user/login', { usr: {}, path: req.originalUrl });
        }
        else if (!opt.roles[req.userLogged.role]) {
            res.render('user/login', {
                usr: {},
                path: req.originalUrl,
                ERR: 'You have to log in as ADМIN'
            });
        }
    }
}
exports.default = default_1;
//# sourceMappingURL=access_controller.js.map