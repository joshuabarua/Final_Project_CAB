import {useState} from 'react';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {Button, Typography} from '@mui/material';
import {format} from 'date-fns';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import ConfirmationDialog from '../components/ConfirmationDialog';

const TWO_WEEKS = 1209600000;

const currentDateTime = new Date(Date.now());

const minTimeConfig = new Date();
minTimeConfig.setHours(8, 0, 0, 0);

const maxTime = new Date();
maxTime.setHours(21, 0, 0, 0);

const BookTimeSlot = () => {
	const [selectedTime, setSelectedTime] = useState<Date | null>(new Date(Date.now()));
	const [minTime, setMinTime] = useState<Date | null>(minTimeConfig);

	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	console.log(selectedTime);
	// const formattedInitialValue = selectedTime ? dayjs(selectedTime).format('DD/MM/YYYY HH:mm') : '';
	//TODO: FIX Min time calc based on now  time, future time and setting minimum time based on that, maybe a useRef needed
	return (
		<div className='centeredDivCol' style={{height: '100vh'}}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<div
					className='centeredDivCol'
					style={{width: '40vw', height: '40vh', background: 'white', boxShadow: '0 0 10px #dbd6d6', borderRadius: '10px', display: 'flex', justifyContent: 'space-evenly'}}>
					<Typography variant='h6'>Select a Time Slot:</Typography>
					<DateTimePicker
						sx={{color: 'white'}}
						ampm={false}
						minutesStep={60}
						minDate={new Date(Date.now())}
						maxDate={new Date(Date.now() + TWO_WEEKS)}
						minTime={minTime}
						maxTime={maxTime}
						value={selectedTime}
						onChange={(newTime) => {
							const newTimeString = newTime?.toLocaleDateString();
							const currentDateTimeString = currentDateTime.toLocaleDateString();
							if (newTimeString !== currentDateTimeString) {
								setSelectedTime(newTime);
							} else {
								const hours = currentDateTime.getHours() + 1 < 21 ? currentDateTime.getHours() + 1 : 21;
								// hours < minTimeConfig.getHours ?
							}
						}}
						className='whiteText'
					/>
					{selectedTime && <Typography variant='body2'>Selected Timeslot {format(selectedTime, 'dd/MM/yyyy HH')}:00</Typography>}
					<Button variant='contained' color='primary' onClick={handleOpen}>
						Make Booking
					</Button>
					<ConfirmationDialog open={open} onClose={handleClose} selectedTime={selectedTime!} />
				</div>
			</LocalizationProvider>
		</div>
	);
};

export default BookTimeSlot;
