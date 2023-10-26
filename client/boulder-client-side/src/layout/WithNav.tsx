import {} from 'react';
import Nav from './Nav';
import Footer from './Footer';

type Props = {
	children: React.ReactNode;
};

const navWrapperStyles: React.CSSProperties = {
	// height: '100vh',
	// width: '100vw',
	// position: 'sticky',
	// display: 'flex',
	// flexDirection: 'row',
};

const WithNav = (props: Props) => {
	// const [scrollNav, setScrollNav] = useState(false);

	return (
		<div id={'withNavWrapper'} style={navWrapperStyles}>
			
			<Nav />
			{props.children}
			<Footer />
		</div>
	);
};

export default WithNav;
