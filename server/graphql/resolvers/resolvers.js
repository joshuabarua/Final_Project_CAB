import userModel from '../../models/userModel.js';
import timeslotModel from '../../models/timeslotModel.js';
import {generateToken} from '../../config/passportConfig.js';
import {verifyPassword, encryptPassword} from '../../utils/bcrypt.js';
import voucherModel from '../../models/voucherModel.js';

const resolvers = {
	Query: {
		async users(_, __, ___, info) {
			console.log('info :>> '.bgMagenta, info);
			const users = await userModel.find();
			return users;
		},

		async timeslots(parent, args, contextValue, info) {
			console.log('contextValue :>> '.bgMagenta, contextValue);
			return await timeslotModel.find();
		},

		async vouchers(parent, args, contextValue, info) {
			console.log('contextValue :>> '.bgMagenta, contextValue);
			return await voucherModel.find();
		},

		getCurrentUser: async (parent, args, context, info) => {
			return context.user;
		},

		async user(parent, args, context) {
			const user = context.user;
			if (!user) {
				throw new Error('User not found'.bgRed);
			}
			console.log('args :>> '.bgYellow, args);
			console.log('parent :>> '.bgCyan, parent);
			console.log('contextValue :>> '.bgMagenta, context);
		},

		async timeslot(_, args) {
			console.log('args :>> '.bgYellow, args);
			return timeslotModel.findById(args.id);
		},

		async voucher(_, args) {
			console.log('args :>> '.bgYellow, args);
			return voucherModel.findById(args.id);
		},
	},

	User: {
		async assignedBookings(parent, __, context) {
			context.user;
			const bookedSessions = parent.assignedBookings;
			if (!bookedSessions) {
				console.log('No booked timeslots right now'.bgRed, bookedSessions);
				// throw new Error('No booked timeslots right now'.bgRed);
				return null;
			}
			console.log('parent.bookedSessions :>> '.bgBlue, bookedSessions);
			const bookingsArray = bookedSessions.map(async (timeslotId) => {
				return await timeslotModel.findById(timeslotId);
			});
			return bookingsArray;
		},

		async vouchers(parent, __, context) {
			const vouchersModel = parent.vouchers;
			console.log('parent.Vouchers :>> '.bgBlue, vouchersModel);
			const vouchersArr = vouchersModel.map(async (voucherId) => {
				return await voucherModel.findById(voucherId);
			});
			return vouchersArr;
		},
	},

	Timeslot: {
		async userVouchers(parent) {
			const userVouchers = parent.userVouchers;
			console.log('userVoucher :>> '.bgBlue, userVouchers);
			const userVouchersArr = userVouchers.map(async (voucherId) => {
				return await voucherModel.findById(voucherId);
			});
			return userVouchersArr;
		},
	},

	Voucher: {
		async assignedUser(parent) {
			const userId = parent.assignedUser;
			console.log('parent :>> '.bgYellow, userId);
			return userModel.findById(userId);
		},

		async assignedTimeslot(parent) {
			const timeslotId = parent.assignedTimeslot;
			console.log('parent :>> '.bgYellow, timeslotId);
			return timeslotModel.findById(timeslotId);
		},
	},

	Mutation: {
		async addUser(_, args) {
			const newUser = new userModel({
				...args.newUserData,
			});
			return await newUser.save();
		},
		async addTimeslot(_, args) {
			const newTimeslot = new timeslotModel({
				...args.newTimeslotData,
			});
			return await newTimeslot.save();
		},

		addVouchers: async (_, {numberOfVouchers}, context) => {
			const userId = context.user._id;
			const user = await userModel.findById(userId);

			if (!user) {
				throw new Error('User not found');
			}
			const vouchers = [];
			for (let i = 0; i < numberOfVouchers; i++) {
				const newVoucher = new voucherModel({
					purchaseDate: new Date().toISOString(),
					status: 'UNUSED',
					assignedUser: userId,
				});
				vouchers.push(newVoucher);
			}
			const savedVouchers = await voucherModel.create(vouchers);
			console.log('saved Vouchers'.bgBlue, savedVouchers);
			savedVouchers.forEach((voucher) => {
				user.vouchers.push(voucher._id);
			});
			user.save();
			const populatedVouchers = await voucherModel.populate(savedVouchers, {path: 'User'});
			return populatedVouchers;
		},

		async deleteUser(_, args) {
			return await userModel.findByIdAndRemove(args.id);
		},

		//for use with sessions
		// async login(parent, args, context) {
		// 	const {email, password} = args;
		// 	const {user} = await context.authenticate('graphql-local', {email, password});
		// 	await context.login(user);
		// 	console.log('user >>:'.bgGreen, user);
		// 	if (!user) throw new Error('No user with that email.');
		// 	const token = generateToken(user);
		// 	return {
		// 		token,
		// 		user,
		// 	};
		// },

		async login(_, {email, password}) {
			const existingUser = await userModel.findOne({email});
			if (!existingUser) {
				throw new Error('No user with that email.');
			}
			const verified = await verifyPassword(password, existingUser.password);
			if (!verified) {
				throw new Error("Password doesn't match.");
			}
			console.log('User Exists?'.bgYellow, verified, existingUser);
			const token = generateToken(existingUser);
			// console.log(token);
			return {
				token,
				user: {
					_id: existingUser._id,
					email: existingUser.email,
					name: existingUser.name,
					bookings: existingUser.bookings,
					vouchers: existingUser.vouchers,
					createdAt: existingUser.createdAt,
				},
			};
		},

		async register(parent, args, context) {
			const {email, password, name} = args;
			const existingUser = await userModel.findOne({email});
			if (existingUser) {
				console.log('User already exists'.bgRed);
				throw new Error('User already exists'.bgRed);
			}
			if (!email || !password || !name) {
				console.log('Please fill out all fields'.bgRed);
				throw new Error('Please fill out all fields', {
					invalidArgs: ['email', 'password', 'name'],
				});
			}
			try {
				const hashedPassword = await encryptPassword(password);
				const newUser = new userModel({
					email,
					password: hashedPassword,
					name,
				});
				console.log(newUser);

				const result = await newUser.save();
				const token = generateToken(newUser);
				const forFront = {
					email: result.email,
					name: result.name,
					assignedBookings: result.assignedBookings,
					vouchers: result.vouchers,
					createdAt: result.createdAt,
					_id: result._id,
				};
				// login(_, {newUser.email, newUser.password}, ___)

				return {
					token,
					user: forFront,
				};
			} catch (error) {
				if (error.code === 11000) {
					throw new Error('That email is already registered', {
						invalidArgs: ['email'],
					});
				} else {
					console.log(error);
					throw new Error('Unknown error occurred', error);
				}
			}
		},

		updateUserProfile: async (parent, args, context) => {
			if (!context.user) {
				throw new AuthenticationError('User not authenticated');
			}
			const updatedUserData = {...context.user, ...args};
			const updatedUser = await userModel.findByIdAndUpdate(context.user._id, updatedUserData, {new: true});
			return updatedUser;
		},

		logout: (parent, args, context) => {
			if (context.user) {
				context.user.logout();
				context.user = null;
				return {success: true};
			} else {
				return {success: false};
			}
		},
	},
};

export {resolvers};
