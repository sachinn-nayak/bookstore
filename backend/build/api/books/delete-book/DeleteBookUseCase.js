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
const standard_http_error_1 = __importDefault(require("standard-http-error"));
const BookRepository_1 = __importDefault(require("../../../repositories/BookRepository"));
const BaseUseCase_1 = __importDefault(require("../../BaseUseCase"));
const DeleteBookJoiValidation_1 = __importDefault(require("./DeleteBookJoiValidation"));
const successMessages_1 = require("../../../domain/constants/messages/successMessages");
const failureMessages_1 = require("../../../domain/constants/messages/failureMessages");
class DeleteBookUseCase extends BaseUseCase_1.default {
    constructor(request, response, bookRepository) {
        super(request, response);
        this.request = request;
        this.response = response;
        this.bookRepository = bookRepository;
    }
    validate() {
        try {
            this.pathParams = this.request.params;
            this.joiValidationUtil(this.joiValidate(), this.pathParams);
        }
        catch (error) {
            throw error;
        }
    }
    joiValidate() {
        try {
            return DeleteBookJoiValidation_1.default;
        }
        catch (error) {
            throw error;
        }
    }
    execute() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let responseBody;
            try {
                yield this.authenticateAdmin();
                this.validate();
                const id = (_a = this.pathParams) === null || _a === void 0 ? void 0 : _a.id;
                if (!id)
                    throw new standard_http_error_1.default(400, failureMessages_1.failureMessages.INVALID_ID);
                const deleteCount = yield this.bookRepository.delete({
                    id: id,
                });
                if (deleteCount === 0)
                    throw new standard_http_error_1.default(404, failureMessages_1.failureMessages.RECORD_NOT_FOUND_TO_DELETE);
                responseBody = {
                    code: 200,
                    message: successMessages_1.successMessages.BOOK_DELETED_SUCCESSFULLY,
                };
                return responseBody;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static delete(request, response) {
        const deleteBookUseCase = new DeleteBookUseCase(request, response, new BookRepository_1.default());
        return deleteBookUseCase;
    }
}
exports.default = DeleteBookUseCase;
//# sourceMappingURL=DeleteBookUseCase.js.map