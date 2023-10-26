import React, {useContext, useEffect, useState} from 'react';
import {useQuery, useMutation} from '@apollo/client';
import {GET_CURRENT_USER, UPDATE_USER_PROFILE} from '../gql/mutations'; // Replace with your actual GraphQL queries
// import {AuthContext} from '../contexts/AuthContext';

interface User {
	_id: string;
	name: string;
	email: string;
	// Other user properties
}

const ProfilePage: React.FC = () => {
	// const {user, setUser} = useContext(AuthContext);

	const userStr = localStorage.getItem('user');
	const userParse = userStr && JSON.parse(userStr);
	const [user, setUser] = useState<User | null>(userParse);
	console.log(user);
	const [name, setName] = useState(user?.name);
	const [email, setEmail] = useState(user?.email);

	const {data, loading: queryLoading} = useQuery(GET_CURRENT_USER);
	const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

	useEffect(() => {
		if (!queryLoading && data && data.currentUser) {
			const currentUser: User = data.currentUser;
			setUser(currentUser);
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

	console.log('profile Page:', user);

	return (
		<div className='centeredDivCol' style={{height: '100vh'}}>
			<div className='centeredDivCol' style={{height: '50%', width: '50%', border: 'white 1px solid', gap: '30px'}}>
				<h2>User Profile</h2>
				{user ? (
					<div className='centeredDivCol' style={{justifyContent: 'space-evenly', height: '50%', width: '50%'}}>
						<div>
							<label htmlFor='name'>Name:</label>
							<input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder={user.name} />
						</div>
						<div>
							<label htmlFor='email'>Email:</label>
							<input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} />
						</div>
						<button onClick={handleProfileUpdate}>Update Profile</button>
					</div>
				) : (
					<div>User not found</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
