import {FormEvent, useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';
import {LoginVariables} from '../@types';

const Login = () => {
	const {login} = useContext(AuthContext);
	const [loginEmail, setEmail] = useState('');
	const [loginPassword, setPassword] = useState('');
	const loginVariables: LoginVariables = {loginEmail, loginPassword};
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(loginVariables).catch((e) => console.log(e));
	};

	return (
		<>
			<div className='' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100vw', height: '50vw', minHeight: '900px'}}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#fefdf8',
						width: '40vw',
						maxWidth: '550px',
						height: '60vh',
						minHeight: '500px',
						borderRadius: '25px',
						boxShadow: '0 0 10px #dbd6d6',
						color: 'black',
					}}>
					<h1>Login</h1>
					<form
						onSubmit={handleSubmit}
						className='centeredDiv'
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							flexDirection: 'column',
							gap: 25,
						}}>
						<div className={'formStyles'}>
							<label htmlFor='email'>Email</label>
							<input className='authFormInput' value={loginEmail} name='email' onChange={(e) => setEmail(e.target.value)} />
						</div>
						<div className={'formStyles'}>
							<label htmlFor='password'>Password</label>
							<input className='authFormInput' type='password' name='password' value={loginPassword} onChange={(e) => setPassword(e.target.value)} />
						</div>
						<button className='authFormBtn' type='submit'>
							Login
						</button>
					</form>

					<p>
						Not a user? <NavLink to='/register'>Sign Up</NavLink>
					</p>
				</div>
			</div>
		</>
	);
};

export default Login;
