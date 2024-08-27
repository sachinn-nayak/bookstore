"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BookModel_1 = __importDefault(require("../domain/schemas/book-model/BookModel"));
const BaseRepository_1 = __importDefault(require("./BaseRepository"));
class BookRepository extends BaseRepository_1.default {
    constructor() {
        super();
    }
    model() {
        return BookModel_1.default;
    }
}
exports.default = BookRepository;
//# sourceMappingURL=BookRepository.js.map