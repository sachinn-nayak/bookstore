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
const successMessages_1 = require("../../../domain/constants/messages/successMessages");
const BookRepository_1 = __importDefault(require("../../../repositories/BookRepository"));
const BaseUseCase_1 = __importDefault(require("../../BaseUseCase"));
const UpdateBookJoiValidation_1 = __importDefault(require("./UpdateBookJoiValidation"));
class UpdateBookUseCase extends BaseUseCase_1.default {
    constructor(request, response, bookRepository) {
        super(request, response);
        this.request = request;
        this.response = response;
        this.bookRepository = bookRepository;
    }
    validate() {
        super.validate();
        this.pathParams = this.request.params;
        this.requestBody = this.request.body;
        this.joiValidationUtil(this.joiValidate(), this.requestBody);
    }
    joiValidate() {
        return UpdateBookJoiValidation_1.default;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let responseBody;
            console.log(">>>>>>>>>>>>>>>>>>>>>>");
            try {
                yield this.authenticateAdmin();
                this.validate();
                let updatedBook = yield this.bookRepository.findAndUpdate(this.requestBody, {
                    id: this.pathParams.id,
                });
                responseBody = {
                    code: 200,
                    message: successMessages_1.successMessages.BOOK_UPDATED_SUCCESSFULLY,
                    data: updatedBook,
                };
                return responseBody;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static update(request, response) {
        const bookRepository = new BookRepository_1.default();
        const updateBookUseCase = new UpdateBookUseCase(request, response, bookRepository);
        return updateBookUseCase;
    }
}
exports.default = UpdateBookUseCase;
//# sourceMappingURL=UpdateBookUseCase.js.map