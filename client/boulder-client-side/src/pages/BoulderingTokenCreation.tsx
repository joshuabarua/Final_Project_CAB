import {useEffect, useState} from 'react';
import {useMutation} from '@apollo/client';
import styles from '../styles/BoulderTokenCreation.module.css';
import bgImage from '../assets/imgs/pexels-cottonbro-studio-6701740.jpg';
// import {CREATE_VOUCHER_MUTATION} from '../gql/mutations.js';
import {NavLink, useLocation} from 'react-router-dom';

const TOKEN_VALUE = 10;

const BoulderingTokenCreation = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const numberOfTokens = searchParams && searchParams.get('tokens');
	const AMOUNT_PAYABLE = numberOfTokens && parseInt(numberOfTokens) * TOKEN_VALUE;

	// useEffect(() => {
	// 	if (numberOfTokens) {
	// 		if (parseInt(numberOfTokens) !== 1 || parseInt(numberOfTokens) !== 10) {
	// 			console.log('number of  tokens invalid', numberOfTokens);
	// 			throw new Error(`Number of tokens is not valid - tokens: ${numberOfTokens}`);
	// 		}
	// 	}
	// }, [numberOfTokens]);

	const [tokens, setTokens] = useState<string[]>([]);
	// const [createVoucher] = useMutation(CREATE_VOUCHER_MUTATION); // Use your actual GraphQL mutation function

	// const handleGenerateTokens = async () => {
	// 	// Generate 1 or 10 tokens based on the numberOfTokens prop
	// 	const newTokens = Array.from({length: parseInt(numberOfTokens!)}, (_, index) => {
	// 		return `Token-${index + 1}`;
	// 	});

	// 	// Store the generated tokens in the component's state
	// 	setTokens(newTokens);

	// 	// Create vouchers and add to the backend using a GraphQL mutation
	// 	try {
	// 		const result = await createVoucher({
	// 			variables: {
	// 				tokens: newTokens,
	// 				// Other variables you need for your mutation
	// 			},
	// 		});
	// 		// Handle the result as needed
	// 		console.log('Vouchers created:', result.data);
	// 	} catch (error) {
	// 		// Handle any errors from the mutation
	// 		console.error('Error creating vouchers:', error);
	// 	}
	// };

	return (
		<div className='centeredDivCol' style={{height: '100vh', paddingTop: '80px'}}>
			<h2>Purchase Bouldering Tokens</h2>
			{numberOfTokens && (parseInt(numberOfTokens) === 1 || parseInt(numberOfTokens) === 10) ? (
				<div className={styles.card}>
					<div className={styles.leftside}>
						<img src={bgImage} className={styles.products} alt='Tokens' />
					</div>
					<div className={styles.rightside}>
						<form action=''>
							<h1>Checkout Summary </h1>
							<div className='centeredDivRow' style={{justifyContent: 'space-evenly'}}>
								<p>Tokens (€{TOKEN_VALUE} per): </p>
								<p>x{numberOfTokens}</p>
							</div>
							<hr />
							<div className='centeredDivRow' style={{justifyContent: 'space-evenly'}}>
								<p>Total</p>
								<p> €{AMOUNT_PAYABLE}</p>
							</div>

							<h2>Payment Information</h2>
							<p>Cardholder Name</p>
							<input type='text' className={styles.inputbox} name='name' required />
							<p>Card Number</p>
							<input type='number' className={styles.inputbox} name='card_number' id='card_number' required />

							<p>Card Type</p>
							<select className={styles.inputbox2} name='card_type' id='card_type' required>
								<option value=''>--Select a Card Type--</option>
								<option value='Visa'>Visa</option>
								<option value='MasterCard'>MasterCard</option>
							</select>
							<div className={styles.expcvv}>
								<p className={styles.expcvv_text}>Expiry</p>
								<input type='date' className={styles.inputbox} name='exp_date' id='exp_date' required />

								<p className={styles.expcvv_text2}>CVV</p>
								<input type='password' className={styles.inputbox} name='cvv' id='cvv' required />
							</div>
							<p></p>
							<button type='submit' className={styles.button} onClick={() => {}}>
								Check Out
							</button>
						</form>
					</div>
				</div>
			) : (
				<>
					<p>Invalid number of tokens</p>
					<p>
						return to <NavLink to={'/bookingSelection'}>token selection</NavLink>
					</p>
				</>
			)}
		</div>
	);
};

export default BoulderingTokenCreation;
