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
exports.createAllDbs = exports.initDb = void 0;
const fs = require("fs");
const __1 = require("../..");
const users_1 = require("../../init-data/users");
const dogs_1 = require("../../init-data/dogs");
const users_controller_1 = require("./users.controller");
const dogs_controller_1 = require("./dogs.controller");
const initDb = () => {
    (0, exports.createAllDbs)();
    users_1.users.forEach(user => {
        fs.readFile(user.img, (err, data) => {
            const newUser = Object.assign(Object.assign({}, user), { img: data });
            (0, users_controller_1.addUser)(newUser);
        });
    });
    dogs_1.dogs.forEach((dog) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(dog.images);
        fs.readFile(dog.images, (err, data) => {
            const newDog = Object.assign(Object.assign({}, dog), { images: data });
            (0, dogs_controller_1.addDog)(newDog);
        });
    }));
};
exports.initDb = initDb;
const createAllDbs = () => {
    __1.con.query(`CREATE DATABASE web`, function (err, result) {
        if (err)
            console.log(`web DATABASE already exist`);
        else
            console.log(`web table created successfully`);
    });
    const createUsersTable = `CREATE TABLE users
    (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(100),
    age INT,
    city VARCHAR(100),
    male BOOLEAN,
    img LONGBLOB
    )`;
    const createDogsTable = `CREATE TABLE dogs
    (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    kind VARCHAR(100),
    age INT,
    protections VARCHAR(100),
    male BOOLEAN,
    images LONGBLOB,
    ownerId INT
    )`;
    createTableByQuery('users', createUsersTable);
    createTableByQuery('dogs', createDogsTable);
};
exports.createAllDbs = createAllDbs;
const createTableByQuery = (tableName, query) => {
    __1.con.query(`DROP TABLE ${tableName}`, function (err, result) {
        if (err)
            console.log(`Table ${tableName} does not found`);
        else
            console.log(`Table ${tableName} deleted`);
    });
    __1.con.query(query, function (err, result) {
        if (err)
            console.log(`Table ${tableName} already exist`);
        else
            console.log(`Table ${tableName} created`);
    });
};
