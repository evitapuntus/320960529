"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.getUsers = void 0;
const __1 = require("../..");
const getUsers = (username = '', password = '') => {
    const selectAll = `SELECT * FROM users `;
    const query = (username && password) ? `WHERE username='${username}' AND password=${password}` : '';
    return new Promise((resolve, reject) => {
        __1.con.query(selectAll + query, (error, elements) => {
            if (error)
                return reject(error);
            return resolve(elements);
        });
    });
};
exports.getUsers = getUsers;
const addUser = (user) => {
    return new Promise((resolve, reject) => {
        __1.con.query(`INSERT INTO 
        users (username, email, password, age, city, male, img)
        VALUES (?) `, [(Object.values(user))], (err, result) => {
            if (err)
                return reject(err);
            return resolve(result);
        });
    });
};
exports.addUser = addUser;
