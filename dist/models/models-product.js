"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_product_1 = __importDefault(require("../repositories/repositories-product"));
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
                prodDate: this.prodDate,
                description: this.description,
                image: this.image,
                userId: userRepo.id
            })
                .then(product => {
                userRepo.createProduct(product);
                resolve(this);
            }).catch(err => {
                console.log('Product cannot be created...', err);
                reject('Product cannot be created...');
            });
        });
        return promise;
    }
    static getAll() {
        const promise = new Promise((resolve, reject) => {
            repositories_product_1.default.findAll().then(arrProducts => {
                const _arrProducts = [];
                arrProducts.forEach(_prod => {
                    _arrProducts.push(new Product(_prod.title, _prod.price, _prod.prodDate, _prod.description, _prod.image, _prod.image));
                });
                resolve(_arrProducts);
            }).catch(errMess => {
                reject(errMess);
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
    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }
    set price(price) {
        this._price = price;
    }
    get price() {
        return this._price;
    }
    set prodDate(prodDate) {
        this._prodDate = prodDate;
    }
    get prodDate() {
        return this._prodDate;
    }
    set description(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }
    set image(image) {
        this._image = image;
    }
    get image() {
        return this._image;
    }
}
exports.default = Product;
//# sourceMappingURL=models-product.js.map