import {} from 'react';
import Nav from './Nav';

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
		<div style={navWrapperStyles}>
			<Nav />
			{props.children}
		</div>
	);
};

export default WithNav;
