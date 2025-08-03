import dotenv from "dotenv";
dotenv.config();

import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";
import { InitializeDatabases } from "./loaders/db";
import { errorHandler } from "./shared/middlewares/error-handler.middleware";
import { RegisterRoutes } from "./routes";
import { errorValidateHandler } from "./shared/middlewares/handle-validate-error.middleware";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello Wordl!",
  });
});

app.get("/swagger.json", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/swagger.json"));
});

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerUrl: "/swagger.json",
    explorer: true,
  })
);

RegisterRoutes(app);

app.use(errorValidateHandler);
app.use(errorHandler);

InitializeDatabases()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log("API has been served");
    });
  })
  .catch(() => {
    console.log("Error hosting the api");
  });

export default app;
