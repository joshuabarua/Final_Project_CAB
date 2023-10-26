import {createContext, useState, ReactNode, useEffect} from 'react';
import {LoginData, LoginVariables, NotOk, RegisterData, RegisterVariables, User} from '../@types';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import getToken from '../utils/getToken';
import {GET_CURRENT_USER, LOGIN_USER, REGISTER_USER} from '../gql/mutations.js';
import {useMutation, useQuery} from '@apollo/client';

interface DefaultValue {
	user: null | User;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	login: ({loginEmail, loginPassword}: LoginVariables) => Promise<void>;
	register: ({registerEmail, registerPassword, registerName}: RegisterVariables) => Promise<void>;
	update: (updateFields: {email: string; password: string; name: string}) => void;
	logout: () => void;
}

interface SignupResult {
	user: User;
	token: string;
}

const initialValue: DefaultValue = {
	user: null,
	setUser: () => {
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
	const navigate = useNavigate();
	const [registerMutationFunc, {loading}] = useMutation<RegisterData, RegisterVariables>(REGISTER_USER);
	const register = async ({registerEmail, registerPassword, registerName}: RegisterVariables) => {
		try {
			if (loading) {
				console.log(loading);
			}
			const result = await registerMutationFunc({
				variables: {
					registerEmail,
					registerPassword,
					registerName,
				},
				onCompleted: (registerData) => {
					console.log('register variable', registerData);
					const {user, token} = registerData.register;
					localStorage.setItem('user', JSON.stringify(user));
					setUser(user);
					localStorage.setItem('token', token);
					toast.success('Signup Successful, logging in...');
					setTimeout(() => navigate('/'), 1000);
				},
				onError: (error: Error) => {
					toast.error(`Something went wrong - ${error.message}`);
				},
			});
			console.log(result);
		} catch (e) {
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
				toast.error(`Something went wrong - ${result.errors || error}`);
			}
			if (loginLoading) {
				console.log(loginLoading);
			}

			if (result.data) {
				const {user, token} = result.data.login;
				console.log('Token from header:', token);
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				toast.success('Login Successful');
				setUser(user);
				setTimeout(() => navigate('/'), 1000);
			}
		} catch (error) {
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

	const logout = () => {
		setUser(null);
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		toast.success('Logging out...');
		setTimeout(() => navigate(`/`), 500);
	};

	// const {data, loading: activeUserLoading, error: activeUserError} = useQuery(GET_CURRENT_USER);
	// const getActiveUser = async () => {
	// 	try {
	// 		// if (activeUserLoading) {
	// 		// 	console.log('loading... get active suer');
	// 		// 	return;
	// 		// }

	// 		if (activeUserError) {
	// 			// Handle error (e.g., display an error message)
	// 			toast.error(activeUserError.message);
	// 			console.error(activeUserError);
	// 			return;
	// 		}

	// 		if (data && data.getCurrentUser) {
	// 			const currentUser = data.getCurrentUser;
	// 			setUser(currentUser);
	// 			console.log('Current User:', currentUser);
	// 		} else {
	// 			console.log('No User Data');
	// 			setUser(null);
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	// useEffect(() => {
	// 	getActiveUser();
	// }, []);

	return <AuthContext.Provider value={{user, setUser, register, login, logout, update}}>{children}</AuthContext.Provider>;
};
