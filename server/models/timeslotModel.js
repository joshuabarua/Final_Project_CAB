import mongoose from 'mongoose';

const TimeslotSchema = new mongoose.Schema({
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	spots: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
		default: 5,
	},
	userVouchers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Voucher'}],
});

const timeslotModel = mongoose.model('Timeslot', TimeslotSchema);
export default timeslotModel;
