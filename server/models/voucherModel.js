import mongoose from 'mongoose';

const VoucherSchema = new mongoose.Schema({
	purchaseDate: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		required: true,
		default: 'VALID',
		enum: ['USED', 'UNUSED', 'INVALID', 'VALID'],
	},
	assignedUser: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	assignedTimeslot: {type: mongoose.Schema.Types.ObjectId, ref: 'Timeslot'},
});

const voucherModel = mongoose.model('Voucher', VoucherSchema);
export default voucherModel;
