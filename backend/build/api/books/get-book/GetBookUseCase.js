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
const GetBookJoiValidation_1 = __importDefault(require("./GetBookJoiValidation"));
const successMessages_1 = require("../../../domain/constants/messages/successMessages");
const failureMessages_1 = require("../../../domain/constants/messages/failureMessages");
class GetBookUseCase extends BaseUseCase_1.default {
    constructor(request, response, bookRepository) {
        super(request, response);
        this.request = request;
        this.response = response;
        this.bookRepository = bookRepository;
    }
    validate() {
        this.pathParams = this.request.params;
        this.joiValidationUtil(this.joiValidate(), this.pathParams);
    }
    joiValidate() {
        return GetBookJoiValidation_1.default;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let responseBody;
            try {
                yield this.authenticateAdmin();
                this.validate();
                let book = yield this.bookRepository.findOne({
                    where: {
                        id: this.pathParams.id,
                    },
                });
                if (!book)
                    throw new standard_http_error_1.default(404, failureMessages_1.failureMessages.RECORD_NOT_FOUND);
                responseBody = {
                    code: 200,
                    message: successMessages_1.successMessages.BOOK_FETCHED_SUCCESSFULLY,
                    data: book,
                };
                return responseBody;
            }
            catch (error) {
                throw error;
            }
        });
    }
    static get(request, response) {
        const getBookUseCase = new GetBookUseCase(request, response, new BookRepository_1.default());
        return getBookUseCase;
    }
}
exports.default = GetBookUseCase;
//# sourceMappingURL=GetBookUseCase.js.map