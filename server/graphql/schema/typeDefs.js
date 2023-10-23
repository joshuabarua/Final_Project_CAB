const gql = String.raw;

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
		date: String!
		time: String!
		spots: Int!
		userVouchers: [Voucher]
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
		addVouchers(userId: ID!, numberOfVouchers: Int!): [Voucher]
		deleteUser(_id: ID!): User
		login(email: String!, password: String!): AuthPayload
		register(name: String!, password: String!, email: String!): AuthPayload
	}

	input AddUserInput {
		name: String!
		password: String!
		email: String!
	}

	input AddTimeslotInput {
		date: String!
		time: String!
		spots: Int!
	}
`;
export {typeDefs};
