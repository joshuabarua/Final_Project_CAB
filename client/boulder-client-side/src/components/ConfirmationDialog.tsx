import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {format} from 'date-fns';
import {AuthContext} from '../contexts/AuthContext';
import {NavLink, useNavigate} from 'react-router-dom';
import {useMutation} from '@apollo/client';
import {toast} from 'react-toastify';
import {USE_VOUCHER} from '../gql/mutations';

interface ConfirmationDialogProps {
	open: boolean;
	onClose: () => void;
	selectedTime: Date;
}

const ConfirmationDialog = ({open, onClose, selectedTime}: ConfirmationDialogProps) => {
	const {user, refetch} = useContext(AuthContext);
	console.log('user confirmationDialog :>> ', user);
	const navigate = useNavigate();
	const vouchers = user?.vouchers.length;
	const time = format(selectedTime, 'dd/MM/yyyy HH');
	const [useVoucher, {error}] = useMutation(USE_VOUCHER);

	const useHandleConfirm = async () => {
		try {
			const result = await useVoucher({
				variables: {
					selectedTime: selectedTime,
				},
			});
			if (error) {
				toast.error(`Something went wrong - ${error}`);
			}
			if (result.errors) {
				toast.error(`Something went wrong - ${result.errors}`);
			}
			if (result.data) {
				console.log('results:', result.data);
				toast.success('Purchase Successful, voucher booked for ', result.data.dateTime);
				refetch();
				// setTimeout(() => navigate('/'), 2000);
			}
			console.log('result', result);
		} catch (error) {
			console.error('Error adding vouchers:', error);
			toast.error(`Something went wrong - ${error}`);
		}
		onClose;
	};

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Confirmation</DialogTitle>
			<DialogContent>
				<DialogContentText>You currently have {vouchers} voucher(s) to use.</DialogContentText>
				{vouchers === 0 ? (
					<DialogContentText>
						You can't book without vouchers, purchase them
						<NavLink to='/voucherSelection'> here</NavLink>
					</DialogContentText>
				) : (
					<DialogContentText>Are you sure you want to make the booking at {time}:00 and use one of your vouchers?</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color='primary'>
					Cancel
				</Button>
				<Button onClick={useHandleConfirm} color='primary' disabled={vouchers === 0}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
