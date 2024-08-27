const CreateBook = {
  tags: ["Books"],
  summary: "Create a Book, this api can be accessed only by admins",
  description: "craete a book",
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
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          example: {
            title: "Wings Of Fire",
            author: "A.P.J.Abdul Kalam",
            description:
              "APJ Abdul Kalam's autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes. ",
            yearOfPublication: "1999/01/01",
          },
        },
      },
    },
  },
  responses: {
    "200": {
      description: "success response",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              "code": 200,
              "message": "Book created successfully",
              "data": {
                "createdAt": "2023-07-25T14:56:27.982Z",
                "updatedAt": "2023-07-25T14:56:27.985Z",
                "id": 1,
                "title": "Wings Of Fire",
                "author": "A.P.J.Abdul Kalam",
                "description": "APJ Abdul Kalam's autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes.",
                "yearOfPublication": "1999-01-01"
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
              "code": 401,
              "message": "Unauthorized"
            },
          },
        },
      },
    },
  },
};

export default CreateBook;
