import {createContext, useState, ReactNode, useEffect} from 'react';
import {LoginData, LoginVariables, NotOk, RegisterData, RegisterVariables, User} from '../@types';
import {toast} from 'react-toastify';
import {redirect, useNavigate} from 'react-router-dom';
import getToken from '../utils/getToken';
import {GET_CURRENT_USER, LOGIN_USER, REGISTER_USER} from '../gql/mutations.js';
import {ApolloQueryResult, OperationVariables, useMutation, useQuery} from '@apollo/client';

interface DefaultValue {
	user: null | User;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
	loading: boolean;
	login: ({loginEmail, loginPassword}: LoginVariables) => Promise<void>;
	logout: () => void;
	register: ({registerEmail, registerPassword, registerName}: RegisterVariables) => Promise<void>;
	update: (updateFields: {email: string; password: string; name: string}) => void;
}

interface SignupResult {
	user: User;
	token: string;
}

const initialValue: DefaultValue = {
	user: null,
	loading: false,
	setUser: () => {
		throw new Error('context not implemented.');
	},
	refetch: () => {
		throw new Error('context not implemented.');
	},
	login: () => {
		throw new Error('context not implemented.');
	},
	register: () => {
		throw new Error('context not implemented.');
	},
	logout: () => {
		throw new Error('context not implemented.');
	},
	update: () => {
		throw new Error('context not implemented.');
	},
};

export const AuthContext = createContext<DefaultValue>(initialValue);

export const AuthContextProvider = ({children}: {children: ReactNode}) => {
	const baseURL = import.meta.env.VITE_SERVER_BASE as string;
	const [user, setUser] = useState<null | User>(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const [registerMutationFunc, {loading: regLoading}] = useMutation<RegisterData, RegisterVariables>(REGISTER_USER);
	const register = async ({registerEmail, registerPassword, registerName}: RegisterVariables) => {
		try {
			if (regLoading) {
				console.log(regLoading);
				setLoading(true);
			}
			const result = await registerMutationFunc({
				variables: {
					registerEmail,
					registerPassword,
					registerName,
				},
				onCompleted: (registerData) => {
					const {user, token} = registerData.register;
					localStorage.setItem('user', JSON.stringify(user));
					localStorage.setItem('token', token);
					toast.success('Signup Successful, logging in...');
					setUser(user);
					setLoading(false);
					setTimeout(() => navigate('/'), 1000);
				},
				onError: (error: Error) => {
					setLoading(false);
					toast.error(`Something went wrong - ${error.message}`);
				},
			});
		} catch (e) {
			setLoading(false);
			toast.error(` ${e as Error}`);
		}
	};

	const [loginMutationFunc, {error, loading: loginLoading}] = useMutation<LoginData, LoginVariables>(LOGIN_USER);
	const login = async ({loginEmail, loginPassword}: LoginVariables) => {
		try {
			const result = await loginMutationFunc({
				variables: {loginEmail, loginPassword},
			});

			if (result.errors || error) {
				setLoading(false);
				toast.error(`Something went wrong - ${result.errors || error}`);
			}
			if (loginLoading) {
				console.log(loginLoading);
				setLoading(true);
			}

			if (result.data) {
				const {user, token} = result.data.login;
				console.log('result :>> ', result);
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				setUser(user);
				toast.success('Login Successful');
				setLoading(false);
				navigate('/');
			}
		} catch (error) {
			setLoading(false);
			toast.error(`Something went wrong - ${error}`);
		}
	};

	const update = async (updateFields: {email: string; password: string; name: string}) => {
		const formData = new FormData();
		const {email = '', password = '', name = ''} = updateFields;
		name && formData.append('name', name);
		email && formData.append('email', email);
		password && formData.append('password', password);

		const token = getToken();

		const requestOptions = {
			method: 'PATCH',
			body: formData,
		};
		if (token) {
			try {
				const response = await fetch(`${baseURL}api/users/update-user`, requestOptions);
				if (response.ok) {
					const result = (await response.json()) as SignupResult;
					toast.success(' Successful, updating user...');
					setTimeout(() => navigate('/myprofile'), 2000);

					setUser(result.user);
				} else {
					const result = (await response.json()) as NotOk;
					toast.error(`Something went wrong - ${result.error}`);
				}
			} catch (e) {
				toast.error(` ${e as Error}`);
			}
		} else {
			console.log('no token');
		}
	};

	const logout = async () => {
		try {
			if (error) {
				console.log('Error:', error);
			} else {
				setUser(null);
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				toast.success('Logging out...');
				setTimeout(() => redirect('/'), 1500);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const {data, loading: activeUserLoading, error: activeUserError, refetch} = useQuery(GET_CURRENT_USER);
	
	const getActiveUser = async () => {
		const result = await data;
		console.log('result TWOOO:>> ', result);
		console.log('data in getActiveUser() :>> ', data);
		try {
			if (activeUserLoading) {
				setLoading(true);
			} else if (activeUserError) {
				toast.error(activeUserError.message);
				console.error(activeUserError);
				setLoading(false);
			}
			if (data) {
				const localToken = localStorage.getItem('token');
				// if (localToken) {

				// }
				const currentUser = data.getCurrentUser;
				setUser(currentUser);
				setLoading(false);
			}
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getActiveUser();
	}, [data]);

	return <AuthContext.Provider value={{user, loading, setUser, register, login, logout, update, refetch}}>{children}</AuthContext.Provider>;
};
