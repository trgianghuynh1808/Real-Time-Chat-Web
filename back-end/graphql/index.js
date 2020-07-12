import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";
import path from "path";

const typesArray = loadFilesSync(
  path.join(__dirname, "./schema/**/type.graphql")
);

const resolverArray = loadFilesSync(
  path.join(__dirname, "./schema/**/*.resolver.js")
);

const typeDefs = mergeTypeDefs(typesArray, { all: true });
const resolvers = mergeResolvers(resolverArray, { all: true });

export default { typeDefs, resolvers };
