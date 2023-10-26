import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';
import {toast} from 'react-toastify';
// import {Nav, NavLink, Bars, NavMenu, NavBtn, IconInsta, IconFB, LogoImg} from './navElements';

// interface Props {
// 	scrollNav: boolean;
// 	setScrollNav: Dispatch<React.SetStateAction<boolean>>;
// }

const Nav = () => {
	// const {scrollNav, setScrollNav} = props;
	// const {user} = useContext(AuthContext);

	const authToken = localStorage.getItem('token');

	const userStr = localStorage.getItem('user');
	const user = userStr && JSON.parse(userStr);

	const navigate = useNavigate();

	const [scrollNav, setScrollNav] = useState(false);
	const [isMouseMoving, setIsMouseMoving] = useState(false);

	const navStyles: CSSProperties = {
		background: scrollNav ? '#fce6d1' : 'transparent',
		height: '60px', // Make sure to enclose height in quotes
		width: '100%', // Make sure to enclose width in quotes
		marginTop: '-0px', // Make sure to enclose marginTop in quotes
		display: 'flex', // Make sure to enclose display in quotes
		justifyContent: 'space-between', // Make sure to enclose justifyContent in quotes
		padding: '0.5rem ', // Make sure to enclose padding in quotes
		zIndex: 10,
		position: 'fixed', // Make sure to enclose position in quotes
		transition: '0.4s ease-in-out', // Make sure to enclose transition in quotes
		top: isMouseMoving ? '0' : '-20%', // Make sure to enclose top in quotes: ;
		left: '0px',
	};

	const linksContainerStyles: React.CSSProperties = {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
		display: 'flex',
		gap: '3em',
	};

	const activeLink: React.CSSProperties = {
		color: 'rgb(149, 206, 200)',
		fontWeight: 'bold',
	};

	//TODO: Figure out how to achieve mouseMove with mousemove event to affect when the nav displays and hides
	useEffect(() => {
		window.addEventListener('scroll', changeNav);
		window.addEventListener('mousemove', handleMouseMove);

		return () => {
			window.removeEventListener('scroll', changeNav);
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const handleMouseMove = () => {
		setIsMouseMoving(true);
	};

	const changeNav = () => {
		setScrollNav(window.scrollY >= 80);
	};

	return (
		<nav style={navStyles}>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
				<div>
					<h1>Logo</h1>
				</div>
				<div style={linksContainerStyles}>
					<NavLink to='/' style={({isActive}) => (isActive ? activeLink : {})}>
						Home
					</NavLink>
					<NavLink to='/voucherSelection' style={({isActive}) => (isActive ? activeLink : {})}>
						Buy Vouchers
					</NavLink>
					<NavLink to='/booktimeslot' style={({isActive}) => (isActive ? activeLink : {})}>
						Book Timeslot
					</NavLink>
					<NavLink to='/info' style={({isActive}) => (isActive ? activeLink : {})}>
						Info
					</NavLink>
					<NavLink to='/Contact' style={({isActive}) => (isActive ? activeLink : {})}>
						Contact
					</NavLink>
					<NavLink to='/news' style={({isActive}) => (isActive ? activeLink : {})}>
						News
					</NavLink>
					{user ? (
						<NavLink to='/myprofile' style={({isActive}) => (isActive ? activeLink : {})}>
							Profile
						</NavLink>
					) : (
						<></>
					)}
					{authToken ? (
						<a
							style={{cursor: 'pointer'}}
							onClick={() => {
								localStorage.removeItem('token');
								localStorage.removeItem('user');
								toast.success('Logging out...');
								setTimeout(() => navigate(`/`), 500);
							}}>
							Logout
						</a>
					) : (
						<NavLink to='/login' style={({isActive}) => (isActive ? activeLink : {})}>
							Login
						</NavLink>
					)}

					<p>
						{/* {user ? (
                            <button
							onClick={() => {
                                logout();
							}}>
							Logout
                            </button>
                            ) : (
                                'Please Login...'
                            )} */}
					</p>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
