import backgroundVideo from '../assets/vids/backgroundVid.mp4';
// import {NavLink} from 'react-router-dom';

const Homepage = () => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					width: '100vw',
					height: '100vh',
				}}>
				<h1
					style={{
						fontSize: 96,
					}}>
					Boulder Bibi's
				</h1>

				<p>Book your next session online!</p>
			</div>
			<div
				style={{
					position: 'absolute',
					top: 0,
					zIndex: -50,
					height: '100%',
					width: '100vw ',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<video
					autoPlay
					loop
					muted
					id='video'
					style={{
						objectFit: 'cover',
						height: '100% ',
						width: '100%',
						filter: 'saturate(300%) blur(5px)  sepia(70%)',
					}}>
					<source src={backgroundVideo} type='video/mp4' />
				</video>
			</div>
			<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100vw', height: '100vh', padding: '1rem '}}>
				{/* <div className='centeredDiv' style={{flex: '1', overflow: 'hidden'}}>
				<img
					src={'/src/assets/imgs/pexels-anna-tarazevich-7772006.jpg'}
					style={{minWidth: '200px', width: '100%', height: '100%', objectFit: 'contain'}}
					alt='Pfantastisch Image'
				/>
			</div> */}
				<div>
					<h1 style={{fontSize: '2rem'}}>News!</h1>
					<p
						style={{
							fontSize: '0.7rem',
						}}>
						News 8 Years of Boulderklub! Celebrate Boulderklub’s Birthday with Us on 23rd Sept! Free Workshops Dj‘s starting at 5 pm With Giftig, Dr. Gonzo, H.Sinc Party til
						late 🙂 Join our Free Workshops! Limited spots available: 1️. Breathing & Climbing” (30 mins) 12:30-1:00 PM or 1:30-2:00 PM 2️. Hip Mobility for Climbers” (60
						mins) 3:00-4:00 PM or 5:00-6:00 PM 3️. “Understanding the Menstrual Cycle’s Impact on Training & Bouldering” (60 mins) 4:00-5:00 PM 4. “FLINTA*Only: How to Own
						Your Space in the Gym” (120 mins) 5:00-7:00 PM 5️.”Enhance Your Shoulder Stability” (60 mins) 6:00-7:00 PM Secure your spot via email at josefin@boulderklub.de or
						register on the day of the event for any remaining places. News 8 Years of Boulderklub! Celebrate Boulderklub’s Birthday with Us on 23rd Sept! Free Workshops Dj‘s
						starting at 5 pm With Giftig, Dr. Gonzo, H.Sinc Party til late 🙂 Join our Free Workshops! Limited spots available: 1️. Breathing & Climbing” (30 mins) 12:30-1:00
						PM or 1:30-2:00 PM 2️. Hip Mobility for Climbers” (60 mins) 3:00-4:00 PM or 5:00-6:00 PM 3️. “Understanding the Menstrual Cycle’s Impact on Training & Bouldering”
						(60 mins) 4:00-5:00 PM 4. “FLINTA*Only: How to Own Your Space in the Gym” (120 mins) 5:00-7:00 PM 5️.”Enhance Your Shoulder Stability” (60 mins) 6:00-7:00 PM
						Secure your spot via email at josefin@boulderklub.de or register on the day of the event for any remaining places. News 8 Years of Boulderklub! Celebrate
						Boulderklub’s Birthday with Us on 23rd Sept! Free Workshops Dj‘s starting at 5 pm With Giftig, Dr. Gonzo, H.Sinc Party til late 🙂 Join our Free Workshops!
						Limited spots available: 1️. Breathing & Climbing” (30 mins) 12:30-1:00 PM or 1:30-2:00 PM 2️. Hip Mobility for Climbers” (60 mins) 3:00-4:00 PM or 5:00-6:00 PM
						3️. “Understanding the Menstrual Cycle’s Impact on Training & Bouldering” (60 mins) 4:00-5:00 PM 4. “FLINTA*Only: How to Own Your Space in the Gym” (120 mins)
						5:00-7:00 PM 5️.”Enhance Your Shoulder Stability” (60 mins) 6:00-7:00 PM Secure your spot via email at josefin@boulderklub.de or register on the day of the event
						for any remaining places.
					</p>
					<p
						style={{
							fontSize: '0.7rem',
						}}>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officia provident expedita neque possimus blanditiis, ipsam, quos itaque ad omnis repudiandae porro,
						consequatur aut aperiam in debitis nam totam beatae cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio doloremque non odio est
						tempora molestias eos perferendis soluta incidunt delectus illo quibusdam, reiciendis unde explicabo sapiente consequuntur sequi, iusto quae. Lorem ipsum dolor
						sit amet consectetur adipisicing elit. Ipsa excepturi porro ut cum dolorum incidunt, eaque nobis hic quidem architecto, consequatur non consectetur asperiores
						enim officiis delectus. Quas, unde labore.
					</p>
					<p
						style={{
							fontSize: '0.7rem',
						}}>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae, est? Deleniti sit odit officiis nobis laboriosam deserunt similique alias consequuntur a
						accusamus quam error voluptas, ex quos quod earum iste harum reprehenderit dicta labore nisi aliquid. Delectus autem nobis numquam praesentium incidunt magni
						commodi. Ex aliquid in quae quibusdam officia unde, magni autem laboriosam veritatis? Delectus minus nobis praesentium unde hic distinctio sapiente dolore eius?
						Distinctio vitae animi dicta adipisci cumque atque incidunt nesciunt laborum tenetur? Et illum amet nulla dolore, accusamus exercitationem aliquam atque cumque!
						Eaque enim aperiam atque doloremque rem facere deserunt aliquid, sed error necessitatibus omnis amet quasi corporis blanditiis quae ipsum voluptatem. Expedita
						totam minima minus culpa blanditiis accusantium sit, ipsum commodi optio excepturi aperiam enim voluptas! Atque, reiciendis? Explicabo ab maxime suscipit
						recusandae enim accusantium nostrum modi exercitationem illo molestias! Assumenda enim quia dolorum harum autem iusto atque deleniti accusantium qui incidunt.
						Rerum perspiciatis excepturi accusantium magnam animi nemo laudantium culpa, explicabo totam est at ad eius possimus nihil voluptatem debitis, odit ex cumque,
						delectus omnis sunt. Tenetur aut itaque quia asperiores doloremque modi consectetur, temporibus maxime voluptates culpa consequuntur iste illum, architecto labore
						dolorem repellendus impedit fuga commodi? In quisquam eligendi quis quae quod unde odit vitae illo aliquid aperiam ipsum facere, ipsam, libero eveniet consequatur
						atque officiis rem tempore reiciendis temporibus labore quos. Minus vero quod vel voluptates tenetur rerum deleniti sapiente assumenda laborum iusto quas nulla
						quia ab iste aliquid, deserunt consequatur doloribus natus dolorum. Perferendis eum iure vitae. Sit blanditiis nulla eos dolor tempora quidem ex exercitationem
						nisi iste illo. Aperiam eaque, fuga facilis dignissimos nihil dolorem magni consequatur repellat sed molestiae? Porro qui eveniet pariatur, suscipit iusto beatae
						rerum natus. Impedit dolore debitis perferendis ab, distinctio nostrum tempore similique asperiores incidunt in sequi, assumenda maxime! Magni possimus amet
						accusamus! Reiciendis repellendus, minima possimus cumque rem nostrum. Exercitationem aliquam quam nulla ab? Officiis quisquam unde iure animi voluptatum porro
						qui illum, aliquid deserunt tenetur pariatur, possimus autem officia, obcaecati perferendis nam doloremque saepe quis nemo optio quaerat. Architecto ratione
						facilis omnis ipsa corporis esse ducimus debitis? Unde assumenda numquam nisi a minus, molestias facilis! Natus officia in temporibus tempora placeat distinctio
						facilis explicabo maiores at. Aliquam possimus at earum amet incidunt deserunt neque sint molestiae in doloremque explicabo odit, recusandae numquam! Totam omnis
						ut deleniti. Totam pariatur voluptatum laboriosam magnam ratione aliquam eligendi. Consequatur nostrum id praesentium est ea, sunt voluptatibus incidunt? Nam
						laudantium suscipit ratione at totam dolore quo consequatur ex ut fuga, dignissimos culpa error quas consectetur distinctio tempore laboriosam nisi est sit
						officia nihil? Cum commodi praesentium qui maxime ipsam? Recusandae facere magnam aliquam vero? Sunt, nemo eos facilis inventore est aperiam id fugiat, harum quas
						voluptatum porro fuga distinctio et explicabo dignissimos rem laborum doloremque amet necessitatibus iure. Beatae at vitae, culpa consequuntur libero praesentium
						sint suscipit, ipsam officiis autem eveniet nisi quae quibusdam, ad accusamus alias animi. Amet, voluptate ipsa. Odio modi debitis obcaecati, maiores
						exercitationem, veniam commodi, fugiat harum numquam suscipit corporis cum. Cum, facilis.
					</p>
				</div>
			</div>
		</>
	);
};

export default Homepage;
