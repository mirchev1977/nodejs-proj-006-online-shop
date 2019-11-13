"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_user_1 = __importDefault(require("../repositories/repositories-user"));
const repositories_login_1 = __importDefault(require("../repositories/repositories-login"));
const models_login_1 = __importDefault(require("./models-login"));
class User {
    constructor(names, email, password, passwordRepeat, id = 0) {
        if (password !== passwordRepeat) {
            throw new Error("Password and Password Repeat do not match.");
        }
        this.id = id;
        this.names = names;
        this.email = email;
        this.password = password;
        this.role = 'user';
        return this;
    }
    create() {
        const promise = new Promise((resolve, reject) => {
            repositories_user_1.default.create({
                names: this.names,
                email: this.email,
                password: this.password,
                role: this.role,
            }).then(usr => {
                usr.createCart();
                return Promise.resolve(usr);
            }).then(usr => {
                const login = new models_login_1.default(usr);
                return login.createLogin();
            }).then(loginToken => {
                this.loginToken = loginToken;
                resolve(this);
            }).catch(err => {
                console.log('User cannot be created...', err);
                reject('User cannot be created...');
            });
        });
        return promise;
    }
    static findByEmailPassword(email, password) {
        const promise = new Promise((resolve, reject) => {
            let userCreated;
            repositories_user_1.default.findAll({
                where: {
                    email: email,
                    password: password
                }
            }).then(users => {
                userCreated = new User(users[0].names, users[0].email, users[0].password, users[0].password, users[0].id);
                userCreated.role = users[0].role;
                const login = new models_login_1.default(users[0]);
                return login.createLogin();
            }).then(loginToken => {
                userCreated.loginToken = loginToken;
                resolve(userCreated);
            }).catch(err => {
                reject(err);
            });
        });
        return promise;
    }
    static findByToken(token) {
        const promise = new Promise((resolve, reject) => {
            repositories_user_1.default.findAll({
                include: [{
                        model: repositories_login_1.default,
                        where: { token: token }
                    }]
            }).then(usrsArr => {
                const usr = usrsArr[0];
                const user = new User(usr.names, usr.email, usr.password, usr.password, usr.id);
                user.role = usr.role;
                user['repo'] = usr;
                resolve(user);
            }).catch(err => {
                reject('There is no such user...');
            });
        });
        return promise;
    }
    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
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
    set role(role) {
        this._role = role;
    }
    get role() {
        return this._role;
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