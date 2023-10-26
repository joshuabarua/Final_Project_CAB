import React from 'react';
import infoImg from '../assets/imgs/pexels-cottonbro-studio-6699954.jpg';

const infoContainerStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
};

const infoContentStyle: React.CSSProperties = {
	textAlign: 'center',
	maxWidth: '600px',
	padding: '20px',
};

const headingStyle = {
	fontSize: '24px',
	margin: '0',
};

const paragraphStyle: React.CSSProperties = {
	fontSize: '16px',
	margin: '20px 0',
	padding: '10px',
};

const Info = () => {
	return (
		<div style={infoContainerStyle}>
			<img
				src={infoImg}
				style={{
					objectFit: 'cover',
					width: '100%',
					height: '100%',
				}}
				alt='climbing'
			/>

			<div style={infoContentStyle}>
				<h1 style={headingStyle}>Welcome to Boulder Bebis Climbing Gym</h1>
				<p style={paragraphStyle}>Address: 123 Climber's Lane, Rockville, USA</p>
				<p style={paragraphStyle}>
					We are your premier destination for indoor rock climbing and bouldering adventures. Whether you're a beginner or an experienced climber, our gym offers a variety of
					climbing routes to challenge and excite you.
				</p>
				<p style={paragraphStyle}>Opening Hours: 8:00 AM - 11:00 PM</p>
				<p style={paragraphStyle}>
					Our facilities include state-of-the-art climbing walls, friendly staff, and a vibrant climbing community. Come join us for a thrilling experience in the world of
					climbing.
				</p>
				<p style={paragraphStyle}>For inquiries and bookings, please contact us at info@boulderbebis.com.</p>
			</div>
		</div>
	);
};

export default Info;
