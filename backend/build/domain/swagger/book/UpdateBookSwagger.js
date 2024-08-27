"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const updateBook = {
    tags: ["Books"],
    summary: "Update a particular book, this api can be accessed only by admins",
    description: "Update a particular book.",
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
            description: "book id, which needs to be fetched",
            required: true,
            type: "string",
        },
    ],
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    example: {
                        title: "Wings Of Fire",
                        author: "A.P.J.Abdul Kalam",
                        description: "APJ Abdul Kalam's autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes.",
                        yearOfPublication: "1999/02/10",
                    },
                },
            },
        },
    },
    responses: {
        "200": {
            description: "success ressponse",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            code: 200,
                            message: "book updated successfully",
                            data: {
                                id: 1,
                                title: "Wings Of Fire",
                                author: "A.P.J.Abdul Kalam",
                                description: "APJ Abdul Kalam's autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes. It tells the narrative of a young boy from a poor family who rose through the ranks of Indian space research and missile programmes to become the country's president.",
                                yearOfPublication: "1999-02-10",
                                "updatedAt": "2023-06-01T12:28:41.396Z",
                                "createdAt": "2023-06-01T12:28:41.396Z"
                            },
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
                            message: "Record not found to update",
                        },
                    },
                },
            },
        },
    },
};
exports.default = updateBook;
//# sourceMappingURL=UpdateBookSwagger.js.map