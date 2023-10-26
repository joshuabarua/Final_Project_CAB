import React from 'react';

const contactContainerStyle: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '20px',
	height: '100vh',
};

const contactItemStyle: React.CSSProperties = {
	maxWidth: '600px',
	padding: '20px',
	border: '1px solid #ccc',
	borderRadius: '5px',
	margin: '10px',
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

			<div style={contactItemStyle}>
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
