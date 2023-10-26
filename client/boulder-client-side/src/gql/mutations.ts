import {gql} from '@apollo/client';

// Common Fields Fragment
export const USER_FIELDS = gql`
	fragment UserFields on User {
		_id
		email
		name
	}
`;

// User Mutations
export const LOGOUT_USER = gql`
	mutation LogoutUser {
		logout {
			success
		}
	}
`;

export const LOGIN_USER = gql`
	mutation LoginUser($loginEmail: String!, $loginPassword: String!) {
		login(email: $loginEmail, password: $loginPassword) {
			token
			user {
				...UserFields
			}
		}
	}
	${USER_FIELDS}
`;

export const REGISTER_USER = gql`
	mutation RegisterUser($registerEmail: String!, $registerPassword: String!, $registerName: String!) {
		register(email: $registerEmail, password: $registerPassword, name: $registerName) {
			token
			user {
				...UserFields
			}
		}
	}
	${USER_FIELDS}
`;

export const DELETE_USER = gql`
	mutation DeleteUser($deleteUserId: ID!) {
		deleteUser(id: $deleteUserId) {
			name
		}
	}
`;

export const ADD_VOUCHERS = gql`
	mutation AddVouchers($numberOfVouchers: Int!) {
		addVouchers(numberOfVouchers: $numberOfVouchers) {
			_id
			purchaseDate
			status
			assignedUser {
				_id
			}
		}
	}
`;

export const UPDATE_USER_PROFILE = gql`
	mutation UpdateUserProfile($email: String!, $password: String!, $name: String!) {
		updateUserProfile(email: $email, password: $password, name: $name) {
			token
			user {
				_id
				email
				name
				password
			}
		}
	}
`;

//Queries
export const GET_CURRENT_USER = gql`
	query CurrentUser {
		getCurrentUser {
			_id
			email
			name
			password
			vouchers {
				_id
			}
			assignedBookings {
				_id
				date
				time
			}
		}
	}
`;

export const GET_ALL_TIMESLOTS = gql`
	query AllTimeslots {
		timeslots {
			_id
			date
			time
			spots
			userVouchers {
				_id
			}
		}
	}
`;

export const GET_USER_VOUCHERS = gql`
	query getUserVouchers($userId: ID!) {
		user(_id: $userId) {
			_id
			vouchers {
				_id
				purchaseDate
				status
				assignedTimeslot {
					date
					time
				}
			}
		}
	}
`;

export const GET_USER_ASSIGNED_BOOKINGS = gql`
	query getAssignedBookings($userId: ID!) {
		user(_id: $userId) {
			_id
			assignedBookings {
				_id
				date: String
				time: String
				spots: Int
			}
		}
	}
`;
