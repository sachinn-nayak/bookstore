import { Request, Response } from "express";
import HttpError from "standard-http-error";
import BookRepository from "../../../repositories/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import GetBookJoiValidation from "./GetBookJoiValidation";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import { failureMessages } from "../../../domain/constants/messages/failureMessages";

class GetBookUseCase extends BaseUseCase {
  private bookRepository: BookRepository;
  private pathParams: RequestModel.RequestModelWithId;

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
    this.pathParams = this.request.params as any;

    this.joiValidationUtil(this.joiValidate(), this.pathParams);
  }

  joiValidate(): object {
    return GetBookJoiValidation;
  }

  public async execute(): Promise<ResponseModel.ResponseWithData> {
    let responseBody: ResponseModel.ResponseWithData;

    try {
      await this.authenticateAdmin()
      this.validate();

      let book = await this.bookRepository.findOne({
        where: {
          id: this.pathParams.id,
        },
      });

      if (!book) throw new HttpError(404, failureMessages.RECORD_NOT_FOUND);

      responseBody = {
        code: 200,
        message: successMessages.BOOK_FETCHED_SUCCESSFULLY,
        data: book,
      };

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static get(request: Request, response: Response) {
    const getBookUseCase = new GetBookUseCase(
      request,
      response,
      new BookRepository()
    );

    return getBookUseCase;
  }
}

export default GetBookUseCase;
