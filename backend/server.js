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
//////// --------equivalent of using helmet for "Content-Security-Policy-Report-Only"

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Content-Security-Policy-Report-Only",
//     "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' https://via.placeholder.com data:; media-src 'self' https://pwskills.s3.amazonaws.com; frame-src 'self'"
//   );

//   next();
// });

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
// DB and authentication
import connectDB from "./config/connectDB.js";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";
import authRouter from "./Routers/authRouter.js";
import textRouter from "./Routers/textRouter.js";

// app.use(helmet()); //secure headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'"],
        "style-src": [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://fonts.gstatic.com",
        ],
        "font-src": ["'self'", "https://fonts.gstatic.com"],
        "img-src": ["'self'", "https://via.placeholder.com", "data:"],
        "media-src": ["'self'", "https://pwskills.s3.amazonaws.com"],
        "frame-src": ["'self'"],
      },
    },
  })
);
app.use(xss()); //Sanitize the inputs (prevent cross-site-scripting)
app.use(mongoSanitize()); // prevent mongoDB injections
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "..", "client", "dist")));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/content", textRouter);

// app.get("*", (req, res) => {
//   res.send("page not found");
// });
// app.get("*", function (req, res) {
//   res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"));
// });

app.get("/", (req, res) => {
  res.send("HELLO FROM TALKTOOP");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// server listening
const port = process.env.PORT || 5000;
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
