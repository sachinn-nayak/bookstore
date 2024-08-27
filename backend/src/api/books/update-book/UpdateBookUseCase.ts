import { Request, Response } from "express";
import { successMessages } from "../../../domain/constants/messages/successMessages";
import BookRepository from "../../../repositories/BookRepository";
import BaseUseCase from "../../BaseUseCase";
import updateBookJoiValidation from "./UpdateBookJoiValidation";

class UpdateBookUseCase extends BaseUseCase {
  private bookRepository: BookRepository;
  private requestBody: RequestModel.CreateBook;
  private pathParams: any;

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
    this.pathParams = this.request.params;
    this.requestBody = this.request.body;
    this.joiValidationUtil(this.joiValidate(), this.requestBody);
  }

  joiValidate(): object {
    return updateBookJoiValidation;
  }

  public async execute(): Promise<ResponseModel.ResponseWithData> {
    let responseBody: ResponseModel.ResponseWithData;
    console.log(">>>>>>>>>>>>>>>>>>>>>>")
    try {
      await this.authenticateAdmin();
      this.validate();

      let updatedBook = await this.bookRepository.findAndUpdate(
        this.requestBody,
        {
          id: this.pathParams.id,
        }
      );

      responseBody = {
        code: 200,
        message: successMessages.BOOK_UPDATED_SUCCESSFULLY,
        data: updatedBook,
      };

      return responseBody;
    } catch (error) {
      throw error;
    }
  }

  public static update(request: any, response: any) {
    const bookRepository = new BookRepository();
    const updateBookUseCase = new UpdateBookUseCase(
      request,
      response,
      bookRepository
    );

    return updateBookUseCase;
  }
}
export default UpdateBookUseCase;
