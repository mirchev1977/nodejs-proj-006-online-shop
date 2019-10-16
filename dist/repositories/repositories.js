"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repositories_user_1 = __importDefault(require("./repositories-user"));
const repositories_login_1 = __importDefault(require("./repositories-login"));
const repositories_product_1 = __importDefault(require("./repositories-product"));
function createRelations() {
    repositories_login_1.default.belongsTo(repositories_user_1.default, { constraints: true, onDelete: "CASCADE" });
    repositories_user_1.default.hasMany(repositories_login_1.default);
    repositories_product_1.default.belongsTo(repositories_user_1.default, { constraints: true, onDelete: "CASCADE" });
    repositories_user_1.default.hasMany(repositories_product_1.default);
}
exports.default = createRelations;
//# sourceMappingURL=repositories.js.map