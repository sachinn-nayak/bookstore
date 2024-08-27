"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookRepository_1 = __importDefault(require("../../../repositories/BookRepository"));
const BaseUseCase_1 = __importDefault(require("../../BaseUseCase"));
const CreateBookJoiValidation_1 = __importDefault(require("./CreateBookJoiValidation"));
const successMessages_1 = require("../../../domain/constants/messages/successMessages");
class CreateBookUseCase extends BaseUseCase_1.default {
    constructor(request, response, bookRepository) {
        super(request, response);
        this.request = request;
        this.response = response;
        this.bookRepository = bookRepository;
    }
    validate() {
        super.validate();
        this.requestBody = this.request.body;
        this.joiValidationUtil(this.joiValidate(), this.requestBody);
    }
    joiValidate() {
        return CreateBookJoiValidation_1.default;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let responseBody;
            let book;
            try {
                yield this.authenticateAdmin();
                this.validate();
                book = yield this.bookRepository.add(this.request.body);
                responseBody = {
                    code: 200,
                    message: successMessages_1.successMessages.BOOK_CREATED_SUCCESSFULLY,
                    data: book,
                };
                return responseBody;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static create(request, response) {
        const createBookUseCase = new CreateBookUseCase(request, response, new BookRepository_1.default());
        return createBookUseCase;
    }
}
exports.default = CreateBookUseCase;
//# sourceMappingURL=CreateBookUseCase.js.map