import React, {useState} from 'react';

// type Props = {}

const BuyVouchers = () => {
	// Create state variables to store form data
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [selectedSlot, setSelectedSlot] = useState('');

	// Function to handle form submission
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Process and submit form data here, e.g., send it to the server
		// You can access the form data using the state variables (name, email, selectedSlot)
		// Reset the form or perform any other actions as needed
	};

	return (
		<div className='centeredDivCol' style={{height: '100vh'}}>
			<h2>Book a climbing slot</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='name'>Name:</label>
					<input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} required />
				</div>

				<div>
					<label htmlFor='email'>Email:</label>
					<input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
				</div>

				<div>
					<label htmlFor='slot'>Select a slot:</label>
					<select id='slot' value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
						<option value=''>-- Select a slot --</option>
						<option value='Slot 1'>Slot 1</option>
						<option value='Slot 2'>Slot 2</option>
						{/* Add more slot options here */}
					</select>
				</div>

				<div>
					<button type='submit'>Book Slot</button>
				</div>
			</form>
		</div>
	);
};

export default BuyVouchers;
