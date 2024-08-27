import { Request, Response } from "express";
import Utility from "../domain/service/Utility";
import UseCaseInterface from "./UseCaseInterface";
import HttpError from "standard-http-error";
import AuthControlFactory from "../core/auth-control/AuthControlFactory";
import UserRepository from "../repositories/UserRepository";
import { permissionMessage } from "../domain/constants/messages/failureMessages";
import { RoleEnum } from "../domain/enumerations/RoleEnum";

abstract class BaseUseCase implements UseCaseInterface {
  public request: Request;
  public response: Response;
  public tokenPayload;

  constructor(request: Request, response: Response) {
    this.request = request;
    this.response = response;
    this.tokenPayload = {};
  }

  validate() {
    Utility.trimInputs(this.request.body);
  }

  public joiValidationUtil(joiSchema: any, requestData: any) {
    try {
      const options = {
        allowUnknown: true,
      };

      const { error } = joiSchema.validate(requestData, options);
      console.log("error joi ======>", error);
      if (error) {
        throw new HttpError(400, error.details[0].message.replace(/["]/gi, ""));
      }
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  }

  abstract execute();

  public async executeAndHandleErrors(): Promise<any> {
    try {
      let data: any = await this.execute();
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
    } catch (error) {
      if (error != null) {
        let message = error.message;
        let code = error.code ? error.code : 400;

        if (error.parent && error.parent.code === "23505") {
          message = "Data already exists";
          code = 409;
        }

        const data = { code, message };
        this.response.status(code >= 100 && code < 600 ? code : 500).json(data);
      } else {
        const data = {
          code: 400,
          message: "Unable to process your request, please try again",
        };
        this.response.status(400).json(data);
      }
    }
  }

  async authenticate() {
    try {
      let token =
        this.request.headers.jwt ||
        this.request.headers.authorization ||
        this.request.headers.Authorization;
      if (!token) {
        throw new HttpError(400, "Authorization token is required");
      }
      let authControl = new AuthControlFactory().create();
      let payload = authControl.decode(token, process.env.JWTSecret);
      this.tokenPayload = payload;
      let id = payload.id;

      if (id == undefined) {
        throw new HttpError(401, permissionMessage.ACCESS_DENIED);
      }

      let repo = new UserRepository();
      let user = await repo.findOne({
        where: {
          id,
        },
        raw: true,
      });

      if (!user) {
        throw new HttpError(401, permissionMessage.ACCESS_DENIED);
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async authenticateAdmin() {
    let geekonomyAdmin = await this.authenticate();
    console.log(">>>>", geekonomyAdmin)
    if (geekonomyAdmin.role != Number(RoleEnum.ADMIN)) {
      throw new HttpError(401, permissionMessage.ACCESS_DENIED);
    }
    return geekonomyAdmin;
  }
}

export default BaseUseCase;
