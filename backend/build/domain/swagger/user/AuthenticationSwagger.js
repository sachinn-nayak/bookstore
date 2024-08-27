"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication = {
    tags: ["Authentication"],
    summary: "Generate login token for a user.",
    description: "Generate login token for a user, your password must be at least 8 characters long, contain at least one number, one special character and have a mixture of uppercase and lowercase letters",
    requestBody: {
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    example: {
                        email: "dayesh1996@gmail.com",
                        password: "bookStore@123",
                    },
                },
            },
        },
    },
    produces: ["application/json"],
    parameters: [],
    responses: {
        "200": {
            description: "Fetching user with an id",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
                            "code": 200,
                            "data": {
                                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjoxLCJlbWFpbCI6ImRheWVzaDE5OTZAZ21haWwuY29tIiwicm9sZSI6IjEwMDEiLCJpc3N1ZWRBdCI6MTY5MDI5NjI0ODg0OSwiZXhwaXJlZEF0IjoxNjkwOTAxMDQ4ODQ5fSwiaWF0IjoxNjkwMjk2MjQ4LCJleHAiOjE2OTA5MDEwNDh9.kNbN4EEx2lifer6CMpLhu1iGJu6dSvKdhGHepcPnvYk",
                                "issuedAt": 1690296248849,
                                "expiredAt": 1690901048849,
                                "user": {
                                    "id": 1,
                                    "name": "Dayesh",
                                    "email": "dayesh1996@gmail.com",
                                    "role": "1001"
                                },
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
                            "code": 400,
                            "message": "password should be at least 8 characters long"
                        },
                    },
                },
            },
        },
    },
};
exports.default = authentication;
//# sourceMappingURL=AuthenticationSwagger.js.map