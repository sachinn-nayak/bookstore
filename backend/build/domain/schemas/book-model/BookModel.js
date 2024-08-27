"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes, Sequelize } = require("sequelize");
const sequelize_1 = require("sequelize");
const PostgresConnector_1 = __importDefault(require("../../../core/postgres/PostgresConnector"));
class BookModel extends sequelize_1.Model {
}
BookModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    yearOfPublication: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize: PostgresConnector_1.default,
    modelName: "books",
    tableName: "books",
});
exports.default = BookModel;
//# sourceMappingURL=BookModel.js.map