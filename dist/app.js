"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const rootDir = path_1.default.dirname(process.mainModule.filename);
app.use(express_1.default.static(path_1.default.join(rootDir, 'public')));
app.set('view engine', 'pug');
app.set('views', 'src/views');
app.get('/', (req, res, next) => {
    res.render('hello-world');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});
//# sourceMappingURL=app.js.map