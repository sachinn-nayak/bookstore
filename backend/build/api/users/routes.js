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
const AuthenticationUseCase_1 = __importDefault(require("./create-authentication-token/AuthenticationUseCase"));
const router = express_1.default.Router();
router.post(UrlConstants_1.default.userEndpoint.authenticate, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const useCase = AuthenticationUseCase_1.default.create(request, response);
    yield useCase.executeAndHandleErrors();
}));
exports.default = router;
//# sourceMappingURL=routes.js.map