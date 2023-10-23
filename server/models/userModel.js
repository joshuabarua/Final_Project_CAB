import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: (value) => {
				return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value);
			},
			message: 'Invalid email format',
		},
	},
	password: {
		type: String,
		required: true,
	},
	vouchers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Voucher'}],
	assignedBookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot'}],
});

const userModel = mongoose.model('user', userSchema);
export default userModel;
