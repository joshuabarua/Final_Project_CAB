import {gql} from '@apollo/client';

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
	mutation RegisterUser($registerEmail: String!, $registerPassword: String!, $name: String!) {
		register(email: $registerEmail, password: $registerPassword, name: $name) {
			token
			user {
				_id
				email
				name
				createdAt
			}
		}
	}
`;

export const DELETE_USER = gql`
	mutation DeleteUser($deleteUserId: ID!) {
		deleteUser(id: $deleteUserId) {
			name
		}
	}
`;

// Other Mutations
export const OTHER_MUTATION = gql`
  mutation OtherMutation($input: InputType) {
    // Define your mutation here
  }
`;

// Common Fields Fragment
export const USER_FIELDS = gql`
	fragment UserFields on User {
		_id
		email
		name
		createdAt
	}
`;
