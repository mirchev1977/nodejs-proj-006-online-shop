"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_product_1 = __importDefault(require("../repositories/repositories-product"));
const date_1 = require("../utils/date");
class Product {
    constructor(title, price, prodDate, description, image, id = 0) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.prodDate = prodDate;
        this.description = description;
        this.image = image;
    }
    create(userRepo) {
        const promise = new Promise((resolve, reject) => {
            repositories_product_1.default.create({
                title: this.title,
                price: this.price,
                prodDate: this.prodUnixDate,
                description: this.description,
                image: this.image,
                userId: userRepo.id
            }).then(product => {
                resolve(this);
            }).catch(err => {
                reject(err);
            });
        });
        return promise;
    }
    static getAll() {
        const promise = new Promise((resolve, reject) => {
            repositories_product_1.default.findAll().then(arrProducts => {
                const _arrProducts = [];
                arrProducts.forEach(_prod => {
                    let _prodct;
                    let _prodDate = date_1.unixToDateHR(_prod.prodDate);
                    try {
                        _prodct = new Product(_prod.title, _prod.price, _prodDate, _prod.description, _prod.image, _prod.id);
                    }
                    catch (err) {
                        reject(err);
                    }
                    _arrProducts.push(_prodct);
                });
                resolve(_arrProducts);
            }).catch(errMess => {
                reject(errMess);
            });
        });
        return promise;
    }
    set id(id) {
        if (typeof id !== 'number')
            throw new Error('id should be number');
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set title(title) {
        if (typeof title !== 'string')
            throw new Error('title should be string');
        this._title = title;
    }
    get title() {
        return this._title;
    }
    set price(price) {
        price = price * 1;
        if (Number.isNaN(price))
            throw new Error('Price should be number');
        if (typeof price !== 'number')
            throw new Error('Price should be number');
        this._price = price;
    }
    get price() {
        return this._price;
    }
    set prodDate(prodDate) {
        this._prodDate = date_1.dateHRtoUnix(prodDate);
    }
    get prodDate() {
        return date_1.unixToDateHR(Number(this._prodDate));
    }
    get prodUnixDate() {
        return Number(this._prodDate);
    }
    set description(description) {
        if (typeof description !== 'string')
            throw new Error('Description should be string');
        this._description = description;
    }
    get description() {
        return this._description;
    }
    set image(image) {
        if (typeof image !== 'string')
            throw new Error('Image should be string');
        this._image = image;
    }
    get image() {
        return this._image;
    }
}
exports.default = Product;
//# sourceMappingURL=models-product.js.map