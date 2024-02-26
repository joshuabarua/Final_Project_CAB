import express from "express";
// import session from 'express-session';
// import {v4 as uuidv4} from 'uuid';
// import bodyParser from "body-parser";
// import userModel from './models/userModel.js';
// import {buildContext} from 'graphql-passport';
import colors from "colors";
import cors from "cors";
import * as dotenv from "dotenv";
import passport from "passport";
dotenv.config();
import connectDB from "./config/db.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs } from "./graphql/schema/typeDefs.js";
import { resolvers } from "./graphql/resolvers/resolvers.js";
import userModel from "./models/userModel.js";
import {
  jwtAuth,
  getPayload,
  configurePassport,
} from "./config/passportConfig.js";
dotenv.config();

//Used with sessions
// passport.serializeUser((user, done) => {
// 	done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
// 	const user = userModel.findOne({id});
// 	done(null, user);
// });

const app = express();

//Used with sessions
// app.use(
// 	session({
// 		genid: (req) => uuidv4(),
// 		secret: process.env.SESSION_SECRET,
// 		resave: false,
// 		saveUninitialized: false,
// 	})
// );

const addMiddlewares = () => {
  app.use(passport.initialize());
  //for session
  // app.use(passport.session());
  // app.use(passport.use(new LocalStrategy({email: 'email'}, userModel.authenticate())));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  configurePassport();
};

const startServer = async () => {
  const port = process.env.PORT || 4001;
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
  });
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.headers.authorization;
        if (token) {
          const payload = getPayload(token);
          if (payload) {
            const user = await userModel.findById(payload.sub);
            return { user, validated: "valid" };
          } else {
            return { user: null, validated: "invalid" };
          }
        }
        return { user: null, validated: "no token" };
      },
    }),
  );

  app.listen(port, () => {
    console.log(`Server is running in port ${port} `.blue);
  });
};

(async function controller() {
  await connectDB();
  addMiddlewares();
  startServer();
})();
