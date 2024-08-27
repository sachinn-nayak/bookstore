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
            description:
              "APJ Abdul Kalam's autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes.",
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
              "code": 200,
              "message": "Book updated successfully",
              "data": {
                "id": 1,
                "title": "Wings Of Fire",
                "author": "A.P.J.Abdul Kalam",
                "description": "APJ Abdul Kalam's autobiography, Wings of Fire, covers his early life as well as his role in Indian space research and missile programmes.",
                "yearOfPublication": "1999-02-10",
                "createdAt": "2023-07-25T14:56:27.982Z",
                "updatedAt": "2023-07-26T04:15:07.202Z"
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

export default updateBook;
