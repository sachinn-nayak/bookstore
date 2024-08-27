const getBook = {
    tags: ["Books"],
    summary: "Get a particular book, this api can be accessed only by admins",
    description: "Get a particular book.",
    produces: ["application/json"],
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
                message: "Book fetched successfully",
                data: {
                  id: 7,
                  title: "The Art of Happinesss",
                  author: "14th Dalai Lama",
                  description:
                    "Discover the path to true happiness and enlightenment with this inspiring and practical guidebook. Eckhart Tolle's message about living in the present ..",
                  publicationYear: "1998-12-01",
                  createdAt: "2023-06-01T12:28:41.396Z",
                  updatedAt: "2023-06-01T12:28:41.396Z",
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
                message: "error",
              },
            },
          },
        },
      },
    },
  };
  
  export default getBook;
  