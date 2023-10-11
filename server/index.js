import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import configurePassport from './config/passportConfig.js';
dotenv.config();
import colors from 'colors';
import connectDB from './config/db.js';
// import bodyParser from "body-parser";
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {typeDefs} from './graphql/schema/typeDefs.js';
import {resolvers} from './graphql/resolvers/resolvers.js';

const app = express();

const addMiddlewares = () => {
	app.use(express.json());
	app.use(express.urlencoded({extended: true}));
	app.use(cors());
	configurePassport();
};

const startServer = async () => {
	const port = process.env.PORT || 4001;

	const server = new ApolloServer({
		typeDefs,
		resolvers,
	});

	await server.start();
	app.use(
		'/graphql',
		expressMiddleware(server, {
			context: ({req, res}) => {
				// console.log(`req.headers :>> ${req.headers.token}`.bgGreen);
				//do your JWT strategy to authorize the token
				return {token: 'our token'};
			},
		})
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
