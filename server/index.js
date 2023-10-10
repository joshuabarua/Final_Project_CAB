//REVIEW[epic=1-Server setup, seq=1] 1-setup server as usual and connect to DB

import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
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
				console.log('req.headers :>> ', req.headers);
				console.log('asdasdas');
				//do your JWT strategy to authorize the token
				// const user = jwtStrategy(req.headers.authorization)
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
