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
const successMessages_1 = require("../../../domain/constants/messages/successMessages");
const sequelize_1 = require("sequelize");
class GetAllBookUseCase extends BaseUseCase_1.default {
    constructor(request, response, bookRepository) {
        super(request, response);
        this.request = request;
        this.response = response;
        this.bookRepository = bookRepository;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            let responseBody;
            try {
                yield this.authenticateAdmin();
                let { searchKey, index, size, sortingKey, sortingValue } = this.request.query;
                const pageSize = parseInt(size);
                const pageIndex = parseInt(index);
                let paginate;
                if (pageIndex && pageSize) {
                    paginate = !searchKey
                        ? {
                            offset: (pageIndex - 1) * pageSize,
                            limit: pageSize,
                        }
                        : {};
                }
                const searchQuery = this.getSearchQuery(searchKey);
                let searchQueries = searchKey ? { [sequelize_1.Op.or]: searchQuery } : {};
                let sorting = sortingKey && sortingValue ? [[sortingKey, sortingValue]] : [];
                let books = yield this.bookRepository.findAll(Object.assign(Object.assign({ where: Object.assign({}, searchQueries) }, paginate), { order: sorting }));
                if (!books)
                    books = [];
                responseBody = {
                    code: 200,
                    message: successMessages_1.successMessages.BOOK_FETCHED_SUCCESSFULLY,
                    data: books,
                };
                return responseBody;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getSearchQuery(searchKey) {
        const searchQuery = { [sequelize_1.Op.iLike]: "%" + searchKey + "%" };
        const queries = [
            { title: searchQuery },
            { author: searchQuery },
            { description: searchQuery },
        ];
        return queries;
    }
    static get(request, response) {
        const getAllBookUseCase = new GetAllBookUseCase(request, response, new BookRepository_1.default());
        return getAllBookUseCase;
    }
}
exports.default = GetAllBookUseCase;
//# sourceMappingURL=GetAllBooksUseCase.js.map