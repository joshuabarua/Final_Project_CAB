// import jwt from 'jsonwebtoken';
// import * as dotenv from 'dotenv';
// import {Strategy as JwtStrategy} from 'passport-jwt';
// import passport from 'passport';

// dotenv.config();

// export const generateToken = (user) => {
// 	const payload = {
// 		sub: user._id,
// 		email: user.email,
// 	};
// 	const options = {
// 		expiresIn: '7d',
// 	};
// 	const token = jwt.sign(payload, process.env.JWT_SECRET, options);
// 	return token;
// };

// export const getPayload = (token) => {
// 	try {
// 		const payload = jwt.verify(token, process.env.JWT_SECRET);
// 		return {loggedIn: true, payload};
// 	} catch (err) {
// 		console.log('error >>:'.bgRed, err);
// 		return {loggedIn: false};
// 	}
// };

// export const jwtStrategy = passport.use(
// 	new JwtStrategy(opts, (jwt_payload, done) => {
// 		if (err) return done(err, false);
// 		else if (user) return done(null, user);
// 		else return done(null, false);
// 	})
// );

// export const jwtAuth = passport.authenticate('jwt', {session: false});
