import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WithNav from './layout/WithNav.tsx';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from './contexts/AuthContext.tsx';
import {ToastContainer} from 'react-toastify';
import Error404 from './pages/Error404.tsx';
import Homepage from './pages/Homepage.tsx';
import Footer from './layout/Footer.tsx';

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
							<ToastContainer style={{}} />
							<Outlet />
						</WithNav>
						<Footer />
					</>
				),
				children: [
					{
						path: '/',
						element: <Homepage />,
					},
					// {
					// 	path: '/myprofile',
					// 	element: <Profile />,
					// },
					// {
					// 	path: '/map',
					// 	element: <Map />,
					// },
					// {
					// 	path: '/login',
					// 	element: <Login />,
					// },
					// {
					// 	path: '/newUser',
					// 	element: <Signup />,
					// },
				],
			},
			{
				path: '*',
				element: <Error404 />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
