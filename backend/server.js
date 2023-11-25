import dotenv from "dotenv";
dotenv.config();
import express from "express";
import "express-async-errors";
import morgan from "morgan";
import session from "express-session";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cors from "cors";
// security
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
const app = express();
app.use(cors());
// DB and authentication
import connectDB from "./config/connectDB.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import authRouter from "./Routers/authRouter.js";

app.use(helmet()); //secure headers
app.use(xss()); //Sanitize the inputs (prevent cross-site-scripting)
app.use(mongoSanitize()); // prevent mongoDB injections
const __dirname = dirname(fileURLToPath(import.meta.url));


// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.send("page not found");
});



app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// server listening
const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.DB_URL, process.env.DB_PASSWORD);
    console.log("connected to mongoDB successfully...!");
    app.listen(port, () => console.log(`server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
