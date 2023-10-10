import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Footer = () => {
	return (
		<>
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100vw', height: '30vh', padding: '10px'}}>
				<div style={{display: 'flex', justifyContent: 'space-evenly', gap: '20px', alignItems: 'center', flexDirection: 'row', width: '100%'}}>
					<div>
						<p>
							<strong>BOULDER Bb's GMBH </strong>{' '}
						</p>
						<p>Thiemannstr. 1 12059 Berlin</p>
						<p>
							<strong>Mo-Fr</strong> 10-23 Uhr
						</p>
						<p>
							<strong>Sa,So,</strong>Feiertag 10-22 Uhr
						</p>
						<p>☎️ (030)22479815</p>
						<p>✉️ info@boulderbebis.de</p>
					</div>
					<div>
						<h2>ROUTENBAU</h2>
						<h4>NEUE BOULDER: Jeden MONTAG und jeden zweiten DONNERSTAG. </h4>
						<h4>NEUE SEILROUTEN: Jeden DONNERSTAG. Ab 17Uhr könnt ihr die neuen Routen/Boulder probieren.</h4>
					</div>
					<div>
						<div>
							<p>Home | Downloads | Impressum</p>
						</div>
						<div>
							<a href='https://www.instagram.com/bouldergarten' target='_blank'>
								<FontAwesomeIcon icon={faInstagram} size='xl' style={{color: '#e42baf'}} />{' '}
							</a>
							<a href='https://www.facebook.com/bouldergarten/' target='_blank'>
								<FontAwesomeIcon icon={faFacebook} size='xl' style={{color: '#5c93f6'}} />
							</a>
						</div>
					</div>
				</div>
			</div>
			;
		</>
	);
};

export default Footer;
