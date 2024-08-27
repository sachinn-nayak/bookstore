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
const AuthControlFactory_1 = __importDefault(require("../../../core/auth-control/AuthControlFactory"));
const HashControlFactory_1 = __importDefault(require("../../../core/hash-control/HashControlFactory"));
const failureMessages_1 = require("../../../domain/constants/messages/failureMessages");
const UserRepository_1 = __importDefault(require("../../../repositories/UserRepository"));
const BaseUseCase_1 = __importDefault(require("../../BaseUseCase"));
const AuthenticationJoiValidation_1 = __importDefault(require("./AuthenticationJoiValidation"));
const sequelize = require("sequelize");
class Authenticate extends BaseUseCase_1.default {
    constructor(request, response, hashControl, authControl, userRepository) {
        super(request, response);
        this.hashControl = hashControl;
        this.authControl = authControl;
        this.userRepository = userRepository;
    }
    validate() {
        try {
            super.validate();
            this.requestBody = this.request.body;
            this.joiValidationUtil(AuthenticationJoiValidation_1.default, this.requestBody);
        }
        catch (error) {
            throw error;
        }
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.validate();
                const body = this.requestBody;
                const { email, password } = body;
                let user;
                if (email) {
                    user = yield this.userRepository.findOne({
                        where: {
                            email: sequelize.where(sequelize.fn("LOWER", sequelize.col("email")), email),
                        },
                        attributes: { exclude: ["createdAt", "updatedAt"] },
                        raw: true,
                    });
                    console.log(">>>>>>>>>>>>>", user);
                    if (user) {
                        let isPasswordMatched = yield this.hashControl.compare(password, user.password);
                        let date = new Date();
                        // generating epoch time in miliseconds
                        let issuedAt = Math.floor(+date);
                        let expiredAt = date.getTime() + 7 * 24 * 60 * 60 * 1000;
                        if (isPasswordMatched) {
                            let token = this.authControl.sign({
                                id: user.id,
                                email: user.email,
                                role: user.role,
                                issuedAt,
                                expiredAt,
                            }, process.env.JWTSecret, { expiresIn: process.env.JwtTokenExpiresIn });
                            // deleting password from user object
                            delete user.password;
                            return { code: 200, data: { token, issuedAt, expiredAt, user } };
                        }
                        else {
                            throw new Error(failureMessages_1.permissionMessage.INVALID_CREDENTIALS);
                        }
                    }
                    else {
                        throw new Error(failureMessages_1.permissionMessage.USER_NOT_FOUND);
                    }
                }
            }
            catch (error) {
                console.log(">>>>>", error);
                throw error;
            }
        });
    }
    static create(request, response) {
        const hashControlFactory = new HashControlFactory_1.default();
        const hashControl = hashControlFactory.create();
        const authControlFactory = new AuthControlFactory_1.default();
        const authControl = authControlFactory.create();
        const useCase = new Authenticate(request, response, hashControl, authControl, new UserRepository_1.default());
        return useCase;
    }
}
exports.default = Authenticate;
//# sourceMappingURL=AuthenticationUseCase.js.map