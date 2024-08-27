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
/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");
const roleEnum = {
    ADMIN: "1001",
    USER: "1002",
};
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        const password = "bookStore@123";
        const salt = yield bcrypt.genSalt(10);
        const hashedPassworrd = yield bcrypt.hash(password, salt);
        yield queryInterface.bulkInsert("users", [
            //seeding admin
            {
                name: "Dayesh",
                email: "dayesh1996@gmail.com",
                password: hashedPassworrd,
                role: roleEnum.ADMIN,
            },
            //seeding client
            {
                name: "John Wick",
                email: "john47@gmail.com",
                password: hashedPassworrd,
                role: roleEnum.USER,
            },
        ], { returning: ["id"] });
    }),
    down: (queryInterface, Sequelize) => { },
};
//# sourceMappingURL=20230725082359-users.js.map