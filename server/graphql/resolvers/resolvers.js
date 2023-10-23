import userModel from '../../models/userModel.js';
import timeslotModel from '../../models/timeslotModel.js';
import {generateToken} from '../../utils/jwt.js';
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

		async user(parent, args, contextValue) {
			console.log('args :>> '.bgYellow, args);
			console.log('contextValue :>> '.bgMagenta, contextValue);
			return userModel.findById(args.id);
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
		async assignedBookings(parent) {
			const bookedSessions = parent.assignedBookings;
			console.log('parent :>> '.bgBlue, bookedSessions);
			const bookingsArray = bookedSessions.map(async (bookingId) => {
				return await timeslotModel.findById(bookingId);
			});
			return bookingsArray;
		},

		async vouchers(parent) {
			const vouchersModel = parent.vouchers;
			console.log('parent :>> '.bgBlue, vouchersModel);
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

		addVouchers: async (_, {userId, numberOfVouchers}) => {
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
				const savedVoucher = await newVoucher.save();
				vouchers.push(savedVoucher);
			}

			// Update the user's vouchers array
			user.vouchers = user.vouchers.concat(vouchers);
			await user.save();

			return vouchers;
		},

		async deleteUser(_, args) {
			return await userModel.findByIdAndRemove(args.id);
		},

		async login(_, {email, password}) {
			try {
				const existingUser = await userModel.findOne({email});

				if (!existingUser) {
					throw new Error('No user with that email.');
				}

				const verified = await verifyPassword(password, existingUser.password);

				if (!verified) {
					throw new Error("Password doesn't match.");
				}

				const token = generateToken(existingUser);
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
			} catch (error) {
				throw new Error('Something went wrong...', error);
			}
		},

		async register(_, args) {
			const {email, password, name} = args;
			// Validate the input
			if (!email || !password || !name) {
				throw new Error('Please fill out all fields', {
					invalidArgs: ['email', 'password', 'name'],
				});
			}
			try {
				// Perform user creation logic
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
	},
};

export {resolvers};
