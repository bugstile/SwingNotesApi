import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import "./config/db.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import userRouter from "./routes/userRouter.js";
import noteRouter from "./routes/noteRouter.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use(helmet());

const swaggerDocument = YAML.load("./docs/swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

app.use("/api/user", userRouter);
app.use("/api/notes", noteRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

export default app;
