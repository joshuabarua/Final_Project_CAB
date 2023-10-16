import React from 'react';
import {FormEvent, useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
// import {Users} from '../@types';
import {AuthContext} from '../contexts/AuthContext';

const Register = () => {
	const {register} = useContext(AuthContext);
	// const [users, setUsers] = useState<Users>([]);

	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		register(email, username, password).catch((e: Error) => console.log(e));
	};

	return (
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
				<h1>Signup</h1>
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
						<label htmlFor='username'>Username</label>
						<input className='authFormInput' value={username} name='username' onChange={(e) => setUsername(e.target.value)} />
					</div>
					<div className={'formStyles'}>
						<label htmlFor='email'>Email</label>
						<input className='authFormInput' value={email} name='email' onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className={'formStyles'}>
						<label htmlFor='password'>Password</label>
						<input className='authFormInput' type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button className='authFormBtn' type='submit'>
						Signup
					</button>
				</form>

				<p>
					Not a user? <NavLink to='/Login'>Login</NavLink>
				</p>
			</div>
		</div>
	);
};

export default Register;
