import {useState} from 'react';
import {useMutation} from '@apollo/client';
// import {CREATE_VOUCHER_MUTATION} from '../gql/mutations.js';
import {useLocation} from 'react-router-dom';

const BoulderingTokenCreation = () => {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const numberOfTokens = searchParams && searchParams.get('tokens');
	const [tokens, setTokens] = useState<string[]>([]);
	// const [createVoucher] = useMutation(CREATE_VOUCHER_MUTATION); // Use your actual GraphQL mutation function

	// const handleGenerateTokens = async () => {
	// 	// Generate 1 or 10 tokens based on the numberOfTokens prop
	// 	const newTokens = Array.from({length: parseInt(numberOfTokens!)}, (_, index) => {
	// 		return `Token-${index + 1}`;
	// 	});

	// 	// Store the generated tokens in the component's state
	// 	setTokens(newTokens);

	// 	// Create vouchers and add to the backend using a GraphQL mutation
	// 	try {
	// 		const result = await createVoucher({
	// 			variables: {
	// 				tokens: newTokens,
	// 				// Other variables you need for your mutation
	// 			},
	// 		});
	// 		// Handle the result as needed
	// 		console.log('Vouchers created:', result.data);
	// 	} catch (error) {
	// 		// Handle any errors from the mutation
	// 		console.error('Error creating vouchers:', error);
	// 	}
	// };

	return (
		<div>
			<h2>Generate Bouldering Tokens</h2>
			<p>Number of Tokens: {numberOfTokens}</p>
			<button onClick={() => {}}>Generate Tokens</button>
			<ul>
				{tokens.map((token, index) => (
					<li key={index}>{token}</li>
				))}
			</ul>
		</div>
	);
};

export default BoulderingTokenCreation;
