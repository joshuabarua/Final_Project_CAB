import React from 'react';
import newsImg from '../assets/imgs/pexels-cottonbro-studio-6701946.jpg';

const newsStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100vh',
};
const newsContainerStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	width: '80vw',
};

const newsItemStyle = {
	padding: '20px',
	border: '1px solid #ccc',
	borderRadius: '5px',
	margin: '10px',
};

const headingStyle = {
	fontSize: '20px',
	margin: '0',
};

const paragraphStyle = {
	fontSize: '16px',
	margin: '10px 0',
};

const News = () => {
	return (
		<div style={newsStyle}>
			<div style={newsContainerStyle}>
				<div style={newsItemStyle}>
					<h2 style={headingStyle}>Exciting News - Climbing Workshop</h2>
					<p style={paragraphStyle}>
						Join us this Saturday for an exclusive climbing workshop for climbers of all levels. Whether you're a novice or an advanced climber, this workshop will help you
						improve your skills.
					</p>
					<p style={paragraphStyle}>
						Date: March 12, 2023
						<br />
						Time: 10:00 AM - 3:00 PM
						<br />
						Location: Boulder Bebis Climbing Gym
					</p>
				</div>

				<div style={newsItemStyle}>
					<h2 style={headingStyle}>New Climbing Routes Available</h2>
					<p style={paragraphStyle}>
						We've just added new climbing routes to our gym. Come and test your skills on these challenging routes that have something for everyone.
					</p>
					<p style={paragraphStyle}>Don't miss out on the excitement and adventure! Visit us today.</p>
				</div>

				<div style={newsItemStyle}>
					<h2 style={headingStyle}>Climbing Gear Sale</h2>
					<p style={paragraphStyle}>
						Looking to update your climbing gear? We are offering a special sale on climbing equipment and accessories. Grab the best deals while they last.
					</p>
					<p style={paragraphStyle}>Sale Period: March 10 - March 20, 2023</p>
				</div>
			</div>
			<img
				src={newsImg}
				style={{
					objectFit: 'cover',
					width: '100%',
					height: '100%',
				}}
				alt='climbing'
			/>
		</div>
	);
};

export default News;
