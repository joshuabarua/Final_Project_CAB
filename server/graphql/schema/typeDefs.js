// const typeDefs = `#graphql
// type Superhero {
// }
const gql = String.raw;

const typeDefs = gql`
	enum CodeStatus {
		USED
		UNUSED
		INVALID
		VALID
	}

	"""
	superhero defines a superhero in our DB
	"""
	type User {
		_id: ID!
		name: String!
		email: String!
		password: String!
		assignedBooking: Booking
	}

	type Booking {
		_id: ID!
		date: String!
		time: String!
		status: CodeStatus!
		assignedTo: User
	}

	type Query {
		users: [User]
		bookings: [Booking]
		user(_id: ID!): User
		booking(_id: ID!): Booking
	}

	type AuthPayload {
		token: String
		user: User
	}

	type Mutation {
		addUser(newUserData: AddUserInput!): User
		addBooking(newBookingData: AddBookingInput!): Booking
		deleteUser(_id: ID!): User
		login(email: String!, password: String!): AuthPayload
		register(email: String!, password: String!, username: String!): AuthPayload
	}

	input AddUserInput {
		name: String!
		password: String!
		email: String!
	}

	input AddBookingInput {
		name: String!
		date: String!
		time: String!
		status: CodeStatus!
	}
`;

export {typeDefs};
