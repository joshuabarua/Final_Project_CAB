import {NavLink} from 'react-router-dom';

const Error404 = () => {
	return (
		<div className='centeredDiv' style={{flexDirection: 'column', width: '100vw'}}>
			<h1>Error404</h1>
			<p>This is not the page you are looking for...</p>
			<iframe src='https://giphy.com/embed/l2JJKs3I69qfaQleE' width='480' height='218' allowFullScreen></iframe>

			<p>
				Go back to the <NavLink to='/'>Homepage</NavLink>
			</p>
		</div>
	);
};

export default Error404;
