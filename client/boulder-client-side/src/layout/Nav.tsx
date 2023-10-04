import React, {CSSProperties, useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../contexts/AuthContext';

// import {Nav, NavLink, Bars, NavMenu, NavBtn, IconInsta, IconFB, LogoImg} from './navElements';

// interface Props {
// 	scrollNav: boolean;
// 	setScrollNav: Dispatch<React.SetStateAction<boolean>>;
// }

const Nav = () => {
	// const {scrollNav, setScrollNav} = props;
	const {user} = useContext(AuthContext);

	const [scrollNav, setScrollNav] = useState(false);
	const [isMouseMoving, setIsMouseMoving] = useState(false);

	const navStyles: CSSProperties = {
		background: scrollNav ? '#24003b' : 'transparent',
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
	};

	const linksContainerStyles: React.CSSProperties = {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		flexDirection: 'row',
		display: 'flex',
		gap: '3em',
	};

	const activeLink: React.CSSProperties = {
		color: 'red',
		fontWeight: 'bold',
	};


    //TODO: Figure out how to achieve mouseMove with mousemove event to affect when the nav displays and hides
	useEffect(() => {
		window.addEventListener('scroll', changeNav);

		// Add event listeners for mouse movement
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseleave', handleMouseLeave);

		return () => {
			window.removeEventListener('scroll', changeNav);

			// Remove event listeners when component unmounts
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseleave', handleMouseLeave);
		};
	}, []);

	const handleMouseMove = () => {
		setIsMouseMoving(true);
	};

	const handleMouseLeave = () => {
		setIsMouseMoving(false);
	};

	const changeNav = () => {
		setScrollNav(window.scrollY >= 80);
	};

	return (
		<>
			<nav style={navStyles}>
				<div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
					<div>
						<h1>Logo</h1>
					</div>
					<div style={linksContainerStyles}>
						<NavLink to='/' style={({isActive}) => (isActive ? activeLink : {})}>
							Home
						</NavLink>

						<NavLink to='/map' style={({isActive}) => (isActive ? activeLink : {})}>
							Map
						</NavLink>
						{user ? (
							<NavLink to='/myprofile' style={({isActive}) => (isActive ? activeLink : {})}>
								Settings
							</NavLink>
						) : (
							<></>
						)}

						{user ? (
							<></>
						) : (
							<NavLink to='/login' style={({isActive}) => (isActive ? activeLink : {})}>
								{/* <IconButton color='inherit'>
								<ExitToAppIcon />
							</IconButton> */}
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
						<p>{user ? <img src={`${user.image_url}`} className='navProfilePic' style={{border: 'solid 1px rgba(0,0,0,0.2)'}} /> : <></>}</p>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;
