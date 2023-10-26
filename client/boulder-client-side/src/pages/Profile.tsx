import React, {useContext, useEffect, useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {GET_CURRENT_USER, UPDATE_USER_PROFILE} from '../gql/mutations'; // Replace with your actual GraphQL queries
import {AuthContext} from '../contexts/AuthContext';

interface User {
	_id: string;
	name: string;
	email: string;
	// Other user properties
}

const ProfilePage: React.FC = () => {
	const {user, setUser} = useContext(AuthContext);

	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);
	const [password, setPassword] = useState(user?.password);

	const {data, loading: queryLoading} = useQuery(GET_CURRENT_USER);
	const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

	useEffect(() => {
		if (!queryLoading && data && data.currentUser) {
			const currentUser = data.currentUser;
			setName(currentUser.name);
			setEmail(currentUser.email);
		}
	}, [queryLoading, data]);

	const handleProfileUpdate = async () => {
		try {
			const updatedUser = await updateUserProfile({
				variables: {
					userId: user?._id,
					name,
					email,
				},
			});
			setUser(updatedUser.data.updateUser);
			// Optionally, update user data in local state or `localStorage`
		} catch (error) {
			console.error('Error updating user profile:', error);
		}
	};

	if (queryLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className='centeredDivCol' style={{height: '100vh'}}>
			<div className='centeredDivCol' style={{height: '50%', width: '40%', backgroundColor: 'white', borderRadius: '10px', gap: '30px'}}>
				<h1>User Profile</h1>
				{user ? (
					<div className='centeredDivRow' style={{height: '100%', width: '100%', justifyContent: 'space-evenly', alignItems: 'flex-start'}}>
						<div className='centeredDivCol' style={{justifyContent: 'space-evenly', height: '50%', width: '50%', gap: '20px'}}>
							<div style={{justifyContent: 'space-evenly', height: '50%', width: '50%', alignItems: 'flex-start'}}>
								<label htmlFor='name' style={{marginRight: '10px'}}>
									Name:
								</label>
								<input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder={user.name} />
							</div>
							<div style={{justifyContent: 'space-evenly', height: '50%', width: '50%', alignItems: 'flex-start'}}>
								<label htmlFor='email' style={{marginRight: '10px'}}>
									Email:
								</label>
								<input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder={user.email} />
							</div>
							<div style={{justifyContent: 'space-evenly', height: '50%', width: '50%', alignItems: 'flex-start'}}>
								<label htmlFor='password' style={{marginRight: '10px'}}>
									Password:
								</label>
								<input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
							</div>
							<button onClick={handleProfileUpdate} style={{justifyContent: 'space-evenly', height: '50%', width: '50%', alignItems: 'flex-start'}}>
								Update Profile
							</button>
						</div>
						<div>
							<div>
								<h3>Vouchers Available </h3>
								<p>{user.vouchers ? user.vouchers.length : 0}</p>
							</div>
							<div>
								<h3>Timeslots Booked </h3>
								<p>{user.assignedBookings.length}</p>
							</div>
						</div>
					</div>
				) : (
					<div>User not found</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
