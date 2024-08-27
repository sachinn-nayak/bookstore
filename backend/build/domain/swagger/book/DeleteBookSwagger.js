"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteBook = {
    tags: ["Books"],
    summary: "Delete a particular Book, this api can be accessed only by admins",
    description: "here book can deleted by Id",
    produces: ["application/json"],
    security: [
        {
            jwt: [],
        },
    ],
    parameters: [
        {
            name: "jwt",
            in: "header",
            type: "string",
            required: true,
            description: "token to be passed as a header",
        },
        {
            name: "id",
            in: "path",
            description: "book id, which needs to be deleted",
            required: true,
            type: "string",
            example: 1,
        },
    ],
    responses: {
        "200": {
            description: "success response",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            code: 200,
                            message: "book deleted successfully",
                        },
                    },
                },
            },
        },
        "400": {
            description: "error response",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            code: 400,
                            message: "invalid id",
                        },
                    },
                },
            },
        },
    },
};
exports.default = deleteBook;
//# sourceMappingURL=DeleteBookSwagger.js.map