"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = express_1.default();
const rootDir = path_1.default.dirname(process.mainModule.filename);
app.use(express_1.default.static(path_1.default.join(rootDir, 'public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.use((req, res, next) => {
    res.render('404');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
//# sourceMappingURL=app.js.map