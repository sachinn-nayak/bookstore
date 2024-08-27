import { Request, Response } from "express";
import BookRepository from "../../../repositories/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import createBookJoiValidation from "./CreateBookJoiValidation";
import { successMessages } from "../../../domain/constants/messages/successMessages";

class CreateBookUseCase extends BaseUseCase {
  private bookRepository: BookRepository;
  private requestBody: RequestModel.CreateBook;

  constructor(
    request: Request,
    response: Response,
    bookRepository: BookRepository
  ) {
    super(request, response);
    this.request = request;
    this.response = response;
    this.bookRepository = bookRepository;
  }

  validate(): void {
    super.validate();
    this.requestBody = this.request.body;
    this.joiValidationUtil(this.joiValidate(), this.requestBody);
  }

  joiValidate(): object {
    return createBookJoiValidation;
  }

  public async execute(): Promise<ResponseModel.ResponseWithData> {
    let responseBody: ResponseModel.ResponseWithData;
    let book: any;

    try {
      await this.authenticateAdmin()
      this.validate();
      book = await this.bookRepository.add(this.request.body);

      responseBody = {
        code: 200,
        message: successMessages.BOOK_CREATED_SUCCESSFULLY,
        data: book,
      };

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static create(request: Request, response: Response) {
    const createBookUseCase = new CreateBookUseCase(
      request,
      response,
      new BookRepository()
    );
    return createBookUseCase;
  }
}

export default CreateBookUseCase;
