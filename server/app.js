// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import mainRoutes from "./routes/main";
import { authConfig } from "./config";

// set up dependencies
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
dotenv.config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Error connecting to database");
  });

const port = 5035;

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Project with Nodejs Express and MongoDB",
  });
});

//Middleware
const TokenCheckMiddleware = async (req, res, next) => {
  const { authorization: token } = req.headers;

  if (token) {
    const tokenFormatted = token.split(" ")[1];

    try {
      const decoded = await jwt.verify(tokenFormatted, authConfig.tokenSecret);

      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "Not authenticated",
      });
    }
  } else {
    next();
  }
};

app.use(TokenCheckMiddleware);

app.use("/api/", mainRoutes);

app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});
