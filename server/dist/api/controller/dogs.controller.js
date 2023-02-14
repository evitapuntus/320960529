"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDog = exports.addDog = exports.getDogs = void 0;
const __1 = require("../..");
const getDogs = () => {
    const selectAll = `SELECT * FROM dogs `;
    return new Promise((resolve, reject) => {
        __1.con.query(selectAll, (error, elements) => {
            if (error)
                return reject(error);
            return resolve(elements);
        });
    });
};
exports.getDogs = getDogs;
const addDog = (dog) => {
    return new Promise((resolve, reject) => {
        __1.con.query(`INSERT INTO
        dogs (name, kind, age, protections, male, images, ownerId)
        VALUES (?) `, [(Object.values(dog))], (err, result) => {
            if (err)
                return reject(err);
            return resolve(result);
        });
    });
};
exports.addDog = addDog;
const deleteDog = (dogId) => {
    return new Promise((resolve, reject) => {
        __1.con.query(`DELETE FROM dogs
        WHERE id=${dogId}`, (err, result) => {
            if (err)
                return reject(err);
            return resolve(result);
        });
    });
};
exports.deleteDog = deleteDog;
