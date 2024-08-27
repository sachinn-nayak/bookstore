"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../domain/schemas/user-model/UserModel"));
const BaseRepository_1 = __importDefault(require("./BaseRepository"));
class UserRepository extends BaseRepository_1.default {
    constructor() {
        super();
    }
    model() {
        return UserModel_1.default;
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map