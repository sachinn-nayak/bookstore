const UrlConstants = {
    baseEndpoint: "/book-store",
    swaggerEndpoint: "/api-docs",
    userEndpoint: {
      authenticate: "/authenticate",
    },
    bookEndpoint: {
      createBook: "/books",
      getBook: "/books/:id",
      getAllBooks: "/books",
      updateBook: "/books/:id",
      deleteBook: "/books/:id",
    },
  };
  export default UrlConstants;
  