"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Login {
    constructor(user) {
        this.user = user;
    }
    _createUserLogin() {
        return this.user.createLogin({
            token: `${this.user['password']}${this.user['email']}`
        });
    }
    createLogin() {
        const promise = new Promise((resolve, reject) => {
            this._createUserLogin().then(login => {
                console.log(`LoginToken: ${login['token']}`);
                resolve(login['token']);
            }).catch(err => {
                reject(`Cannot create Login: ${err}`);
            });
        });
        return promise;
    }
}
exports.default = Login;
//# sourceMappingURL=models-login.js.map