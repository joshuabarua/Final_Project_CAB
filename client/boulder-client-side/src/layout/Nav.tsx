import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';
import {toast} from 'react-toastify';
import {User} from '../@types';

// interface Props {
// 	scrollNav: boolean;
// 	setScrollNav: Dispatch<React.SetStateAction<boolean>>;
// }

const Nav = () => {
	// const {scrollNav, setScrollNav} = props;
	const {user, logout, loading} = useContext(AuthContext);
	const navigate = useNavigate();
	const [scrollNav, setScrollNav] = useState(false);
	const [isMouseMoving, setIsMouseMoving] = useState(false);

	const navStyles: CSSProperties = {
		background: scrollNav ? '#fce6d1' : 'transparent',
		height: '60px',
		width: '100vw',
		marginTop: '-0px',
		display: 'flex',
		justifyContent: 'space-between',
		zIndex: 10,
		position: 'fixed',
		transition: '0.4s ease-in-out',
		top: isMouseMoving ? '0' : '-20%',
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
		setScrollNav(window.scrollY >= 50);
	};

	return (
		<nav style={navStyles}>
			<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', padding: '1em'}}>
				<div>
					<h1>Logo</h1>
				</div>
				<div style={linksContainerStyles}>
					<NavLink to='/' style={({isActive}) => (isActive ? activeLink : {})}>
						Home
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

					{user && user ? (
						loading ? (
							<>loading data... </>
						) : user.vouchers ? (
							user.vouchers.length === 0 ? (
								<NavLink to='/voucherSelection' style={({isActive}) => (isActive ? activeLink : {})}>
									Buy Vouchers
								</NavLink>
							) : (
								<div
									style={{border: '1px solid gold', height: '40px', width: '40px', borderRadius: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
									<h3>x{user.vouchers.length}</h3>
								</div>
							)
						) : (
							<></>
						)
					) : (
						<></>
					)}

					{user && user ? (
						<NavLink to='/myprofile' style={({isActive}) => (isActive ? activeLink : {})}>
							Profile
						</NavLink>
					) : (
						<></>
					)}
					{user && user ? (
						<a style={{cursor: 'pointer'}} onClick={logout}>
							Logout
						</a>
					) : (
						<NavLink to='/login' style={({isActive}) => (isActive ? activeLink : {})}>
							Login
						</NavLink>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
