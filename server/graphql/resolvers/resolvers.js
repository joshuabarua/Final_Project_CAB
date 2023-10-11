import userModel from '../../models/userModel.js';
import bookingModel from '../../models/bookingModel.js';
//  import    from '@apollo/server';
import {generateToken} from '../../utils/jwt.js';
import {verifyPassword} from '../../utils/bcrypt.js';

const resolvers = {
	Query: {
		async users(_, __, ___, info) {
			const users = await userModel.find();
			return users;
		},

		async bookings(parent, args, contextValue, info) {
			console.log('contextValue :>> '.bgMagenta, contextValue);
			return await bookingModel.find();
		},

		async user(parent, args, contextValue) {
			console.log('args :>> '.bgYellow, args);
			console.log('contextValue :>> '.bgMagenta, contextValue);

			return userModel.findById(args.id);
		},
		async booking(_, args) {
			console.log('args :>> '.bgYellow, args);
			return bookingModel.findById(args.id);
		},
	},

	User: {
		async assignedBooking(parent) {
			console.log('parent :>> '.bgYellow, parent);
			const bookingId = parent.assignedBooking;

			return bookingModel.findById(bookingId);
		},
	},

	Booking: {
		async assignedTo(parent) {
			const assignedUsersIDsArray = parent.assignedTo;
			console.log('assignedUsersIDsArray :>> ', assignedUsersIDsArray);
			const usersArray = assignedUsersIDsArray.map(async (supId) => {
				return await userModel.findById(supId);
			});
			return usersArray;
		},
	},

	Mutation: {
		async addUser(_, args) {
			const newUser = new userModel({
				...args.newUserData,
			});
			return await newUser.save();
		},
		async addBooking(_, args) {
			const newBooking = new bookingModel({
				...args.newBookingData,
			});
			return await newBooking.save();
		},
		async deleteUser(_, args) {
			return await userModel.findByIdAndRemove(args.id);
		},

		login: async (_, {email, password}) => {
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
						createdAt: existingUser.createdAt,
					},
				};
			} catch (error) {
				throw new AuthenticationError('Something went wrong...');
			}
		},

		register: async (_, {email, password, name}) => {
			try {
				// Validate the input
				if (!email || !password || !name) {
					throw new Error('Please fill out all fields', {
						invalidArgs: ['email', 'password', 'name'],
					});
				}
				// Perform user creation logic
				const hashedPassword = await encryptPassword(password);
				const newUser = new userModel({
					email,
					password: hashedPassword,
					name,
				});
				const result = await newUser.save();
				const token = generateToken(newUser);
				const forFront = {
					email: result.email,
					name: result.name,
					_id: result._id,
					createdAt: result.createdAt,
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
					throw new Error('Unknown error occurred');
				}
			}
		},
	},
};

export {resolvers};
