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
const fs = require("fs");
const express_1 = require("express");
const dogs_controller_1 = require("../controller/dogs.controller");
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dogs = yield (0, dogs_controller_1.getDogs)();
        res.status(200).json({ dogs: dogs });
    }
    catch (error) {
        res.status(500).send(`internal server error, ${error}`);
    }
}));
routes.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dog = req.body;
        fs.readFile(dog.images, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
            const newDog = Object.assign(Object.assign({}, dog), { images: data });
            const dogs = yield (0, dogs_controller_1.addDog)(newDog);
            res.status(200).json({ dogs: dogs });
        }));
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
routes.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const dogs = yield (0, dogs_controller_1.deleteDog)(id);
        res.status(200).json({ dogs: dogs });
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
exports.default = routes;
