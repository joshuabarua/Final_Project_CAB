import React, {useState} from 'react';

// Define the component
const EventBookingCards: React.FC = () => {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);

	const handleCardSelect = (cardNumber: number) => {
		setSelectedCard(cardNumber);
	};

	return (
		<div className='centeredDivCol' style={{height: '80vh', justifyContent: 'space-evenly'}}>
			<h1>Select a Booking Card</h1>

			<div className='centeredDivRow'>
				{/* One-Time Card */}
				<div className={`card ${selectedCard === 1 ? 'selected' : ''}`} onClick={() => handleCardSelect(1)}>
					<h2>One-Time Card</h2>
					<p>Generates a voucher code for immediate use.</p>
				</div>

				{/* 10er Card */}
				<div className={`card ${selectedCard === 2 ? 'selected' : ''}`} onClick={() => handleCardSelect(2)}>
					<h2>10er Card</h2>
					<p>Creates 10 voucher codes for 10 sessions.</p>
				</div>

				{/* Monthly Card */}
				<div className={`card ${selectedCard === 3 ? 'selected' : ''}`} onClick={() => handleCardSelect(3)}>
					<h2>Monthly Card</h2>
					<p>Represents a monthly subscription plan.</p>
				</div>
			</div>

			{/* Display relevant content based on the selected card */}
			{selectedCard === 1 && (
				<div className='selected-card-content'>
					{/* Render content for the One-Time Card */}
					<button onClick={() => {}}>Book Now</button>
				</div>
			)}
			{selectedCard === 2 && (
				<div className='selected-card-content'>
					{/* Render content for the 10er Card */}
					<button
						onClick={() => {
							/* Navigate to payment page for 10 sessions */
						}}>
						Pay for 10 Sessions
					</button>
				</div>
			)}
			{selectedCard === 3 && (
				<div className='selected-card-content'>
					{/* Render content for the Monthly Card */}
					<button
						onClick={() => {
							/* Navigate to payment page for 10 sessions */
						}}>
						<p>Enjoy unlimited access for a month.</p>
					</button>
				</div>
			)}
		</div>
	);
};

export default EventBookingCards;
