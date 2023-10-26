import {useMutation} from '@apollo/client';
import {NavLink, useLocation, useNavigate} from 'react-router-dom';
import styles from '../styles/BoulderTokenCreation.module.css';
import {toast} from 'react-toastify';
import bgImage from '../assets/imgs/pexels-cottonbro-studio-6701740.jpg';
import {ADD_VOUCHERS} from '../gql/mutations';

const TOKEN_VALUE = 10;

const BoulderingVoucherCreation = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const numberOfVouchers = searchParams.get('vouchers');
	const vouchers = parseInt(numberOfVouchers || '0', 10);
	const [addVouchers] = useMutation(ADD_VOUCHERS);
	const AMOUNT_PAYABLE = vouchers * TOKEN_VALUE;
	const user = JSON.parse(localStorage.getItem('user') || '{}');
	const userId = user._id;

	console.log(userId, vouchers);
	const handleCheckout = async () => {
		try {
			const result = await addVouchers({
				variables: {
					numberOfVouchers: vouchers,
				},
			});
			if (result.errors) {
				toast.error(`Something went wrong - ${result.errors}`);
			}
			if (result.data) {
				console.log('results:', result.data);
				toast.success('Purchase Successful');
				setTimeout(() => navigate('/'), 2000);
			}
			console.log('result', result);
		} catch (error) {
			console.error('Error adding vouchers:', error);
			toast.error(`Something went wrong - ${error}`);
		}
	};

	if (!vouchers || (vouchers !== 1 && vouchers !== 10)) {
		// setTimeout(() => navigate('/bookingSelection'), 10000);
		return (
			<div className='centeredDivCol' style={{height: '100vh', paddingTop: '80px'}}>
				<p>Invalid number of vouchers</p>
				<p>
					Return to <NavLink to='/bookingSelection'>voucher selection</NavLink>
				</p>
			</div>
		);
	}

	return (
		<div className='centeredDivCol' style={{height: '100vh', paddingTop: '80px'}}>
			<h2>Purchase Bouldering Tokens</h2>
			<div className={styles.card}>
				<div className={styles.leftside}>
					<img src={bgImage} className={styles.vouchers} alt='Tokens' />
				</div>
				<div className={styles.rightside}>
					<div>
						<h1>Checkout Summary</h1>
						<div className='centeredDivRow' style={{justifyContent: 'space-evenly'}}>
							<p>Tokens (€{TOKEN_VALUE} per): </p>
							<p>x{vouchers}</p>
						</div>
						<hr />
						<div className='centeredDivRow' style={{justifyContent: 'space-evenly'}}>
							<p>Total</p>
							<p> €{vouchers > 1 ? AMOUNT_PAYABLE - 10 : AMOUNT_PAYABLE}</p>
						</div>
						<h2>Payment Information</h2>
						<p>Cardholder Name</p>
						<input type='text' className={styles.inputbox} name='name' defaultValue={'John Smith'} required />
						<p>Card Number</p>
						<input type='number' className={styles.inputbox} name='card_number' id='card_number' defaultValue={123456789101112} required />
						<p>Card Type</p>
						<select className={styles.inputbox2} name='card_type' id='card_type' required>
							<option value=''>--Select a Card Type--</option>
							<option value='Visa'>Visa</option>
							<option value='MasterCard'>MasterCard</option>
						</select>
						<div className={styles.expcvv}>
							<p className={styles.expcvv_text}>Expiry</p>
							<input type='date' className={styles.inputbox} name='exp_date' id='exp_date' defaultValue={'2050-10-25'} required />
							<p className={styles.expcvv_text2}>CVV</p>
							<input type='password' className={styles.inputbox} name='cvv' id='cvv' defaultValue={'123'} required />
						</div>
						<p></p>
						<button type='submit' className={styles.button} onClick={handleCheckout}>
							Check Out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BoulderingVoucherCreation;
