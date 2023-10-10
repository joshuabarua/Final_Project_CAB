import userModel from '../../models/userModel.js';
import bookingModel from '../../models/bookingModel.js';

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
		async addBooking(parent, args) {
			const newBooking = new bookingModel({
				...args.newBookingData,
			});
			return await newBooking.save();
		},

		async deleteUser(_, args) {
			return await userModel.findByIdAndRemove(args.id);
		},
	},
};

export {resolvers};
