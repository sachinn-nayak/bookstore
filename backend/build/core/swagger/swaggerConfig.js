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
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const AuthenticationSwagger_1 = __importDefault(require("../../domain/swagger/user/AuthenticationSwagger"));
const CreateBookSwagger_1 = __importDefault(require("../../domain/swagger/book/CreateBookSwagger"));
const DeleteBookSwagger_1 = __importDefault(require("../../domain/swagger/book/DeleteBookSwagger"));
const GetAllBooksSwagger_1 = __importDefault(require("../../domain/swagger/book/GetAllBooksSwagger"));
const GetBookSwagger_1 = __importDefault(require("../../domain/swagger/book/GetBookSwagger"));
const UpdateBookSwagger_1 = __importDefault(require("../../domain/swagger/book/UpdateBookSwagger"));
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Books API Management",
            version: "1.0.0",
            description: "Books API Management",
        },
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        components: {
            securitySchemes: {
                jwt: {
                    type: "http",
                    scheme: "bearer",
                    in: "header",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                jwt: [],
            },
        ],
        servers: [
            {
                url: "http://localhost:" + process.env.port,
                description: "Local server",
            },
            {
                url: "http://3.128.200.42:3000",
                description: "development server",
            },
        ],
        paths: {
            "/book-store/authenticate": {
                post: AuthenticationSwagger_1.default,
            },
            "/book-store/books": {
                post: CreateBookSwagger_1.default,
                get: GetAllBooksSwagger_1.default,
            },
            "/book-store/books/{id}": {
                get: GetBookSwagger_1.default,
                put: UpdateBookSwagger_1.default,
                delete: DeleteBookSwagger_1.default,
            },
        },
    },
    apis: ["./src/app.ts", "./src/api/*/*.ts"],
};
exports.default = swaggerOptions;
//# sourceMappingURL=swaggerConfig.js.map