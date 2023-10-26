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
		max: 10,
		default: 10,
	},
	userVouchers: {
		type: [mongoose.Schema.Types.ObjectId],
		ref: 'Voucher',
		validate: [limitArray(10), 'Cannot have more that 10  users an hour'],
	},
});

function limitArray(limit) {
	return function (value) {
		return value.length <= limit;
	};
}

const timeslotModel = mongoose.model('Timeslot', TimeslotSchema);
export default timeslotModel;
