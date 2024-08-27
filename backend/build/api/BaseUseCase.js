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
const Utility_1 = __importDefault(require("../domain/service/Utility"));
const standard_http_error_1 = __importDefault(require("standard-http-error"));
const AuthControlFactory_1 = __importDefault(require("../core/auth-control/AuthControlFactory"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const failureMessages_1 = require("../domain/constants/messages/failureMessages");
const RoleEnum_1 = require("../domain/enumerations/RoleEnum");
class BaseUseCase {
    constructor(request, response) {
        this.request = request;
        this.response = response;
        this.tokenPayload = {};
    }
    validate() {
        Utility_1.default.trimInputs(this.request.body);
    }
    joiValidationUtil(joiSchema, requestData) {
        try {
            const options = {
                allowUnknown: true,
            };
            const { error } = joiSchema.validate(requestData, options);
            console.log("error joi ======>", error);
            if (error) {
                throw new standard_http_error_1.default(400, error.details[0].message.replace(/["]/gi, ""));
            }
        }
        catch (error) {
            console.log("error", error);
            throw error;
        }
    }
    executeAndHandleErrors() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield this.execute();
                if (data == null) {
                    data = {};
                }
                if (data.error) {
                    const error = data;
                    throw error;
                }
                const code = 200;
                data.code = code;
                this.response.status(code).json(data);
            }
            catch (error) {
                if (error != null) {
                    let message = error.message;
                    let code = error.code ? error.code : 400;
                    if (error.parent && error.parent.code === "23505") {
                        message = "Data already exists";
                        code = 409;
                    }
                    const data = { code, message };
                    this.response.status(code >= 100 && code < 600 ? code : 500).json(data);
                }
                else {
                    const data = {
                        code: 400,
                        message: "Unable to process your request, please try again",
                    };
                    this.response.status(400).json(data);
                }
            }
        });
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = this.request.headers.jwt ||
                    this.request.headers.authorization ||
                    this.request.headers.Authorization;
                if (!token) {
                    throw new standard_http_error_1.default(400, "Authorization token is required");
                }
                let authControl = new AuthControlFactory_1.default().create();
                let payload = authControl.decode(token, process.env.JWTSecret);
                this.tokenPayload = payload;
                let id = payload.id;
                if (id == undefined) {
                    throw new standard_http_error_1.default(401, failureMessages_1.permissionMessage.ACCESS_DENIED);
                }
                let repo = new UserRepository_1.default();
                let user = yield repo.findOne({
                    where: {
                        id,
                    },
                    raw: true,
                });
                if (!user) {
                    throw new standard_http_error_1.default(401, failureMessages_1.permissionMessage.ACCESS_DENIED);
                }
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    authenticateAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            let geekonomyAdmin = yield this.authenticate();
            console.log(">>>>", geekonomyAdmin);
            if (geekonomyAdmin.role != Number(RoleEnum_1.RoleEnum.ADMIN)) {
                throw new standard_http_error_1.default(401, failureMessages_1.permissionMessage.ACCESS_DENIED);
            }
            return geekonomyAdmin;
        });
    }
}
exports.default = BaseUseCase;
//# sourceMappingURL=BaseUseCase.js.map