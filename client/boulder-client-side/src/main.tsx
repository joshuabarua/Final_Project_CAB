import React from 'react';
import ReactDOM from 'react-dom/client';
import {ApolloClient, NormalizedCacheObject, ApolloProvider} from '@apollo/client';
import {cache} from './cache';
import './App.css';
import WithNav from './layout/WithNav.tsx';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext.tsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error404 from './pages/Error404.tsx';
import Homepage from './pages/Homepage.tsx';
import Footer from './layout/Footer.tsx';
import News from './pages/News.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import Info from './pages/Info.tsx';
import Contact from './pages/Contact.tsx';
import CardSelection from './pages/CardSelection.tsx';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache,
	uri: 'http://localhost:4001/graphql',
});

const router = createBrowserRouter([
	{
		element: (
			<AuthContextProvider>
				<Outlet />
			</AuthContextProvider>
		),
		// putting context at outermost layer of router means it still wraps every route, but is also inside the router and can then use react router dom hooks like useNavigate

		children: [
			{
				element: (
					<>
						<WithNav>
							<ToastContainer position='bottom-right' />
							<Outlet />
						</WithNav>
					</>
				),
				children: [
					{
						path: '/',
						element: <Homepage />,
					},
					{
						path: '/news',
						element: <News />,
					},
					{
						path: '/signup',
						element: <Register />,
					},
					{
						path: '/login',
						element: <Login />,
					},
					{
						path: '/info',
						element: <Info />,
					},
					{
						path: '/contact',
						element: <Contact />,
					},
					{
						path: '/bookingSelection',
						element: <CardSelection />,
					},
				],
			},
			{
				path: '*',
				element: <Error404 />,
			},
		],
	},
]);

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</React.StrictMode>
);
