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
const express_1 = __importDefault(require("express"));
const UrlConstants_1 = __importDefault(require("../../domain/constants/url-constants/UrlConstants"));
const CreateBookUseCase_1 = __importDefault(require("./create-book/CreateBookUseCase"));
const DeleteBookUseCase_1 = __importDefault(require("./delete-book/DeleteBookUseCase"));
const GetAllBooksUseCase_1 = __importDefault(require("./get-all-books/GetAllBooksUseCase"));
const GetBookUseCase_1 = __importDefault(require("./get-book/GetBookUseCase"));
const UpdateBookUseCase_1 = __importDefault(require("./update-book/UpdateBookUseCase"));
const router = express_1.default.Router();
router.post(`${UrlConstants_1.default.bookEndpoint.createBook}`, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const createBookUseCase = CreateBookUseCase_1.default.create(request, response);
    yield createBookUseCase.executeAndHandleErrors();
}));
router.delete(`${UrlConstants_1.default.bookEndpoint.deleteBook}`, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteBookUseCase = DeleteBookUseCase_1.default.delete(request, response);
    yield deleteBookUseCase.executeAndHandleErrors();
}));
router.get(`${UrlConstants_1.default.bookEndpoint.getAllBooks}`, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllBooksUseCase = GetAllBooksUseCase_1.default.get(request, response);
    yield getAllBooksUseCase.executeAndHandleErrors();
}));
router.get(`${UrlConstants_1.default.bookEndpoint.getBook}`, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const getBookUseCase = GetBookUseCase_1.default.get(request, response);
    yield getBookUseCase.executeAndHandleErrors();
}));
router.put(`${UrlConstants_1.default.bookEndpoint.updateBook}`, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBookUseCase = UpdateBookUseCase_1.default.update(request, response);
    yield updateBookUseCase.executeAndHandleErrors();
}));
exports.default = router;
//# sourceMappingURL=routes.js.map