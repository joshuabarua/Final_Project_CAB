import {createContext, useState, ReactNode, useEffect} from 'react';
import {LoginData, LoginVariables, NotOk, User} from '../@types';
import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import getToken from '../utils/getToken';
import {LOGIN_USER} from '../gql/mutations.js';
import {useMutation} from '@apollo/client';

interface DefaultValue {
	user: null | User;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	login: ({loginEmail, loginPassword}: LoginVariables) => Promise<void>;
	register: (email: string, password: string, name: string) => Promise<void>;
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
	const redirect = useNavigate();

	const register = async (email: string, password: string, name: string) => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('password', password);

		const requestOptions = {
			method: 'POST',
			body: formData,
		};
		try {
			const response = await fetch(`${baseURL}api/users/new`, requestOptions);
			if (response.ok) {
				const result = (await response.json()) as SignupResult;
				const {token} = result as SignupResult;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(result.user));
				toast.success('Signup Successful, logging in...');
				setUser(result.user);
				setTimeout(() => redirect('/'), 2000);
			} else {
				const result = (await response.json()) as NotOk;
				toast.error(`Something went wrong - ${result.error}`);
			}
		} catch (e) {
			toast.error(` ${e as Error}`);
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
					setTimeout(() => redirect('/myprofile'), 2000);

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
		toast.success('Logging out... Cya!');
	};

	const [loginMutationFunc, {data: loginData, error: loginError, loading: loginLoading}] = useMutation<LoginData, LoginVariables>(LOGIN_USER);
	const login = async ({loginEmail, loginPassword}: LoginVariables) => {
		try {
			const result = await loginMutationFunc({
				variables: {loginEmail, loginPassword},
			});
			console.log(loginData, loginLoading);

			if (loginError) {
				toast.error(`Something went wrong - ${loginError.message}`);
			}
			if (result.data) {
				const token = result.data.login.token;
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(result.data.login.user));
				toast.success('Login Successful');
				setUser(result.data.login.user);
				setTimeout(() => redirect('/'), 2000);
			}
		} catch (error) {
			toast.error(`Something went wrong - ${error}`);
		}
	};

	// const getActiveUser = async () => {
	// 	const token = getToken();
	// 	if (token) {
	// 		try {
	// 			const myHeaders = new Headers({Authorization: `Bearer ${token}`});
	// 			const requestOptions = {
	// 				method: 'GET',
	// 				headers: myHeaders,
	// 			};
	// 			const response = await fetch(`${baseURL}api/users/me`, requestOptions);
	// 			const result = (await response.json()) as User;
	// 			setUser(result);
	// 		} catch (error) {
	// 			toast.error(error as string);
	// 			console.log(error);
	// 		}
	// 	} else {
	// 		setUser(null);
	// 	}
	// };

	useEffect(() => {
		// getActiveUser().catch((e) => console.log(e));
	}, []);

	return <AuthContext.Provider value={{user, setUser, register, login, logout, update}}>{children}</AuthContext.Provider>;
};
