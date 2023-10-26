import React from 'react';

const newsContainerStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '20px',
	height: '100vh',
};

const newsItemStyle = {
	width: '80vw',
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
				<p style={paragraphStyle}>We've just added new climbing routes to our gym. Come and test your skills on these challenging routes that have something for everyone.</p>
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
	);
};

export default News;
