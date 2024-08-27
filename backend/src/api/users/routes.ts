import express, { Request, Response } from "express";
import UrlConstants from "../../domain/constants/url-constants/UrlConstants";
import AuthenticationUseCase from "./create-authentication-token/AuthenticationUseCase";

const router = express.Router();

router.post(
  UrlConstants.userEndpoint.authenticate,
  async (request: any, response: any) => {
    const useCase = AuthenticationUseCase.create(request, response);
    await useCase.executeAndHandleErrors();
  }
);

export default router;
