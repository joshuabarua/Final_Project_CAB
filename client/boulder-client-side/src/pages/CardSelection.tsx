import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
const EventBookingCards: React.FC = () => {
	const [selectedCard, setSelectedCard] = useState<number | null>(null);
	const navigate = useNavigate();

	const handleCardSelect = (cardNumber: number) => {
		setSelectedCard(cardNumber);
	};

	return (
		<div className='centeredDivCol' style={{height: '80vh', justifyContent: 'space-evenly', gap: '10px'}}>
			<h1>Select a Booking Card</h1>

			<div className='centeredDivRow' style={{gap: '10px'}}>
				<div className={`card ${selectedCard === 1 ? 'selected' : ''}`} onClick={() => handleCardSelect(1)}>
					<h2>One-Time Card</h2>
					<p>Generates a boulder token for use with booking.</p>
					{selectedCard === 1 && (
						<div className='selected-card-content'>
							<button onClick={() => navigate(`/getVouchers?vouchers=${1}`)}>Buy 1 boulder token</button>
						</div>
					)}
				</div>

				<div className={`card ${selectedCard === 2 ? 'selected' : ''}`} onClick={() => handleCardSelect(2)}>
					<h2>10er Card</h2>
					<p>Creates 10 voucher codes for 10 sessions, useable whenever you need them most.</p>
					{selectedCard === 2 && (
						<div className='selected-card-content'>
							<button onClick={() => navigate(`/getVouchers?vouchers=${10}`)}>Pay for 10 Sessions</button>
						</div>
					)}
				</div>

				<div className={`card ${selectedCard === 3 ? 'selected' : ''}`} onClick={() => handleCardSelect(3)}>
					<h2>Monthly Card</h2>
					<p>Represents a monthly subscription plan.</p>
					{selectedCard === 3 && (
						<div className='selected-card-content'>
							<button
								onClick={() => {
									/* Navigate to payment page for 10 sessions */
								}}>
								Enjoy unlimited access every month
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default EventBookingCards;
