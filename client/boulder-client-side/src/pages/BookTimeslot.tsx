import React, {useState} from 'react';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {Box, Typography} from '@mui/material';
import {format} from 'date-fns';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const BookTimeSlot = () => {
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);

	const minTime = new Date();
	minTime.setHours(8, 0, 0, 0);

	const maxTime = new Date();
	maxTime.setHours(21, 0, 0, 0);

	console.log(selectedTime);
	// const formattedInitialValue = selectedTime ? dayjs(selectedTime).format('DD/MM/YYYY HH:mm') : '';
	return (
		<div className='centeredDivCol' style={{height: '100vh'}}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<Box>
					<Typography variant='h6'>Select a Time Slot:</Typography>
					<DateTimePicker
						ampm={false}
						minutesStep={60}
						minDateTime={new Date()}
						minTime={minTime}
						maxTime={maxTime}
						views={['hours']}
						value={selectedTime}
						onChange={(newTime) => setSelectedTime(newTime)}
					/>
				</Box>
				{selectedTime && <Typography variant='body2'>Selected Date and Time: {format(selectedTime, 'dd/MM/yyyy HH')}:00</Typography>}
			</LocalizationProvider>
		</div>
	);
};

export default BookTimeSlot;
