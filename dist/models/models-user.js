"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_user_1 = __importDefault(require("../repositories/repositories-user"));
class User {
    constructor(names, email, password, passwordRepeat) {
        if (password !== passwordRepeat) {
            throw new Error("Password and Password Repeat do not match.");
        }
        this.names = names;
        this.email = email;
        this.password = password;
        return this;
    }
    create() {
        const promise = new Promise((resolve, reject) => {
            repositories_user_1.default.create({
                names: this.names,
                email: this.email,
                password: this.password
            }).then(usr => {
                console.log('User Created: ', usr);
                return usr.createLogin({
                    token: `${usr.password}${usr.email}`
                });
            }).then(login => {
                console.log('Login Created: ', login);
                resolve(this);
            }).catch(err => {
                console.log('User cannot be created...', err);
                reject('User cannot be created...');
            });
        });
        return promise;
    }
    set names(names) {
        if (names.length < 2) {
            throw new Error("Name should be longer and equal to 2 characters.");
        }
        this._names = names;
    }
    get names() {
        return this._names;
    }
    set email(email) {
        if (!email.match(/[a-zA-Z0-9\.\-]+\@[a-zA-Z0-9\.\-]+\.[a-zA-Z0-9]{2,5}/)) {
            throw new Error("Please, enter a valid email address!");
        }
        this._email = email;
    }
    get email() {
        return this._email;
    }
    set password(password) {
        if (password.length < 5) {
            throw new Error("Please, make the length of your password at least 5 symbols long!");
        }
        if (!password.match(/[A-Z]/)) {
            throw new Error("Your password has to contain at least one capital letter.");
        }
        if (!password.match(/[0-9]/)) {
            throw new Error("Your password has to contain at least one digit.");
        }
        if (!password.match(/[a-z]/)) {
            throw new Error("Your password has to contain at least one lower-case letter.");
        }
        this._password = password;
    }
    get password() {
        return this._password;
    }
}
exports.default = User;
//# sourceMappingURL=models-user.js.map