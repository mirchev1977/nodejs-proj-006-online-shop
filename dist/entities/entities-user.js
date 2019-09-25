"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(names, email, password, passwordRepeat) {
        if (password !== passwordRepeat) {
            throw new Error("Password and Password Repeat do not match.");
        }
        this.names = names;
        this.email = email;
        this.password = password;
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
//# sourceMappingURL=entities-user.js.map