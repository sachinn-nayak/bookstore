import * as dotenv from "dotenv";
dotenv.config();
import authentication from "../../domain/swagger/user/AuthenticationSwagger";
import createBook from "../../domain/swagger/book/CreateBookSwagger";
import deleteBook from "../../domain/swagger/book/DeleteBookSwagger";
import getAllBooks from "../../domain/swagger/book/GetAllBooksSwagger";
import getBook from "../../domain/swagger/book/GetBookSwagger";
import updateBook from "../../domain/swagger/book/UpdateBookSwagger";

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
        post: authentication,
      },
      "/book-store/books": {
        post: createBook,
        get: getAllBooks,
      },
      "/book-store/books/{id}": {
        get: getBook,
        put: updateBook,
        delete: deleteBook,
      },
    },
  },
  apis: ["./src/app.ts", "./src/api/*/*.ts"],
};

export default swaggerOptions;
