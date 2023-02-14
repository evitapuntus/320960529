"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controller/users.controller");
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const users = yield (0, users_controller_1.getUsers)((_b = (_a = req.query) === null || _a === void 0 ? void 0 : _a.username) === null || _b === void 0 ? void 0 : _b.toString(), (_d = (_c = req.query) === null || _c === void 0 ? void 0 : _c.password) === null || _d === void 0 ? void 0 : _d.toString());
        res.status(200).json({ users: users });
    }
    catch (error) {
        res.status(500).send("internal server error");
    }
}));
routes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        console.log(user);
        const users = yield (0, users_controller_1.addUser)(user);
        res.status(200).json({ users: users });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = routes;
