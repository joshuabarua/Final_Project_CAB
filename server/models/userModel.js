import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

	assignedBooking: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking'},
});

const userModel = mongoose.model('user', userSchema);
export default userModel;
