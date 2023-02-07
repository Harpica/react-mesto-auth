import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from "./Content";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";

const App = () => {
	const [loggedIn, setLoggedIn] = useState(true);

	return (
		<div className='root'>
			<BrowserRouter>
				<Routes>
					<Route
						index
						path='/'
						element={
							<ProtectedRouteElement loggedIn={loggedIn}>
								<Content />
							</ProtectedRouteElement>
						}
					/>
					<Route path='/sign-up' element={<Register />} />
					<Route path='/sign-in' element={<Login />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
