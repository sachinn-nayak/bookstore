"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllBooks = {
    tags: ["Books"],
    summary: "Get all books, this api can be accessed only by admins",
    description: "Get all books",
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
            name: "index",
            in: "query",
            type: "string",
            required: false,
            description: "please enter page index as query to fetch list of books",
        },
        {
            name: "size",
            in: "query",
            type: "string",
            required: false,
            description: "please enter page size as query to fetch list of books",
        },
        {
            name: "searchKey",
            in: "query",
            type: "string",
            required: false,
            description: "please enter search key as query to fetch list of books which matches the searchKey with title, author, description",
        },
        {
            name: "sortingKey",
            in: "query",
            type: "string",
            required: false,
            description: "please enter sorting key as query to fetch list of books based on particular key such as title, author, description",
        },
        {
            name: "sortingValue",
            in: "query",
            type: "string",
            required: false,
            description: "please enter sorting value as query to fetch list of books based on Ascending, Descending order",
            example: "ASC"
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
                            message: "book fetched successfully",
                            data: [
                                {
                                    "id": 1,
                                    "title": "Wings Of Fire",
                                    "author": "A.P.J.Abdul Kalam",
                                    "description": "APJ Abdul Kalam's autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes.",
                                    "yearOfPublication": "1999-01-01",
                                    "createdAt": "2023-07-25T14:56:27.982Z",
                                    "updatedAt": "2023-07-25T14:56:27.985Z"
                                },
                                {
                                    "id": 2,
                                    "title": "Playing It My Way",
                                    "author": "Boria Majumdar",
                                    "description": "Playing It My Way is the autobiography of former Indian cricketer Sachin Tendulkar.",
                                    "yearOfPublication": "2014-11-05",
                                    "createdAt": "2023-07-25T16:09:31.829Z",
                                    "updatedAt": "2023-07-25T16:09:31.846Z"
                                },
                            ],
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
                            message: "error",
                        },
                    },
                },
            },
        },
    },
};
exports.default = getAllBooks;
//# sourceMappingURL=GetAllBooksSwagger.js.map