import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {GraphQLLocalStrategy} from 'graphql-passport';
import * as dotenv from 'dotenv';
import userModel from '../models/userModel.js';
import {verifyPassword} from '../utils/bcrypt.js';
dotenv.config();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const callback = async (jwt_payload, done) => {
	try {
		const foundUser = await userModel.findById(jwt_payload.sub);
		if (!foundUser) return done(null, false);
		else return done(null, foundUser, jwt_payload);
	} catch (err) {
		console.log('error'.bgRed, err);
		return done(err, false);
	}
};

// const configurePassport = () => {
// 	passport.use(new JwtStrategy(options, callback));
// };

const configurePassport = () => {
	passport.use(
		new GraphQLLocalStrategy(async (email, password, done, error) => {
			const user = await userModel.findOne({email});
			if (!user) {
				console.log('no user'.bgRed);
				done(null, false, {message: 'No matching user'.bgRed});
			}
			const verified = await verifyPassword(password, user.password);
			if (!verified) {
				console.log('incorrect passwordr'.bgRed);
				done(null, false, {message: 'Incorrect password'.bgRed});
			}
			if (error) console.log('error >>'.bgRed, error);
			done(null, user);
		})
	);
};

export default configurePassport;
