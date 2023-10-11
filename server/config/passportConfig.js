import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import * as dotenv from 'dotenv';
import userModel from '../models/userModel.js';
dotenv.config();

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET,
};

const callback = async (jwt_payload, done) => {
	try {
		const foundUser = await userModel.findById(jwt_payload.sub);
		if (!foundUser) return done(null, false);
		else return done(null, foundUser);
	} catch (err) {
		return done(err, false);
	}
};

const configurePassport = () => {
	passport.use(new JwtStrategy(options, callback));
};

export default configurePassport;
