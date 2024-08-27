import { Request, Response } from "express";
import HttpError from "standard-http-error";
import BookRepository from "../../../repositories/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import deleteBookJoiValidation from "./DeleteBookJoiValidation";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import { failureMessages } from "../../../domain/constants/messages/failureMessages";

class DeleteBookUseCase extends BaseUseCase {
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
    try {
      this.pathParams = this.request.params as any;

      this.joiValidationUtil(this.joiValidate(), this.pathParams);
    } catch (error) {
      throw error;
    }
  }

  joiValidate(): object {
    try {
      return deleteBookJoiValidation;
    } catch (error) {
      throw error;
    }
  }

  public async execute(): Promise<ResponseModel.Response> {
    let responseBody: ResponseModel.Response;
    try {
      await this.authenticateAdmin()
      this.validate();

      const id = this.pathParams?.id;

      if (!id) throw new HttpError(400, failureMessages.INVALID_ID);

      const deleteCount = await this.bookRepository.delete({
        id: id,
      });

      if (deleteCount === 0)
        throw new HttpError(404, failureMessages.RECORD_NOT_FOUND_TO_DELETE);

      responseBody = {
        code: 200,
        message: successMessages.BOOK_DELETED_SUCCESSFULLY,
      };

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static delete(request: Request, response: Response) {
    const deleteBookUseCase = new DeleteBookUseCase(
      request,
      response,
      new BookRepository()
    );

    return deleteBookUseCase;
  }
}

export default DeleteBookUseCase;
