"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.con = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dbhandler_1 = __importDefault(require("./api/routes/dbhandler"));
const mysql_1 = __importDefault(require("mysql"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./api/routes/users"));
const dogs_1 = __importDefault(require("./api/routes/dogs"));
const app = (0, express_1.default)();
const port = 8080;
exports.con = mysql_1.default.createConnection({
    // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
    host: "localhost",
    user: "root",
    password: "root",
    database: "web"
});
exports.con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected to DB!");
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/db', dbhandler_1.default);
app.use('/users', users_1.default);
app.use('/dogs', dogs_1.default);
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
