import express, { Request, Response } from "express";
import UrlConstants from "../../domain/constants/url-constants/UrlConstants";
import CreateBookUseCase from "./create-book/CreateBookUseCase";
import DeleteBookUseCase from "./delete-book/DeleteBookUseCase";
import GetAllBooksUseCase from "./get-all-books/GetAllBooksUseCase";
import GetBookUseCase from "./get-book/GetBookUseCase";
import UpdateBookUseCase from "./update-book/UpdateBookUseCase";


const router = express.Router();

router.post(
  `${UrlConstants.bookEndpoint.createBook}`,
  async (request: Request, response: Response) => {
    const createBookUseCase = CreateBookUseCase.create(request, response);
    await createBookUseCase.executeAndHandleErrors();
  }
);

router.delete(
  `${UrlConstants.bookEndpoint.deleteBook}`,
  async (request: Request, response: Response) => {
    const deleteBookUseCase = DeleteBookUseCase.delete(request, response);
    await deleteBookUseCase.executeAndHandleErrors();
  }
);

router.get(
  `${UrlConstants.bookEndpoint.getAllBooks}`,
  async (request: Request, response: Response) => {
    const getAllBooksUseCase = GetAllBooksUseCase.get(request, response);
    await getAllBooksUseCase.executeAndHandleErrors();
  }
);

router.get(
  `${UrlConstants.bookEndpoint.getBook}`,
  async (request: Request, response: Response) => {
    const getBookUseCase = GetBookUseCase.get(request, response);
    await getBookUseCase.executeAndHandleErrors();
  }
);

router.put(
  `${UrlConstants.bookEndpoint.updateBook}`,
  async (request: Request, response: Response) => {
    const updateBookUseCase = UpdateBookUseCase.update(request, response);
    await updateBookUseCase.executeAndHandleErrors();
  }
);

export default router;
