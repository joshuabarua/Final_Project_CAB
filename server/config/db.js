import mongoose from 'mongoose';

const connectDB = async () => {
	try {
		const connection = await mongoose.connect(process.env.MONGO_URI);
		console.log(`Connected to MongoDB: ${connection.connection.host}`.blue);
	} catch (error) {
		console.log('error:>> '.bgRed, error);
		throw new Error('Cannot connect to MongoDB');
	}
};

export default connectDB;
