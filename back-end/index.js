import { PubSub, GraphQLServer } from "graphql-yoga";
import mongoose from "mongoose";
import graphql from "./graphql";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const { typeDefs, resolvers } = graphql;

const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub },
});

mongoose.connection.once("open", () =>
  server.start(() => console.log("Listening on port 4000"))
);
