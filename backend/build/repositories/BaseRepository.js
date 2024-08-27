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
class BaseRepository {
    findAll(query = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            const obj = yield model.findAll(query);
            return obj;
        });
    }
    findOne(predicate) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            const obj = yield model.findOne(predicate);
            return obj;
        });
    }
    add(data, query = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            yield model.sync();
            return yield model.create(data, query, { returning: true });
        });
    }
    delete(predicate = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            const obj = yield model.destroy({ where: predicate });
            return obj;
        });
    }
    findAndUpdate(data, predicate = {}, optionsObj) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.model();
            let obj;
            if (optionsObj) {
                obj = yield model.update(data, optionsObj);
            }
            else {
                obj = yield model
                    .update(data, {
                    where: predicate,
                    returning: true,
                    plain: true,
                })
                    .then((result) => {
                    if (result[0] === 0)
                        throw new standard_http_error_1.default(400, "Failed to update the record");
                    return result[1];
                })
                    .catch((err) => {
                    throw new standard_http_error_1.default(404, "Record not found to update");
                });
            }
            return obj;
        });
    }
}
exports.default = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map