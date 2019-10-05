"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const root_dir_1 = __importDefault(require("./utils/root-dir"));
const routes_user_1 = __importDefault(require("./routes/routes-user"));
const sequelize = require('./utils/database');
const repositories_1 = __importDefault(require("./repositories/repositories"));
const settings_1 = __importDefault(require("./utils/settings"));
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(root_dir_1.default, 'public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.set('view engine', 'pug');
app.set('views', 'src/views');
repositories_1.default();
app.use(express_session_1.default({ secret: 'one' }));
// make user authentication
app.use(settings_1.default.userLogin);
app.use('/', routes_user_1.default);
app.get('/', (req, res, next) => {
    res.render('home');
});
app.use((req, res, next) => {
    res.render('404');
});
sequelize.sync().then(result => {
    app.listen(process.env.PORT || 3000, () => {
        console.log('Listening on port 3000');
    });
}).catch(err => {
    console.log(err);
});
//# sourceMappingURL=app.js.map