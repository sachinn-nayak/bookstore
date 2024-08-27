"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../../domain/db/config/config"));
const configBasedOnEnvironment = config_1.default[process.env.environment ? process.env.environment : 'development'];
const postgresConnection = new sequelize_1.Sequelize(configBasedOnEnvironment.database, configBasedOnEnvironment.username, configBasedOnEnvironment.password, {
    host: configBasedOnEnvironment.host,
    dialect: configBasedOnEnvironment.dialect,
    pool: {
        max: configBasedOnEnvironment.pool.max,
        min: configBasedOnEnvironment.pool.min,
        acquire: configBasedOnEnvironment.pool.acquire,
        idle: configBasedOnEnvironment.pool.idle,
    },
    define: {
        freezeTableName: true,
    },
});
exports.default = postgresConnection;
//# sourceMappingURL=PostgresConnector.js.map