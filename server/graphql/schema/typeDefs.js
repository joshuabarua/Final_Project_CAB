// const typeDefs = `#graphql
// type Superhero {

// }

//in my case i need to use "gql"
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
		id: ID!
		name: String!
		email: String!
		password: String!
		assignedBooking: Booking
	}

	type Booking {
		id: ID!
		date: String!
		time: String!
		status: CodeStatus!
		assignedTo: User
	}

	type Query {
		users: [User]
		bookings: [Booking]
		user(id: ID!): User
		booking(id: ID!): Booking
	}

	type Mutation {
		addUser(newUserData: AddUserInput!): User
		addBooking(newBookingData: AddBookingInput!): Booking
		deleteUser(id: ID!): User
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
