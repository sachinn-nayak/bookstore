const { DataTypes, Sequelize } = require("sequelize");
import { Model } from "sequelize";
import postgresConnection from "../../../core/postgres/PostgresConnector";

class BookModel extends Model { }

BookModel.init(
    {
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
    },
    {
        sequelize: postgresConnection,
        modelName: "books",
        tableName: "books",
    }
);

export default BookModel;
