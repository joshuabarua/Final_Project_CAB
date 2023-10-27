import mongoose from 'mongoose';

const TimeslotSchema = new mongoose.Schema({
	datetime: {
		type: String,
		required: true,
	},
	spots: {
		type: Number,
		required: false,
		min: 0,
		max: 10,
		default: 10,
	},
	userVoucher: {
		type: mongoose.Schema.Types.ObjectId, //Add square brackets here to limit slots
		ref: 'Voucher',
		// validate: [limitArray(10), 'Cannot have more that 10  users an hour'],
	},
});

function limitArray(limit) {
	return function (value) {
		return value.length <= limit;
	};
}

const timeslotModel = mongoose.model('Timeslot', TimeslotSchema);
export default timeslotModel;
