const getToken = () => {
	const token = localStorage.getItem('token');
	if (token) {
		return token;
	} else {
		return null;
	}
};

export default getToken;
