const gql = String.raw;

//Inside Type Voucher, userVoucher was changed from an [Voucher] to Voucher, change back for storing multiple vouchers in future per timeslot

const typeDefs = `#graphql
	enum CodeStatus {
		USED
		UNUSED
		INVALID
		VALID
	}

	type User {
		_id: ID!
		name: String!
		email: String!
		password: String!
		assignedBookings: [Timeslot]
		vouchers: [Voucher]
	}


	type Timeslot {
		_id: ID!
		datetime: String!
		spots: Int!
		userVoucher: ID!
	}

	type Voucher {
		_id: ID!
		purchaseDate: String!
		status: CodeStatus!
		assignedUser: User
		assignedTimeslot: Timeslot
	}

	type Query {
		users: [User]
		timeslots: [Timeslot]
		vouchers: [Voucher]
		user(_id: ID!): User
		getCurrentUser: User
		timeslot(_id: ID!): Timeslot
		voucher(_id: ID!): Voucher
		getAssignedVouchers(_id: ID!): [Voucher]
		getAssignedBookings(_id: ID!): [Timeslot]
	}

	type AuthPayload {
		token: String
		user: User
	}

	type Mutation {
		addUser(newUserData: AddUserInput!): User
		addTimeslot(newTimeslotData: AddTimeslotInput!): Timeslot
		useVoucher(selectedTime: String!): Timeslot
		addVouchers(numberOfVouchers: Int!): [Voucher]
		deleteUser(_id: ID!): User
		login(email: String!, password: String!): AuthPayload
		logout: Boolean
		register(name: String!, password: String!, email: String!): AuthPayload
		updateUserProfile(userId: ID!, name: String, email: String): User
	}

	input AddUserInput {
		name: String!
		password: String!
		email: String!
	}

	input AddTimeslotInput {
	datetime: String!
		spots: Int!
	}
`;
export {typeDefs};
