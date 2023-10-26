import React from 'react';
import contactImg from '../assets/imgs/pexels-cottonbro-studio-6701735.jpg';

const contactContainerStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '150vh',
};

const contactItemStyle: React.CSSProperties = {
	maxWidth: '600px',
	padding: '40px',
	marginBottom: '50px',
	textAlign: 'center',
};

const headingStyle = {
	fontSize: '24px',
	fontWeight: 'bold',
	margin: '10px 0',
};

const paragraphStyle = {
	fontSize: '18px',
	margin: '10px 0',
};

const ContactUs = () => {
	return (
		<div style={contactContainerStyle}>
			<img
				src={contactImg}
				style={{
					objectFit: 'cover',
					width: '100%',
					height: '100%',
				}}
				alt='climbing'
			/>
			<div style={contactItemStyle}>
				<h2 style={headingStyle}>Contact Boulder Bebis</h2>
				<p style={paragraphStyle}>We'd love to hear from you!</p>
				<p style={paragraphStyle}>
					Address: 123 Climbing Street, Boulder City
					<br />
					Phone: (123) 456-7890
					<br />
					Email: info@boulderbebis.com
				</p>
			</div>

			<div style={{...contactItemStyle, background: 'white', boxShadow: '0 0 10px #dbd6d6', borderRadius: '10px'}}>
				<h2 style={headingStyle}>Send Us a Message</h2>
				<p style={paragraphStyle}>Have any questions or feedback? Feel free to reach out to us by filling out the form below:</p>
				<form>
					<label htmlFor='name'>Name:</label>
					<input type='text' id='name' name='name' style={{width: '100%', padding: '5px', marginBottom: '10px'}} />

					<label htmlFor='email'>Email:</label>
					<input type='email' id='email' name='email' style={{width: '100%', padding: '5px', marginBottom: '10px'}} />

					<label htmlFor='message'>Message:</label>
					<textarea id='message' name='message' style={{width: '100%', padding: '5px', marginBottom: '10px', height: '150px'}} />

					<button type='submit' style={{backgroundColor: '#007bff', color: 'white', padding: '10px', border: 'none', cursor: 'pointer'}}>
						Send
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactUs;
