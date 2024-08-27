import express from "express";
import * as dotenv from "dotenv";
import swaggerOptions from "./core/swagger/swaggerConfig";
dotenv.config();
import UrlConstants from "./domain/constants/url-constants/UrlConstants";
import bookRoutes from "./api/books/routes";
import userRoutes from "./api/users/routes";

const app = express();
const port = process.env.port || 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerJsondoc = require("swagger-jsdoc");
const specs = swaggerJsondoc(swaggerOptions);

app.use(express.json());
app.use(
  `${UrlConstants.baseEndpoint}${UrlConstants.swaggerEndpoint}`,
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Store" });
});

app.get(`${UrlConstants.baseEndpoint}`, (req, res) => {
  res.json({ message: "Welcome to Book Store" });
});

app.use(`${UrlConstants.baseEndpoint}`, bookRoutes);
app.use(`${UrlConstants.baseEndpoint}`, userRoutes);

app.get("*", (req, res) => {
  res.status(404).send("Invalid Endpoint");
});

const appListenCallBack = () => {
  try {
    console.log("Server started on port " + port);
  } catch (error) {
    console.log("Server error on port " + port + " with error " + error);
  }
};


app.listen(port, appListenCallBack);

export default app;
