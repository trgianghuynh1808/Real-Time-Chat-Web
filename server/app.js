// import dependencies
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import logger from "morgan";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import socketIo from "socket.io";
import http from "http";

import mainRoutes from "./routes/main";
import { authConfig } from "./config";

// set up dependencies
const port = 5035;
const app = express();
const server = app.listen(port, () => {
  console.log(`Our server is running on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger("dev"));
dotenv.config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch(error => {
    console.log("Error connecting to database");
  });

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
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
        message: "Not authenticated"
      });
    }
  } else {
    next();
  }
};

const io = socketIo.listen(server);
io.on("connection", socket => {
  //Send friend invitation req event
  socket.on("sendFriendInvitation", () => {
    io.emit("receiveFriendInvitation");
  });

  //Add new friend event
  socket.on("addNewFriend", () => {
    io.emit("addNewFriend");
  });
});

app.use(TokenCheckMiddleware);
app.use("/api/", mainRoutes);
