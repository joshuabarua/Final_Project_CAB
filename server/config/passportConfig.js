import passport from 'passport';
import jwt from 'jsonwebtoken';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {GraphQLLocalStrategy} from 'graphql-passport';
import * as dotenv from 'dotenv';
import userModel from '../models/userModel.js';
import {verifyPassword} from '../utils/bcrypt.js';
dotenv.config();

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const jwtCallback = async (jwt_payload, done) => {
	try {
		const foundUser = await userModel.findById(jwt_payload.sub.email);
		if (!foundUser) return done(null, false);
		else return done(null, foundUser, jwt_payload);
	} catch (err) {
		console.log('error'.bgRed, err);
		return done(err, false);
	}
};

// For JWT
export const configurePassport = () => {
	passport.use(new JwtStrategy(jwtOptions, jwtCallback));
};

//GraphQL Local Strategy
export const configureLocalPassport = () => {
	passport.use(new GraphQLLocalStrategy(localOptions, localCallback));
};

// Local callback
const localCallback = async (email, password, done) => {
	try {
		const user = await userModel.findOne({email});
		if (!user) return done(null, false, {message: 'No matching user'});

		const isMatch = await verifyPassword(password, user.password);

		if (!isMatch) {
			return done(null, false, {message: 'Invalid password'});
		}

		return done(null, user);
	} catch (err) {
		return done(err, false);
	}
};

export const generateToken = (user) => {
	const payload = {
		sub: user._id,
		email: user.email,
	};
	const options = {
		expiresIn: '7d',
	};
	const token = jwt.sign(payload, process.env.JWT_SECRET, options);
	return token;
};

export const getPayload = (token) => {
	const formatToken = token.includes('Bearer') ? token.split(' ')[1] : token;
	try {
		const payload = jwt.verify(formatToken, process.env.JWT_SECRET);
		console.log('success, verified token'.bgGreen, payload);
		return payload;
	} catch (err) {
		console.log('error >>:'.bgRed, err);
		return null;
	}
};

export const jwtAuth = passport.authenticate('jwt', {session: false});
export const localAuth = passport.authenticate('local', {session: false});

export const jwtAuthenticate = (req) => {
	const token = req.headers.authorization || '';
	try {
		// Verify and decode the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded.user; // Assuming user information is stored in the token
	} catch (error) {
		return null; // Return null on token verification failure
	}
};

//Creates session
// const configurePassportForSession = () => {
// 	passport.use(
// 		new GraphQLLocalStrategy(async (email, password, done, error) => {
// 			const user = await userModel.findOne({email});
// 			if (!user) {
// 				console.log('no user'.bgRed);
// 				done(null, false, {message: 'No matching user'.bgRed});
// 			}
// 			const verified = await verifyPassword(password, user.password);
// 			if (!verified) {
// 				console.log('incorrect passwordr'.bgRed);
// 				done(null, false, {message: 'Incorrect password'.bgRed});
// 			}
// 			if (error) console.log('error >>'.bgRed, error);
// 			done(null, user);
// 		})
// 	);
// };
