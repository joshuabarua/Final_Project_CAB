import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	assignedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
});

const bookingModel = mongoose.model('Mission', bookingSchema);
export default bookingModel;
