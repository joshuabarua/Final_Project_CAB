import React, {useContext} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {format} from 'date-fns';
import {AuthContext} from '../contexts/AuthContext';
import {NavLink} from 'react-router-dom';

interface ConfirmationDialogProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	selectedTime: Date;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({open, onClose, onConfirm, selectedTime}) => {
	const {user} = useContext(AuthContext);
	const vouchers = user?.vouchers.length;
	const time = format(selectedTime, 'dd/MM/yyyy HH');
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
				<Button onClick={onConfirm} color='primary' disabled={vouchers === 0}>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmationDialog;
