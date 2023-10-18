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
