"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const swaggerConfig_1 = __importDefault(require("./core/swagger/swaggerConfig"));
dotenv.config();
const UrlConstants_1 = __importDefault(require("./domain/constants/url-constants/UrlConstants"));
const routes_1 = __importDefault(require("./api/books/routes"));
const routes_2 = __importDefault(require("./api/users/routes"));
const app = (0, express_1.default)();
const port = process.env.port || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerJsondoc = require("swagger-jsdoc");
const specs = swaggerJsondoc(swaggerConfig_1.default);
app.use(express_1.default.json());
app.use(`${UrlConstants_1.default.baseEndpoint}${UrlConstants_1.default.swaggerEndpoint}`, swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Book Store" });
});
app.get(`${UrlConstants_1.default.baseEndpoint}`, (req, res) => {
    res.json({ message: "Welcome to Book Store" });
});
app.use(`${UrlConstants_1.default.baseEndpoint}`, routes_1.default);
app.use(`${UrlConstants_1.default.baseEndpoint}`, routes_2.default);
app.get("*", (req, res) => {
    res.status(404).send("Invalid Endpoint");
});
const appListenCallBack = () => {
    try {
        console.log("Server started on port " + port);
    }
    catch (error) {
        console.log("Server error on port " + port + " with error " + error);
    }
};
app.listen(port, appListenCallBack);
exports.default = app;
//# sourceMappingURL=index.js.map